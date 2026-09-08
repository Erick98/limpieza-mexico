import Link from 'next/link';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { pageMetadata, faqLd, breadcrumbLd } from '@/lib/seo';
import { FAQ_GENERAL, FAQ_OFICINAS, FAQ_DOMESTICA } from '@/lib/contenido';

const PATH = '/preguntas-frecuentes';

export const metadata: Metadata = pageMetadata({
  title: 'Preguntas frecuentes',
  description:
    'Cuánto cuesta un servicio de limpieza en CDMX, cómo se cotiza, si emiten factura, si el personal está asegurado y qué zonas se cubren. Respuestas claras.',
  path: PATH,
});

const MIGAS = [{ name: 'Inicio', path: '/' }, { name: 'Preguntas frecuentes', path: PATH }];

export default function PreguntasFrecuentes() {
  const todas = [...FAQ_GENERAL, ...FAQ_OFICINAS, ...FAQ_DOMESTICA];
  return (
    <>
      <JsonLd data={[breadcrumbLd(MIGAS), faqLd(todas)]} />
      <div className="lm-container max-w-5xl pt-8"><Breadcrumbs items={MIGAS} /></div>
      <section className="lm-container max-w-5xl pb-16">
        <p className="lm-chip">FAQ indexable</p>
        <h1 className="mt-5 font-display text-[3rem] leading-[0.98] tracking-[-0.045em] text-[#101014] sm:text-6xl">Preguntas frecuentes sobre servicio de limpieza en CDMX</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#1F1F25]/78">Respuestas claras para personas y agentes de IA: precio, cotización, factura, cobertura, personal, insumos y operación en oficinas u hogares.</p>
        <Faq faqs={[...FAQ_GENERAL]} titulo="Sobre el servicio y la cotización" />
        <Faq faqs={[...FAQ_OFICINAS]} titulo="Limpieza de oficinas y corporativos" />
        <Faq faqs={[...FAQ_DOMESTICA]} titulo="Limpieza doméstica y personal de hogar" />
        <div className="mt-14 rounded-[2rem] bg-[#101014] p-8 text-center text-white">
          <h2 className="font-display text-3xl">¿Tu pregunta no está aquí?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-7 text-white/70">Déjala en el formulario de cotización y un asesor responde directo con lo que falta para armar la propuesta.</p>
          <Link href="/contacto" className="mt-6 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#101014]">Ir al formulario</Link>
        </div>
      </section>
    </>
  );
}
