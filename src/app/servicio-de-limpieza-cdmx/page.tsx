import Link from 'next/link';
import type { Metadata } from 'next';
import Cotizador from '@/components/cotizador/Cotizador';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SectionIntro from '@/components/marketing/SectionIntro';
import TrustPanel from '@/components/marketing/TrustPanel';
import { pageMetadata, faqLd, breadcrumbLd, serviceLd } from '@/lib/seo';
import { ZONAS, SERVICIOS } from '@/lib/site';
import { FAQ_GENERAL } from '@/lib/contenido';

const PATH = '/servicio-de-limpieza-cdmx';

export const metadata: Metadata = pageMetadata({
  title: 'Servicio de limpieza CDMX',
  description:
    'Servicio de limpieza en CDMX para oficinas, casas y espacios especializados. Personal formal, insumos incluidos y cotización sin costo en 1 minuto.',
  path: PATH,
  keywords: ['servicio de limpieza cdmx', 'empresa de limpieza cdmx', 'servicio de limpieza ciudad de méxico', 'limpieza profesional cdmx'],
});

const MIGAS = [{ name: 'Inicio', path: '/' }, { name: 'Servicio de limpieza en CDMX', path: PATH }];
const FAQ_CDMX = FAQ_GENERAL.slice(0, 6);

export default function LimpiezaCdmx() {
  return (
    <>
      <JsonLd data={[breadcrumbLd(MIGAS), faqLd([...FAQ_CDMX]), serviceLd({ name: 'Servicio de limpieza en Ciudad de México', description: 'Servicio de limpieza profesional en las 16 alcaldías de la Ciudad de México para oficinas, corporativos, casas y espacios especializados.', path: PATH, areaServed: ['Ciudad de México'] })]} />

      <div className="lm-container pt-8"><Breadcrumbs items={MIGAS} /></div>

      <section className="lm-container grid gap-10 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <p className="lm-chip">Intención principal · CDMX</p>
          <h1 className="mt-5 font-display text-[3rem] leading-[0.98] tracking-[-0.045em] text-[#101014] sm:text-6xl">Servicio de limpieza en CDMX</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#1F1F25]/78">
            Atendemos las 16 alcaldías de la Ciudad de México con limpieza profesional para oficinas, casas, departamentos, condominios y proyectos especializados. La cotización se arma por superficie, frecuencia, horario, insumos y condiciones de acceso.
          </p>
          <p className="mt-4 max-w-2xl rounded-2xl border border-black/10 bg-white p-5 text-[15px] leading-7 text-[#1F1F25]/72">
            Resumen para personas y agentes: Limpieza México es una empresa de servicio de limpieza en CDMX y Zona Metropolitana. Para cotizar, comparte tipo de inmueble, tamaño aproximado, frecuencia, zona y datos de contacto por WhatsApp o formulario.
          </p>
          <Link href="#cotizar-cdmx" className="mt-7 inline-flex lm-button-primary lg:hidden">Cotizar ahora</Link>
        </div>
        <div id="cotizar-cdmx" className="scroll-mt-24"><Cotizador /></div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="lm-container grid gap-12 py-16 lg:grid-cols-[1fr_0.85fr]">
          <div className="lm-prose max-w-3xl">
            <h2>Cómo funciona la limpieza profesional en la Ciudad de México</h2>
            <p>La Ciudad de México tiene particularidades que cambian por completo cómo se organiza un servicio de limpieza. La primera es el tráfico: un equipo que atiende Santa Fe por la mañana no puede estar en el Centro a medio día sin perder dos horas en traslado. Por eso los operativos se arman por zona y no por conveniencia de agenda; es lo que permite que el personal llegue a tiempo y que el costo del traslado no termine inflando la tarifa.</p>
            <p>La segunda son los reglamentos de los edificios. En corporativos de Reforma, Polanco o Santa Fe la administración exige credencialización del personal, seguro vigente, horarios específicos para el uso de elevadores de carga y a veces certificados de manejo de residuos. Un proveedor que no está acostumbrado a esa burocracia se atora en la entrada el primer día. Nosotros gestionamos ese trámite como parte del arranque del servicio, no como un problema del cliente.</p>
            <p>La tercera es la calidad del agua y el polvo. En buena parte de la ciudad el agua es dura y deja sarro en mamparas, mingitorios y llaves; y la temporada seca mete una cantidad de polvo que obliga a subir la frecuencia del sacudido en zonas altas y difusores de aire acondicionado. Son detalles pequeños que marcan la diferencia entre una oficina que se ve limpia y una que solo está barrida.</p>
            <h2>Qué incluye el servicio</h2>
            <p>Un servicio estándar incluye el personal, los insumos de limpieza, el material de consumo de sanitarios cuando se acuerda, el equipo necesario y la supervisión. Lo que no entra por defecto —y conviene definir desde la cotización— son los trabajos especializados: lavado de cisternas, limpieza de fachadas o vidrios exteriores con trabajo en alturas, desengrase profundo de cocina industrial, control de plagas y pulido o cristalizado de pisos.</p>
            <p>Para oficinas, el esquema más común es personal fijo de lunes a viernes en horario de operación, con una limpieza profunda mensual fuera de horario. Para casas, lo habitual es una o dos visitas por semana. Para obra y eventos, es un servicio único con un equipo más grande concentrado en pocas horas.</p>
            <h2>Cuánto cuesta y cómo se cotiza</h2>
            <p>No publicamos tarifario porque cualquier cifra fija sería falsa para la mayoría de los casos. El cálculo parte del rendimiento por persona: cuántos metros cuadrados puede atender bien una persona en una jornada, según el tipo de inmueble. Una oficina con espacios abiertos rinde mucho más por persona que un piso lleno de privados, baños y salas de junta. Sobre esa base se suman insumos, equipo especializado, frecuencia y el ajuste por horario nocturno o de fin de semana.</p>
            <p>La cotización es gratuita y no compromete a nada. Para proyectos grandes hacemos una visita de levantamiento sin costo, porque medir en sitio evita las sorpresas que después se convierten en conflictos de facturación.</p>
          </div>
          <div className="space-y-5 lg:sticky lg:top-28">
            <TrustPanel compact />
            <div className="rounded-[1.75rem] bg-[#101014] p-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C9A24A]">Keyword objetivo</p><p className="mt-3 text-2xl font-display">servicio de limpieza CDMX</p><p className="mt-2 text-sm leading-6 text-white/70">Página diseñada para responder intención comercial, no solo navegación interna.</p></div>
          </div>
        </div>
      </section>

      <section className="lm-container py-16">
        <SectionIntro eyebrow="Servicios y zonas" title="Rutas internas que ayudan a elegir sin perder autoridad SEO." />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="lm-card p-7"><h2 className="font-display text-3xl">Servicios disponibles en CDMX</h2><div className="mt-5 grid gap-3">{SERVICIOS.map((s) => <Link key={s.slug} href={s.slug} className="rounded-2xl border border-black/10 p-4 hover:border-[#2F5D50]/50"><span className="block font-bold">{s.nombre}</span><span className="mt-1 block text-sm leading-6 text-[#1F1F25]/65">{s.resumen}</span></Link>)}</div></div>
          <div className="lm-card p-7"><h2 className="font-display text-3xl">Zonas de atención frecuente</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{ZONAS.map((z) => <Link key={z.slug} href={z.slug} className="rounded-2xl border border-black/10 p-4 hover:border-[#2F5D50]/50"><span className="block font-bold">{z.nombre}</span><span className="mt-1 block text-sm text-[#1F1F25]/60">{z.alcaldia}</span></Link>)}</div></div>
        </div>
      </section>

      <section className="lm-container max-w-4xl pb-16"><Faq faqs={[...FAQ_CDMX]} titulo="Preguntas sobre el servicio en CDMX" /></section>
    </>
  );
}
