"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Utensils, Stethoscope, Store, CheckCircle2, MessageCircle, AlertCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function B2BLandingPage() {
  const [adminPhone, setAdminPhone] = useState("525555555555"); // default prevent empty
  
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "company"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().whatsapp) {
        setAdminPhone(docSnap.data().whatsapp.replace(/\D/g,''));
      }
    });
    return () => unsub();
  }, []);

  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", service: "Oficinas y Corporativos", message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "new_contact", data: formData })
      });
      if (!response.ok) throw new Error("Error server");
      setStatus("success");
      setFormData({ name: "", company: "", email: "", phone: "", service: "Oficinas y Corporativos", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const sectors = [
    { id: "oficinas", icon: <Building2 className="w-8 h-8"/>, title: "Oficinas y Corporativos", desc: "Mantenimiento diario, limpieza profunda y sanitización para espacios de trabajo." },
    { id: "restaurantes", icon: <Utensils className="w-8 h-8"/>, title: "Restaurantes y Cocinas", desc: "Desengrase industrial, cumplimiento de normas de salubridad e higiene total." },
    { id: "hospitales", icon: <Stethoscope className="w-8 h-8"/>, title: "Clínicas y Hospitales", desc: "Protocolos estrictos de desinfección grado hospitalario y manejo de residuos." },
    { id: "comercios", icon: <Store className="w-8 h-8"/>, title: "Plazas y Tiendas", desc: "Pulido de pisos, cristales de altura y limpieza constante para alto tráfico." }
  ];

  return (
    <div className="min-h-screen font-sans bg-gray-50 flex flex-col">
      
      {/* Navbar Minimalista */}
      <nav className="bg-white border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
         <Link href="/" className="flex-shrink-0">
           <Image src="/logo_dark.png" alt="Limpieza México" width={320} height={100} className="w-auto h-16 lg:h-20 object-contain drop-shadow-md transition-transform hover:scale-105" priority />
         </Link>
         <a 
           href={`https://wa.me/${adminPhone}?text=Hola,%20me%20interesa%20contratar%20servicios%20de%20limpieza%20para%20mi%20negocio.`} 
           target="_blank" rel="noopener noreferrer"
           className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-bold transition-colors"
         >
           <MessageCircle className="w-5 h-5"/> <span className="hidden sm:inline">WhatsApp Directo</span>
         </a>
      </nav>

      {/* Hero Content */}
      <section className="bg-gray-900 text-white relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img src="/images/service_office.png" alt="Limpieza de oficinas" className="w-full h-full object-cover opacity-20" />
           <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:w-1/2">
            <span className="text-emerald-400 font-bold tracking-wider uppercase text-sm mb-4 block">Soluciones B2B Especializadas</span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              La imagen de su empresa <br/><span className="text-emerald-400">en manos expertas.</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
              Entendemos que cada industria tiene requerimientos únicos. Proveemos personal capacitado, insumos de grado industrial y supervisión tecnológica para mantener la excelencia en sus instalaciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#solicitar" className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-center hover:bg-gray-100 transition-colors">
                Solicitar Cotización Formal
              </a>
              <a 
                href={`https://wa.me/${adminPhone}?text=Me%20interesa%20limpieza%20para%20mi%20empresa`} 
                target="_blank" rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-center hover:bg-[#1ebd5a] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5"/> Contactar por WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Formulario Hero */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="lg:w-5/12 w-full max-w-md" id="solicitar">
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-gray-900">
              <h3 className="text-2xl font-bold mb-2">Cotice sin compromiso</h3>
              <p className="text-gray-500 text-sm mb-6">Deje sus datos y un corporativo le contactará hoy mismo.</p>
              
              {status === "success" && (
                <div className="mb-4 p-4 rounded-xl bg-emerald-50 text-emerald-800 flex items-start gap-3 border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                  <p className="text-sm font-medium">¡Solicitud recibida! Le contactaremos a la brevedad.</p>
                </div>
              )}
              {status === "error" && (
                <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-800 flex items-start gap-3 border border-red-100">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                  <p className="text-sm font-medium">Ocurrió un error. Intente por WhatsApp.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                   <input required id="name" value={formData.name} onChange={handleChange} type="text" placeholder="Su Nombre *" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                 </div>
                 <div className="flex gap-4">
                   <input required id="company" value={formData.company} onChange={handleChange} type="text" placeholder="Empresa *" className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                   <input required id="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Teléfono *" className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                 </div>
                 <div>
                   <input required id="email" value={formData.email} onChange={handleChange} type="email" placeholder="Correo corporativo *" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                 </div>
                 <div>
                   <select id="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white">
                     {sectors.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                   </select>
                 </div>
                 <button disabled={status === "loading"} type="submit" className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors hover:bg-emerald-700 disabled:bg-emerald-300 shadow-xl shadow-emerald-500/20">
                   {status === "loading" ? "Procesando..." : "Obtener Cotización"}
                 </button>
              </form>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Especialidades por Sector</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">Nuestro personal recibe capacitación específica para atender las normativas de su industria.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sectors.map((sector) => (
                <div key={sector.id} className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                   <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                      {sector.icon}
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-3">{sector.title}</h3>
                   <p className="text-gray-600 leading-relaxed">{sector.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${adminPhone}?text=Hola,%20me%20interesa%20contratar%20sus%20servicios.`}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 animate-bounce"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-8 h-8"/>
      </a>
      
    </div>
  );
}
