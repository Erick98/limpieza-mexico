/**
 * Helpers de SEO: metadata por página y bloques JSON-LD.
 *
 * REGLA: nada de `aggregateRating`, `review`, `numberOfEmployees` ni logos de clientes.
 * Sin reseñas reales verificables eso es structured data falso y Google lo penaliza
 * (además de ser mentira). Cuando existan reseñas reales de Google Business Profile,
 * se agregan aquí y no antes.
 */
import type { Metadata } from 'next';
import {
  SITE_URL,
  SITE_NAME,
  absoluteUrl,
  ADDRESS,
  EMAIL_CONTACTO,
  PHONE_CONFIRMED,
  PHONE_E164,
  SERVICIOS,
} from './site';

const OG_IMAGE = '/images/og-image-default.jpg';

/**
 * Construye el <title> final. Añade la marca sólo si el resultado sigue cabiendo en
 * el ancho que Google muestra (~60 caracteres). Si no cabe, la marca se omite: vale
 * más que la keyword se lea completa a que el snippet salga truncado con "...".
 * Por eso se usa `absolute` y NO el `template` del layout, que añadía la marca a
 * ciegas y empujaba varios títulos a 65+ caracteres.
 */
const MAX_TITLE = 60;

function construirTitulo(base: string): string {
  const conMarca = `${base} | ${SITE_NAME}`;
  return conMarca.length <= MAX_TITLE ? conMarca : base;
}

/** Metadata canónica de una página. title <= 60 chars, description < 155. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const title = construirTitulo(opts.title);
  return {
    title: { absolute: title },
    description: opts.description,
    keywords: opts.keywords,
    alternates: { canonical: opts.path || '/' },
    robots: opts.noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'es_MX',
      siteName: SITE_NAME,
      url,
      title,
      description: opts.description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: opts.description,
      images: [OG_IMAGE],
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

export const ORG_ID = `${SITE_URL}/#organization`;
export const BUSINESS_ID = `${SITE_URL}/#cleaningservice`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: ADDRESS.street,
  addressLocality: ADDRESS.locality,
  addressRegion: ADDRESS.region,
  postalCode: ADDRESS.postalCode,
  addressCountry: ADDRESS.country,
};

/**
 * CleaningService (subtipo de LocalBusiness). @id estable para que todas las páginas
 * apunten a la MISMA entidad y Google consolide señales en vez de dispersarlas.
 * `telephone` solo se emite si Erick confirmó un número real.
 */
export function cleaningServiceLd() {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    '@id': BUSINESS_ID,
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl(OG_IMAGE),
    logo: absoluteUrl('/logo.png'),
    email: EMAIL_CONTACTO,
    description:
      'Empresa de servicios de limpieza en Ciudad de México y Zona Metropolitana: limpieza de oficinas y corporativos, limpieza doméstica y servicios especializados de mantenimiento.',
    address: postalAddress,
    priceRange: '$$',
    currenciesAccepted: 'MXN',
    areaServed: [
      { '@type': 'City', name: 'Ciudad de México' },
      { '@type': 'AdministrativeArea', name: 'Estado de México' },
      { '@type': 'Country', name: 'México' },
    ],
    knowsLanguage: ['es-MX'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de limpieza',
      itemListElement: SERVICIOS.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.nombre,
          serviceType: s.nombre,
          url: absoluteUrl(s.slug),
          areaServed: { '@type': 'City', name: 'Ciudad de México' },
          provider: { '@id': BUSINESS_ID },
        },
      })),
    },
    parentOrganization: { '@id': ORG_ID },
  };
  // telephone: solo con dato real confirmado (ver PHONE_CONFIRMED en site.ts).
  if (PHONE_CONFIRMED && PHONE_E164) ld.telephone = PHONE_E164;
  return ld;
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png') },
    email: EMAIL_CONTACTO,
    address: postalAddress,
    // sameAs: OMITIDO a propósito. Los enlaces sociales del sitio no apuntan a
    // perfiles reales verificados. Cuando existan URLs reales, agregarlas aquí.
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'es-MX',
    publisher: { '@id': ORG_ID },
    // SearchAction: OMITIDO a propósito. El sitio no tiene buscador interno;
    // declarar uno que no existe es structured data engañoso y no genera el
    // sitelinks searchbox de todas formas. Se agrega el día que haya búsqueda real.
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Service page: describe UN servicio y lo ata al negocio por @id. */
export function serviceLd(opts: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { '@id': BUSINESS_ID },
    areaServed: (opts.areaServed ?? ['Ciudad de México']).map((a) => ({
      '@type': 'AdministrativeArea',
      name: a,
    })),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: absoluteUrl(opts.path),
      servicePhone: PHONE_CONFIRMED && PHONE_E164 ? PHONE_E164 : undefined,
    },
  };
}
