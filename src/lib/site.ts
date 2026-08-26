/**
 * Configuración canónica del sitio.
 *
 * DECISIÓN (2026-08-26): el dominio canónico es https://www.limpiezamexico.com (CON www),
 * porque es a donde ya redirige el servidor hoy (apex -> 307 -> www).
 * Sitemap, canonical, OG url, robots y JSON-LD DEBEN usar esta constante para no
 * mandarle señales contradictorias a Google (contenido duplicado www / no-www).
 *
 * Se deja hardcodeada a propósito (no depende de NEXT_PUBLIC_SITE_URL) para que un
 * env mal configurado en Vercel no vuelva a romper la consistencia del canónico.
 * En preview/local las URLs canónicas siguen apuntando a producción, que es el
 * comportamiento correcto de SEO.
 */
export const SITE_URL = 'https://www.limpiezamexico.com';

/** Ruta relativa -> URL absoluta canónica. `path` debe empezar con '/' o ser ''. */
export function absoluteUrl(path: string = ''): string {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Rutas estáticas indexables. Verificadas 200 OK contra el sitio vivo el 2026-08-26. */
export const STATIC_ROUTES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/nosotros', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contacto', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/servicios-corporativos', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/servicios-executive', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/servicios-transversales', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/reclutamiento-domestico', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/privacidad', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terminos', priority: 0.2, changeFrequency: 'yearly' },
];
