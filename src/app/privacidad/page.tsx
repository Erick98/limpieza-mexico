import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al inicio
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
             <ShieldCheck className="w-8 h-8"/>
          </div>
          
          <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">Aviso de Privacidad</h1>
          
          <div className="prose prose-emerald max-w-none text-gray-700 space-y-6">
            <p className="font-medium text-lg text-gray-900">Última actualización: <strong>28 de Marzo, 2026</strong></p>
            
            <p>
              En <strong>Limpieza México</strong>, con sede en Ciudad de México, nuestro compromiso es salvaguardar
              la privacidad y protección de los datos personales y corporativos de nuestros clientes, prospectos y
              usuarios de nuestra plataforma web. Este Aviso de Privacidad regula la recolección, uso y protección
              de la información obtenida a través de nuestro sitio web y servicios digitales.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Datos que Recopilamos</h3>
            <p>Recopilamos información personal y empresarial de manera directa y transparente cuando interactúa con nosotros, la cual puede incluir:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Nombres y apellidos, información de contacto (correo electrónico, domicilio fiscal y operativo, números de teléfono corporativos).</li>
              <li>Información comercial detallada para la emisión de cotizaciones como tamaño de plantilla, dimensiones de instalaciones y requerimientos técnicos específicos.</li>
              <li>El procesamiento de datos de pagos (tarjetas de crédito/débito) se realiza a través de pasarelas de pago externas certificadas bajo normativas PCI DSS (como Stripe). No almacenamos directamente ninguna información financiera sensible en nuestros servidores.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Uso y Finalidad de los Datos</h3>
            <p>Los datos obtenidos son empleados con el propósito principal de operar nuestro modelo de negocio B2B, lo que incluye:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Elaborar y proveer propuestas técnico-comerciales precisas.</li>
              <li>Gestionar y ejecutar los contratos operativos de mantenimiento y servicios de limpieza especializados.</li>
              <li>Facturación y administración de cobranza.</li>
              <li>Para fines analíticos, estadísticos de conversión y retargeting a través de herramientas como Google Tag Manager, integradas con estricto apego a leyes vigentes.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Transferencia de Información</h3>
            <p>
              Garantizamos que su información no será vendida, transferida ni prestada a terceros para ninguna finalidad comercial externa que difiera 
              de nuestro operativo de limpieza comercial. Podemos llegar a compartir datos exclusivamente con proveedores de servicios de alojamiento en 
              la nube o procesamiento de pagos contratados para cumplir nuestras obligaciones, quienes operan resguardando la misma confidencialidad.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Derechos ARCO</h3>
            <p>
              En cualquier momento, usted como titular de sus datos personales, o en su caso su representante legal, podrá ejercer los derechos de Acceso, 
              Rectificación, Cancelación u Oposición (ARCO) estipulados en las normativas federales. Para ejercerlos, deberá enviar una solicitud por escrito
              a través de nuestros canales oficiales de atención al cliente.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Modificaciones a las Políticas</h3>
            <p>
              Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente aviso de privacidad,
              para la atención de novedades legislativas o políticas internas adaptadas al cumplimiento digital. Estas modificaciones 
              estarán disponibles al público a través de esta misma URL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
