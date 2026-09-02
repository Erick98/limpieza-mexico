import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Cotizador from '@/components/cotizador/Cotizador';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import { pageMetadata, faqLd } from '@/lib/seo';
import { SERVICIOS, ZONAS, COBERTURA } from '@/lib/site';
import { FAQ_GENERAL } from '@/lib/contenido';

export const metadata: Metadata = pageMetadata({
  title: 'Servicio de limpieza en CDMX y Estado de México',
  description:
    'Servicio de limpieza para oficinas, hogares y espacios especializados en CDMX y Zona Metropolitana. Cotiza en línea en menos de un minuto, sin costo.',
  path: '/',
  keywords: [
    'servicio de limpieza',
    'servicio de limpieza en México',
    'servicio de limpieza CDMX',
    'empresa de limpieza CDMX',
    'limpieza profesional Ciudad de México',
  ],
});

// Solo las 6 preguntas más buscadas van al FAQPage del home; el resto vive en
// /preguntas-frecuentes. Repetir el mismo FAQPage completo en varias URLs es
// canibalización de rich results.
const FAQ_HOME = FAQ_GENERAL.slice(0, 5);

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd([...FAQ_HOME])} />

      {/* ---------------- HERO + COTIZADOR ---------------- */}
      <section className="border-b border-[#EDEDEA] bg-[#EDEDEA]/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 lg:py-16">
          {/* En móvil el cotizador va PRIMERO (order-1) y los bullets después.
              Alguien que buscó "limpieza cdmx" desde el celular tiene que ver el
              formulario sin hacer scroll; el texto de apoyo puede esperar. */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div className="order-2 lg:order-1 lg:pt-6">
              <h1 className="font-display text-[28px] leading-[1.2] sm:text-5xl lg:text-[3.4rem] mb-4 lg:mb-5 -mt-2 lg:mt-0">
                Servicio de limpieza en CDMX y Zona Metropolitana
              </h1>
              <p className="text-[17px] lg:text-lg leading-relaxed text-[#1F1F25]/80 mb-6 max-w-xl">
                Limpieza de oficinas, hogares y espacios especializados con personal
                contratado formalmente, insumos incluidos y un supervisor responsable de
                tu cuenta. Dinos qué necesitas y te enviamos la cotización.
              </p>

              <ul className="space-y-2.5 text-[15px] mb-8">
                {[
                  'Personal con alta en el IMSS y antecedentes verificados',
                  'Insumos, equipo y supervisión incluidos en la propuesta',
                  'Servicio único o recurrente, en horario hábil o nocturno',
                  'Facturación con CFDI vigente',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="text-[#2C7A4B] font-bold shrink-0">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="hidden lg:block">
                <p className="text-sm text-[#9B9BA3]">
                  Cobertura: {COBERTURA.join(' · ')}
                </p>
              </div>
            </div>

            {/* El cotizador vive en el hero, no escondido en /contacto.
                Es lo primero que ve alguien que llegó buscando "limpieza cdmx". */}
            <div id="cotizar" className="order-1 lg:order-2 scroll-mt-20">
              <Cotizador />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SERVICIOS ---------------- */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl sm:text-4xl mb-3">
          Qué servicios de limpieza ofrecemos
        </h2>
        <p className="text-[17px] text-[#1F1F25]/75 max-w-2xl mb-9">
          Tres líneas de servicio que cubren desde la oficina corporativa hasta la casa
          particular. Cada una se cotiza por proyecto, según superficie y frecuencia.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {SERVICIOS.map((s) => (
            <article key={s.slug} className="border border-[#EDEDEA] rounded-xl p-6">
              <h3 className="font-display text-2xl mb-3">{s.nombre}</h3>
              <p className="text-[15px] leading-relaxed text-[#1F1F25]/75 mb-5">
                {s.resumen}
              </p>
              <Link
                href={s.slug}
                className="font-semibold underline underline-offset-4 decoration-[#2C7A4B] decoration-2"
              >
                Ver detalle del servicio
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- CUERPO EDITORIAL (intención de búsqueda) ---------------- */}
      <section className="border-y border-[#EDEDEA] bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl mb-5">
              Qué esperar de una empresa de limpieza en la Ciudad de México
            </h2>
            <div className="space-y-4 text-[16px] leading-[1.75] text-[#1F1F25]/85">
              <p>
                Contratar un servicio de limpieza en CDMX tiene una complicación que casi
                nadie menciona al principio: la parte laboral. Cuando una empresa o una
                familia contrata directamente, asume el alta ante el IMSS, las
                prestaciones, las incapacidades, el aguinaldo y la responsabilidad si esa
                persona sufre un accidente dentro del inmueble. Cuando el servicio se
                terceriza, esa carga la asume el proveedor. Esa es la diferencia de fondo
                entre pagar por horas a alguien y contratar a una empresa formal.
              </p>
              <p>
                La segunda diferencia es la continuidad. Un servicio serio no se cae
                porque alguien se enfermó: existe personal de relevo y un supervisor que
                responde. En una oficina eso importa mucho, porque la limpieza es de esas
                cosas que solo se notan cuando fallan —el baño sin papel a media junta, la
                recepción sin barrer cuando llega un cliente.
              </p>
              <p>
                La tercera es el alcance real del trabajo. Buena parte de los conflictos
                con proveedores de limpieza nacen de expectativas que nunca se pusieron
                por escrito: quién limpia los vidrios exteriores, cada cuándo se lava la
                cisterna, si el desengrase de cocina entra en la tarifa mensual o se cobra
                aparte. Por eso cotizamos con desglose: qué se hace, cada cuándo, con
                cuánta gente y qué queda fuera. Si algo no está en la propuesta, se dice
                antes, no después.
              </p>
              <p>
                Sobre el precio: no publicamos una lista fija porque sería engañosa. El
                costo de limpiar 80 m² de departamento una vez al mes no se parece en nada
                al de un corporativo de 3,000 m² con servicio diario y turno nocturno.
                Cotizamos a partir de la superficie, el tipo de inmueble, la frecuencia y
                el horario. Es gratis, no compromete a nada y normalmente basta con
                responder las tres preguntas del formulario.
              </p>
            </div>
          </div>

          <div>
            <div className="rounded-xl overflow-hidden border border-[#EDEDEA]">
              <Image
                src="/images/service_office.png"
                alt="Personal de limpieza atendiendo un área de oficinas"
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 420px"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-6 rounded-xl bg-[#EDEDEA]/60 p-6">
              <h3 className="font-display text-xl mb-3">Zonas con atención frecuente</h3>
              <ul className="space-y-2 text-[15px]">
                {ZONAS.map((z) => (
                  <li key={z.slug}>
                    <Link href={z.slug} className="underline underline-offset-4 decoration-[#9B9BA3]">
                      Servicio de limpieza en {z.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[#9B9BA3] mt-4">
                Cubrimos toda la CDMX y la Zona Metropolitana. Estas son las zonas donde
                tenemos mayor densidad de operación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CÓMO FUNCIONA ---------------- */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl sm:text-4xl mb-9">Cómo se solicita el servicio</h2>
        <ol className="grid gap-8 md:grid-cols-3 counter-reset">
          {[
            {
              t: 'Nos dices qué necesitas',
              d: 'Tres preguntas en el formulario: tipo de servicio, tamaño y frecuencia, y cómo contactarte. Toma menos de un minuto desde el celular.',
            },
            {
              t: 'Armamos la propuesta',
              d: 'Calculamos personal, horas e insumos para tu espacio. Si el proyecto lo amerita, agendamos una visita sin costo para medir en sitio.',
            },
            {
              t: 'Arranca el servicio',
              d: 'Se define fecha, horario y accesos. Queda asignado un supervisor responsable y un canal directo para reportar cualquier tema.',
            },
          ].map((p, i) => (
            <li key={p.t}>
              <p className="font-display text-4xl text-[#9B9BA3] mb-2">{i + 1}</p>
              <h3 className="font-semibold text-lg mb-2">{p.t}</h3>
              <p className="text-[15px] leading-relaxed text-[#1F1F25]/75">{p.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
        <Faq faqs={[...FAQ_HOME]} />
        <p className="mt-6">
          <Link
            href="/preguntas-frecuentes"
            className="font-semibold underline underline-offset-4 decoration-[#2C7A4B] decoration-2"
          >
            Ver todas las preguntas frecuentes
          </Link>
        </p>
      </section>

      {/* ---------------- CTA FINAL ---------------- */}
      <section className="bg-[#1F1F25] text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display text-3xl sm:text-4xl mb-4">
            Cotiza tu servicio de limpieza
          </h2>
          <p className="text-[17px] text-white/75 mb-8">
            Sin costo y sin compromiso. Un asesor revisa tu solicitud y te responde con la
            propuesta.
          </p>
          <Link
            href="/contacto"
            className="inline-flex rounded-lg bg-[#2C7A4B] px-8 py-4 font-semibold text-white hover:bg-[#235f3b]"
          >
            Solicitar cotización
          </Link>
        </div>
      </section>
    </>
  );
}
