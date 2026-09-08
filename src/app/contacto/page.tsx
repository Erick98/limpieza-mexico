import type { Metadata } from 'next';
import Cotizador from '@/components/cotizador/Cotizador';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { pageMetadata, breadcrumbLd } from '@/lib/seo';
import {
  ADDRESS,
  EMAIL_CONTACTO,
  EMAIL_VENTAS,
  COBERTURA,
  PHONE_CONFIRMED,
  PHONE_DISPLAY,
  PHONE_E164,
  whatsappUrl,
} from '@/lib/site';

const PATH = '/contacto';

export const metadata: Metadata = pageMetadata({
  title: 'Cotizar servicio de limpieza',
  description:
    'Solicita tu cotización de servicio de limpieza en CDMX y Zona Metropolitana. Responde tres preguntas y un asesor te contacta. Sin costo ni compromiso.',
  path: PATH,
});

const MIGAS = [
  { name: 'Inicio', path: '/' },
  { name: 'Contacto', path: PATH },
];

export default function Contacto() {
  return (
    <>
      <JsonLd data={breadcrumbLd(MIGAS)} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={MIGAS} />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
        <div>
          <h1 className="font-display text-[32px] leading-tight sm:text-5xl mb-5">
            Solicita tu cotización
          </h1>
          <p className="text-lg leading-relaxed text-[#1F1F25]/80 mb-9">
            Tres preguntas y listo. Un asesor revisa tu solicitud y te responde con la
            propuesta. Sin costo y sin compromiso.
          </p>

          <div className="space-y-7">
            <div>
              <h2 className="font-semibold text-lg mb-2">Oficinas</h2>
              <address className="not-italic text-[16px] text-[#1F1F25]/80">
                {ADDRESS.full}
              </address>
            </div>

            <div>
              <h2 className="font-semibold text-lg mb-2">Correo</h2>
              <p className="text-[16px]">
                <a href={`mailto:${EMAIL_CONTACTO}`} className="underline underline-offset-4">
                  {EMAIL_CONTACTO}
                </a>
                <br />
                <a href={`mailto:${EMAIL_VENTAS}`} className="underline underline-offset-4">
                  {EMAIL_VENTAS}
                </a>
              </p>
            </div>

            {/* Teléfono: solo se muestra con dato real confirmado (site.ts). */}
            {PHONE_CONFIRMED && PHONE_DISPLAY && (
              <div>
                <h2 className="font-semibold text-lg mb-2">Teléfono y WhatsApp</h2>
                <p className="text-[16px]">
                  <a href={`tel:${PHONE_E164}`} className="underline underline-offset-4">
                    {PHONE_DISPLAY}
                  </a>
                  {whatsappUrl() && (
                    <>
                      <br />
                      <a
                        href={whatsappUrl()!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4"
                      >
                        Escríbenos por WhatsApp
                      </a>
                    </>
                  )}
                </p>
              </div>
            )}

            <div>
              <h2 className="font-semibold text-lg mb-2">Cobertura</h2>
              <ul className="space-y-1.5 text-[16px] text-[#1F1F25]/80">
                {COBERTURA.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="scroll-mt-20">
          <Cotizador />
        </div>
      </section>
    </>
  );
}
