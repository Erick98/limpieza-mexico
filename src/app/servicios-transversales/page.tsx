import { Bug, Droplet, HardHat, TreePine } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aseo Industrial y Transversal | Plagas y Cisternas",
  description: "Control integral de plagas (MIP), mantenimiento de áreas verdes, limpieza de cisternas con buzos y aseo post-construcción fina y gruesa.",
};

export default function ServiciosTransversales() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Servicios <span className="text-teal-600">Transversales</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Soluciones complementarias diseñadas para conservar sus inmuebles en condiciones óptimas y cumplir con normativas de protección civil y salud pública.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              id: "plagas",
              title: "Control de Plagas",
              desc: "Manejo Integral de Plagas (MIP) para residencias, corporativos e industria alimentaria (Norma Distintivo H). Fumigaciones seguras con productos de banda verde (bajo riesgo).",
              icon: <Bug className="w-10 h-10 text-teal-600" />
            },
            {
              id: "jardineria",
              title: "Jardinería y Conservación Urbana",
              desc: "Diseño paisajístico, poda en alturas, fertilización y mantenimiento de áreas verdes y sistemas de riego para corporativos y residencias.",
              icon: <TreePine className="w-10 h-10 text-teal-600" />
            },
            {
              id: "cisternas",
              title: "Limpieza de Cisternas y Tinacos",
              desc: "Desinfección profunda y extracciones seguras cumpliendo con las normas de salubridad. Utilización de buzos industriales en caso de requerirse servicio sin vaciado.",
              icon: <Droplet className="w-10 h-10 text-teal-600" />
            },
            {
              id: "post-construccion",
              title: "Limpieza Post-Construcción / Obra",
              desc: "Retiro de escombros finos, manchas de pintura, cemento y preparación de inmuebles (Limpieza Fina y Gruesa) para entrega final a propietarios.",
              icon: <HardHat className="w-10 h-10 text-teal-600" />
            }
          ].map((svc) => (
            <div key={svc.id} className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl transition-all flex flex-col h-full group">
              <div className="bg-teal-50 w-20 h-20 rounded-2xl flex justify-center items-center mb-6 group-hover:bg-teal-100 transition-colors">
                {svc.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{svc.title}</h3>
              <p className="text-gray-600 text-lg flex-grow leading-relaxed mb-8">{svc.desc}</p>
              <Link href="/contacto" className="text-teal-600 font-semibold inline-flex items-center gap-2 hover:text-teal-800 transition-colors">
                Solicitar Diagnóstico &rarr;
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
