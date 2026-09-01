import type { NextConfig } from 'next';

/**
 * REDIRECTS 301 — no romper lo que Google ya indexó.
 *
 * Las rutas viejas /servicios-corporativos, /servicios-executive,
 * /servicios-transversales y /reclutamiento-domestico ESTABAN EN EL SITEMAP VIVO y
 * tienen historial de indexación. Al reorganizar la arquitectura de URLs se mandan
 * con 301 (permanent: true) a su equivalente nuevo para transferir la autoridad
 * acumulada en vez de tirarla a la basura con un 404.
 *
 * Las rutas de la plataforma dada de baja (/dashboard, /login, /empleados, /landing)
 * también se redirigen: aunque estaban en disallow, pueden tener enlaces externos.
 */
const nextConfig: NextConfig = {
  reactCompiler: true,

  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      // --- Reorganización de servicios (301, conservan autoridad) ---
      { source: '/servicios-corporativos', destination: '/limpieza-de-oficinas', permanent: true },
      { source: '/servicios-executive', destination: '/limpieza-especializada', permanent: true },
      { source: '/servicios-transversales', destination: '/limpieza-especializada', permanent: true },
      { source: '/reclutamiento-domestico', destination: '/limpieza-domestica', permanent: true },

      // --- Rutas antiguas que ya daban 404 antes del rediseño ---
      { source: '/servicios/corporativos', destination: '/limpieza-de-oficinas', permanent: true },
      { source: '/servicios/executive', destination: '/limpieza-especializada', permanent: true },
      { source: '/servicios/domestico', destination: '/limpieza-domestica', permanent: true },
      { source: '/servicios/transversales', destination: '/limpieza-especializada', permanent: true },

      // --- Plataforma SaaS dada de baja el 2026-09-01 ---
      { source: '/dashboard', destination: '/', permanent: true },
      { source: '/dashboard/:path*', destination: '/', permanent: true },
      { source: '/login', destination: '/contacto', permanent: true },
      { source: '/empleados', destination: '/', permanent: true },
      { source: '/landing', destination: '/', permanent: true },
      { source: '/landing/:path*', destination: '/', permanent: true },

      // --- Blog retirado (vivía en Firestore, se dio de baja con la plataforma) ---
      { source: '/blog', destination: '/preguntas-frecuentes', permanent: true },
      { source: '/blog/:slug', destination: '/preguntas-frecuentes', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // HSTS: el sitio ya se sirve por HTTPS en Vercel. 2 años + subdominios.
          // OJO: no incluye `preload` a propósito; entrar a la lista de preload
          // es difícil de revertir y esa decisión le toca a Erick.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
