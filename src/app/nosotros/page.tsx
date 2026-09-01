import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { pageMetadata, breadcrumbLd } from '@/lib/seo';
import { ADDRESS, COBERTURA } from '@/lib/site';

const PATH = '/nosotros';

export const metadata: Metadata = pageMetadata({
  title: 'Nosotros',
  description:
    'Quiénes somos, cómo trabajamos y qué asumimos como empresa de limpieza: relación laboral formal, verificación del personal y supervisión de cada cuenta.',
  path: PATH,
});

const MIGAS = [
  { name: 'Inicio', path: '/' },
  { name: 'Nosotros', path: PATH },
];

/**
 * NOTA (2026-09-01): la versión anterior de esta página publicaba "15+ años",
 * "2,500+ colaboradores", "15M m² limpiados mensuales" e "ISO 9001". Ninguno de esos
 * datos está respaldado. Se eliminaron todos: publicar una certificación que no se
 * tiene es, además de falso, un problema legal. Si Erick confirma cifras o
 * certificaciones reales y verificables, se reincorporan aquí. PENDIENTE_ERICK.
 */
export default function Nosotros() {
  return (
    <>
      <JsonLd data={breadcrumbLd(MIGAS)} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs items={MIGAS} />
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-display text-[32px] leading-tight sm:text-5xl mb-5">
            Una empresa de limpieza que asume lo que otras dejan al cliente
          </h1>
          <p className="text-lg leading-relaxed text-[#1F1F25]/80">
            Somos una empresa de servicios de limpieza y mantenimiento con base en Polanco,
            Ciudad de México. Atendemos oficinas, corporativos, condominios, comercios y
            hogares en la CDMX y la Zona Metropolitana.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden border border-[#EDEDEA]">
          <Image
            src="/images/team_group.png"
            alt="Equipo de trabajo de Limpieza México"
            width={900}
            height={600}
            sizes="(max-width: 1024px) 100vw, 520px"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      <section className="border-y border-[#EDEDEA]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 space-y-4 text-[16px] leading-[1.75] text-[#1F1F25]/85">
          <h2 className="font-display text-3xl mb-3 text-[#1F1F25]">Cómo trabajamos</h2>
          <p>
            La limpieza es un servicio donde casi todo el valor está en la parte que el
            cliente no ve: quién es la persona que entra a su oficina o a su casa, si está
            contratada en regla, si alguien la supervisó, y qué pasa el día que no puede
            asistir. Esa es la parte que nosotros asumimos.
          </p>
          <p>
            El personal que asignamos trabaja bajo relación laboral formal, con alta ante
            el IMSS y prestaciones de ley. Antes de asignar a alguien a un inmueble
            verificamos identidad, domicilio y referencias laborales. Cuando alguien falta,
            la cobertura del relevo es obligación nuestra, no un problema del cliente.
          </p>
          <p>
            Cada cuenta tiene un supervisor responsable con nombre y canal directo. Si algo
            no se hizo como se acordó, hay a quién decírselo y un tiempo de respuesta
            comprometido para corregirlo. Suena básico, pero es exactamente donde falla la
            mayoría de los proveedores del sector.
          </p>

          <h2 className="font-display text-3xl pt-6 mb-3 text-[#1F1F25]">
            Cómo cotizamos
          </h2>
          <p>
            Por proyecto, no con tarifario. Calculamos personal, horas, insumos y equipo a
            partir de la superficie real, el tipo de inmueble y la frecuencia que necesitas.
            La propuesta se entrega con el alcance detallado y con lo que queda fuera del
            alcance escrito de forma explícita, porque ahí nacen la mayoría de los
            conflictos con proveedores de limpieza.
          </p>
          <p>
            Para proyectos grandes hacemos una visita de levantamiento sin costo. Medir en
            sitio evita las sorpresas que después se convierten en discusiones de factura.
          </p>

          <h2 className="font-display text-3xl pt-6 mb-3 text-[#1F1F25]">
            Dónde operamos
          </h2>
          <ul className="space-y-2">
            {COBERTURA.map((c) => (
              <li key={c} className="flex gap-3">
                <span aria-hidden="true" className="text-[#2C7A4B]">
                  ·
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <p className="pt-2">
            Nuestras oficinas están en {ADDRESS.full}. Si tu inmueble está fuera de esa
            cobertura, escríbenos: según el tamaño del proyecto podemos evaluarlo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14 text-center">
        <h2 className="font-display text-3xl mb-4">¿Trabajamos juntos?</h2>
        <p className="text-[16px] text-[#1F1F25]/75 mb-7">
          Cuéntanos qué necesitas y te enviamos la propuesta sin costo.
        </p>
        <Link
          href="/contacto"
          className="inline-flex rounded-lg bg-[#2C7A4B] px-7 py-3.5 font-semibold text-white hover:bg-[#235f3b]"
        >
          Solicitar cotización
        </Link>
      </section>
    </>
  );
}
