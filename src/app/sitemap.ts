import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://limpiezamexico.com';

  // Rutas estáticas principales
  const routes = [
    '',
    '/nosotros',
    '/contacto',
    '/servicios/corporativos',
    '/servicios/executive',
    '/servicios/domestico',
    '/servicios/transversales',
    '/blog',
    '/login'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Intentar obtener los artículos del blog dinámicamente
  try {
    const querySnapshot = await getDocs(collection(db, 'blog_posts'));
    const blogRoutes = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        url: `${baseUrl}/blog/${data.slug || doc.id}`,
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
