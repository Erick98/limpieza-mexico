import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { pageMetadata, breadcrumbLd } from '@/lib/seo';
import { EMAIL_CONTACTO } from '@/lib/site';

const PATH = '/terminos';

export const metadata: Metadata = pageMetadata({
  title: 'Términos y condiciones',
  description:
    'Términos y condiciones de uso del sitio de Limpieza México y del formulario de solicitud de cotización de servicios de limpieza y mantenimiento.',
  path: PATH,
});

const MIGAS = [
  { name: 'Inicio', path: '/' },
  { name: 'Términos y condiciones', path: PATH },
];

/**
 * ACTUALIZADO 2026-09-01. La versión anterior regulaba una plataforma con cuentas de
 * usuario, checkout de Stripe, panel de cliente y política de reembolsos. Nada de eso
 * existe hoy: el sitio es informativo y capta solicitudes de cotización. Dejar el
 * texto viejo describiría obligaciones sobre un servicio inexistente.
 *
 * PENDIENTE_ERICK: revisión por el área legal antes de publicar a producción.
 */
export default function TerminosPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(MIGAS)} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Breadcrumbs items={MIGAS} />

        <h1 className="font-display text-[32px] leading-tight sm:text-5xl mb-6">
          Términos y condiciones
        </h1>

        <div className="space-y-4 text-[16px] leading-[1.75] text-[#1F1F25]/85">
          <p className="text-[#62626B]">Vigentes desde el 1 de septiembre de 2026.</p>

          <p>
            Estos términos regulan el uso de este sitio web y el envío de solicitudes de
            cotización a Limpieza México. Al utilizar el sitio, aceptas lo aquí descrito.
          </p>

          <h2 className="font-display text-2xl pt-6 text-[#1F1F25]">
            1. Naturaleza del sitio
          </h2>
          <p>
            Este sitio es informativo y sirve para solicitar cotizaciones de servicios de
            limpieza y mantenimiento. No es una tienda en línea: no se realizan pagos ni se
            formalizan contrataciones a través de él, y no requiere registro de cuenta.
          </p>

          <h2 className="font-display text-2xl pt-6 text-[#1F1F25]">
            2. Sobre las cotizaciones
          </h2>
          <p>
            La información que envías por el formulario nos permite preparar una propuesta.
            Toda cotización que emitimos es un presupuesto estimado, sujeto a confirmación
            tras verificar las condiciones reales del inmueble, la disponibilidad de
            personal y la cobertura geográfica. Una cotización no constituye por sí misma
            un contrato ni obliga a ninguna de las partes hasta que exista un acuerdo
            firmado.
          </p>
          <p>
            La prestación efectiva del servicio, su alcance, precio, vigencia y condiciones
            de cancelación se rigen exclusivamente por el contrato de prestación de
            servicios que ambas partes suscriban, no por este sitio.
          </p>

          <h2 className="font-display text-2xl pt-6 text-[#1F1F25]">
            3. Obligaciones de quien usa el sitio
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Proporcionar información veraz en el formulario de cotización.</li>
            <li>
              Contar con facultades suficientes para solicitar la cotización cuando se haga
              a nombre de una empresa u organización.
            </li>
            <li>
              No utilizar el formulario para enviar solicitudes falsas, masivas o
              automatizadas.
            </li>
          </ul>

          <h2 className="font-display text-2xl pt-6 text-[#1F1F25]">
            4. Uso indebido del formulario
          </h2>
          <p>
            Aplicamos medidas técnicas para evitar el envío automatizado de solicitudes,
            incluidos límites de frecuencia por dirección IP. Nos reservamos el derecho de
            bloquear el acceso a quien intente saturar el formulario, enviar contenido
            malicioso o vulnerar la seguridad del sitio.
          </p>

          <h2 className="font-display text-2xl pt-6 text-[#1F1F25]">
            5. Propiedad intelectual
          </h2>
          <p>
            La marca, el logotipo, los textos, las imágenes y el código de este sitio son
            propiedad de Limpieza México y están protegidos por la legislación aplicable.
            Su reproducción total o parcial requiere autorización previa por escrito.
          </p>

          <h2 className="font-display text-2xl pt-6 text-[#1F1F25]">
            6. Contacto y jurisdicción
          </h2>
          <p>
            Para cualquier duda sobre estos términos, escríbenos a{' '}
            <a href={`mailto:${EMAIL_CONTACTO}`} className="underline underline-offset-4">
              {EMAIL_CONTACTO}
            </a>
            . Para la interpretación y cumplimiento de estos términos, las partes se
            someten a la jurisdicción de los tribunales competentes de la Ciudad de México,
            renunciando a cualquier otro fuero que pudiera corresponderles.
          </p>
        </div>
      </div>
    </>
  );
}
