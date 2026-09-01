import Link from 'next/link';
import type { Metadata } from 'next';
import Cotizador from '@/components/cotizador/Cotizador';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { pageMetadata, faqLd, breadcrumbLd, serviceLd } from '@/lib/seo';
import { FAQ_OFICINAS } from '@/lib/contenido';

const PATH = '/limpieza-de-oficinas';

export const metadata: Metadata = pageMetadata({
  title: 'Limpieza de oficinas CDMX',
  description:
    'Limpieza de oficinas y corporativos en CDMX: personal fijo con alta en IMSS, insumos incluidos, horario nocturno disponible y supervisión. Cotiza sin costo.',
  path: PATH,
  keywords: [
    'limpieza de oficinas cdmx',
    'servicio de limpieza para empresas',
    'limpieza corporativa',
    'empresa de limpieza para oficinas',
  ],
});

const MIGAS = [
  { name: 'Inicio', path: '/' },
  { name: 'Limpieza de oficinas', path: PATH },
];

const SEGMENTOS = [
  {
    t: 'Oficinas y corporativos',
    d: 'Limpieza diaria de áreas de trabajo, salas de junta, recepción y sanitarios, con limpieza profunda programada fuera de horario.',
  },
  {
    t: 'Condominios y edificios',
    d: 'Áreas comunes, lobby, estacionamientos, escaleras de emergencia, amenidades y manejo de residuos conforme al reglamento interno.',
  },
  {
    t: 'Escuelas y universidades',
    d: 'Aulas, laboratorios, sanitarios de alto tráfico y áreas deportivas, con protocolos de desinfección y horarios fuera de clase.',
  },
  {
    t: 'Restaurantes y cocinas',
    d: 'Desengrase de cocina, campanas y trampas de grasa, sanitización de superficies de contacto y limpieza de área de comensales.',
  },
  {
    t: 'Naves industriales y bodegas',
    d: 'Lavado mecanizado de pisos, limpieza en alturas de estructura y luminarias, recolección de merma y apoyo a auditorías.',
  },
  {
    t: 'Consultorios y clínicas',
    d: 'Protocolos de desinfección por áreas, separación de residuos y personal capacitado para entornos de atención a pacientes.',
  },
];

export default function LimpiezaOficinas() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(MIGAS),
          faqLd([...FAQ_OFICINAS]),
          serviceLd({
            name: 'Limpieza de oficinas y corporativos',
            description:
              'Servicio de limpieza para oficinas, condominios, escuelas, restaurantes y naves industriales en CDMX y Zona Metropolitana.',
            path: PATH,
            areaServed: ['Ciudad de México', 'Estado de México'],
          }),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={MIGAS} />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
        <div>
          <h1 className="font-display text-[32px] leading-tight sm:text-5xl mb-5">
            Limpieza de oficinas en CDMX
          </h1>
          <p className="text-lg leading-relaxed text-[#1F1F25]/80">
            Personal fijo o por evento para oficinas, condominios, escuelas, restaurantes e
            industria. Nosotros asumimos la relación laboral, la cobertura de ausencias y
            la supervisión; tú solo revisas que el resultado sea el acordado.
          </p>
        </div>
        <div className="scroll-mt-20">
          <Cotizador />
        </div>
      </section>

      <section className="border-y border-[#EDEDEA]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-4 text-[16px] leading-[1.75] text-[#1F1F25]/85">
          <h2 className="font-display text-3xl mb-3 text-[#1F1F25]">
            Por qué una empresa terceriza la limpieza
          </h2>
          <p>
            La razón que se dice en voz alta es el costo. La razón real, en la mayoría de
            los casos, es el riesgo laboral. Cuando una empresa contrata directamente al
            personal de limpieza, asume el alta ante el IMSS, las prestaciones, las
            incapacidades, el finiquito si la relación termina mal y la responsabilidad
            solidaria si esa persona se accidenta dentro del inmueble. Son obligaciones
            reales que rara vez están contempladas en el presupuesto de mantenimiento y
            que, cuando aparecen, aparecen todas juntas.
          </p>
          <p>
            El segundo motivo es la continuidad. En una plantilla propia de dos personas,
            una incapacidad deja el 50% del servicio sin cubrir y el problema es del área
            de administración. Bajo un contrato de servicio, la cobertura del relevo es
            obligación del proveedor. Es una diferencia que solo se aprecia el día que
            pasa, pero ese día pasa siempre.
          </p>
          <p>
            El tercero es el equipo. Una pulidora industrial, una restregadora o el equipo
            certificado para trabajo en alturas son inversiones que no tienen sentido para
            una empresa cuyo negocio es otra cosa. Bajo un contrato de servicio, ese equipo
            llega cuando se necesita y no ocupa bodega el resto del año.
          </p>

          <h2 className="font-display text-3xl pt-6 mb-3 text-[#1F1F25]">
            Cómo se dimensiona el operativo
          </h2>
          <p>
            El punto de partida es el rendimiento por persona y por jornada, que cambia
            radicalmente según la distribución del inmueble. Un piso de espacios abiertos
            se atiende mucho más rápido que uno del mismo tamaño lleno de privados, salas
            de junta y sanitarios. El número de baños es probablemente la variable que más
            mueve la cuenta, porque es el trabajo que más tiempo consume y el que más se
            nota cuando falla.
          </p>
          <p>
            A partir de ahí se define cuántas personas, en qué horario y con qué frecuencia.
            El esquema más común en corporativos es personal de planta durante el horario
            de operación —para mantener sanitarios y áreas comunes durante el día— más una
            limpieza profunda mensual o trimestral en fin de semana, cuando se puede mover
            mobiliario y trabajar pisos y alfombras sin interrumpir a nadie.
          </p>

          <h2 className="font-display text-3xl pt-6 mb-3 text-[#1F1F25]">
            Qué entregamos por escrito
          </h2>
          <p>
            Cada propuesta incluye el alcance detallado por área y frecuencia, el número de
            personas asignadas y su horario, los insumos y equipo cubiertos, lo que queda
            explícitamente fuera del alcance, y el mecanismo de supervisión con tiempos de
            respuesta ante una incidencia. Ese último punto es el que más se omite en el
            mercado y el que más problemas evita: define qué pasa y en cuánto tiempo cuando
            algo no se hizo bien.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="font-display text-3xl mb-8">Espacios que atendemos</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SEGMENTOS.map((s) => (
            <article key={s.t} className="border border-[#EDEDEA] rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-2">{s.t}</h3>
              <p className="text-[15px] leading-relaxed text-[#1F1F25]/75">{s.d}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-[16px]">
          ¿Buscas servicio para casa en vez de oficina? Revisa{' '}
          <Link href="/limpieza-domestica" className="font-semibold underline underline-offset-4">
            limpieza doméstica
          </Link>
          . Para trabajos puntuales como post-obra, alturas o sanitización, ve{' '}
          <Link href="/limpieza-especializada" className="font-semibold underline underline-offset-4">
            limpieza especializada
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
        <Faq faqs={[...FAQ_OFICINAS]} titulo="Preguntas sobre limpieza corporativa" />
      </section>
    </>
  );
}
