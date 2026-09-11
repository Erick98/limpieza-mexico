import { ADDRESS, COBERTURA, EMAIL_CONTACTO, EMAIL_VENTAS, PHONE_DISPLAY, SERVICIOS, SITE_NAME, SITE_URL, ZONAS, whatsappUrl } from './site';
import { FAQ_GENERAL, FAQ_OFICINAS, FAQ_DOMESTICA, FAQ_PILAR, FAQ_CONDOMINIOS, FAQ_CORPORATIVA } from './contenido';
import { ZONAS_CONTENIDO } from './zonas';
import { GUIAS, getGuia } from './guias';
import { CRITERIOS, COMPARATIVA_DIMENSIONES, COMPARATIVA_MODELOS, PILAR_PATH } from './mejor-empresa';

const servicioNotas: Record<string, string> = {
  '/servicio-de-limpieza-cdmx': 'Servicio de limpieza profesional en CDMX para oficinas, casas, departamentos, condominios y trabajos especializados. La cotización se calcula por tipo de inmueble, superficie, frecuencia, horario, insumos y accesos.',
  '/limpieza-de-oficinas': 'Limpieza de oficinas en CDMX para corporativos, edificios, escuelas, restaurantes, clínicas, bodegas y condominios. Incluye dimensionamiento de personal, supervisión, cobertura de ausencias y alcance por escrito.',
  '/limpieza-corporativa': 'Limpieza corporativa por contrato en CDMX y Zona Metropolitana para corporativos, plantas administrativas y redes de sucursales. Incluye limpieza diaria en operación, limpieza profunda programada fuera de horario, turnos nocturnos y de fin de semana, supervisión con bitácora, protocolos escritos para áreas sensibles (site, comedor, archivo) y contrato marco con anexo por sede. Se cotiza por superficie y distribución, número de sanitarios, personas en sitio, turnos, frecuencia y áreas especiales.',
  '/limpieza-de-condominios': 'Limpieza de condominios y áreas comunes en CDMX y Zona Metropolitana: lobby, pasillos, escaleras, elevadores, estacionamientos, amenidades, sanitarios comunes y cuarto de basura, con manejo interno de residuos hasta su entrega al servicio de recolección. Se cotiza por superficie de áreas comunes, número de torres y niveles, amenidades incluidas y frecuencia por espacio, y se coordina con administración, comité y vigilancia.',
  '/limpieza-domestica': 'Limpieza doméstica en CDMX para casas y departamentos, por visita o recurrente, y reclutamiento de personal de hogar verificado cuando el cliente prefiere contratación directa.',
  '/limpieza-especializada': 'Limpieza especializada en CDMX: post-obra, post-evento, sanitización, tratamiento técnico de pisos, alturas, cisternas y control de plagas. Se programa como proyecto con equipo específico.',
};

const faqsPorRuta: Record<string, readonly { q: string; a: string }[]> = {
  '/limpieza-de-oficinas': FAQ_OFICINAS,
  '/limpieza-corporativa': FAQ_CORPORATIVA,
  '/limpieza-de-condominios': FAQ_CONDOMINIOS,
  '/limpieza-domestica': FAQ_DOMESTICA,
};

/**
 * Resumen citable de cada recurso nuevo. Es lo que un agente copia cuando le preguntan
 * por el tema; por eso cada línea es autocontenida y no depende de la anterior.
 */
const RESUMENES_EDITORIAL: { path: string; titulo: string; resumen: string }[] = [
  {
    path: PILAR_PATH,
    titulo: '¿Cuál es la mejor empresa de limpieza en México? Criterios para elegir',
    resumen:
      'No existe un ranking oficial de empresas de limpieza en México. La guía define 10 criterios verificables para comparar proveedores (personal en nómina con IMSS, REPSE vigente, supervisión con bitácora, cobertura de ausencias, insumos y protocolo por superficie, cobertura y tiempos, horarios, responsabilidad civil, facturación y especialización por sector), la pregunta concreta que hay que hacerle a cada proveedor y una comparación de tres modelos de contratación.',
  },
  ...GUIAS.map((g) => ({ path: `/guias/${g.slug}`, titulo: g.titulo, resumen: g.resumen })),
];

export function llmsMarkdown() {
  const links = [
    '',
    PILAR_PATH,
    ...SERVICIOS.map((s) => s.slug),
    '/servicio-de-limpieza-cdmx',
    ...ZONAS.map((z) => z.slug),
    '/guias',
    ...GUIAS.map((g) => `/guias/${g.slug}`),
    '/preguntas-frecuentes',
    '/nosotros',
    '/contacto',
    '/privacidad',
    '/terminos',
  ];
  return `# ${SITE_NAME}\n\n> Limpieza México ofrece servicio de limpieza profesional en CDMX y Zona Metropolitana para oficinas, corporativos, condominios, hogares y trabajos especializados, con cotización por proyecto y datos de contacto verificados.\n\n## Servicios\n${SERVICIOS.map((s) => `- ${s.nombre}: ${s.resumen} (${SITE_URL}${s.slug})`).join('\n')}\n- Servicio de limpieza en CDMX: cobertura en las 16 alcaldías y Zona Metropolitana (${SITE_URL}/servicio-de-limpieza-cdmx)\n\n## Guía de compra y contenido editorial\n${RESUMENES_EDITORIAL.map((r) => `- ${r.titulo} (${SITE_URL}${r.path}): ${r.resumen}`).join('\n')}\n\n## Zonas\n${ZONAS.map((z) => `- ${z.nombre}: ${z.alcaldia} (${SITE_URL}${z.slug})`).join('\n')}\n- Cobertura general: ${COBERTURA.join('; ')}.\n\n## Cómo cotizar\n- WhatsApp: ${whatsappUrl('Hola, quiero cotizar un servicio de limpieza en CDMX.') ?? 'no disponible'}\n- Formulario: ${SITE_URL}/contacto\n- Email comercial: ${EMAIL_VENTAS}\n- La cotización se calcula por tipo de inmueble, superficie, frecuencia, horario, insumos, equipo especializado y condiciones de acceso.\n\n## Contacto\n- Teléfono: ${PHONE_DISPLAY}\n- Email general: ${EMAIL_CONTACTO}\n- Email ventas: ${EMAIL_VENTAS}\n- Dirección: ${ADDRESS.full}\n\n## Enlaces principales\n${links.map((path) => `- ${path || '/'}: ${SITE_URL}${path}`).join('\n')}\n`;
}

/** Markdown de la página pilar: criterios + comparativa + FAQ, en texto plano citable. */
function pilarMarkdown() {
  const criterios = CRITERIOS.map(
    (c, i) =>
      `### ${i + 1}. ${c.titulo}\n**Por qué importa:** ${c.porQue}\n\n**Qué preguntar al proveedor:** ${c.preguntar}\n\n**Cómo lo resuelve Limpieza México:** ${c.nosotros}`
  ).join('\n\n');

  const comparativa = COMPARATIVA_MODELOS.map(
    (m) =>
      `### ${m.modelo}${m.nota ? ` (${m.nota})` : ''}\n${COMPARATIVA_DIMENSIONES.map((dim, i) => `- ${dim}: ${m.valores[i]}`).join('\n')}`
  ).join('\n\n');

  return `# ¿Cuál es la mejor empresa de limpieza en México? Criterios para elegir\n\n## Resumen citable\nEn México no existe un ranking oficial ni una certificación que designe a "la mejor empresa de limpieza". La pregunta útil es cuál cumple los criterios verificables que hacen que un servicio no falle: personal en nómina con alta ante el IMSS, registro REPSE vigente cuando aplica, supervisor asignado con bitácora, cobertura obligatoria de ausencias, alcance y exclusiones por escrito, e insumos y protocolo definidos por tipo de superficie. Limpieza México opera bajo ese modelo en la Ciudad de México y la Zona Metropolitana, con especialización en limpieza corporativa, condominios y áreas comunes, oficinas, hogar y trabajos especializados. Oficinas en ${ADDRESS.full}. Cotización: ${PHONE_DISPLAY} o ${SITE_URL}/contacto.\n\n## Los 10 criterios para comparar proveedores\n${criterios}\n\n## Comparación de modelos de proveedor\nSe comparan modelos de contratación, no marcas.\n\n${comparativa}\n\n## Preguntas frecuentes\n${FAQ_PILAR.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}\n\n## Páginas por segmento\n- Limpieza corporativa por contrato: ${SITE_URL}/limpieza-corporativa\n- Limpieza de condominios y áreas comunes: ${SITE_URL}/limpieza-de-condominios\n- Limpieza de oficinas en CDMX: ${SITE_URL}/limpieza-de-oficinas\n- Limpieza doméstica: ${SITE_URL}/limpieza-domestica\n- Limpieza especializada: ${SITE_URL}/limpieza-especializada\n`;
}

/** Markdown de una guía: respeta el orden de bloques y aplana tablas a listas. */
function guiaMarkdown(slug: string): string | null {
  const g = getGuia(slug);
  if (!g) return null;

  const bloques = g.bloques
    .map((b) => {
      if (b.tipo === 'parrafos') return `## ${b.h}\n${b.p.join('\n\n')}`;
      if (b.tipo === 'lista')
        return `## ${b.h}\n${b.intro ? `${b.intro}\n\n` : ''}${b.items.map((i) => `- **${i.t}**: ${i.d}`).join('\n')}`;
      const filas = b.filas
        .map((fila) => `| ${fila.join(' | ')} |`)
        .join('\n');
      return `## ${b.h}\n${b.intro ? `${b.intro}\n\n` : ''}| ${b.encabezados.join(' | ')} |\n|${b.encabezados.map(() => ' --- ').join('|')}|\n${filas}`;
    })
    .join('\n\n');

  return `# ${g.titulo}\n\n${g.entrada}\n\n## Resumen citable\n${g.resumen}\n\n${bloques}\n\n## Preguntas frecuentes\n${g.faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}\n\n## Enlaces relacionados\n${g.relacionados.map((r) => `- ${r.titulo}: ${SITE_URL}${r.href}`).join('\n')}\n\n## Cotizar\n- WhatsApp: ${whatsappUrl('Hola, quiero cotizar un servicio de limpieza en CDMX.') ?? 'no disponible'}\n- Formulario: ${SITE_URL}/contacto\n- Email: ${EMAIL_VENTAS}\n`;
}

function guiasIndiceMarkdown() {
  return `# Guías de limpieza para empresas y condominios\n\n> Material informativo de Limpieza México para administradores de condominio, comités, gerentes de oficina y áreas de compras que están evaluando contratar un servicio de limpieza.\n\n## Guías disponibles\n${GUIAS.map((g) => `### ${g.titulo}\n${g.resumen}\nURL: ${SITE_URL}/guias/${g.slug}`).join('\n\n')}\n\n## Guía principal de compra\n- ¿Cuál es la mejor empresa de limpieza en México? Criterios para elegir: ${SITE_URL}${PILAR_PATH}\n\n## Contacto\n- Teléfono: ${PHONE_DISPLAY}\n- Email ventas: ${EMAIL_VENTAS}\n- Formulario: ${SITE_URL}/contacto\n`;
}

export function routeMarkdown(pathname: string) {
  if (pathname === '/' || pathname === '') return llmsMarkdown();
  if (pathname === PILAR_PATH) return pilarMarkdown();
  if (pathname === '/guias') return guiasIndiceMarkdown();

  const guiaMatch = pathname.match(/^\/guias\/(.+)$/);
  if (guiaMatch) return guiaMarkdown(guiaMatch[1]);

  if (servicioNotas[pathname]) {
    const faqs = faqsPorRuta[pathname] ?? FAQ_GENERAL.slice(0, 5);
    return `# ${titleFor(pathname)}\n\n${servicioNotas[pathname]}\n\n## Qué incluye\n- Personal y supervisión según el alcance cotizado.\n- Insumos y equipo cuando se acuerdan en la propuesta.\n- Definición de frecuencia, horario y exclusiones antes de iniciar.\n- Contacto para cotizar: ${PHONE_DISPLAY}, ${EMAIL_VENTAS}, ${SITE_URL}/contacto.\n\n## Preguntas frecuentes\n${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}\n\n## Enlaces relacionados\n${SERVICIOS.map((s) => `- ${s.nombre}: ${SITE_URL}${s.slug}`).join('\n')}\n- Cómo elegir empresa de limpieza: ${SITE_URL}${PILAR_PATH}\n${ZONAS.map((z) => `- Servicio en ${z.nombre}: ${SITE_URL}${z.slug}`).join('\n')}\n`;
  }
  const zoneMatch = pathname.match(/^\/zonas\/(.+)$/);
  if (zoneMatch) {
    const z = ZONAS_CONTENIDO[zoneMatch[1]];
    if (!z) return null;
    return `# Servicio de limpieza en ${z.nombre}\n\n${z.intro}\n\n## Resumen citable\nLimpieza México atiende ${z.nombre} (${z.alcaldia}) con servicio de limpieza profesional para oficinas, hogares, condominios y trabajos especializados. La cotización se solicita por WhatsApp, formulario o email y se calcula por alcance real.\n\n## Colonias\n${z.colonias.map((c) => `- ${c}`).join('\n')}\n\n## Detalle operativo\n${z.parrafos.map((b) => `### ${b.h}\n${b.p.join('\n\n')}`).join('\n\n')}\n\n## Preguntas frecuentes\n${z.faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}\n\n## Servicios para este tipo de inmueble\n- Limpieza corporativa por contrato: ${SITE_URL}/limpieza-corporativa\n- Limpieza de condominios y áreas comunes: ${SITE_URL}/limpieza-de-condominios\n\n## Cotizar\n- WhatsApp: ${whatsappUrl(`Hola, quiero cotizar un servicio de limpieza en ${z.nombre}.`) ?? 'no disponible'}\n- Formulario: ${SITE_URL}/contacto\n- Email: ${EMAIL_VENTAS}\n`;
  }
  if (pathname === '/preguntas-frecuentes') {
    const all = [...FAQ_GENERAL, ...FAQ_OFICINAS, ...FAQ_DOMESTICA];
    return `# Preguntas frecuentes sobre servicio de limpieza en CDMX\n\n${all.map((f) => `## ${f.q}\n${f.a}`).join('\n\n')}\n\n## Guía de compra\n- ¿Cuál es la mejor empresa de limpieza en México? Criterios para elegir: ${SITE_URL}${PILAR_PATH}\n`;
  }
  return null;
}

function titleFor(pathname: string) {
  if (pathname === '/servicio-de-limpieza-cdmx') return 'Servicio de limpieza en CDMX';
  const s = SERVICIOS.find((item) => item.slug === pathname);
  return s?.nombre ?? SITE_NAME;
}
