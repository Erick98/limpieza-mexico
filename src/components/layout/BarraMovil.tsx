'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { whatsappUrl } from '@/lib/site';

/**
 * CTA persistente en móvil.
 *
 * Se OCULTA mientras el formulario de cotización está visible en pantalla. Si no,
 * aparecen dos botones verdes a la vez y el usuario que va en el paso 3 puede tocar
 * el de la barra, navegar a /contacto y perder todo lo que ya había capturado.
 * La barra sirve para traer de vuelta a quien se alejó del formulario, no para
 * competir con él.
 *
 * También se esconde cuando hay un campo enfocado: con el teclado abierto el
 * viewport se reduce a ~350px y la barra fija termina pisando el botón de envío.
 */
export default function BarraMovil() {
  const [oculta, setOculta] = useState(false);
  const wa = whatsappUrl();

  useEffect(() => {
    const form = document.querySelector('form[action="/api/notify"]');

    const observer = form
      ? new IntersectionObserver(
          ([entry]) => setOculta(entry.isIntersecting),
          { threshold: 0.25 }
        )
      : null;
    if (form && observer) observer.observe(form);

    // Teclado abierto -> fuera la barra.
    const alEnfocar = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest('form[action="/api/notify"]')) setOculta(true);
    };
    const alDesenfocar = () => {
      // Delay para no parpadear al saltar de un campo a otro.
      window.setTimeout(() => {
        const activo = document.activeElement as HTMLElement | null;
        if (!activo?.closest('form[action="/api/notify"]')) {
          const f = document.querySelector('form[action="/api/notify"]');
          if (!f) return setOculta(false);
          const r = f.getBoundingClientRect();
          setOculta(r.top < window.innerHeight && r.bottom > 0);
        }
      }, 120);
    };

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
      {/* Espaciador: la barra mide ~66px + área segura del dispositivo. */}
      <div
        className="lg:hidden"
        style={{ height: 'calc(5.5rem + env(safe-area-inset-bottom))' }}
        aria-hidden="true"
      />
      <div
        hidden={oculta}
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-[#EDEDEA] bg-white px-3 py-2.5 flex gap-2.5"
        style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
      >
        <Link
          href="/contacto"
          className="flex-1 rounded-lg bg-[#2C7A4B] px-4 py-3 text-center font-semibold text-white"
        >
          Cotizar gratis
        </Link>
        {wa ? (
          <a href={wa} className="rounded-lg border-2 border-[#1F1F25] px-4 py-3 font-semibold">
            WhatsApp
          </a>
        ) : (
          <a
            href="mailto:ventas@limpiezamexico.com"
            className="rounded-lg border-2 border-[#1F1F25] px-4 py-3 font-semibold"
            aria-label="Escribir por correo a ventas"
          >
            Escribir
          </a>
        )}
      </div>
    </>
  );
}
