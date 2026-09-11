import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Cotizador from '@/components/cotizador/Cotizador';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TrustPanel from '@/components/marketing/TrustPanel';
import { pageMetadata, faqLd, breadcrumbLd, serviceLd } from '@/lib/seo';
import { FAQ_CORPORATIVA } from '@/lib/contenido';

/**
 * DIFERENCIA DE INTENCIÓN CON /limpieza-de-oficinas (importante, no borrar):
 *
 *  - /limpieza-de-oficinas  → intención transaccional LOCAL. "limpieza de oficinas cdmx".
 *    Un inmueble, un piso, una sucursal. El que busca quiere cotizar rápido.
 *  - /limpieza-corporativa  → intención B2B de CONTRATO. Facilities, compras, multi-sitio,
 *    turnos, documentación de alta de proveedor, anexos por sede, comparativos.
 *
 * Ambas se enlazan entre sí con anchor text distinto para que Google entienda que son
 * dos intenciones y no dos intentos de posicionar la misma palabra.
 */

const PATH = '/limpieza-corporativa';

export const metadata: Metadata = pageMetadata({
  title: 'Limpieza corporativa por contrato',
  description:
    'Contrato de limpieza para corporativos y sucursales en CDMX: turnos nocturnos, supervisión, anexos por sede y documentación para alta de proveedor.',
  path: PATH,
  keywords: [
    'limpieza corporativa',
    'contrato de limpieza para empresas',
    'empresa de limpieza corporativa cdmx',
    'limpieza de corporativos multi-sitio',
    'proveedor de limpieza para empresas',
  ],
});

const MIGAS = [
  { name: 'Inicio', path: '/' },
  { name: 'Limpieza corporativa', path: PATH },
];

const MODALIDADES = [
  [
    'Limpieza diaria en operación',
    'Mantiene el espacio mientras se trabaja: sanitarios, cocinetas, recepción, salas de junta y áreas de trabajo, con personal asignado en el horario de operación.',
  ],
  [
    'Limpieza profunda programada',
    'Lo que no se puede hacer con gente en el piso: mover mobiliario, tratar pisos y alfombras, cancelería alta, sillas, difusores y luminarias. Mensual o trimestral, en fin de semana.',
  ],
  [
    'Turno nocturno y de madrugada',
    'El grueso del trabajo en corporativos. Requiere gestionar con la administración del edificio la ventana de elevador de carga y la ruta de salida de residuos.',
  ],
  [
    'Cobertura de picos y eventos',
    'Juntas de consejo, visitas de auditoría, mudanzas internas o cambios de layout. Se cotiza como servicio adicional sobre el contrato base, no se improvisa con el equipo de planta.',
  ],
  [
    'Áreas técnicas y sensibles',
    'Site o cuarto de comunicaciones, comedor, laboratorio, archivo y zonas de acceso restringido. Van como anexo del alcance con protocolo escrito y acceso acompañado.',
  ],
  [
    'Red de sucursales',
    'Contrato marco con anexo por sede: cada una con su alcance, plantilla y horario, con supervisión, facturación y punto de contacto consolidados.',
  ],
] as const;

const COTIZACION_VARIABLES = [
  ['Superficie y distribución', 'Un piso abierto se atiende mucho más rápido que uno del mismo tamaño lleno de privados y salas de junta.'],
  ['Número de sanitarios', 'Es la variable que más mueve la cuenta: consume la mayor parte de la jornada y es donde la falla se nota primero.'],
  ['Colaboradores en sitio', 'Importa por el uso de sanitarios y cocinetas, no por el número de escritorios. El esquema híbrido cambia el cálculo.'],
  ['Turnos y frecuencia', 'Diario en operación, nocturno, fin de semana o una combinación. El horario nocturno se cotiza distinto.'],
  ['Áreas especiales', 'Comedor, site, laboratorio, piso técnico o archivo se cotizan aparte porque cambian el tiempo y el protocolo.'],
  ['Número de sedes', 'Varias sedes consolidan supervisión y facturación, pero cada una requiere su propio dimensionamiento.'],
] as const;

export default function LimpiezaCorporativa() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(MIGAS),
          faqLd([...FAQ_CORPORATIVA]),
          serviceLd({
            name: 'Limpieza corporativa por contrato',
            description:
              'Contrato de limpieza para corporativos, plantas administrativas y redes de sucursales en CDMX y Zona Metropolitana: turnos diurno y nocturno, limpieza profunda programada, supervisión con bitácora, protocolos para áreas sensibles y anexos por sede.',
            path: PATH,
            areaServed: ['Ciudad de México', 'Estado de México'],
          }),
        ]}
      />

      <div className="lm-container pt-8">
        <Breadcrumbs items={MIGAS} />
      </div>

      <section className="lm-container grid gap-10 pb-14 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div>
          <p className="lm-chip">Corporativo · Facilities · Compras</p>
          <h1 className="mt-5 font-display text-[2.9rem] leading-[1] tracking-[-0.045em] text-[#101014] sm:text-6xl">
            Limpieza corporativa por contrato
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#1F1F25]/78">
            Para corporativos, plantas administrativas y redes de sucursales que necesitan un
            contrato con alcance escrito, turnos definidos, supervisión trazable y documentación en
            regla para el alta de proveedor.
          </p>
          <p className="mt-5 max-w-2xl rounded-2xl border border-black/10 bg-white p-5 text-[15px] leading-7 text-[#1F1F25]/75">
            <strong className="font-bold text-[#101014]">Resumen citable:</strong> Limpieza México
            presta servicio de limpieza corporativa por contrato en la Ciudad de México y la Zona
            Metropolitana. El esquema incluye limpieza diaria en operación, limpieza profunda
            programada fuera de horario, turnos nocturnos y de fin de semana, supervisión con
            bitácora, protocolos escritos para áreas sensibles y contrato marco con anexo por sede
            cuando hay varias ubicaciones. Se cotiza por superficie, número de sanitarios, personal
            en sitio, turnos y frecuencia.
          </p>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_70px_rgba(31,31,37,0.08)]">
            <Image
              src="/images/service_office.png"
              alt="Área de trabajo corporativa ordenada como referencia ambiental del servicio"
              width={768}
              height={768}
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </div>
        <div className="scroll-mt-24">
          <Cotizador />
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="lm-container grid gap-12 py-16 lg:grid-cols-[1fr_0.82fr]">
          <div className="lm-prose max-w-3xl">
            <h2 className="!mt-0">Qué cambia cuando la limpieza pasa a ser un contrato</h2>
            <p>
              Contratar limpieza para una oficina y firmar un contrato corporativo son dos
              decisiones distintas, aunque el trabajo físico se parezca. En el primer caso alguien
              necesita que el espacio esté limpio. En el segundo, un área de facilities o de
              compras necesita además que el servicio sea auditable: que exista un alcance contra
              el cual evaluar, un responsable con nombre, documentación en regla para el alta de
              proveedor y una forma de escalar cuando algo no se cumple.
            </p>
            <p>
              Esa diferencia se nota en lo que se negocia. En un contrato corporativo la discusión
              no es el precio por metro: es qué entra en el alcance base, qué se cobra aparte, con
              cuánta anticipación se puede ajustar la plantilla si la empresa cambia a esquema
              híbrido, y qué pasa el día que el servicio falla. Todo eso se define antes de firmar,
              porque después ya no es una conversación: es un reclamo.
            </p>
            <h2>Diaria, profunda y por turnos</h2>
            <p>
              La limpieza diaria mantiene el espacio en operación y es la que sostiene la
              percepción del servicio: sanitarios, cocinetas, recepción y áreas de trabajo. La
              limpieza profunda ataca lo que no se puede hacer con gente trabajando —mover
              mobiliario, tratar pisos y alfombras, lavar cancelería alta, sillas y difusores— y se
              programa en fin de semana con frecuencia mensual o trimestral.
            </p>
            <p>
              El error más frecuente es asumir que la profunda está incluida en el contrato diario.
              Casi nunca lo está, en ningún proveedor, y es la causa habitual de que un piso se vea
              deteriorado a los ocho meses con el servicio &ldquo;funcionando bien&rdquo;. Conviene
              cotizarla desde el inicio y dejar el calendario acordado, aunque se ejecute tres
              veces al año.
            </p>
            <h2>Varias sedes, un solo contrato</h2>
            <p>
              Cuando hay más de una ubicación, el esquema que funciona es un contrato marco con un
              anexo por sede. Cada anexo tiene su alcance, su plantilla y su horario, porque una
              sucursal de 120 m² y un corporativo de 2,000 m² no comparten operativo. Lo que se
              consolida es lo administrativo: una facturación, un punto de contacto y un esquema de
              supervisión común, con reporte por sede.
            </p>
            <p>
              Operamos en las 16 alcaldías de la Ciudad de México y en la Zona Metropolitana del
              Valle de México, incluidos Naucalpan, Huixquilucan, Tlalnepantla, Ecatepec y
              Cuautitlán. Si tu red tiene sedes fuera de esa cobertura, lo decimos al cotizar en
              lugar de comprometer algo que después se subcontrataría sin control.
            </p>
            <h2>Áreas sensibles: protocolo escrito, no criterio del día</h2>
            <p>
              El site o cuarto de comunicaciones se atiende con limpieza en seco, sin líquidos
              cerca del equipo y con calendario acordado con el área de TI. El comedor y las
              cocinetas requieren separación de material y productos aptos para áreas de alimentos.
              El archivo y las zonas de acceso restringido se atienden con acceso acompañado y
              registro. Estas áreas van como anexo del alcance —con su propio protocolo— y no como
              parte de &ldquo;la limpieza general&rdquo;, que es la forma más rápida de que nadie
              se haga responsable cuando algo se daña.
            </p>
            <p>
              Para oficinas corporativas, despachos y espacios donde se maneja información
              sensible, firmamos acuerdos de confidencialidad con la empresa y hacemos que el
              personal asignado los suscriba.
            </p>
            <h2>Cómo se evalúa el servicio</h2>
            <p>
              Con tres mecanismos acordados desde el contrato: recorrido de supervisión con
              bitácora por turno, un canal único para reportar incidencias con tiempo de respuesta
              comprometido, y una revisión periódica contra el alcance escrito. La regla práctica
              es que lo que no está en el alcance no se puede evaluar después: si esperas cristales
              cada mes y no quedó escrito, la discusión no tiene salida. Por eso la propuesta
              incluye también lo que queda explícitamente fuera.
            </p>
          </div>
          <div className="space-y-5 lg:sticky lg:top-28">
            <TrustPanel compact />
            <div className="rounded-[1.75rem] bg-[#101014] p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C9A24A]">
                Para compras
              </p>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Si tu área de compras usa un formato propio de propuesta o requiere documentación
                adicional para el alta de proveedor, indícalo al solicitar la cotización y la
                entregamos en ese formato.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lm-container py-16">
        <h2 className="font-display text-4xl text-[#101014]">Modalidades del contrato</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {MODALIDADES.map(([t, d]) => (
            <article key={t} className="lm-card p-6">
              <h3 className="font-display text-2xl text-[#101014]">{t}</h3>
              <p className="mt-3 text-[15px] leading-7 text-[#1F1F25]/70">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="lm-container py-16">
          <h2 className="max-w-3xl font-display text-4xl leading-tight text-[#101014]">
            Qué necesitamos para cotizar
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-8 text-[#1F1F25]/75">
            Con estos datos se arma una propuesta inicial; el levantamiento en sitio la afina. Si
            quieres entender el desglose antes de pedir números, está explicado en la guía sobre{' '}
            <Link href="/guias/costo-limpieza-oficinas-cdmx" className="font-bold underline underline-offset-4">
              de qué depende el costo de limpieza de oficinas
            </Link>
            .
          </p>
          <dl className="mt-9 grid gap-5 md:grid-cols-2">
            {COTIZACION_VARIABLES.map(([variable, detalle]) => (
              <div key={variable} className="rounded-[1.5rem] border border-black/10 bg-[#FAFAF7] p-6">
                <dt className="font-display text-xl text-[#101014]">{variable}</dt>
                <dd className="mt-2 text-[15px] leading-7 text-[#1F1F25]/72">{detalle}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="lm-container py-16">
        <div className="lm-card p-8">
          <h2 className="font-display text-3xl text-[#101014]">
            ¿Buscas esto o buscas limpiar una oficina?
          </h2>
          <p className="mt-4 max-w-3xl text-[16px] leading-8 text-[#1F1F25]/75">
            Si tu necesidad es un solo inmueble y quieres cotizar rápido, la página directa es{' '}
            <Link href="/limpieza-de-oficinas" className="font-bold underline underline-offset-4">
              limpieza de oficinas en CDMX
            </Link>
            . Esta página es para el caso contrario: contrato, varias sedes o un proceso de compras
            de por medio. Si administras un edificio habitacional, lo tuyo es{' '}
            <Link href="/limpieza-de-condominios" className="font-bold underline underline-offset-4">
              limpieza de condominios y áreas comunes
            </Link>
            . Y si estás comparando proveedores para un comparativo formal, los criterios y las
            preguntas están en{' '}
            <Link
              href="/mejor-empresa-de-limpieza-en-mexico"
              className="font-bold underline underline-offset-4"
            >
              cómo elegir una empresa de limpieza
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="lm-container max-w-4xl pb-16">
        <Faq faqs={[...FAQ_CORPORATIVA]} titulo="Preguntas de facilities y compras" />
      </section>
    </>
  );
}
