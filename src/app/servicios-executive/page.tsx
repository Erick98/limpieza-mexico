import { ShieldCheck, Cpu, Sun, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios Executive | Tecnología de Mantenimiento",
  description: "Tratamientos avanzados, limpieza con robots autónomos (barredoras y restregadoras), sanitización certificada y limpieza de paneles solares.",
};

export default function ServiciosExecutive() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Tecnología Especializada</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Servicios <span className="text-emerald-500">Executive</span>
          </h1>
          <p className="text-xl text-gray-400">
            Tratamientos avanzados, tecnología robótica y protocolos de ultra desinfección para espacios exigentes.
          </p>
        </div>

        <div className="space-y-20">
          {[
            {
              id: "robots",
              title: "Limpieza con Robots Autónomos",
              desc: "Desplegamos equipos robóticos de talla industrial (como barredoras y restregadoras inteligentes) para garantizar coberturas masivas y calidad constante, reduciendo los tiempos de limpieza hasta en un 60%.",
              features: ["Operación 24/7", "Mapeo Lidar", "Reportes de cobertura por telemetría"],
              icon: <Cpu className="w-8 h-8 text-emerald-500" />,
              img: "/images/service_robots.png"
            },
            {
              id: "sanitizacion",
              title: "Sanitización Profesional Certificada",
              desc: "Protocolos de desinfección profunda aplicados mediante termonebulización y aspersión electrostática. Utilizamos cuaternarios de amonio de 5ta generación para eliminar el 99.9% de patógenos.",
              features: ["Certificado de Sanitización Oficial", "No deja residuos tóxicos", "Programación nocturna"],
              icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
              img: "/images/service_sanitization.png"
            },
            {
              id: "pisos",
              title: "Cuidado Técnico de Pisos",
              desc: "Restauración, desbastado, pulido y abrillantado de mármol, granito, terrazo, y pisos vinílicos. Tratamientos de sellado epóxico para la industria.",
              features: ["Diamantado de alto brillo", "Selladores poliméricos", "Mantenimiento anti-derrapante"],
              icon: <Sparkles className="w-8 h-8 text-emerald-500" />,
              img: "/images/service_floors.png"
            },
            {
              id: "paneles",
              title: "Mantenimiento de Paneles Solares",
              desc: "Recuperamos la eficiencia máxima de tus instalaciones fotovoltaicas mediante limpieza especializada usando agua desmineralizada que no raya ni deja sedimentos.",
              features: ["Agua sin sales", "Pértigas de carbono", "Seguridad en alturas certificada"],
              icon: <Sun className="w-8 h-8 text-emerald-500" />,
              img: "/images/service_solar.png"
            }
          ].map((item, idx) => (
            <div key={item.id} id={item.id} className={`flex flex-col lg:flex-row gap-12 items-center scroll-mt-32 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-1/2">
                <div className="rounded-3xl overflow-hidden relative h-[400px]">
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="w-16 h-16 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                <div className="pt-4 space-y-3">
                  {item.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
