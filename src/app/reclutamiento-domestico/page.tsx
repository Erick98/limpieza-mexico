import { CheckCircle2, HeartHandshake, ShieldCheck, UserCheck } from "lucide-react";
import Link from "next/link";

export default function ReclutamientoDomestico() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Reclutamiento <span className="text-emerald-600">Doméstico Premium</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Confíe el cuidado de su hogar y familia a los mejores profesionales de México. Procesos estrictos de selección, garantías legales y seguimiento constante.
          </p>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-500" /> <span className="text-sm font-medium">Antecedentes verificados</span></div>
            <div className="flex items-center gap-2"><UserCheck className="w-5 h-5 text-emerald-500" /> <span className="text-sm font-medium">Test Psicológico</span></div>
            <div className="flex items-center gap-2"><HeartHandshake className="w-5 h-5 text-emerald-500" /> <span className="text-sm font-medium">Garantía de reemplazo</span></div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {[
            {
              id: "limpieza",
              title: "Personal de Limpieza y Mantenimiento",
              desc: "Auxiliares generales, mozos y jardineros. Encargados de la limpieza diaria, lavandería básica y mantenimiento del hogar.",
              img: "/images/dom_cleaning.png"
            },
            {
              id: "nineras",
              title: "Niñeras (Nannies) y Puericultoras",
              desc: "Personal capacitado en primeros auxilios, desarrollo infantil y pedagogía básica para el cuidado integral de sus hijos.",
              img: "/images/dom_nanny.png"
            },
            {
              id: "amas-de-llaves",
              title: "Amas de Llaves (House Managers)",
              desc: "Profesionales capaces de gestionar el funcionamiento completo de la residencia: proveedores, presupuesto, personal y eventos.",
              img: "/images/dom_housekeeper.png"
            },
            {
              id: "cocineras",
              title: "Cocineras y Chefs Privados",
              desc: "Expertos en alta cocina, nutrición, menús especializados (veganos, keto, celíacos) e inventarios de alacenas.",
              img: "/images/dom_cook.png"
            }
          ].map((cat) => (
            <div key={cat.id} id={cat.id} className="flex flex-col sm:flex-row gap-6 bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:border-emerald-200 transition-colors scroll-mt-32">
              <img src={cat.img} alt={cat.title} className="w-full sm:w-48 h-48 object-cover rounded-2xl shadow-sm" />
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{cat.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{cat.desc}</p>
                <Link href="/contacto" className="text-emerald-600 font-semibold hover:text-emerald-700 mt-auto inline-flex">Solicitar Perfiles &rarr;</Link>
              </div>
            </div>
          ))}
        </div>

        {/* Legal section */}
        <div id="nomina" className="bg-emerald-900 text-white rounded-3xl p-12 md:p-16 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center scroll-mt-32">
          <div className="w-full md:w-2/3 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Gestión de Nómina y Cumplimiento Legal</h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
              Nos encargamos de las altas patronales, pagos de IMSS, contratos, recibos de nómina y resolución de problemas laborales. Usted solo se preocupa por disfrutar de la tranquilidad en su hogar.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Contratos Formales', 'Alta al IMSS obligatoria', 'Cálculo de finiquitos', 'Manejo de incidencias'].map((item, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> {item}</li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3 relative z-10 text-center">
            <Link href="/contacto" className="inline-block bg-white text-emerald-900 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Asesoría Legal Gratuita
            </Link>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-emerald-800 skew-x-12 translate-x-16 z-0 opacity-50" />
        </div>

      </div>
    </div>
  );
}
