import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TrustPanel from '@/components/marketing/TrustPanel';
import { pageMetadata, faqLd, breadcrumbLd, articleLd } from '@/lib/seo';
import { GUIAS, GUIA_SLUGS, getGuia, type Bloque } from '@/lib/guias';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIA_SLUGS.map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guia = getGuia(slug);
  if (!guia) return {};
  return pageMetadata({
    title: guia.tituloSeo,
    description: guia.descripcion,
    path: `/guias/${guia.slug}`,
    keywords: guia.keywords,
  });
}

/** Render de un bloque de contenido. La guía es data; esto solo la dibuja. */
function BloqueContenido({ bloque }: { bloque: Bloque }) {
  if (bloque.tipo === 'parrafos') {
    return (
      <section>
        <h2>{bloque.h}</h2>
        {bloque.p.map((texto, i) => (
          <p key={i}>{texto}</p>
        ))}
      </section>
    );
  }

  if (bloque.tipo === 'lista') {
    return (
      <section>
        <h2>{bloque.h}</h2>
        {bloque.intro && <p>{bloque.intro}</p>}
        <ul className="mt-6 list-none space-y-4 pl-0">
          {bloque.items.map((item) => (
            <li key={item.t} className="rounded-2xl border border-black/10 bg-[#FAFAF7] p-5">
              <p className="font-display text-xl leading-tight text-[#101014]">{item.t}</p>
              <p className="mt-2 !mb-0 text-[15px] leading-7 text-[#1F1F25]/75">{item.d}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section>
      <h2>{bloque.h}</h2>
      {bloque.intro && <p>{bloque.intro}</p>}
      <div className="mt-6 overflow-x-auto rounded-[1.5rem] border border-black/10">
        <table className="w-full min-w-[42rem] border-collapse bg-white text-left text-[15px]">
          <caption className="sr-only">{bloque.caption}</caption>
          <thead>
            <tr className="bg-[#101014] text-white">
              {bloque.encabezados.map((h) => (
                <th key={h} scope="col" className="p-4 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bloque.filas.map((fila) => (
              <tr key={fila[0]} className="border-t border-black/10">
                <th scope="row" className="p-4 align-top font-bold text-[#101014]">
                  {fila[0]}
                </th>
                {fila.slice(1).map((celda, i) => (
                  <td key={i} className="p-4 align-top leading-7 text-[#1F1F25]/78">
                    {celda}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default async function PaginaGuia({ params }: Props) {
  const { slug } = await params;
  const guia = getGuia(slug);
  if (!guia) notFound();

  const path = `/guias/${guia.slug}`;
  const migas = [
    { name: 'Inicio', path: '/' },
    { name: 'Guías', path: '/guias' },
    { name: guia.tituloSeo, path },
  ];
  const otras = GUIAS.filter((g) => g.slug !== guia.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(migas),
          faqLd(guia.faqs),
          articleLd({
            headline: guia.titulo,
            description: guia.descripcion,
            path,
            datePublished: guia.publicado,
            dateModified: guia.modificado,
            seccion: 'Guías',
          }),
        ]}
      />

      <div className="lm-container pt-8">
        <Breadcrumbs items={migas} />
      </div>

      <section className="lm-container pb-12">
        <p className="lm-chip">Guía</p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.4rem] leading-[1.05] tracking-[-0.04em] text-[#101014] sm:text-5xl">
          {guia.titulo}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#1F1F25]/78">{guia.entrada}</p>
        <div className="mt-7 max-w-3xl rounded-[1.5rem] border border-[#2F5D50]/25 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2F5D50]">
            Resumen citable
          </p>
          <p className="mt-3 text-[16px] leading-8 text-[#1F1F25]/82">{guia.resumen}</p>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="lm-container grid gap-12 py-16 lg:grid-cols-[1fr_0.78fr]">
          <article className="lm-prose max-w-3xl">
            {guia.bloques.map((bloque) => (
              <BloqueContenido key={bloque.h} bloque={bloque} />
            ))}
          </article>
          <div className="space-y-5 lg:sticky lg:top-28">
            <TrustPanel compact />
            <nav aria-labelledby="guias-relacionadas" className="lm-card p-6">
              <h2 id="guias-relacionadas" className="font-display text-2xl text-[#101014]">
                Sigue leyendo
              </h2>
              <ul className="mt-5 space-y-3">
                {guia.relacionados.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="block rounded-2xl border border-black/10 p-4 text-[15px] font-semibold leading-6 hover:border-[#2F5D50]/50"
                    >
                      {r.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <section className="lm-container max-w-4xl py-16">
        <Faq faqs={guia.faqs} titulo="Preguntas frecuentes" />
      </section>

      <section className="lm-container pb-16">
        <div className="lm-card p-8">
          <h2 className="font-display text-3xl text-[#101014]">Otras guías</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {otras.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guias/${g.slug}`}
                  className="block h-full rounded-2xl border border-black/10 p-5 hover:border-[#2F5D50]/50"
                >
                  <span className="block font-display text-xl leading-tight text-[#101014]">
                    {g.tituloSeo}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-[#1F1F25]/65">
                    {g.descripcion}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[16px] leading-8 text-[#1F1F25]/75">
            ¿Listo para cotizar? Revisa{' '}
            <Link href="/limpieza-corporativa" className="font-bold underline underline-offset-4">
              limpieza corporativa por contrato
            </Link>
            ,{' '}
            <Link href="/limpieza-de-condominios" className="font-bold underline underline-offset-4">
              limpieza de condominios
            </Link>{' '}
            o escríbenos desde{' '}
            <Link href="/contacto" className="font-bold underline underline-offset-4">
              contacto
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
