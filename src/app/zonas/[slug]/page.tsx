import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Cotizador from '@/components/cotizador/Cotizador';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { pageMetadata, faqLd, breadcrumbLd, serviceLd } from '@/lib/seo';
import { ZONAS_CONTENIDO, ZONA_SLUGS } from '@/lib/zonas';
import { SERVICIOS, ZONAS } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

/** Sólo estas rutas existen; cualquier otra da 404 real (no una página vacía). */
export function generateStaticParams() {
  return ZONA_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const zona = ZONAS_CONTENIDO[slug];
  if (!zona) return {};
  return pageMetadata({
    title: zona.titulo,
    description: zona.descripcion,
    path: `/zonas/${zona.slug}`,
    keywords: [
      `servicio de limpieza ${zona.nombre}`,
      `limpieza ${zona.nombre}`,
      `empresa de limpieza ${zona.nombre}`,
    ],
  });
}

export default async function PaginaZona({ params }: Props) {
  const { slug } = await params;
  const zona = ZONAS_CONTENIDO[slug];
  if (!zona) notFound();

  const path = `/zonas/${zona.slug}`;
  const migas = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicio de limpieza en CDMX', path: '/servicio-de-limpieza-cdmx' },
    { name: zona.nombre, path },
  ];
  const otras = ZONAS.filter((z) => !z.slug.endsWith(zona.slug));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(migas),
          faqLd(zona.faqs),
          serviceLd({
            name: `Servicio de limpieza en ${zona.nombre}`,
            description: zona.descripcion,
            path,
            areaServed: [zona.nombre, zona.alcaldia],
          }),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={migas} />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
        <div>
          <h1 className="font-display text-[32px] leading-tight sm:text-5xl mb-4">
            Servicio de limpieza en {zona.nombre}
          </h1>
          <p className="text-sm text-[#9B9BA3] mb-5">{zona.alcaldia}</p>
          <p className="text-lg leading-relaxed text-[#1F1F25]/80">{zona.intro}</p>
        </div>
        <div className="scroll-mt-20">
          <Cotizador />
        </div>
      </section>

      <section className="border-y border-[#EDEDEA]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-8">
          {zona.parrafos.map((bloque) => (
            <div key={bloque.h}>
              <h2 className="font-display text-3xl mb-3">{bloque.h}</h2>
              <div className="space-y-4 text-[16px] leading-[1.75] text-[#1F1F25]/85">
                {bloque.p.map((texto, i) => (
                  <p key={i}>{texto}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-3xl mb-5">Colonias que atendemos</h2>
          <ul className="space-y-2 text-[16px]">
            {zona.colonias.map((c) => (
              <li key={c} className="flex gap-3">
                <span aria-hidden="true" className="text-[#2C7A4B]">
                  ·
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-3xl mb-5">Servicios disponibles</h2>
          <ul className="space-y-3">
            {SERVICIOS.map((s) => (
              <li key={s.slug}>
                <Link
                  href={s.slug}
                  className="block border border-[#EDEDEA] rounded-lg px-4 py-3.5 hover:border-[#9B9BA3]"
                >
                  <span className="font-semibold block">{s.nombre}</span>
                  <span className="text-sm text-[#9B9BA3]">{s.resumen}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-8">
        <Faq faqs={zona.faqs} titulo={`Preguntas sobre el servicio en ${zona.nombre}`} />
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="font-display text-2xl mb-4">Otras zonas</h2>
        <ul className="flex flex-wrap gap-3">
          {otras.map((z) => (
            <li key={z.slug}>
              <Link
                href={z.slug}
                className="inline-block border border-[#EDEDEA] rounded-lg px-4 py-2.5 hover:border-[#9B9BA3]"
              >
                Limpieza en {z.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
