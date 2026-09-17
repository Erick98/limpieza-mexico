'use client';

import { useEffect, useState } from 'react';
import { whatsappUrl } from '@/lib/site';
import TrackedLink from '@/components/analytics/TrackedLink';

export default function BarraMovil() {
  const [oculta, setOculta] = useState(false);
  const wa = whatsappUrl('Hola, quiero cotizar un servicio de limpieza en CDMX.');

  useEffect(() => {
    const form = document.querySelector('form[action="/api/notify"]');
    const observer = form
      ? new IntersectionObserver(([entry]) => setOculta(entry.isIntersecting), { threshold: 0.25 })
      : null;
    if (form && observer) observer.observe(form);

    const alEnfocar = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest('form[action="/api/notify"]')) setOculta(true);
    };
    const alDesenfocar = () => window.setTimeout(() => {
      const activo = document.activeElement as HTMLElement | null;
      if (!activo?.closest('form[action="/api/notify"]')) {
        const f = document.querySelector('form[action="/api/notify"]');
        if (!f) return setOculta(false);
        const r = f.getBoundingClientRect();
        setOculta(r.top < window.innerHeight && r.bottom > 0);
      }
    }, 120);

    document.addEventListener('focusin', alEnfocar);
    document.addEventListener('focusout', alDesenfocar);
    return () => {
      observer?.disconnect();
      document.removeEventListener('focusin', alEnfocar);
      document.removeEventListener('focusout', alDesenfocar);
    };
  }, []);

  return (
    <>
      <div className="lg:hidden" style={{ height: 'calc(5.75rem + env(safe-area-inset-bottom))' }} aria-hidden="true" />
      <div
        hidden={oculta}
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-black/10 bg-[#FAFAF7]/96 px-3 py-2.5 backdrop-blur-xl"
        style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto flex max-w-md gap-2.5">
          {wa && (
            <TrackedLink href={wa} event="click_whatsapp" params={{ ubicacion: 'barra_movil' }} className="flex-1 rounded-full bg-[#2F5D50] px-4 py-3 text-center text-sm font-bold text-white">
              WhatsApp
            </TrackedLink>
          )}
          <TrackedLink href="/contacto" event="cotizador_abierto" onceKey="cotizador_abierto" className="flex-1 rounded-full border border-[#1F1F25]/20 bg-white px-4 py-3 text-center text-sm font-bold">
            Cotizar
          </TrackedLink>
        </div>
      </div>
    </>
  );
}
