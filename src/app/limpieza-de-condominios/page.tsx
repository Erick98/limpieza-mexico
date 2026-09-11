import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Cotizador from '@/components/cotizador/Cotizador';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/ui/Faq';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TrustPanel from '@/components/marketing/TrustPanel';
import { pageMetadata, faqLd, breadcrumbLd, serviceLd } from '@/lib/seo';
import { FAQ_CONDOMINIOS } from '@/lib/contenido';

/**
 * Intención: administrador de condominio, comité de vigilancia o mesa directiva que
 * busca proveedor para ÁREAS COMUNES. No compite con /limpieza-de-oficinas (intención
 * transaccional local de oficina) ni con /limpieza-corporativa (contrato B2B multi-sitio).
 * El interlocutor aquí decide en grupo y tiene que justificar el gasto ante la asamblea,
 * por eso el contenido carga hacia alcance, frecuencias y contrato, no hacia "calidad".
 */

const PATH = '/limpieza-de-condominios';

export const metadata: Metadata = pageMetadata({
  title: 'Limpieza de condominios y áreas comunes',
  description:
    'Limpieza de áreas comunes en condominios de CDMX: lobby, pasillos, elevadores, estacionamientos, amenidades y cuarto de basura. Cotiza el alcance.',
  path: PATH,
  keywords: [
    'limpieza de condominios',
    'limpieza de áreas comunes',
    'empresa de limpieza para condominios cdmx',
    'servicio de limpieza para edificios',
    'limpieza de estacionamientos y amenidades',
  ],
});

const MIGAS = [
  { name: 'Inicio', path: '/' },
  { name: 'Limpieza de condominios', path: PATH },
];

const ESPACIOS = [
  [
    'Lobby y recepción',
    'Es la primera impresión del inmueble y la que más reclama el residente. Pisos, cristales de acceso, mobiliario, directorio y control de huellas en superficies de contacto, con repaso durante el día en edificios de alto movimiento.',
  ],
  [
    'Pasillos y escaleras',
    'Barrido y trapeado por nivel, limpieza de barandales y puertas de acceso, y atención específica a las escaleras de emergencia, que casi siempre son el espacio más descuidado de un condominio.',
  ],
  [
    'Elevadores',
    'Limpieza de piso, espejos, acero inoxidable y botonera, que es una superficie de contacto de uso constante. Se coordina con mantenimiento para no trabajar cuando el equipo está en servicio.',
  ],
  [
    'Estacionamientos y sótanos',
    'Barrido de cajones y circulaciones, limpieza de rampas y señalización, retiro de residuos abandonados y lavado mecanizado programado. Se requiere coordinar con residentes para liberar niveles por etapas.',
  ],
  [
    'Amenidades',
    'Alberca, gimnasio, salón de usos múltiples, roof garden, ludoteca y sanitarios de amenidad. La frecuencia se define por uso real y por el calendario de reservas, no por regla fija.',
  ],
  [
    'Cuarto de basura y residuos',
    'Recolección de botes de áreas comunes, traslado, lavado y desinfección del cuarto de basura, y acomodo para entrega conforme a la separación que exija la alcaldía. Es el punto que genera más quejas cuando falla.',
  ],
] as const;

const FRECUENCIAS = [
  ['Lobby, recepción y elevadores', 'Diario, con repaso en horas pico', 'Es lo que ve todo residente y visitante, varias veces al día.'],
  ['Pasillos y escaleras', 'Diario o cada tercer día', 'Depende del número de unidades por nivel y de si hay mascotas.'],
  ['Sanitarios de áreas comunes', 'Diario', 'Alto tráfico y la falla se vuelve queja inmediata.'],
  ['Cuarto de basura', 'Diario', 'Un día sin atención genera olor, fauna nociva y reclamo vecinal.'],
  ['Estacionamiento (barrido)', 'Semanal', 'Acumula polvo, hojas y residuos; el barrido frecuente evita el lavado costoso.'],
  ['Estacionamiento (lavado mecanizado)', 'Mensual o trimestral', 'Requiere liberar niveles por etapas y equipo específico.'],
  ['Amenidades', 'Según uso y calendario de reservas', 'Un gimnasio usado a diario no se compara con un salón que se reserva dos veces al mes.'],
  ['Cristales y cancelería de áreas comunes', 'Mensual o trimestral', 'En temporada seca el polvo se nota antes; en altura requiere equipo para trabajo en alturas.'],
] as const;

export default function LimpiezaCondominios() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(MIGAS),
          faqLd([...FAQ_CONDOMINIOS]),
          serviceLd({
            name: 'Limpieza de condominios y áreas comunes',
            description:
              'Servicio de limpieza de áreas comunes para condominios en CDMX y Zona Metropolitana: lobby, pasillos, elevadores, estacionamientos, amenidades, cuarto de basura y manejo interno de residuos, coordinado con administración y comité.',
            path: PATH,
            areaServed: ['Ciudad de México', 'Estado de México'],
          }),
        ]}
      />

      <div className="lm-container pt-8">
        <Breadcrumbs items={MIGAS} />
      </div>

      <section className="lm-container grid gap-10 pb-14 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div>
          <p className="lm-chip">Condominios · Administración · Comité</p>
          <h1 className="mt-5 font-display text-[2.9rem] leading-[1] tracking-[-0.045em] text-[#101014] sm:text-6xl">
            Limpieza de condominios y áreas comunes
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#1F1F25]/78">
            Servicio para edificios y conjuntos habitacionales en CDMX y Zona Metropolitana:
            lobby, pasillos, elevadores, estacionamientos, amenidades y cuarto de basura, con
            alcance y frecuencias escritas por espacio.
          </p>
          <p className="mt-5 max-w-2xl rounded-2xl border border-black/10 bg-white p-5 text-[15px] leading-7 text-[#1F1F25]/75">
            <strong className="font-bold text-[#101014]">Resumen citable:</strong> Limpieza México
            atiende áreas comunes de condominios en la Ciudad de México y la Zona Metropolitana.
            El servicio se cotiza por superficie de áreas comunes, número de torres y niveles,
            amenidades incluidas y frecuencia por espacio; se coordina con la administración, el
            comité y el personal de vigilancia, e incluye el manejo interno de residuos hasta su
            entrega al servicio de recolección.
          </p>
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_70px_rgba(31,31,37,0.08)]">
            <Image
              src="/images/cta_modern_building.png"
              alt="Lobby de edificio residencial limpio, como referencia ambiental de áreas comunes"
              width={768}
              height={768}
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </div>
        <div className="scroll-mt-24">
          <Cotizador />
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="lm-container grid gap-12 py-16 lg:grid-cols-[1fr_0.82fr]">
          <div className="lm-prose max-w-3xl">
            <h2 className="!mt-0">Por qué un condominio no se cotiza como una oficina</h2>
            <p>
              En una oficina hay un solo responsable y un horario claro. En un condominio hay
              administración, comité de vigilancia, asamblea y decenas de residentes que usan el
              inmueble a todas horas y opinan sobre el resultado. Eso cambia la operación completa:
              no existe una ventana en la que el edificio esté vacío, el trabajo se hace entre
              gente, y cualquier decisión que afecte el uso de un espacio —lavar un nivel de
              estacionamiento, cerrar el gimnasio dos horas— hay que avisarla con anticipación.
            </p>
            <p>
              También cambia quién paga. El servicio sale de la cuota de mantenimiento, así que el
              administrador tiene que poder explicar el gasto y sostenerlo frente a la asamblea.
              Una propuesta que solo dice &ldquo;limpieza de áreas comunes&rdquo; con un monto
              mensual es imposible de defender. Por eso entregamos el alcance desglosado por
              espacio y frecuencia: para que la discusión sea sobre el servicio y no sobre la
              factura.
            </p>
            <h2>Cómo se cotiza un condominio</h2>
            <p>
              Cuatro variables definen el operativo. La primera es la superficie de áreas comunes,
              que no es la superficie del terreno ni la suma de los departamentos: es lo que
              realmente se limpia. La segunda es el número de torres y niveles, porque cada torre
              implica traslados, y los traslados consumen jornada. La tercera son las amenidades
              incluidas, que es donde más varía el resultado: un conjunto con alberca, gimnasio y
              dos sótanos requiere más operativo que otro con el doble de unidades y sin nada de
              eso. La cuarta es la frecuencia por espacio.
            </p>
            <p>
              Por eso el número de departamentos, que es el dato que casi todos ofrecen primero, es
              el menos útil de los cuatro. Un condominio de 60 unidades con amenidades completas
              lleva más gente que uno de 120 sin ellas.
            </p>
            <h2>Coordinación con administración, comité y vigilancia</h2>
            <p>
              Antes del arranque se acuerdan cinco cosas: el horario de acceso del personal, el
              registro en caseta, el uso del elevador de servicio, las áreas restringidas y a quién
              se le reporta una incidencia. Ese último punto evita el problema más común en
              condominios: que cada residente le dé instrucciones distintas al personal de
              limpieza. El supervisor de la cuenta se entiende con la administración y con el jefe
              de vigilancia, y las solicitudes siguen un solo canal.
            </p>
            <p>
              Con mantenimiento la coordinación es operativa: no se limpia un elevador que está en
              servicio, no se lava un nivel de estacionamiento el día que trabajan en la bomba, y
              una limpieza de cisterna o un trabajo en alturas se programa como proyecto aparte con
              su propio aviso a residentes.
            </p>
            <h2>Qué debe quedar en el contrato</h2>
            <p>
              Alcance por área y frecuencia, personal asignado con horario, insumos y equipo
              cubiertos, exclusiones explícitas, mecanismo de supervisión con tiempo de respuesta,
              responsable de contacto por ambas partes, condiciones de facturación y causales de
              terminación. Para condominio conviene añadir dos cláusulas que casi siempre faltan:
              qué ocurre en días festivos y quién cubre los consumibles de los sanitarios comunes.
              Son la discusión más recurrente a los tres meses de firmado.
            </p>
            <p>
              Si están armando el comparativo para la asamblea, la{' '}
              <Link href="/guias/contrato-de-limpieza-clausulas">guía de cláusulas del contrato</Link>{' '}
              y el{' '}
              <Link href="/guias/elegir-empresa-limpieza-condominio">
                checklist para administradores y comités
              </Link>{' '}
              están escritos exactamente para eso.
            </p>
          </div>
          <div className="space-y-5 lg:sticky lg:top-28">
            <TrustPanel compact />
            <div className="rounded-[1.75rem] bg-[#101014] p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C9A24A]">
                Para la asamblea
              </p>
              <p className="mt-3 text-sm leading-6 text-white/75">
                Entregamos la propuesta con alcance desglosado por espacio y frecuencia, en el
                formato que necesiten para presentarla ante el comité o la asamblea.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lm-container py-16">
        <h2 className="font-display text-4xl text-[#101014]">Espacios que cubre el servicio</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ESPACIOS.map(([t, d]) => (
            <article key={t} className="lm-card p-6">
              <h3 className="font-display text-2xl text-[#101014]">{t}</h3>
              <p className="mt-3 text-[15px] leading-7 text-[#1F1F25]/70">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="lm-container py-16">
          <h2 className="max-w-3xl font-display text-4xl leading-tight text-[#101014]">
            Frecuencias típicas por espacio
          </h2>
          <p className="mt-5 max-w-3xl text-[17px] leading-8 text-[#1F1F25]/75">
            Punto de partida para armar el alcance, no una regla. La frecuencia real se ajusta al
            tráfico del inmueble y al presupuesto aprobado; el{' '}
            <Link href="/guias/frecuencias-limpieza-areas-comunes" className="font-bold underline underline-offset-4">
              detalle por espacio está en la guía de frecuencias
            </Link>
            .
          </p>
          <div className="mt-8 overflow-x-auto rounded-[1.75rem] border border-black/10">
            <table className="w-full min-w-[46rem] border-collapse bg-white text-left text-[15px]">
              <caption className="sr-only">
                Frecuencias típicas de limpieza por espacio en un condominio y su justificación.
              </caption>
              <thead>
                <tr className="bg-[#101014] text-white">
                  <th scope="col" className="p-4 font-semibold">Espacio</th>
                  <th scope="col" className="p-4 font-semibold">Frecuencia típica</th>
                  <th scope="col" className="p-4 font-semibold">Por qué</th>
                </tr>
              </thead>
              <tbody>
                {FRECUENCIAS.map(([espacio, frecuencia, porQue]) => (
                  <tr key={espacio} className="border-t border-black/10">
                    <th scope="row" className="p-4 align-top font-bold text-[#101014]">{espacio}</th>
                    <td className="p-4 align-top leading-7 text-[#1F1F25]/78">{frecuencia}</td>
                    <td className="p-4 align-top leading-7 text-[#1F1F25]/70">{porQue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="lm-container py-16">
        <div className="lm-card p-8">
          <h2 className="font-display text-3xl text-[#101014]">Servicios relacionados</h2>
          <p className="mt-4 max-w-3xl text-[16px] leading-8 text-[#1F1F25]/75">
            Si además del condominio administras oficinas o necesitas un contrato que cubra varias
            sedes, revisa{' '}
            <Link href="/limpieza-corporativa" className="font-bold underline underline-offset-4">
              limpieza corporativa por contrato
            </Link>
            . Para trabajos puntuales como cisternas, fachadas, trabajo en alturas, post-obra o
            control de plagas, esos se programan como proyecto desde{' '}
            <Link href="/limpieza-especializada" className="font-bold underline underline-offset-4">
              limpieza especializada
            </Link>
            . Y si estás comparando proveedores, los criterios están en{' '}
            <Link
              href="/mejor-empresa-de-limpieza-en-mexico"
              className="font-bold underline underline-offset-4"
            >
              cómo elegir empresa de limpieza
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="lm-container max-w-4xl pb-16">
        <Faq faqs={[...FAQ_CONDOMINIOS]} titulo="Preguntas de administradores y comités" />
      </section>
    </>
  );
}
