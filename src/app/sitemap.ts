import type { MetadataRoute } from 'next';
import { absoluteUrl, STATIC_ROUTES } from '@/lib/site';
import { GUIAS } from '@/lib/guias';
import { PILAR_PATH, PILAR_MODIFICADO } from '@/lib/mejor-empresa';

/**
 * Fechas reales de publicación del contenido editorial.
 *
 * El resto de las rutas usa la fecha de build, que para páginas de servicio es una
 * aproximación aceptable. Para pilar y guías no lo es: son artículos con fecha real y
 * declarar "modificado hoy" en cada despliegue es una señal falsa que los rastreadores
 * terminan ignorando.
 */
const FECHAS_EDITORIALES: Record<string, string> = {
  [PILAR_PATH]: PILAR_MODIFICADO,
  ...Object.fromEntries(GUIAS.map((g) => [`/guias/${g.slug}`, g.modificado])),
};

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
    lastModified: FECHAS_EDITORIALES[route.path]
      ? new Date(FECHAS_EDITORIALES[route.path])
      : lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
