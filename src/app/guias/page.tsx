import Link from 'next/link';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { pageMetadata, breadcrumbLd } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';
import { GUIAS } from '@/lib/guias';

const PATH = '/guias';

export const metadata: Metadata = pageMetadata({
  title: 'Guías de limpieza para empresas y condominios',
  description:
    'Guías prácticas para elegir proveedor, entender costos, armar el contrato y definir frecuencias de limpieza en oficinas, corporativos y condominios.',
  path: PATH,
  keywords: [
    'guías limpieza empresas',
    'cómo contratar servicio de limpieza',
    'limpieza condominios guía',
    'contrato de limpieza méxico',
  ],
});

const MIGAS = [
  { name: 'Inicio', path: '/' },
  { name: 'Guías', path: PATH },
];

export default function GuiasIndex() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(MIGAS),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Guías de limpieza para empresas y condominios',
            url: absoluteUrl(PATH),
            inLanguage: 'es-MX',
            hasPart: GUIAS.map((g) => ({
              '@type': 'Article',
              headline: g.titulo,
              url: absoluteUrl(`/guias/${g.slug}`),
              description: g.descripcion,
              datePublished: g.publicado,
              dateModified: g.modificado,
            })),
          },
        ]}
      />

      <div className="lm-container pt-8">
        <Breadcrumbs items={MIGAS} />
      </div>

      <section className="lm-container pb-12">
        <p className="lm-chip">Guías</p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-[#101014] sm:text-5xl lg:text-6xl">
          Guías para contratar limpieza sin equivocarse
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#1F1F25]/78">
          Material escrito para quien está decidiendo: administradores de condominio, comités,
          gerentes de oficina y áreas de compras. Explican cómo comparar proveedores, de qué
          depende el precio, qué exigir en el contrato y con qué frecuencia se atiende cada
          espacio. Sin cifras inventadas y sin vender en cada párrafo.
        </p>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="lm-container py-14">
          <h2 className="font-display text-3xl leading-tight text-[#101014] sm:text-4xl">
            Por dónde empezar según tu caso
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-[1.5rem] border border-black/10 bg-[#FAFAF7] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F5D50]">
                Administras un condominio
              </p>
              <p className="mt-3 text-[15px] leading-7 text-[#1F1F25]/75">
                Empieza por el{' '}
                <Link href="/guias/elegir-empresa-limpieza-condominio" className="font-bold underline underline-offset-4">
                  checklist para administradores y comités
                </Link>{' '}
                para armar el alcance antes de pedir cotizaciones, y sigue con las{' '}
                <Link href="/guias/frecuencias-limpieza-areas-comunes" className="font-bold underline underline-offset-4">
                  frecuencias por espacio
                </Link>
                , que es lo que define cuánta gente necesita el inmueble.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-black/10 bg-[#FAFAF7] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F5D50]">
                Llevas facilities o compras
              </p>
              <p className="mt-3 text-[15px] leading-7 text-[#1F1F25]/75">
                La guía de{' '}
                <Link href="/guias/costo-limpieza-oficinas-cdmx" className="font-bold underline underline-offset-4">
                  costo de limpieza de oficinas
                </Link>{' '}
                explica cómo igualar propuestas para que sean comparables, y las{' '}
                <Link href="/guias/contrato-de-limpieza-clausulas" className="font-bold underline underline-offset-4">
                  12 cláusulas del contrato
                </Link>{' '}
                cubren lo que suele faltar en el documento que te mandan a firmar.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-black/10 bg-[#FAFAF7] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2F5D50]">
                Dudas entre esquemas
              </p>
              <p className="mt-3 text-[15px] leading-7 text-[#1F1F25]/75">
                Si estás comparando contratar a una empresa contra personal directo o por
                aplicación, la guía de{' '}
                <Link href="/guias/personal-en-nomina-vs-por-app" className="font-bold underline underline-offset-4">
                  nómina vs. app o independiente
                </Link>{' '}
                explica dónde queda el riesgo laboral y qué papel juega el REPSE.
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-[16px] leading-8 text-[#1F1F25]/72">
            Las cinco guías están escritas para leerse sueltas: cada una abre con un resumen que
            responde la pregunta de entrada, y el detalle viene después. Ninguna publica precios,
            porque cualquier cifra sin haber visto el inmueble sería inventada; en su lugar
            explican de qué depende el número, que es lo que de verdad permite negociar.
          </p>
        </div>
      </section>

      <section className="lm-container py-16">
        <h2 className="font-display text-3xl leading-tight text-[#101014] sm:text-4xl">
          Las cinco guías
        </h2>
        <ul className="mt-8 grid gap-5 lg:grid-cols-2">
          {GUIAS.map((g) => (
            <li key={g.slug}>
              <article className="lm-card flex h-full flex-col p-7">
                <h3 className="font-display text-2xl leading-tight text-[#101014]">
                  <Link href={`/guias/${g.slug}`} className="hover:underline underline-offset-4">
                    {g.titulo}
                  </Link>
                </h3>
                <p className="mt-4 flex-grow text-[15px] leading-7 text-[#1F1F25]/72">{g.entrada}</p>
                <Link
                  href={`/guias/${g.slug}`}
                  className="mt-6 inline-flex text-sm font-bold text-[#2F5D50] underline underline-offset-4"
                >
                  Leer la guía
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <div className="lm-card mt-10 p-8">
          <h2 className="font-display text-3xl text-[#101014]">¿Vas directo a comparar proveedores?</h2>
          <p className="mt-4 max-w-3xl text-[16px] leading-8 text-[#1F1F25]/75">
            La guía principal reúne los diez criterios objetivos, la comparación de modelos de
            proveedor y las preguntas concretas que conviene hacer:{' '}
            <Link
              href="/mejor-empresa-de-limpieza-en-mexico"
              className="font-bold underline underline-offset-4"
            >
              cómo elegir una empresa de limpieza en México
            </Link>
            . Si ya sabes qué necesitas, puedes ir directo a{' '}
            <Link href="/limpieza-corporativa" className="font-bold underline underline-offset-4">
              limpieza corporativa
            </Link>{' '}
            o a{' '}
            <Link href="/limpieza-de-condominios" className="font-bold underline underline-offset-4">
              limpieza de condominios
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
