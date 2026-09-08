import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { pageMetadata, breadcrumbLd } from '@/lib/seo';
import { ADDRESS, EMAIL_CONTACTO } from '@/lib/site';

const PATH = '/privacidad';

export const metadata: Metadata = pageMetadata({
  title: 'Aviso de privacidad',
  description:
    'Aviso de privacidad de Limpieza México: qué datos recabamos a través del formulario de cotización, para qué los usamos y cómo ejercer tus derechos ARCO.',
  path: PATH,
});

const MIGAS = [
  { name: 'Inicio', path: '/' },
  { name: 'Aviso de privacidad', path: PATH },
];

/**
 * ACTUALIZADO 2026-09-01. La versión anterior describía el tratamiento de datos de
 * una plataforma con registro de cuenta y pagos con Stripe. Esa plataforma se dio de
 * baja: hoy el sitio sólo recaba datos de contacto mediante el formulario de
 * cotización y NO procesa pagos en línea. Mantener el texto viejo sería declarar un
 * tratamiento de datos que no ocurre.
 *
 * PENDIENTE_ERICK: revisión por el área legal antes de publicar a producción.
 */
export default function PrivacidadPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(MIGAS)} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Breadcrumbs items={MIGAS} />

        <h1 className="font-display text-[32px] leading-tight sm:text-5xl mb-6">
          Aviso de privacidad
        </h1>

        <div className="space-y-4 text-[16px] leading-[1.75] text-[#1F1F25]/85">
          <p className="text-[#62626B]">Última actualización: 1 de septiembre de 2026.</p>

          <p>
            Limpieza México, con domicilio en {ADDRESS.full}, es responsable del
            tratamiento de los datos personales que recabamos a través de este sitio web,
            conforme a la Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares.
          </p>

          <h2 className="font-display text-2xl pt-6 text-[#1F1F25]">
            1. Qué datos recabamos
          </h2>
          <p>
            Únicamente los que tú nos proporcionas de forma voluntaria en el formulario de
            cotización: tu nombre, un medio de contacto (correo electrónico o número
            telefónico) y la información del servicio que necesitas —tipo de inmueble,
            superficie aproximada, frecuencia y zona—, además de cualquier detalle que
            decidas escribir en el campo de comentarios.
          </p>
          <p>
            Este sitio <strong>no</strong> tiene registro de cuentas de usuario y{' '}
            <strong>no</strong> procesa pagos en línea, por lo que no recabamos
            contraseñas ni información financiera o de tarjetas bancarias.
          </p>

          <h2 className="font-display text-2xl pt-6 text-[#1F1F25]">
            2. Para qué los usamos
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Elaborar y enviarte la cotización que solicitaste.</li>
            <li>Contactarte para aclarar los datos necesarios para esa cotización.</li>
            <li>
              Dar seguimiento comercial a tu solicitud y, en su caso, formalizar y ejecutar
              la prestación del servicio.
            </li>
            <li>
              Emitir la facturación correspondiente si decides contratar, para lo cual
              solicitaremos por separado tus datos fiscales.
            </li>
          </ul>

          <h2 className="font-display text-2xl pt-6 text-[#1F1F25]">
            3. Transferencia de datos
          </h2>
          <p>
            No vendemos, rentamos ni transferimos tus datos personales a terceros con fines
            comerciales ajenos a la prestación de nuestro servicio. Únicamente los
            compartimos con los proveedores tecnológicos que hacen funcionar este sitio y
            nuestro correo corporativo (alojamiento web y servicio de correo electrónico),
            que los tratan conforme a sus propias obligaciones de confidencialidad y solo
            para esa finalidad.
          </p>

          <h2 className="font-display text-2xl pt-6 text-[#1F1F25]">
            4. Cookies y analítica
          </h2>
          <p>
            Este sitio utiliza Google Analytics para medir el tráfico de forma agregada
            (páginas vistas, origen de la visita, tipo de dispositivo). Esa herramienta
            emplea cookies propias de Google. Puedes bloquearlas o eliminarlas desde la
            configuración de tu navegador sin que ello impida usar el sitio ni solicitar
            una cotización.
          </p>

          <h2 className="font-display text-2xl pt-6 text-[#1F1F25]">
            5. Derechos ARCO
          </h2>
          <p>
            Puedes solicitar en cualquier momento el Acceso, Rectificación, Cancelación u
            Oposición al tratamiento de tus datos personales, así como revocar el
            consentimiento que nos otorgaste. Envía tu solicitud a{' '}
            <a href={`mailto:${EMAIL_CONTACTO}`} className="underline underline-offset-4">
              {EMAIL_CONTACTO}
            </a>{' '}
            indicando tu nombre, el medio de contacto que nos proporcionaste y el derecho
            que deseas ejercer. Te responderemos por la misma vía.
          </p>

          <h2 className="font-display text-2xl pt-6 text-[#1F1F25]">
            6. Cambios a este aviso
          </h2>
          <p>
            Cualquier modificación a este aviso de privacidad se publicará en esta misma
            dirección, indicando la fecha de la última actualización.
          </p>
        </div>
      </div>
    </>
  );
}
