import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Cotizador from '@/components/cotizador/Cotizador';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TrustPanel from '@/components/marketing/TrustPanel';
import { pageMetadata, faqLd, breadcrumbLd, serviceLd } from '@/lib/seo';
import { FAQ_OFICINAS } from '@/lib/contenido';

const PATH = '/limpieza-de-oficinas';

export const metadata: Metadata = pageMetadata({
  title: 'Limpieza de oficinas CDMX',
  description:
    'Limpieza de oficinas en CDMX: personal formal, insumos incluidos, horario nocturno y supervisión. Cotiza sin costo.',
  path: PATH,
  keywords: ['limpieza de oficinas cdmx', 'servicio de limpieza para empresas', 'limpieza corporativa', 'empresa de limpieza para oficinas'],
});

const MIGAS = [{ name: 'Inicio', path: '/' }, { name: 'Limpieza de oficinas', path: PATH }];

const SEGMENTOS = [
  ['Oficinas y corporativos', 'Limpieza diaria de áreas de trabajo, salas de junta, recepción y sanitarios, con limpieza profunda programada fuera de horario.'],
  ['Condominios y edificios', 'Áreas comunes, lobby, estacionamientos, escaleras de emergencia, amenidades y manejo de residuos conforme al reglamento interno.'],
  ['Escuelas y universidades', 'Aulas, laboratorios, sanitarios de alto tráfico y áreas deportivas, con protocolos de desinfección y horarios fuera de clase.'],
  ['Restaurantes y cocinas', 'Desengrase de cocina, campanas y trampas de grasa, sanitización de superficies de contacto y limpieza de área de comensales.'],
  ['Naves industriales y bodegas', 'Lavado mecanizado de pisos, limpieza en alturas de estructura y luminarias, recolección de merma y apoyo a auditorías.'],
  ['Consultorios y clínicas', 'Protocolos de desinfección por áreas, separación de residuos y personal capacitado para entornos de atención a pacientes.'],
] as const;

export default function LimpiezaOficinas() {
  return (
    <>
      <JsonLd data={[breadcrumbLd(MIGAS), faqLd([...FAQ_OFICINAS]), serviceLd({ name: 'Limpieza de oficinas y corporativos', description: 'Servicio de limpieza para oficinas, condominios, escuelas, restaurantes y naves industriales en CDMX y Zona Metropolitana.', path: PATH, areaServed: ['Ciudad de México', 'Estado de México'] })]} />
      <div className="lm-container pt-8"><Breadcrumbs items={MIGAS} /></div>

      <section className="lm-container grid gap-10 pb-14 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div>
          <p className="lm-chip">Empresas · Corporativos · Condominios</p>
          <h1 className="mt-5 font-display text-[3rem] leading-[0.98] tracking-[-0.045em] text-[#101014] sm:text-6xl">Limpieza de oficinas en CDMX</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#1F1F25]/78">Personal fijo o por evento para oficinas, condominios, escuelas, restaurantes e industria. Nosotros asumimos la relación laboral, la cobertura de ausencias y la supervisión; tú revisas que el resultado sea el acordado.</p>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_70px_rgba(31,31,37,0.08)]">
            <Image src="/images/cta_modern_building.png" alt="Atrio corporativo limpio como referencia ambiental de oficina" width={768} height={768} sizes="(max-width: 1024px) 100vw, 48vw" className="aspect-[16/9] w-full object-cover" />
          </div>
        </div>
        <div className="scroll-mt-24"><Cotizador /></div>
      </section>

      <section className="border-y border-black/10 bg-white"><div className="lm-container grid gap-12 py-16 lg:grid-cols-[1fr_0.82fr]"><div className="lm-prose max-w-3xl">
        <h2>Por qué una empresa terceriza la limpieza</h2>
        <p>La razón que se dice en voz alta es el costo. La razón real, en la mayoría de los casos, es el riesgo laboral. Cuando una empresa contrata directamente al personal de limpieza, asume el alta ante el IMSS, las prestaciones, las incapacidades, el finiquito si la relación termina mal y la responsabilidad solidaria si esa persona se accidenta dentro del inmueble. Son obligaciones reales que rara vez están contempladas en el presupuesto de mantenimiento y que, cuando aparecen, aparecen todas juntas.</p>
        <p>El segundo motivo es la continuidad. En una plantilla propia de dos personas, una incapacidad deja el 50% del servicio sin cubrir y el problema es del área de administración. Bajo un contrato de servicio, la cobertura del relevo es obligación del proveedor. Es una diferencia que solo se aprecia el día que pasa, pero ese día pasa siempre.</p>
        <p>El tercero es el equipo. Una pulidora industrial, una restregadora o el equipo certificado para trabajo en alturas son inversiones que no tienen sentido para una empresa cuyo negocio es otra cosa. Bajo un contrato de servicio, ese equipo llega cuando se necesita y no ocupa bodega el resto del año.</p>
        <h2>Cómo se dimensiona el operativo</h2>
        <p>El punto de partida es el rendimiento por persona y por jornada, que cambia radicalmente según la distribución del inmueble. Un piso de espacios abiertos se atiende mucho más rápido que uno del mismo tamaño lleno de privados, salas de junta y sanitarios. El número de baños es probablemente la variable que más mueve la cuenta, porque es el trabajo que más tiempo consume y el que más se nota cuando falla.</p>
        <p>A partir de ahí se define cuántas personas, en qué horario y con qué frecuencia. El esquema más común en corporativos es personal de planta durante el horario de operación —para mantener sanitarios y áreas comunes durante el día— más una limpieza profunda mensual o trimestral en fin de semana, cuando se puede mover mobiliario y trabajar pisos y alfombras sin interrumpir a nadie.</p>
        <h2>Qué entregamos por escrito</h2>
        <p>Cada propuesta incluye el alcance detallado por área y frecuencia, el número de personas asignadas y su horario, los insumos y equipo cubiertos, lo que queda explícitamente fuera del alcance, y el mecanismo de supervisión con tiempos de respuesta ante una incidencia. Ese último punto es el que más se omite en el mercado y el que más problemas evita: define qué pasa y en cuánto tiempo cuando algo no se hizo bien.</p>
      </div><div className="space-y-5 lg:sticky lg:top-28"><TrustPanel compact /><div className="rounded-[1.75rem] bg-[#101014] p-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C9A24A]">B2B</p><p className="mt-3 text-sm leading-6 text-white/75">Pensado para gerentes de oficina, administración de inmuebles y responsables de facilities que necesitan trazabilidad, no improvisación.</p></div></div></div></section>

      <section className="lm-container py-16"><h2 className="font-display text-4xl text-[#101014]">Espacios que atendemos</h2><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{SEGMENTOS.map(([t, d]) => <article key={t} className="lm-card p-6"><h3 className="font-display text-2xl text-[#101014]">{t}</h3><p className="mt-3 text-[15px] leading-7 text-[#1F1F25]/70">{d}</p></article>)}</div><p className="mt-10 text-[16px]">¿Buscas servicio para casa? Revisa <Link href="/limpieza-domestica" className="font-bold underline underline-offset-4">limpieza doméstica</Link>. Para trabajos puntuales como post-obra, alturas o sanitización, ve <Link href="/limpieza-especializada" className="font-bold underline underline-offset-4">limpieza especializada</Link>.</p></section>
      <section className="lm-container max-w-4xl pb-16"><Faq faqs={[...FAQ_OFICINAS]} titulo="Preguntas sobre limpieza corporativa" /></section>
    </>
  );
}
