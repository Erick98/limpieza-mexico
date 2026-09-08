'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SERVICIOS } from '@/lib/site';

const ENLACES = [
  { href: '/servicio-de-limpieza-cdmx', label: 'CDMX' },
  ...SERVICIOS.map((s) => ({ href: s.slug, label: s.corto })),
  { href: '/preguntas-frecuentes', label: 'FAQ' },
  { href: '/nosotros', label: 'Nosotros' },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#FAFAF7]/92 backdrop-blur-xl">
      <nav aria-label="Navegación principal" className="lm-container">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center shrink-0" aria-label="Limpieza México, inicio">
            <Image
              src="/logo_dark.png"
              alt="Limpieza México"
              width={200}
              height={64}
              priority
              className="h-12 w-auto object-contain lg:h-14"
            />
          </Link>

          <ul className="hidden items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1 text-[14px] font-semibold shadow-sm lg:flex">
            {ENLACES.map((e) => {
              const activo = pathname === e.href;
              return (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    aria-current={activo ? 'page' : undefined}
                    className={`block rounded-full px-4 py-2.5 transition-colors ${
                      activo ? 'bg-[#1F1F25] text-white' : 'text-[#1F1F25]/75 hover:bg-[#EDEDEA] hover:text-[#1F1F25]'
                    }`}
                  >
                    {e.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link href="/contacto" className="hidden lg:inline-flex lm-button-primary">
            Cotizar
          </Link>

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            className="lg:hidden rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-bold"
          >
            {abierto ? 'Cerrar' : 'Menú'}
          </button>
        </div>

        {abierto && (
          <ul id="menu-movil" className="lg:hidden pb-5 space-y-1 border-t border-black/10 pt-3">
            {ENLACES.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  onClick={() => setAbierto(false)}
                  className="block rounded-2xl px-4 py-3 font-semibold hover:bg-white"
                >
                  {e.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contacto"
                onClick={() => setAbierto(false)}
                className="mt-2 block rounded-full bg-[#2F5D50] px-4 py-3 text-center font-bold text-white"
              >
                Cotizar ahora
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
