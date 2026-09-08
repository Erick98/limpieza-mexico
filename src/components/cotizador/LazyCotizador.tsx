'use client';

import dynamic from 'next/dynamic';

const Cotizador = dynamic(() => import('./Cotizador'), {
  ssr: false,
  loading: () => (
    <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_24px_70px_rgba(31,31,37,0.08)]" aria-label="Cargando cotizador">
      <p className="font-display text-2xl text-[#101014]">Cotiza tu servicio de limpieza</p>
      <div className="mt-5 space-y-3">
        <div className="h-14 rounded-2xl bg-[#FAFAF7]" />
        <div className="h-14 rounded-2xl bg-[#FAFAF7]" />
        <div className="h-14 rounded-2xl bg-[#FAFAF7]" />
      </div>
    </div>
  ),
});

export default function LazyCotizador() {
  return <Cotizador />;
}
