import Link from 'next/link';
import type { Metadata } from 'next';
import Cotizador from '@/components/cotizador/Cotizador';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { pageMetadata, faqLd, breadcrumbLd, serviceLd } from '@/lib/seo';

const PATH = '/limpieza-especializada';

export const metadata: Metadata = pageMetadata({
  title: 'Limpieza especializada CDMX',
  description:
    'Limpieza especializada en CDMX: post-obra, post-evento, sanitización, pulido de pisos, trabajo en alturas, cisternas y control de plagas. Cotiza sin costo.',
  path: PATH,
  keywords: [
    'limpieza post obra cdmx',
    'sanitización cdmx',
    'pulido de pisos',
    'limpieza de cisternas',
    'limpieza en alturas',
  ],
});

const MIGAS = [
  { name: 'Inicio', path: '/' },
  { name: 'Limpieza especializada', path: PATH },
];

const FAQ_ESP = [
  {
    q: '¿Cuánto tarda una limpieza post-obra?',
    a: 'Depende de la superficie y de qué tan sucia quedó la obra, pero como referencia se trabaja con equipos grandes concentrados en pocos días, no con una persona durante semanas. La limpieza post-obra normalmente requiere dos pasadas: una gruesa para retirar escombro fino, polvo de yeso y residuos de material, y una fina de detalle en cancelería, vidrios, herrajes y pisos. Al cotizar te decimos cuántas jornadas estimamos.',
  },
  {
    q: '¿Trabajan en alturas con personal certificado?',
    a: 'Sí. El trabajo en alturas requiere personal capacitado, arnés, líneas de vida y los permisos correspondientes conforme a la NOM-009-STPS. No es un servicio que se improvise: si un proveedor te ofrece limpiar una fachada sin mencionar certificación ni seguro, ahí hay un riesgo que terminas asumiendo tú como propietario.',
  },
  {
    q: '¿La sanitización deja residuos o hay que desalojar el espacio?',
    a: 'Se aplica con equipo de nebulización o aspersión electrostática y se recomienda un tiempo de ventilación antes de reocupar el espacio, que varía según el producto usado. Por eso lo habitual es programarla en horario nocturno o fin de semana, para que el espacio esté listo cuando la gente regrese. Entregamos constancia del servicio realizado.',
  },
  {
    q: '¿Cada cuánto debe lavarse una cisterna?',
    a: 'La recomendación general es al menos dos veces al año, y es un requisito que muchos condominios y establecimientos deben acreditar. El servicio incluye vaciado, retiro de sedimentos, cepillado, desinfección y análisis posterior según el alcance contratado.',
  },
  {
    q: '¿El pulido de pisos se puede hacer con la oficina operando?',
    a: 'No es lo recomendable. El pulido, cristalizado o sellado requiere despejar el área, genera ruido y necesita tiempo de secado. Se programa en fin de semana o en horario nocturno. Es justo el tipo de trabajo que conviene calendarizar junto con la limpieza profunda periódica.',
  },
];

const SERVICIOS_ESP = [
  {
    t: 'Limpieza post-obra y post-remodelación',
    d: 'Retiro de residuos finos, polvo de yeso y adhesivos, detallado de cancelería, vidrios y herrajes, y entrega del inmueble listo para ocupar.',
  },
  {
    t: 'Limpieza post-evento',
    d: 'Recuperación del espacio después de eventos corporativos o sociales, con equipos que trabajan de madrugada para entregar el inmueble al día siguiente.',
  },
  {
    t: 'Sanitización y desinfección',
    d: 'Aplicación por nebulización o aspersión electrostática en oficinas, consultorios, escuelas y flotillas, con constancia del servicio.',
  },
  {
    t: 'Tratamiento técnico de pisos',
    d: 'Pulido, cristalizado y sellado de mármol, granito y terrazo; lavado mecanizado y sellado epóxico en piso industrial.',
  },
  {
    t: 'Trabajo en alturas y fachadas',
    d: 'Limpieza de vidrio exterior, fachada y estructura con personal certificado, arnés y líneas de vida conforme a normativa.',
  },
  {
    t: 'Cisternas y control de plagas',
    d: 'Lavado y desinfección de cisternas y tinacos, y control de plagas con productos autorizados por COFEPRIS.',
  },
];

export default function LimpiezaEspecializada() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(MIGAS),
          faqLd(FAQ_ESP),
          serviceLd({
            name: 'Limpieza especializada y mantenimiento',
            description:
              'Servicios especializados de limpieza: post-obra, post-evento, sanitización, tratamiento de pisos, trabajo en alturas, cisternas y control de plagas.',
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
            Limpieza especializada en CDMX
          </h1>
          <p className="text-lg leading-relaxed text-[#1F1F25]/80">
            Trabajos que no entran en la limpieza cotidiana: post-obra, post-evento,
            sanitización, tratamiento de pisos, alturas, cisternas y control de plagas.
            Equipo y personal certificado para cada caso.
          </p>
        </div>
        <div className="scroll-mt-20">
          <Cotizador />
        </div>
      </section>

      <section className="border-y border-[#EDEDEA]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-4 text-[16px] leading-[1.75] text-[#1F1F25]/85">
          <h2 className="font-display text-3xl mb-3 text-[#1F1F25]">
            Por qué estos servicios se cotizan aparte
          </h2>
          <p>
            La limpieza de mantenimiento y la limpieza especializada son oficios distintos
            aunque compartan nombre. El mantenimiento es un trabajo continuo, con la misma
            gente, el mismo horario y un alcance repetitivo. Lo especializado es un
            proyecto: tiene una fecha, un objetivo concreto, requiere equipo específico y
            muchas veces personal con certificación —trabajo en alturas, manejo de
            químicos, aplicación de plaguicidas autorizados—. Meter eso en una tarifa
            mensual de limpieza general es cómo terminan las cotizaciones que después no
            cuadran.
          </p>
          <p>
            El caso más claro es la limpieza post-obra. Parece "limpiar más fuerte", pero
            no lo es: el polvo de yeso y cemento se comporta distinto, se mete en cada
            rendija y obliga a repasar el espacio varias veces conforme se va asentando. Un
            departamento que se limpió una sola vez después de obra amanece con polvo al
            día siguiente. Por eso el trabajo se planea en dos etapas —gruesa y de
            detalle— y se entrega hasta que el espacio pasa la revisión.
          </p>
          <p>
            Algo parecido pasa con los pisos. Pulir mármol o cristalizar un piso pétreo es
            un trabajo abrasivo que cambia físicamente la superficie; hecho mal, deja
            marcas que después cuestan mucho más de corregir. Requiere maquinaria adecuada,
            los abrasivos correctos para cada material y alguien que sepa leer qué tipo de
            piedra tiene enfrente.
          </p>

          <h2 className="font-display text-3xl pt-6 mb-3 text-[#1F1F25]">
            Cómo se programa un trabajo especializado
          </h2>
          <p>
            Casi todos estos servicios se hacen fuera del horario de operación: de noche,
            en fin de semana o durante un cierre programado. Eso implica coordinar accesos
            con la administración del edificio, permisos de elevador de carga y avisos a
            seguridad. Para proyectos grandes hacemos una visita previa sin costo, porque
            el presupuesto depende de variables que no se pueden estimar por teléfono: qué
            tipo de piso es realmente, a qué altura está la fachada, cuánta merma hay que
            retirar y por dónde se puede sacar.
          </p>
          <p>
            Si tu necesidad combina mantenimiento continuo y trabajos especializados
            periódicos —que es el caso de la mayoría de los corporativos y condominios— lo
            eficiente es contratar ambos en un mismo calendario anual. Sale mejor y evita
            estar buscando proveedor cada vez.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="font-display text-3xl mb-8">Servicios especializados</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS_ESP.map((s) => (
            <article key={s.t} className="border border-[#EDEDEA] rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-2">{s.t}</h3>
              <p className="text-[15px] leading-relaxed text-[#1F1F25]/75">{s.d}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-[16px]">
          Para servicio continuo revisa{' '}
          <Link href="/limpieza-de-oficinas" className="font-semibold underline underline-offset-4">
            limpieza de oficinas
          </Link>{' '}
          o{' '}
          <Link href="/limpieza-domestica" className="font-semibold underline underline-offset-4">
            limpieza doméstica
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
        <Faq faqs={FAQ_ESP} titulo="Preguntas sobre servicios especializados" />
      </section>
    </>
  );
}
