import Link from 'next/link';
import Image from 'next/image';
import { SERVICIOS } from '@/lib/site';

const ENLACES = [
  { href: '/servicio-de-limpieza-cdmx', label: 'CDMX' },
  ...SERVICIOS.map((s) => ({ href: s.slug, label: s.corto })),
  { href: '/preguntas-frecuentes', label: 'FAQ' },
  { href: '/nosotros', label: 'Nosotros' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#FAFAF7]/92 backdrop-blur-xl">
      <nav aria-label="Navegación principal" className="lm-container">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center shrink-0" aria-label="Limpieza México, inicio">
            <Image src="/logo_dark.png" alt="Limpieza México" width={200} height={64} priority className="h-12 w-auto object-contain lg:h-14" />
          </Link>

          <ul className="hidden items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1 text-[14px] font-semibold shadow-sm lg:flex">
            {ENLACES.map((e) => <li key={e.href}><Link href={e.href} className="block rounded-full px-4 py-2.5 text-[#1F1F25]/75 transition-colors hover:bg-[#EDEDEA] hover:text-[#1F1F25]">{e.label}</Link></li>)}
          </ul>

          <Link href="/contacto" className="hidden lg:inline-flex lm-button-primary">Cotizar</Link>

          <details className="group relative lg:hidden">
            <summary className="list-none rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-bold marker:hidden">Menú</summary>
            <div className="absolute right-0 top-12 w-[min(82vw,22rem)] rounded-[1.5rem] border border-black/10 bg-white p-2 shadow-2xl">
              <ul className="space-y-1">
                {ENLACES.map((e) => <li key={e.href}><Link href={e.href} className="block rounded-2xl px-4 py-3 font-semibold hover:bg-[#FAFAF7]">{e.label}</Link></li>)}
                <li><Link href="/contacto" className="mt-2 block rounded-full bg-[#2F5D50] px-4 py-3 text-center font-bold text-white">Cotizar ahora</Link></li>
              </ul>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
