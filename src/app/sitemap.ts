import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { absoluteUrl, STATIC_ROUTES } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Rutas estáticas reales (verificadas 200 OK contra el sitio vivo el 2026-08-26).
  // OJO: las antiguas /servicios/corporativos, /servicios/executive, /servicios/domestico
  // y /servicios/transversales NO EXISTEN (404). No volver a declararlas aquí.
  // /login y /dashboard/* quedan fuera a propósito: no aportan valor de indexación.
  const routes = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date().toISOString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Intentar obtener los artículos del blog dinámicamente
  try {
    const querySnapshot = await getDocs(collection(db, 'blog_posts'));
    const blogRoutes = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        url: absoluteUrl(`/blog/${data.slug || doc.id}`),
        lastModified: data.updatedAt || data.createdAt || new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
    });

    return [...routes, ...blogRoutes];
  } catch (error) {
    console.warn('Error fetching blog posts for sitemap:', error);
    // Si falla (ej. por permisos o build time), retornamos al menos las estáticas
    return routes;
  }
}
