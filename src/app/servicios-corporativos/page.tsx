import { Building2, CheckCircle2, Factory, GraduationCap, School, Utensils } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios Corporativos | B2B",
  description: "Planes de mantenimiento estructurado para oficinas, condominios, restaurantes y naves industriales. Personal uniformado, insumos incluidos y supervisión activa.",
};

export default function ServiciosCorporativos() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Servicios <span className="text-emerald-600">Corporativos</span>
          </h1>
          <p className="text-xl text-gray-600">
            Nuestros planes de mantenimiento estructurado garantizan un entorno higiénico, profesional y motivador para tu personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              id: "oficinas",
              icon: <Building2 className="w-12 h-12 text-emerald-500" />,
              title: "Limpieza para Oficinas",
              desc: "Mantenimiento diario o profundo, aspirado especializado y limpieza de mobiliario corporativo."
            },
            {
              id: "condominios",
              icon: <Building2 className="w-12 h-12 text-teal-500" />,
              title: "Condominios",
              desc: "Atención a áreas comunes, estacionamientos y amenidades para conjuntos residenciales o mixtos."
            },
            {
              id: "restaurantes",
              icon: <Utensils className="w-12 h-12 text-emerald-500" />,
              title: "Restaurantes",
              desc: "Desengrase industrial, sanitización de cocinas y pulido de áreas de comensales."
            },
            {
              id: "escuelas",
              icon: <GraduationCap className="w-12 h-12 text-teal-500" />,
              title: "Escuelas y Universidades",
              desc: "Desinfección de aulas, baños, áreas deportivas y zonas de alto tráfico estudiantil."
            },
            {
              id: "industriales",
              icon: <Factory className="w-12 h-12 text-emerald-500" />,
              title: "Naves Industriales",
              desc: "Limpieza de techos, lavado mecanizado de pisos epóxicos, recolección de merma."
            }
          ].map((item) => (
            <div key={item.id} id={item.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group scroll-mt-32">
              <div className="bg-gray-50 rounded-xl w-20 h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 mb-6">{item.desc}</p>
              <ul className="space-y-2">
                <li className="flex gap-2 items-center text-sm text-gray-500"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Personal Uniformado</li>
                <li className="flex gap-2 items-center text-sm text-gray-500"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Insumos Incluidos</li>
                <li className="flex gap-2 items-center text-sm text-gray-500"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Supervisión Activa</li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-white rounded-3xl p-12 shadow-xl border border-gray-100 relative overflow-hidden">
           <div className="absolute inset-0 bg-emerald-500/5 blur-3xl z-0" />
           <div className="relative z-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Cotiza tu Operativo Corporativo</h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">Nuestro equipo de ingeniería de servicios calculará el rendimiento exacto de personal e insumos que necesita tu proyecto.</p>
            <Link href="/contacto" className="inline-block bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-emerald-700 transition">Contactar Ejecutivo</Link>
           </div>
        </div>
      </div>
    </div>
  );
}
