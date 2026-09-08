import { ADDRESS, COBERTURA, EMAIL_CONTACTO, EMAIL_VENTAS, PHONE_DISPLAY, SERVICIOS, SITE_NAME, SITE_URL, ZONAS, whatsappUrl } from './site';
import { FAQ_GENERAL, FAQ_OFICINAS, FAQ_DOMESTICA } from './contenido';
import { ZONAS_CONTENIDO } from './zonas';

const servicioNotas: Record<string, string> = {
  '/servicio-de-limpieza-cdmx': 'Servicio de limpieza profesional en CDMX para oficinas, casas, departamentos, condominios y trabajos especializados. La cotización se calcula por tipo de inmueble, superficie, frecuencia, horario, insumos y accesos.',
  '/limpieza-de-oficinas': 'Limpieza de oficinas en CDMX para corporativos, edificios, escuelas, restaurantes, clínicas, bodegas y condominios. Incluye dimensionamiento de personal, supervisión, cobertura de ausencias y alcance por escrito.',
  '/limpieza-domestica': 'Limpieza doméstica en CDMX para casas y departamentos, por visita o recurrente, y reclutamiento de personal de hogar verificado cuando el cliente prefiere contratación directa.',
  '/limpieza-especializada': 'Limpieza especializada en CDMX: post-obra, post-evento, sanitización, tratamiento técnico de pisos, alturas, cisternas y control de plagas. Se programa como proyecto con equipo específico.',
};

export function llmsMarkdown() {
  const links = ['', ...SERVICIOS.map((s) => s.slug), '/servicio-de-limpieza-cdmx', ...ZONAS.map((z) => z.slug), '/preguntas-frecuentes', '/nosotros', '/contacto', '/privacidad', '/terminos'];
  return `# ${SITE_NAME}\n\n> Limpieza México ofrece servicio de limpieza profesional en CDMX y Zona Metropolitana para oficinas, hogares, condominios y trabajos especializados, con cotización por proyecto y datos de contacto verificados.\n\n## Servicios\n${SERVICIOS.map((s) => `- ${s.nombre}: ${s.resumen} (${SITE_URL}${s.slug})`).join('\n')}\n- Servicio de limpieza en CDMX: cobertura en las 16 alcaldías y Zona Metropolitana (${SITE_URL}/servicio-de-limpieza-cdmx)\n\n## Zonas\n${ZONAS.map((z) => `- ${z.nombre}: ${z.alcaldia} (${SITE_URL}${z.slug})`).join('\n')}\n- Cobertura general: ${COBERTURA.join('; ')}.\n\n## Cómo cotizar\n- WhatsApp: ${whatsappUrl('Hola, quiero cotizar un servicio de limpieza en CDMX.') ?? 'no disponible'}\n- Formulario: ${SITE_URL}/contacto\n- Email comercial: ${EMAIL_VENTAS}\n- La cotización se calcula por tipo de inmueble, superficie, frecuencia, horario, insumos, equipo especializado y condiciones de acceso.\n\n## Contacto\n- Teléfono: ${PHONE_DISPLAY}\n- Email general: ${EMAIL_CONTACTO}\n- Email ventas: ${EMAIL_VENTAS}\n- Dirección: ${ADDRESS.full}\n\n## Enlaces principales\n${links.map((path) => `- ${path || '/'}: ${SITE_URL}${path}`).join('\n')}\n`;
}

export function routeMarkdown(pathname: string) {
  if (pathname === '/' || pathname === '') return llmsMarkdown();
  if (servicioNotas[pathname]) {
    const faqs = pathname === '/limpieza-de-oficinas' ? FAQ_OFICINAS : pathname === '/limpieza-domestica' ? FAQ_DOMESTICA : FAQ_GENERAL.slice(0, 5);
    return `# ${titleFor(pathname)}\n\n${servicioNotas[pathname]}\n\n## Qué incluye\n- Personal y supervisión según el alcance cotizado.\n- Insumos y equipo cuando se acuerdan en la propuesta.\n- Definición de frecuencia, horario y exclusiones antes de iniciar.\n- Contacto para cotizar: ${PHONE_DISPLAY}, ${EMAIL_VENTAS}, ${SITE_URL}/contacto.\n\n## Preguntas frecuentes\n${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}\n\n## Enlaces relacionados\n${SERVICIOS.map((s) => `- ${s.nombre}: ${SITE_URL}${s.slug}`).join('\n')}\n${ZONAS.map((z) => `- Servicio en ${z.nombre}: ${SITE_URL}${z.slug}`).join('\n')}\n`;
  }
  const zoneMatch = pathname.match(/^\/zonas\/(.+)$/);
  if (zoneMatch) {
    const z = ZONAS_CONTENIDO[zoneMatch[1]];
    if (!z) return null;
    return `# Servicio de limpieza en ${z.nombre}\n\n${z.intro}\n\n## Resumen citable\nLimpieza México atiende ${z.nombre} (${z.alcaldia}) con servicio de limpieza profesional para oficinas, hogares, condominios y trabajos especializados. La cotización se solicita por WhatsApp, formulario o email y se calcula por alcance real.\n\n## Colonias\n${z.colonias.map((c) => `- ${c}`).join('\n')}\n\n## Detalle operativo\n${z.parrafos.map((b) => `### ${b.h}\n${b.p.join('\n\n')}`).join('\n\n')}\n\n## Preguntas frecuentes\n${z.faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}\n\n## Cotizar\n- WhatsApp: ${whatsappUrl(`Hola, quiero cotizar un servicio de limpieza en ${z.nombre}.`) ?? 'no disponible'}\n- Formulario: ${SITE_URL}/contacto\n- Email: ${EMAIL_VENTAS}\n`;
  }
  if (pathname === '/preguntas-frecuentes') {
    const all = [...FAQ_GENERAL, ...FAQ_OFICINAS, ...FAQ_DOMESTICA];
    return `# Preguntas frecuentes sobre servicio de limpieza en CDMX\n\n${all.map((f) => `## ${f.q}\n${f.a}`).join('\n\n')}\n`;
  }
  return null;
}

function titleFor(pathname: string) {
  if (pathname === '/servicio-de-limpieza-cdmx') return 'Servicio de limpieza en CDMX';
  const s = SERVICIOS.find((item) => item.slug === pathname);
  return s?.nombre ?? SITE_NAME;
}
