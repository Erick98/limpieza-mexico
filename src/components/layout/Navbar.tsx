'use client';

/**
 * Navbar. Cliente solo por el toggle del menú móvil (<details> nativo evitaría el JS,
 * pero necesitamos cerrar al navegar). Sin framer-motion, sin dropdown en hover:
 * los servicios se listan planos, que además reparte mejor el enlazado interno.
 */

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SERVICIOS } from '@/lib/site';

const ENLACES = [
  ...SERVICIOS.map((s) => ({ href: s.slug, label: s.corto })),
  { href: '/servicio-de-limpieza-cdmx', label: 'CDMX' },
  { href: '/preguntas-frecuentes', label: 'Preguntas' },
  { href: '/nosotros', label: 'Nosotros' },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#EDEDEA]">
      <nav
        aria-label="Navegación principal"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center shrink-0" aria-label="Limpieza México, inicio">
            <Image
              src="/logo_dark.png"
              alt="Limpieza México"
              width={200}
              height={64}
              priority
              className="h-11 lg:h-12 w-auto object-contain"
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-6 text-[15px]">
            {ENLACES.map((e) => {
              const activo = pathname === e.href;
              return (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    aria-current={activo ? 'page' : undefined}
                    className={`hover:underline underline-offset-4 decoration-2 ${
                      activo ? 'font-semibold underline decoration-[#2C7A4B]' : ''
                    }`}
                  >
                    {e.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/contacto"
                className="rounded-lg bg-[#2C7A4B] px-4 py-2.5 font-semibold text-white hover:bg-[#235f3b]"
              >
                Cotizar
              </Link>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            className="lg:hidden rounded-lg border-2 border-[#EDEDEA] px-3 py-2 font-medium"
          >
            {abierto ? 'Cerrar' : 'Menú'}
          </button>
        </div>

        {abierto && (
          <ul id="menu-movil" className="lg:hidden pb-4 space-y-1 border-t border-[#EDEDEA] pt-3">
            {ENLACES.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  onClick={() => setAbierto(false)}
                  className="block rounded-lg px-3 py-3 hover:bg-[#EDEDEA]"
                >
                  {e.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contacto"
                onClick={() => setAbierto(false)}
                className="block rounded-lg bg-[#2C7A4B] px-3 py-3 text-center font-semibold text-white"
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
