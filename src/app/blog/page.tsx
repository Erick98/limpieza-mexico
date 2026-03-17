"use client";

import { ArrowRight, BookOpen, Calculator, ShieldAlert, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function BlogRecursos() {
  const recursos = [
    {
      icon: <BookOpen className="w-8 h-8 text-emerald-600" />,
      tag: "Guía Completísima",
      title: "Guía de Contratación de Personal Doméstico",
      desc: "Conozca los aspectos legales, salario mínimo, prestaciones e implicaciones de seguridad al contratar personal para su hogar.",
      link: "/contacto?subject=Solicitud+Guia+Domestico",
      color: "bg-emerald-50"
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-blue-600" />,
      tag: "Desinfección",
      title: "Protocolos de Sanitización para Empresas",
      desc: "Normativas vigentes y mejores químicos (cuaternarios de amonio, ozono, rayos UV) para prevenir focos de infección en el corporativo.",
      link: "/contacto?subject=Solicitud+Protocolos+Sanitizacion",
      color: "bg-blue-50"
    },
    {
      icon: <Calculator className="w-8 h-8 text-orange-600" />,
      tag: "Finanzas",
      title: "Calculadora de Ahorro en Limpieza",
      desc: "Descubra cuánto dinero puede ahorrar una empresa al migrar de un modelo in-house a la tercerización profesional (outsourcing).",
      link: "/contacto?subject=Solicitud+Calculadora+Ahorro",
      color: "bg-orange-50"
    }
  ];

  const [articulos, setArticulos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "blog_posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArticulos(posts);
      setLoading(false);
    });
    return () => unsub();
  }, []);


  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Blog y <span className="text-emerald-600">Recursos</span>
          </h1>
          <p className="text-xl text-gray-600">
            Manténgase actualizado con las últimas tendencias de la industria, guías legales y herramientas financieras para gestionar la limpieza de sus espacios.
          </p>
        </div>

        {/* Featured Resources */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Recursos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {recursos.map((rec, idx) => (
            <div key={idx} className={`${rec.color} rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow relative overflow-hidden group`}>
              <div className="bg-white w-16 h-16 rounded-2xl flex justify-center items-center shadow-sm mb-6">
                {rec.icon}
              </div>
              <div className="inline-block px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-gray-600 mb-4 backdrop-blur-sm">
                {rec.tag}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{rec.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">{rec.desc}</p>
              <Link href={rec.link} className="flex items-center gap-2 text-gray-900 font-semibold group-hover:text-emerald-700 transition-colors">
                Descargar / Leer más <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Latest Articles */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Últimos Artículos</h2>
        {loading ? (
             <div className="flex justify-center items-center py-20 text-emerald-600">
               <Loader2 className="w-10 h-10 animate-spin"/>
             </div>
        ) : articulos.length === 0 ? (
             <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-2xl border border-gray-100">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4"/>
                <p className="font-semibold text-lg">Aún no hay artículos publicados.</p>
                <p className="text-sm mt-1">Vuelva pronto para encontrar nuevas guías y novedades.</p>
             </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articulos.map((art) => (
              <Link href={`/blog/${art.slug || art.id}`} key={art.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group flex flex-col cursor-pointer">
                <div className="h-48 overflow-hidden relative bg-gray-100">
                  {art.imageUrl ? (
                     <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                     <div className="flex items-center justify-center w-full h-full text-gray-400"><BookOpen className="w-12 h-12 opacity-20"/></div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm border border-emerald-100/50">
                    {art.category || "General"}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-gray-500 mb-2 font-medium">
                    {new Date(art.createdAt).toLocaleDateString("es-MX", { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()} • {art.author}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-3">{art.title}</h3>
                  <div className="mt-auto pt-4 border-t border-gray-50 text-emerald-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Leer artículo <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
