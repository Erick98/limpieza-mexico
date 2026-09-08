import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import LazyCotizador from '@/components/cotizador/LazyCotizador';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import SectionIntro from '@/components/marketing/SectionIntro';
import { pageMetadata, faqLd } from '@/lib/seo';
import { SERVICIOS, ZONAS, COBERTURA, whatsappUrl } from '@/lib/site';
import { FAQ_GENERAL } from '@/lib/contenido';

export const metadata: Metadata = pageMetadata({
  title: 'Empresa de limpieza CDMX',
  description:
    'Empresa de limpieza en CDMX para oficinas, hogares y trabajos especializados. Personal formal, supervisión e insumos. Cotiza por WhatsApp.',
  path: '/',
  keywords: [
    'servicio de limpieza',
    'servicio de limpieza en México',
    'servicio de limpieza CDMX',
    'empresa de limpieza CDMX',
    'limpieza profesional Ciudad de México',
  ],
});

const FAQ_HOME = FAQ_GENERAL.slice(0, 5);
const wa = whatsappUrl('Hola, quiero cotizar un servicio de limpieza en CDMX.');

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd([...FAQ_HOME])} />

      <section className="relative overflow-hidden border-b border-black/10 bg-[#FAFAF7]">
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(47,93,80,0.12),rgba(250,250,247,0))]" aria-hidden="true" />
        <div className="lm-container relative grid gap-10 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-16">
          <div className="max-w-3xl">
            <p className="lm-chip">Limpieza profesional · CDMX y Zona Metropolitana</p>
            <h1 className="mt-6 font-display text-[3.25rem] leading-[0.95] tracking-[-0.05em] text-[#101014] sm:text-6xl lg:text-7xl">
              Servicio de limpieza en CDMX para espacios que no pueden fallar.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#1F1F25]/78 lg:text-xl">
              Limpieza de oficinas, hogares y servicios especializados con personal formal,
              insumos definidos y un supervisor responsable. Cotizamos por proyecto, sin cifras
              genéricas ni promesas imposibles.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {wa && <a href={wa} className="lm-button-primary">Cotizar por WhatsApp</a>}
              <Link href="#cotizar" className="lm-button-secondary">Usar formulario de 3 pasos</Link>
            </div>
            <ul className="mt-9 grid gap-3 text-[15px] text-[#1F1F25]/80 sm:grid-cols-2">
              {[
                'Oficinas, corporativos y condominios',
                'Casas, departamentos y personal de hogar',
                'Post-obra, sanitización, pisos y alturas',
                'Facturación y alcance por escrito',
              ].map((item) => (
                <li key={item} className="flex gap-3"><span className="mt-2 size-1.5 rounded-full bg-[#C9A24A]" aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <figure className="overflow-hidden rounded-[2.25rem] border border-black/10 bg-white shadow-[0_30px_90px_rgba(31,31,37,0.16)]">
              <Image
                src="/images/hero_ultra_premium.png"
                alt="Imagen ambiental de limpieza profesional en un lobby corporativo moderno"
                width={768}
                height={768}
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
              />
              <figcaption className="sr-only">Imagen ambiental ilustrativa; no representa personal o instalaciones propias.</figcaption>
            </figure>
            <div className="absolute -bottom-5 left-5 right-5 rounded-[1.5rem] border border-black/10 bg-white/92 p-4 shadow-xl backdrop-blur md:left-auto md:w-80">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F5D50]">Lo que sí queda claro</p>
              <p className="mt-2 text-sm leading-6 text-[#1F1F25]/78">Qué se limpia, cada cuándo, con cuánta gente, qué insumos entran y qué queda fuera.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="cotizar" className="scroll-mt-24 bg-white">
        <div className="lm-container grid gap-8 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="pt-2">
            <p className="lm-chip">Cotizador ligero</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-[#101014] sm:text-5xl">Tres pasos. Una propuesta seria.</h2>
            <p className="mt-5 text-[17px] leading-8 text-[#1F1F25]/75">
              El formulario no reemplaza el levantamiento: lo acelera. Con tipo de espacio, tamaño,
              frecuencia y zona podemos responder con una propuesta útil o pedir solo el dato que falte.
            </p>
            <p className="mt-4 text-sm text-[#1F1F25]/55">También puedes escribir a WhatsApp si tu servicio es urgente.</p>
          </div>
          <LazyCotizador />
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#FAFAF7]">
        <div className="lm-container py-16">
          <SectionIntro eyebrow="Servicios" title="Una página por intención; un servicio por necesidad.">
            <p>El sitio separa las búsquedas principales: servicio general en CDMX, oficinas, hogar y trabajos especializados. Así Google —y un agente de IA— no tienen que adivinar qué vendemos.</p>
          </SectionIntro>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {SERVICIOS.map((s) => (
              <article key={s.slug} className="lm-card p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F5D50]">Servicio</p>
                <h3 className="mt-4 font-display text-3xl leading-tight text-[#101014]">{s.nombre}</h3>
                <p className="mt-4 text-[15px] leading-7 text-[#1F1F25]/72">{s.resumen}</p>
                <Link href={s.slug} className="mt-6 inline-flex text-sm font-bold text-[#2F5D50] underline underline-offset-4">Ver detalle</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="lm-container grid gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="lm-prose max-w-3xl">
            <h2>Qué debe resolver una empresa de limpieza en la Ciudad de México</h2>
            <p>
              Contratar un servicio de limpieza en CDMX no es solo encontrar a alguien que barra y trapee. En oficinas, el reto es laboral y operativo: alta del personal, cobertura de ausencias, supervisión, acceso al edificio, manejo de residuos, limpieza de sanitarios de alto tráfico y respuesta rápida cuando algo falla. En casas y departamentos, el punto central es la confianza: saber quién entra, que la persona esté verificada y que el servicio sea consistente.
            </p>
            <p>
              Por eso Limpieza México no publica una tarifa universal. Un departamento de 80 m², una oficina de 900 m², una torre en Santa Fe y una cocina de restaurante en Polanco no se cotizan igual. La propuesta se arma con superficie, frecuencia, horario, insumos, equipo y restricciones de acceso. Si algo requiere maquinaria, trabajo en alturas o desengrase especializado, se separa desde el inicio para evitar sorpresas.
            </p>
            <p>
              El objetivo del rediseño es que esa claridad se vea desde el primer scroll: qué hacemos, dónde operamos, cómo se cotiza y cómo contactarnos. Nada de clientes inventados, rankings sin fuente o promesas de precio que después no se sostienen.
            </p>
          </div>
          <div className="space-y-5">
            <div className="lm-card overflow-hidden">
              <Image
                src="/images/cta_modern_building.png"
                alt="Atrio corporativo limpio y luminoso como referencia ambiental"
                width={768}
                height={768}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="rounded-[1.75rem] bg-[#101014] p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C9A24A]">Cobertura</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-white/78">
                {COBERTURA.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#FAFAF7]">
        <div className="lm-container py-16">
          <SectionIntro eyebrow="Zonas" title="Contenido local real para Polanco, Santa Fe, Interlomas, Condesa y Roma.">
            <p>Cada zona explica logística, accesos y tipo de inmueble. No son páginas plantilla con el nombre de la colonia cambiado.</p>
          </SectionIntro>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ZONAS.map((z) => (
              <Link key={z.slug} href={z.slug} className="rounded-[1.5rem] border border-black/10 bg-white p-5 hover:border-[#2F5D50]/50">
                <span className="block font-display text-2xl text-[#101014]">{z.nombre}</span>
                <span className="mt-1 block text-sm text-[#1F1F25]/60">{z.alcaldia}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="lm-container grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro eyebrow="Preguntas" title="Respuestas escritas como pregunta real de usuario.">
            <p>El FAQ ayuda a SEO y a agentes de IA: precio, zonas, factura, personal e insumos se responden sin relleno.</p>
            <p className="mt-6"><Link href="/preguntas-frecuentes" className="lm-button-secondary">Ver FAQ completo</Link></p>
          </SectionIntro>
          <div className="-mt-16 lg:mt-0"><Faq faqs={[...FAQ_HOME]} /></div>
        </div>
      </section>

      <section className="bg-[#101014] text-white">
        <div className="lm-container py-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C9A24A]">Siguiente paso</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl">Cotiza el servicio con alcance claro antes de contratar.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-8 text-white/70">WhatsApp si quieres rapidez; formulario si prefieres dejar el detalle completo.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {wa && <a href={wa} className="lm-button-primary">Cotizar por WhatsApp</a>}
            <Link href="/contacto" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#101014]">Ir al formulario</Link>
          </div>
        </div>
      </section>
    </>
  );
}
