import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Inicio
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
             <FileText className="w-8 h-8"/>
          </div>
          
          <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">Términos y Condiciones</h1>
          
          <div className="prose prose-emerald max-w-none text-gray-700 space-y-6">
            <p className="font-medium text-lg text-gray-900">Fecha de vigencia: <strong>28 de Marzo, 2026</strong></p>
            
            <p>
              Bienvenido a la plataforma en línea de <strong>Limpieza México</strong>. Al acceder, registrarse o utilizar cualquiera 
              de los servicios proporcionados dentro de este sitio web, usted comprende, acepta y se compromete íntegramente a 
              cumplir y a obligarse mediante los siguientes Términos y Condiciones Generales.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Objeto de los Servicios Comerciales</h3>
            <p>
              Limpieza México, a través de su infraestructura digital y de terceros, provee servicios de cotización automatizada, 
              venta de paquetes de servicios correctivos de limpieza, y gestión y firma de contratos B2B 
              orientados a empresas en todo el territorio mexicano y que incluye provisión y logística de personal, consumibles
              y equipos especializados de mantenimiento corporativo.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. De las Obligaciones del Usuario (Contratante)</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>El Usuario se compromete a que la información proporcionada a través de formularios es, en su totalidad, verídica y vigente.</li>
              <li>En caso de fungir como representante legal, cuenta con la total autorización administrativa de su empresa u organización para emitir y aceptar las solicitudes de contratación vía plataforma.</li>
              <li>Abonar puntualmente la contraprestación calculada en su Cotización de Servicio recurrente o único, mediante la plataforma habilitada.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Cotizaciones, Plataformas de Pago y Reembolsos</h3>
            <p>
              <strong>Emisión de Presupuesto Técnico:</strong> Limpieza México provee un estimado y no garantiza disponibilidad
              geográfica hasta que el área comercial emita y autorice una Cotización Oficial vía panel administrativo para que sea 
              aprobada en el Panel del Cliente.
            </p>
            <p>
              <strong>Procesamiento:</strong> Todas las liquidaciones económicas realizadas de manera transaccional y electrónica 
              en nuestra infraestructura son administradas mediante sistemas financieros de terceros de máxima seguridad mundial 
               (procesadores homologados para PCI DSS, ej. Stripe). Limpieza México nunca almacenará localmente números de tarjeta 
              de crédito/CVVs de los Usuarios.
            </p>
            <p>
              <strong>Políticas de Cancelación o Retorno:</strong> Los Contratos Recurrentes operan bajo los lineamientos jurídicos 
              plasmados en el contrato escrito físico/digital subyacente. Los Servicios por Evento pagados mediante checkout solo
              podrán ser reembolsados con deducciones operativas si la cancelación se solicita 48 horas o más previas a la hora programada del evento.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Restricciones a Múltiples Solicitudes y Prevención de SPAM</h3>
            <p>
              Garantizamos la correcta navegación siempre que el tráfico no incurra en prácticas negligentes, 
              uso de software fraudulento para generar requerimientos falsos ("Bots"), scraping u omisiones mal intencionadas que 
              saturen la base de datos empresarial. Nos reservamos de manera permanente el inobjetable derecho a vetar IP, 
              denegar la prestación del servicio a discreción e indexar usuarios maliciosos.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Propiedad Intelectual Digital</h3>
            <p>
              Queda reservada la totalidad de la marca, los logotipos "Limpieza México", el código de esta app ("App Landing y UI"), 
              y toda la estructura comercial.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Jurisdicción de Conformidad</h3>
            <p>
              Para cualquier asunto legal, el cliente y la empresa expresamente aceptan someterse a la competencia de los tribunales 
              establecidos y designados en Ciudad de México para la resolución jurisdiccional, renunciando así a otros marcos o instancias geográficas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
