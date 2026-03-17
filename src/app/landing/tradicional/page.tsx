"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Users, CalendarDays, MessageCircle, Star, ShieldCheck, Clock } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function TraditionalLandingPage() {
  const [adminPhone, setAdminPhone] = useState("525555555555");
  const [rates, setRates] = useState<any>(null); // To store base prices from firebase

  // Quote State
  const [staffCount, setStaffCount] = useState(1);
  const [months, setMonths] = useState(6);
  const [calculatedTotal, setCalculatedTotal] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "company"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.whatsapp) setAdminPhone(data.whatsapp.replace(/\D/g, ''));
        if (data.pricing) setRates(data.pricing);
      }
    });
    return () => unsub();
  }, []);

  // Simple calculation logic based on settings values (or fallbacks)
  useEffect(() => {
    if (rates) {
      // Assuming firebase has pricing.recurring.basePrice
      const basePrice = rates.recurring?.basePrice || 15000; 
      const total = basePrice * staffCount;
      setCalculatedTotal(total);
    } else {
      // Fallback if settings not loaded
      setCalculatedTotal(15000 * staffCount);
    }
  }, [staffCount, months, rates]);

  const whatsappMessage = `Hola, veo que el costo aproximado por ${staffCount} elemento(s) de limpieza por ${months} meses es de $${calculatedTotal.toLocaleString("es-MX")} MXN mensuales. Me gustaría agendar una llamada para afinar detalles.`;
  const whatsappLink = `https://wa.me/${adminPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen font-sans bg-white pb-24">
      {/* Top Warning Strip */}
      <div className="bg-emerald-600 text-white text-center py-2 px-4 text-sm font-medium">
         Promoción exclusiva online: Cotice ahora y reciba el primer mes de insumos gratis.
      </div>

      {/* Classic Navbar */}
      <nav className="bg-white border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex justify-between items-center">
         <Link href="/" className="flex-shrink-0">
           <Image src="/logo_dark.png" alt="Limpieza México" width={320} height={100} className="w-auto h-16 lg:h-20 object-contain drop-shadow-md transition-transform hover:scale-105" priority />
         </Link>
         <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-2 text-gray-600">
             <Clock className="w-5 h-5 text-emerald-500"/> Atención L-V 9am a 6pm
           </div>
           <a href={`https://wa.me/${adminPhone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-[#20ba59] transition-colors shadow-lg shadow-green-500/20">
             <MessageCircle className="w-5 h-5"/> Chat Directo
           </a>
         </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-20">
        <div className="flex flex-col lg:flex-row gap-16">
           
           {/* Left Trust Content */}
           <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
                 Personal de Limpieza Fijo por Contrato
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                 Asignamos de 1 a 100 elementos de limpieza corporativa directamente en sus instalaciones. Nosotros nos encargamos de las faltas, nóminas, aguinaldos y responsabilidades legales.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                   <ShieldCheck className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                   <div>
                     <h4 className="font-bold text-gray-900 mb-1">Cero Riesgo Legal</h4>
                     <p className="text-sm text-gray-600">Personal 100% contratado por nosotros. Sin riesgo laboral para su empresa.</p>
                   </div>
                 </div>
                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                   <Star className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                   <div>
                     <h4 className="font-bold text-gray-900 mb-1">Insumos Incluidos</h4>
                     <p className="text-sm text-gray-600">Químicos biodegradables certificados y material de jarcería.</p>
                   </div>
                 </div>
              </div>

              {/* Classic Testimonial Trust Indicator */}
              <div className="border border-gray-200 rounded-2xl p-6 relative">
                 <div className="absolute -top-4 left-6 bg-white px-2">
                    <div className="flex text-yellow-400">
                       <Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/>
                    </div>
                 </div>
                 <p className="italic text-gray-700 font-medium mb-4">"Llevamos 2 años con el servicio de Limpieza México. Lo mejor es que si la persona asignada falta, ellos mandan un cubrefaltas el mismo día sin que tengamos que preocuparnos."</p>
                 <div className="flex items-center gap-3">
                    <img src="https://ui-avatars.com/api/?name=Admin+Corporativo&background=0D8ABC&color=fff" alt="Avatar" className="w-10 h-10 rounded-full" />
                    <div>
                       <p className="text-sm font-bold text-gray-900">Rodrigo M.</p>
                       <p className="text-xs text-gray-500">Administrador de Edificio</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right Interactive Quoter */}
           <div className="lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 sticky top-24"
              >
                 <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                   <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                      <Calculator className="w-6 h-6"/>
                   </div>
                   <div>
                     <h3 className="text-2xl font-bold text-gray-900">Cotizador en Línea</h3>
                     <p className="text-sm text-gray-500">Calcule su costo mensual aproximado</p>
                   </div>
                 </div>

                 <div className="space-y-8">
                    {/* Input: Elementos */}
                    <div>
                       <div className="flex justify-between items-center mb-3">
                          <label className="font-bold text-gray-900 flex items-center gap-2"><Users className="w-5 h-5 text-gray-400"/> Personal Requerido</label>
                          <span className="text-lg font-bold text-emerald-600">{staffCount} {staffCount === 1 ? 'Persona' : 'Personas'}</span>
                       </div>
                       <input 
                         type="range" min="1" max="20" step="1" 
                         value={staffCount} 
                         onChange={(e) => setStaffCount(parseInt(e.target.value))}
                         className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                       />
                       <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                         <span>1 elemento</span>
                         <span>20 elementos</span>
                       </div>
                    </div>

                    {/* Input: Meses de contrato */}
                    <div>
                       <div className="flex justify-between items-center mb-3">
                          <label className="font-bold text-gray-900 flex items-center gap-2"><CalendarDays className="w-5 h-5 text-gray-400"/> Plazo de Contrato</label>
                          <span className="text-lg font-bold text-emerald-600">{months} Meses</span>
                       </div>
                       <div className="flex gap-2">
                          {[3, 6, 12].map(m => (
                            <button 
                              key={m}
                              onClick={() => setMonths(m)}
                              className={`flex-1 py-3 rounded-xl font-bold border transition-all ${months === m ? 'bg-emerald-50 border-emerald-600 text-emerald-700 shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-300'}`}
                            >
                              {m} meses
                            </button>
                          ))}
                       </div>
                    </div>

                    {/* Result */}
                    <AnimatePresence mode="wait">
                       <motion.div 
                         key={calculatedTotal}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="bg-gray-50 p-6 rounded-2xl border border-gray-200/60 mt-8"
                       >
                          <p className="text-sm font-medium text-gray-500 mb-1 text-center">Inversión Mensual Estimada</p>
                          <p className="text-4xl text-center font-black text-gray-900 mb-2">
                            ${calculatedTotal.toLocaleString("es-MX")} <span className="text-lg text-gray-500 font-medium">MXN*</span>
                          </p>
                          <p className="text-xs text-center text-gray-400 leading-tight">
                            *El precio incluye sueldo, IMSS, Infonavit, aguinaldo, vacaciones, insumos base y supervisión. Precio + IVA.
                          </p>
                       </motion.div>
                    </AnimatePresence>

                    {/* CTA */}
                    <a 
                      href={whatsappLink}
                      target="_blank" rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-green-500/30 transform hover:-translate-y-1"
                    >
                      <MessageCircle className="w-6 h-6"/> Solicitar Contrato por Whats
                    </a>
                 </div>

              </motion.div>
           </div>
        </div>
      </div>
    </div>
  );
}
