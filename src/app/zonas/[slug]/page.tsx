import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Cotizador from '@/components/cotizador/Cotizador';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TrustPanel from '@/components/marketing/TrustPanel';
import { pageMetadata, faqLd, breadcrumbLd, serviceLd } from '@/lib/seo';
import { ZONAS_CONTENIDO, ZONA_SLUGS } from '@/lib/zonas';
import { SERVICIOS, ZONAS } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return ZONA_SLUGS.map((slug) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const zona = ZONAS_CONTENIDO[slug];
  if (!zona) return {};
  return pageMetadata({ title: zona.titulo, description: zona.descripcion, path: `/zonas/${zona.slug}`, keywords: [`servicio de limpieza ${zona.nombre}`, `limpieza ${zona.nombre}`, `empresa de limpieza ${zona.nombre}`] });
}

export default async function PaginaZona({ params }: Props) {
  const { slug } = await params;
  const zona = ZONAS_CONTENIDO[slug];
  if (!zona) notFound();

  const path = `/zonas/${zona.slug}`;
  const migas = [{ name: 'Inicio', path: '/' }, { name: 'Servicio de limpieza en CDMX', path: '/servicio-de-limpieza-cdmx' }, { name: zona.nombre, path }];
  const otras = ZONAS.filter((z) => !z.slug.endsWith(zona.slug));

  return (
    <>
      <JsonLd data={[breadcrumbLd(migas), faqLd(zona.faqs), serviceLd({ name: `Servicio de limpieza en ${zona.nombre}`, description: zona.descripcion, path, areaServed: [zona.nombre, zona.alcaldia] })]} />
      <div className="lm-container pt-8"><Breadcrumbs items={migas} /></div>

      <section className="lm-container grid gap-10 pb-14 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div>
          <p className="lm-chip">Zona de servicio · {zona.alcaldia}</p>
          <h1 className="mt-5 font-display text-[3rem] leading-[0.98] tracking-[-0.045em] text-[#101014] sm:text-6xl">Servicio de limpieza en {zona.nombre}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#1F1F25]/78">{zona.intro}</p>
          <p className="mt-4 max-w-2xl rounded-2xl border border-black/10 bg-white p-5 text-[15px] leading-7 text-[#1F1F25]/72">Resumen citable: Limpieza México atiende {zona.nombre} con servicio de limpieza profesional para oficinas, hogares, condominios y trabajos especializados. Para cotizar, comparte tipo de inmueble, superficie, frecuencia y horario.</p>
        </div>
        <div className="scroll-mt-24"><Cotizador /></div>
      </section>

      <section className="border-y border-black/10 bg-white"><div className="lm-container grid gap-12 py-16 lg:grid-cols-[1fr_0.82fr]"><article className="lm-prose max-w-3xl">{zona.parrafos.map((bloque) => <section key={bloque.h}><h2>{bloque.h}</h2>{bloque.p.map((texto, i) => <p key={i}>{texto}</p>)}</section>)}</article><div className="space-y-5 lg:sticky lg:top-28"><TrustPanel compact /><div className="lm-card p-6"><h2 className="font-display text-3xl">Colonias que atendemos</h2><ul className="mt-5 space-y-2 text-[15px] text-[#1F1F25]/75">{zona.colonias.map((c) => <li key={c} className="flex gap-3"><span aria-hidden="true" className="mt-2 size-1.5 rounded-full bg-[#C9A24A]" />{c}</li>)}</ul></div></div></div></section>

      <section className="lm-container grid gap-10 py-16 lg:grid-cols-2">
        <div className="lm-card p-7"><h2 className="font-display text-3xl">Servicios disponibles en {zona.nombre}</h2><ul className="mt-5 space-y-3">{SERVICIOS.map((s) => <li key={s.slug}><Link href={s.slug} className="block rounded-2xl border border-black/10 p-4 hover:border-[#2F5D50]/50"><span className="block font-bold">{s.nombre}</span><span className="mt-1 block text-sm leading-6 text-[#1F1F25]/65">{s.resumen}</span></Link></li>)}</ul></div>
        <div className="lm-card p-7"><h2 className="font-display text-3xl">Otras zonas</h2><ul className="mt-5 flex flex-wrap gap-3">{otras.map((z) => <li key={z.slug}><Link href={z.slug} className="inline-block rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-bold hover:border-[#2F5D50]/50">Limpieza en {z.nombre}</Link></li>)}</ul></div>
      </section>

      <section className="lm-container max-w-4xl pb-16"><Faq faqs={zona.faqs} titulo={`Preguntas sobre el servicio en ${zona.nombre}`} /></section>
    </>
  );
}
