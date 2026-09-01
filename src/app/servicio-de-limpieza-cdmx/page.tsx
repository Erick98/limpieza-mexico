import Link from 'next/link';
import type { Metadata } from 'next';
import Cotizador from '@/components/cotizador/Cotizador';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { pageMetadata, faqLd, breadcrumbLd, serviceLd } from '@/lib/seo';
import { ZONAS, SERVICIOS } from '@/lib/site';
import { FAQ_GENERAL } from '@/lib/contenido';

const PATH = '/servicio-de-limpieza-cdmx';

export const metadata: Metadata = pageMetadata({
  title: 'Servicio de limpieza CDMX',
  description:
    'Empresa de servicio de limpieza en CDMX para oficinas, casas y espacios especializados. Personal formal, insumos incluidos y cotización sin costo en 1 minuto.',
  path: PATH,
  keywords: [
    'servicio de limpieza cdmx',
    'empresa de limpieza cdmx',
    'servicio de limpieza ciudad de méxico',
    'limpieza profesional cdmx',
  ],
});

const MIGAS = [
  { name: 'Inicio', path: '/' },
  { name: 'Servicio de limpieza en CDMX', path: PATH },
];

const FAQ_CDMX = FAQ_GENERAL.slice(0, 6);

export default function LimpiezaCdmx() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(MIGAS),
          faqLd([...FAQ_CDMX]),
          serviceLd({
            name: 'Servicio de limpieza en Ciudad de México',
            description:
              'Servicio de limpieza profesional en las 16 alcaldías de la Ciudad de México para oficinas, corporativos, casas y espacios especializados.',
            path: PATH,
            areaServed: ['Ciudad de México'],
          }),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={MIGAS} />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
        <div>
          <h1 className="font-display text-[32px] leading-tight sm:text-5xl mb-5">
            Servicio de limpieza en CDMX
          </h1>
          <p className="text-lg leading-relaxed text-[#1F1F25]/80 mb-6">
            Atendemos las 16 alcaldías de la Ciudad de México con personal contratado
            formalmente, insumos incluidos y un supervisor asignado a cada cuenta. Servicio
            único o recurrente, en horario hábil o nocturno.
          </p>
          <Link
            href="#cotizar-cdmx"
            className="inline-flex rounded-lg bg-[#2C7A4B] px-6 py-3.5 font-semibold text-white hover:bg-[#235f3b] lg:hidden"
          >
            Cotizar ahora
          </Link>
        </div>
        <div id="cotizar-cdmx" className="scroll-mt-20">
          <Cotizador />
        </div>
      </section>

      <section className="border-y border-[#EDEDEA]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-4 text-[16px] leading-[1.75] text-[#1F1F25]/85">
          <h2 className="font-display text-3xl mb-3 text-[#1F1F25]">
            Cómo funciona la limpieza profesional en la Ciudad de México
          </h2>
          <p>
            La Ciudad de México tiene particularidades que cambian por completo cómo se
            organiza un servicio de limpieza. La primera es el tráfico: un equipo que
            atiende Santa Fe por la mañana no puede estar en el Centro a medio día sin
            perder dos horas en traslado. Por eso los operativos se arman por zona y no
            por conveniencia de agenda; es lo que permite que el personal llegue a tiempo
            y que el costo del traslado no termine inflando la tarifa.
          </p>
          <p>
            La segunda son los reglamentos de los edificios. En corporativos de Reforma,
            Polanco o Santa Fe la administración exige credencialización del personal,
            seguro vigente, horarios específicos para el uso de elevadores de carga y a
            veces certificados de manejo de residuos. Un proveedor que no está acostumbrado
            a esa burocracia se atora en la entrada el primer día. Nosotros gestionamos ese
            trámite como parte del arranque del servicio, no como un problema del cliente.
          </p>
          <p>
            La tercera es la calidad del agua y el polvo. En buena parte de la ciudad el
            agua es dura y deja sarro en mamparas, mingitorios y llaves; y la temporada
            seca mete una cantidad de polvo que obliga a subir la frecuencia del sacudido
            en zonas altas y difusores de aire acondicionado. Son detalles pequeños que
            marcan la diferencia entre una oficina que se ve limpia y una que solo está
            barrida.
          </p>

          <h2 className="font-display text-3xl pt-6 mb-3 text-[#1F1F25]">
            Qué incluye el servicio
          </h2>
          <p>
            Un servicio estándar incluye el personal, los insumos de limpieza, el material
            de consumo de sanitarios cuando se acuerda, el equipo necesario y la
            supervisión. Lo que no entra por defecto —y conviene definir desde la
            cotización— son los trabajos especializados: lavado de cisternas, limpieza de
            fachadas o vidrios exteriores con trabajo en alturas, desengrase profundo de
            cocina industrial, control de plagas y pulido o cristalizado de pisos. Todos
            esos los hacemos, pero se cotizan aparte porque requieren equipo y personal
            certificado distinto.
          </p>
          <p>
            Para oficinas, el esquema más común es personal fijo de lunes a viernes en
            horario de operación, con una limpieza profunda mensual fuera de horario. Para
            casas, lo habitual es una o dos visitas por semana. Para obra y eventos, es un
            servicio único con un equipo más grande concentrado en pocas horas.
          </p>

          <h2 className="font-display text-3xl pt-6 mb-3 text-[#1F1F25]">
            Cuánto cuesta y cómo se cotiza
          </h2>
          <p>
            No publicamos tarifario porque cualquier cifra fija sería falsa para la mayoría
            de los casos. El cálculo parte del rendimiento por persona: cuántos metros
            cuadrados puede atender bien una persona en una jornada, según el tipo de
            inmueble. Una oficina con espacios abiertos rinde mucho más por persona que un
            piso lleno de privados, baños y salas de junta. Sobre esa base se suman
            insumos, equipo especializado, frecuencia y el ajuste por horario nocturno o de
            fin de semana.
          </p>
          <p>
            La cotización es gratuita y no compromete a nada. Para proyectos grandes
            hacemos una visita de levantamiento sin costo, porque medir en sitio evita las
            sorpresas que después se convierten en conflictos de facturación.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="font-display text-3xl mb-6">Servicios disponibles en CDMX</h2>
        <div className="grid gap-5 md:grid-cols-3 mb-12">
          {SERVICIOS.map((s) => (
            <article key={s.slug} className="border border-[#EDEDEA] rounded-xl p-6">
              <h3 className="font-display text-xl mb-2">{s.nombre}</h3>
              <p className="text-[15px] text-[#1F1F25]/75 mb-4">{s.resumen}</p>
              <Link href={s.slug} className="font-semibold underline underline-offset-4">
                Ver servicio
              </Link>
            </article>
          ))}
        </div>

        <h2 className="font-display text-3xl mb-5">Zonas de la ciudad que atendemos</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ZONAS.map((z) => (
            <li key={z.slug}>
              <Link
                href={z.slug}
                className="block border border-[#EDEDEA] rounded-lg px-4 py-3.5 hover:border-[#9B9BA3]"
              >
                <span className="font-semibold block">Limpieza en {z.nombre}</span>
                <span className="text-sm text-[#9B9BA3]">{z.alcaldia}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
        <Faq faqs={[...FAQ_CDMX]} titulo="Preguntas sobre el servicio en CDMX" />
      </section>
    </>
  );
}
