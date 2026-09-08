/**
 * Configuración canónica del sitio — FUENTE ÚNICA DE VERDAD.
 *
 * DECISIÓN (2026-08-26): el dominio canónico es https://www.limpiezamexico.com (CON www),
 * porque es a donde ya redirige el servidor hoy (apex -> 307 -> www).
 * Sitemap, canonical, OG url, robots y JSON-LD DEBEN usar esta constante para no
 * mandarle señales contradictorias a Google (contenido duplicado www / no-www).
 *
 * REGLA DURA (2026-09-01): aquí SOLO van datos REALES y verificables.
 * Nada de teléfonos placeholder, clientes inventados, número de proyectos ni ratings.
 * Si un dato no está confirmado, se marca PENDIENTE_ERICK y NO se renderiza.
 */

export const SITE_URL = 'https://www.limpiezamexico.com';

export const SITE_NAME = 'Limpieza México';

/** Ruta relativa -> URL absoluta canónica. `path` debe empezar con '/' o ser ''. */
export function absoluteUrl(path: string = ''): string {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/* ------------------------------------------------------------------ */
/* DATOS DE CONTACTO                                                   */
/* ------------------------------------------------------------------ */

/**
 * TELÉFONO / WHATSAPP REAL — confirmado por Erick el 2026-09-07 (Discord #limpieza).
 * Es la única fuente: JSON-LD `telephone`, botón de WhatsApp (barra móvil y cotizador),
 * footer y /contacto se alimentan de aquí. Si cambia el número, se cambia SOLO aquí.
 */
export const PHONE_CONFIRMED: boolean = true;
export const PHONE_DISPLAY: string = '55 3964 3612';
export const PHONE_E164: string = '+525539643612';

/** WhatsApp: se deriva del teléfono confirmado. Sin teléfono real, no hay link. */
export function whatsappUrl(mensaje: string = 'Hola, quiero cotizar un servicio de limpieza.'): string | null {
  if (!PHONE_CONFIRMED || !PHONE_E164) return null;
  return `https://wa.me/${PHONE_E164.replace(/\D/g, '')}?text=${encodeURIComponent(mensaje)}`;
}

export const EMAIL_CONTACTO = 'contacto@limpiezamexico.com';
export const EMAIL_VENTAS = 'ventas@limpiezamexico.com';

/**
 * REDES SOCIALES — perfiles reales confirmados por Erick el 2026-09-07.
 * URLs limpias (sin parámetros de tracking fbclid / edit_entry_point).
 * Se usan en el footer y en `sameAs` del JSON-LD (Organization + CleaningService).
 */
export const SOCIAL = [
  { nombre: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61593697214950' },
  { nombre: 'Instagram', url: 'https://www.instagram.com/limpieza_mexico1/' },
] as const;

/** Dirección real confirmada en el repo y en el sitio vivo. */
export const ADDRESS = {
  street: 'Sófocles 133, Polanco, Granada, Miguel Hidalgo',
  locality: 'Ciudad de México',
  region: 'CDMX',
  postalCode: '11530',
  country: 'MX',
  full: 'Sófocles 133, Polanco, Granada, Miguel Hidalgo, 11530 Ciudad de México, CDMX',
} as const;

/* ------------------------------------------------------------------ */
/* ARQUITECTURA DE URLs (una página por intención de búsqueda)          */
/* ------------------------------------------------------------------ */

export type RouteDef = {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
};

/**
 * Rutas indexables. TODAS deben responder 200. Si borras una página, bórrala de aquí
 * y agrega su 301 en next.config.ts. (Bug histórico: el sitemap declaraba 4 rutas 404.)
 */
export const STATIC_ROUTES: RouteDef[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/servicio-de-limpieza-cdmx', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/limpieza-de-oficinas', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/limpieza-domestica', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/limpieza-especializada', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/zonas/polanco', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/zonas/santa-fe', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/zonas/interlomas', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/zonas/condesa-roma', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/preguntas-frecuentes', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/nosotros', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contacto', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/privacidad', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terminos', priority: 0.2, changeFrequency: 'yearly' },
];

/* ------------------------------------------------------------------ */
/* CATÁLOGO DE SERVICIOS (usado por nav, footer, wizard y JSON-LD)      */
/* ------------------------------------------------------------------ */

export const SERVICIOS = [
  {
    slug: '/limpieza-de-oficinas',
    nombre: 'Limpieza de oficinas y corporativos',
    corto: 'Oficinas y corporativo',
    resumen:
      'Personal fijo o por evento para oficinas, condominios, escuelas, restaurantes y naves industriales.',
  },
  {
    slug: '/limpieza-domestica',
    nombre: 'Limpieza doméstica y personal de hogar',
    corto: 'Hogar y personal doméstico',
    resumen:
      'Limpieza de casa y departamento por día o recurrente, y reclutamiento de personal doméstico con verificación.',
  },
  {
    slug: '/limpieza-especializada',
    nombre: 'Limpieza especializada y mantenimiento',
    corto: 'Especializada',
    resumen:
      'Sanitización, pisos, alturas, cisternas, control de plagas y limpieza post-obra o post-evento.',
  },
] as const;

/** Zonas con página propia. Solo las que tienen contenido real y diferenciado. */
export const ZONAS = [
  { slug: '/zonas/polanco', nombre: 'Polanco', alcaldia: 'Miguel Hidalgo' },
  { slug: '/zonas/santa-fe', nombre: 'Santa Fe', alcaldia: 'Álvaro Obregón / Cuajimalpa' },
  { slug: '/zonas/interlomas', nombre: 'Interlomas', alcaldia: 'Huixquilucan, Edomex' },
  { slug: '/zonas/condesa-roma', nombre: 'Condesa y Roma', alcaldia: 'Cuauhtémoc' },
] as const;

/** Cobertura declarada (sin inventar municipios donde no se opera). */
export const COBERTURA = [
  'Ciudad de México (16 alcaldías)',
  'Zona Metropolitana del Valle de México',
  'Estado de México (Naucalpan, Huixquilucan, Tlalnepantla, Ecatepec, Cuautitlán)',
] as const;
