import type { Metadata } from 'next';
import Cotizador from '@/components/cotizador/Cotizador';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { pageMetadata, breadcrumbLd } from '@/lib/seo';
import { ADDRESS, EMAIL_CONTACTO, EMAIL_VENTAS, COBERTURA, PHONE_CONFIRMED, PHONE_DISPLAY, PHONE_E164, whatsappUrl } from '@/lib/site';

const PATH = '/contacto';

export const metadata: Metadata = pageMetadata({
  title: 'Cotizar servicio de limpieza',
  description:
    'Solicita tu cotización de servicio de limpieza en CDMX y Zona Metropolitana. Responde tres preguntas y un asesor te contacta. Sin costo ni compromiso.',
  path: PATH,
});

const MIGAS = [{ name: 'Inicio', path: '/' }, { name: 'Contacto', path: PATH }];

export default function Contacto() {
  return (
    <>
      <JsonLd data={breadcrumbLd(MIGAS)} />
      <div className="lm-container pt-8"><Breadcrumbs items={MIGAS} /></div>
      <section className="lm-container grid gap-12 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="lm-chip">Cotización sin costo</p>
          <h1 className="mt-5 font-display text-[3rem] leading-[0.98] tracking-[-0.045em] text-[#101014] sm:text-6xl">Solicita tu cotización</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#1F1F25]/78">Tres preguntas y listo. Un asesor revisa tu solicitud y responde con una propuesta o con el único dato que falte. Sin costo y sin compromiso.</p>
          <div className="mt-9 grid gap-4">
            <div className="lm-card p-6"><h2 className="font-display text-2xl">Oficinas</h2><address className="mt-3 not-italic text-[16px] leading-7 text-[#1F1F25]/75">{ADDRESS.full}</address></div>
            <div className="lm-card p-6"><h2 className="font-display text-2xl">Correo</h2><p className="mt-3 text-[16px] leading-7"><a href={`mailto:${EMAIL_CONTACTO}`} className="underline underline-offset-4">{EMAIL_CONTACTO}</a><br /><a href={`mailto:${EMAIL_VENTAS}`} className="underline underline-offset-4">{EMAIL_VENTAS}</a></p></div>
            {PHONE_CONFIRMED && PHONE_DISPLAY && <div className="lm-card p-6"><h2 className="font-display text-2xl">Teléfono y WhatsApp</h2><p className="mt-3 text-[16px] leading-7"><a href={`tel:${PHONE_E164}`} className="underline underline-offset-4">{PHONE_DISPLAY}</a>{whatsappUrl() && <><br /><a href={whatsappUrl()!} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Escríbenos por WhatsApp</a></>}</p></div>}
            <div className="lm-card p-6"><h2 className="font-display text-2xl">Cobertura</h2><ul className="mt-3 space-y-1.5 text-[16px] leading-7 text-[#1F1F25]/75">{COBERTURA.map((c) => <li key={c}>{c}</li>)}</ul></div>
          </div>
        </div>
        <div className="scroll-mt-24"><Cotizador /></div>
      </section>
    </>
  );
}
