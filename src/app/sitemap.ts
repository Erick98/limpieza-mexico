import type { MetadataRoute } from 'next';
import { absoluteUrl, STATIC_ROUTES } from '@/lib/site';

/**
 * Sitemap 100% estático y verificado.
 *
 * BUG HISTÓRICO QUE NO SE DEBE REPETIR: el sitemap vivo declaraba 4 rutas que
 * respondían 404, y además leía el blog de Firestore en build time (si Firestore
 * fallaba, el sitemap salía incompleto de forma silenciosa).
 *
 * Ahora la única fuente es STATIC_ROUTES en src/lib/site.ts. Cada ruta de esa lista
 * corresponde a un archivo page.tsx real. Regla: si borras una página, bórrala de
 * STATIC_ROUTES y agrega su redirect 301 en next.config.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
