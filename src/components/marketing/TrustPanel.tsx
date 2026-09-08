import Link from 'next/link';
import { PHONE_DISPLAY, PHONE_E164, whatsappUrl } from '@/lib/site';

const CHECKS = [
  'Personal formal y supervisión por cuenta',
  'Insumos y equipo definidos desde la propuesta',
  'Cotización por superficie, frecuencia y horario',
  'Servicio para oficinas, hogares y trabajos especializados',
];

export default function TrustPanel({ compact = false }: { compact?: boolean }) {
  const wa = whatsappUrl('Hola, quiero cotizar un servicio de limpieza en CDMX.');
  return (
    <aside className={`rounded-[2rem] border border-black/10 bg-[#FAFAF7] p-6 shadow-[0_24px_80px_rgba(31,31,37,0.10)] ${compact ? '' : 'lg:p-8'}`}>
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#2F5D50]">Cotización clara</p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-[#101014]">Dinos el espacio; te decimos el operativo.</h2>
      <p className="mt-4 text-[15px] leading-7 text-[#1F1F25]/75">
        Sin tarifas inventadas: calculamos personal, horas, insumos, frecuencia y accesos antes de prometer precio.
      </p>
      <ul className="mt-6 space-y-3 text-[15px] text-[#1F1F25]/85">
        {CHECKS.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-1 size-2 rounded-full bg-[#2F5D50]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {wa && (
          <a className="rounded-full bg-[#2F5D50] px-5 py-3 text-center text-sm font-bold text-white hover:bg-[#24483f]" href={wa}>
            WhatsApp {PHONE_DISPLAY}
          </a>
        )}
        <Link className="rounded-full border border-[#1F1F25]/20 px-5 py-3 text-center text-sm font-bold hover:bg-white" href="/contacto">
          Formulario
        </Link>
      </div>
      <p className="mt-4 text-xs text-[#1F1F25]/55">Teléfono real: {PHONE_E164}. Atención sujeta a confirmación de disponibilidad.</p>
    </aside>
  );
}
