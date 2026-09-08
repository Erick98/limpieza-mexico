import Link from 'next/link';
import type { Metadata } from 'next';
import Cotizador from '@/components/cotizador/Cotizador';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { pageMetadata, faqLd, breadcrumbLd, serviceLd } from '@/lib/seo';
import { FAQ_DOMESTICA } from '@/lib/contenido';

const PATH = '/limpieza-domestica';

export const metadata: Metadata = pageMetadata({
  title: 'Limpieza doméstica CDMX',
  description:
    'Limpieza doméstica en CDMX para casas y departamentos, por visita o recurrente, y reclutamiento de personal de hogar verificado.',
  path: PATH,
  keywords: [
    'limpieza doméstica cdmx',
    'servicio de limpieza a casas',
    'personal doméstico cdmx',
    'limpieza de departamentos',
  ],
});

const MIGAS = [
  { name: 'Inicio', path: '/' },
  { name: 'Limpieza doméstica', path: PATH },
];

export default function LimpiezaDomestica() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(MIGAS),
          faqLd([...FAQ_DOMESTICA]),
          serviceLd({
            name: 'Limpieza doméstica y personal de hogar',
            description:
              'Limpieza de casas y departamentos por visita o recurrente, y reclutamiento de personal doméstico verificado en CDMX y Zona Metropolitana.',
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
            Limpieza doméstica en CDMX
          </h1>
          <p className="text-lg leading-relaxed text-[#1F1F25]/80">
            Servicio de limpieza para casa o departamento, por visita o recurrente, y
            reclutamiento de personal de hogar con verificación de antecedentes. Tú
            eliges qué esquema te conviene.
          </p>
        </div>
        <div className="scroll-mt-20">
          <Cotizador />
        </div>
      </section>

      <section className="border-y border-[#EDEDEA]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-4 text-[16px] leading-[1.75] text-[#1F1F25]/85">
          <h2 className="font-display text-3xl mb-3 text-[#1F1F25]">
            Dos esquemas distintos, y conviene entender cuál necesitas
          </h2>
          <p>
            El primero es el <strong>servicio por visita</strong>: mandamos personal a
            limpiar tu casa una o varias veces por semana, o de forma esporádica. Nosotros
            somos el patrón, nosotros damos de alta, pagamos prestaciones y respondemos por
            el trabajo. Tú pagas por el servicio y no adquieres ninguna obligación laboral.
            Es lo que conviene cuando necesitas pocas horas a la semana o cuando prefieres
            no administrar a nadie.
          </p>
          <p>
            El segundo es el <strong>reclutamiento de personal de planta</strong>: te
            presentamos candidatos ya verificados —identidad, domicilio y referencias
            laborales confirmadas— para que tú contrates directamente. Aquí la relación
            laboral queda entre esa persona y tú, con todo lo que implica: alta ante el
            IMSS bajo el régimen de personas trabajadoras del hogar, salario, prestaciones
            y aguinaldo. Conviene cuando necesitas a alguien de tiempo completo o casi.
          </p>
          <p>
            Vale la pena decirlo claro porque mucha gente lo descubre tarde: desde la
            reforma en materia de trabajo del hogar, dar de alta al personal doméstico ante
            el IMSS es obligatorio, no opcional. Si eliges el esquema de reclutamiento, te
            explicamos cómo hacer el alta y qué implica; no es complicado, pero hay que
            hacerlo.
          </p>

          <h2 className="font-display text-3xl pt-6 mb-3 text-[#1F1F25]">
            Qué incluye una visita de limpieza
          </h2>
          <p>
            Una visita estándar cubre las áreas de uso diario: recámaras, baños, cocina,
            sala y comedor. Eso incluye tender, sacudir superficies, aspirar o barrer y
            trapear pisos, limpieza a fondo de sanitarios, y lavado de trastes y
            superficies de cocina. Si hay ropa que lavar o planchar, se acuerda desde la
            cotización, porque consume una parte importante de la jornada y hay que
            considerarlo en el tiempo asignado.
          </p>
          <p>
            Lo que se cotiza aparte son los trabajos que no son de mantenimiento cotidiano:
            limpieza profunda de mudanza o entrega de departamento, lavado de tapicería o
            alfombra, limpieza de vidrios exteriores y limpieza posterior a una remodelación.
            Ese tipo de trabajo requiere más gente y a veces equipo específico, así que se
            maneja como servicio único.
          </p>

          <h2 className="font-display text-3xl pt-6 mb-3 text-[#1F1F25]">
            Confianza: el punto que de verdad importa
          </h2>
          <p>
            Meter a un desconocido a tu casa es una decisión distinta a contratar cualquier
            otro servicio, y tratarla con ligereza sería deshonesto. Por eso validamos
            identidad con documento oficial, comprobamos domicilio y contactamos referencias
            laborales previas antes de asignar o presentar a cualquier persona. Para
            servicios recurrentes procuramos que sea siempre la misma persona quien atienda
            tu domicilio: además de que conoce la casa, hace la relación mucho más segura y
            predecible para ambas partes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="font-display text-3xl mb-8">Servicios para el hogar</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: 'Limpieza por visita',
              d: 'Una o varias veces por semana, o de forma esporádica. Sin relación laboral para ti.',
            },
            {
              t: 'Limpieza profunda',
              d: 'Mudanza, entrega de departamento, post-remodelación o puesta a punto antes de un evento.',
            },
            {
              t: 'Reclutamiento de personal',
              d: 'Candidatos verificados para contratación directa: hogar, cocina, cuidado y apoyo doméstico.',
            },
          ].map((s) => (
            <article key={s.t} className="border border-[#EDEDEA] rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-2">{s.t}</h3>
              <p className="text-[15px] leading-relaxed text-[#1F1F25]/75">{s.d}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-[16px]">
          Si lo que buscas es servicio para una empresa, revisa{' '}
          <Link href="/limpieza-de-oficinas" className="font-semibold underline underline-offset-4">
            limpieza de oficinas
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
        <Faq faqs={[...FAQ_DOMESTICA]} titulo="Preguntas sobre limpieza doméstica" />
      </section>
    </>
  );
}
