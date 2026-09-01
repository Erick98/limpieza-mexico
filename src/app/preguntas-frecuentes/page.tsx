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

const MIGAS = [
  { name: 'Inicio', path: '/' },
  { name: 'Preguntas frecuentes', path: PATH },
];

export default function PreguntasFrecuentes() {
  // El FAQPage completo vive aquí: es la URL canónica para esta intención.
  const todas = [...FAQ_GENERAL, ...FAQ_OFICINAS, ...FAQ_DOMESTICA];

  return (
    <>
      <JsonLd data={[breadcrumbLd(MIGAS), faqLd(todas)]} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={MIGAS} />

        <h1 className="font-display text-[32px] leading-tight sm:text-5xl mb-4">
          Preguntas frecuentes
        </h1>
        <p className="text-lg leading-relaxed text-[#1F1F25]/80 mb-4">
          Las dudas que más nos llegan antes de contratar un servicio de limpieza,
          respondidas sin rodeos.
        </p>

        <Faq faqs={[...FAQ_GENERAL]} titulo="Sobre el servicio y la cotización" />
        <Faq faqs={[...FAQ_OFICINAS]} titulo="Limpieza de oficinas y corporativos" />
        <Faq faqs={[...FAQ_DOMESTICA]} titulo="Limpieza doméstica y personal de hogar" />

        <div className="mt-14 rounded-xl border border-[#EDEDEA] p-7 text-center mb-8">
          <h2 className="font-display text-2xl mb-3">¿Tu pregunta no está aquí?</h2>
          <p className="text-[16px] text-[#1F1F25]/75 mb-6">
            Escríbela en el formulario de cotización y un asesor te responde directo.
          </p>
          <Link
            href="/contacto"
            className="inline-flex rounded-lg bg-[#2C7A4B] px-7 py-3.5 font-semibold text-white hover:bg-[#235f3b]"
          >
            Ir al formulario
          </Link>
        </div>
      </div>
    </>
  );
}
