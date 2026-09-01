import type { MetadataRoute } from 'next';
import { absoluteUrl, SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /api/ es el endpoint de cotización: nada que indexar.
        // Las rutas de la plataforma (dashboard, login, empleados, landing) ya no
        // existen; se dejan en disallow como red de seguridad mientras Google
        // reprocesa los 301 declarados en next.config.ts.
        disallow: ['/api/', '/dashboard/', '/login', '/empleados', '/landing/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}
