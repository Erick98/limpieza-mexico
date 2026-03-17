"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, MonitorSmartphone, Shield, Zap, ArrowRight, UserPlus } from "lucide-react";
import Image from "next/image";

export default function AppLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 lg:py-5 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
             <Image src="/logo_dark.png" alt="Limpieza México" width={320} height={100} className="w-auto h-16 lg:h-20 object-contain drop-shadow-md transition-transform hover:scale-105" priority />
          </Link>
          <div className="flex gap-4 items-center">
             <Link href="/login" className="text-gray-600 font-medium hover:text-emerald-600 transition-colors hidden sm:block">Entrar al Portal</Link>
             <Link href="/login" className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20">
               Crear mi cuenta gratis
             </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm mb-6 border border-emerald-200">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> App de Limpieza México
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              Cotiza, Contrata y Gestiona la limpieza de tu negocio <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">100% online.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              Únete a cientos de empresas que ya automatizaron sus operaciones de limpieza y mantenimiento en nuestra plataforma tecnológica.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
              <Link href="/login" className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 hover:-translate-y-1 transition-all shadow-xl shadow-emerald-500/30 w-full sm:w-auto">
                <UserPlus className="w-5 h-5"/> Regístrate Ahora
              </Link>
            </div>
            
            <p className="mt-4 text-sm text-gray-500 flex items-center justify-center lg:justify-start gap-1">
              <Shield className="w-4 h-4 text-emerald-500"/> Registro seguro y gratuito en 1 minuto.
            </p>
          </motion.div>

          {/* Hero Image (Dashboard Screenshot) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full relative"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-teal-300/20 transform blur-3xl rounded-full scale-110 -z-10"></div>
             <div className="relative rounded-2xl overflow-hidden border border-gray-200/50 shadow-2xl bg-white p-2">
                <div className="bg-gray-100 h-8 flex items-center px-4 gap-2 rounded-t-xl mb-2">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                   <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                {/* Dashboard real Screenshot*/}
                <img src="/images/screenshots/app_dashboard.png" alt="Dashboard de Limpieza México" className="w-full h-auto object-cover rounded-lg border border-gray-100" />
             </div>
          </motion.div>
        </div>
      </section>

      {/* Features Walkthrough */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           
           <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-emerald-600 font-bold uppercase tracking-wider text-sm mb-3">La experiencia Limpieza México</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">Diseñada para darte el control total de tus espacios.</h3>
           </div>

           <div className="flex flex-col gap-24">
              
              {/* Feature 1: Checkout/Contratar */}
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                 <motion.div 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6 }}
                   className="lg:w-1/2 order-2 lg:order-1 relative"
                 >
                    <div className="absolute -inset-4 bg-gray-50 rounded-3xl -z-10 transform scale-105"></div>
                    <img src="/images/screenshots/app_checkout.png" alt="Cotizador Inteligente" className="w-full rounded-2xl shadow-xl border border-gray-200" />
                 </motion.div>
                 
                 <motion.div 
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6 }}
                   className="lg:w-1/2 order-1 lg:order-2"
                 >
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                      <Zap className="w-8 h-8" />
                    </div>
                    <h4 className="text-3xl font-bold text-gray-900 mb-4">Cotizador Interactivo Inteligente</h4>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      Se acabaron los correos interminables y las visitas técnicas tediosas. Nuestra plataforma te permite armar tu operativo ideal seleccionando el tipo de servicio, la cantidad de personal o los metros cuadrados. 
                    </p>
                    <ul className="space-y-4 mb-8">
                      {[
                        "Recibe estimaciones de precios al instante.",
                        "Contrata servicios recurrentes o por evento único.",
                        "Ajusta los detalles de personal con un clic."
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 text-gray-700 font-medium">
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0"/> {item}
                        </li>
                      ))}
                    </ul>
                 </motion.div>
              </div>

               {/* Feature 2: Gestión de operaciones */}
               <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                 <motion.div 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6 }}
                   className="lg:w-1/2"
                 >
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                      <MonitorSmartphone className="w-8 h-8" />
                    </div>
                    <h4 className="text-3xl font-bold text-gray-900 mb-4">El primer Dashboard enfocado en Mantenimiento</h4>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      Supervisa activamente todos los servicios contratados directamente desde tu cuenta.
                    </p>
                    <ul className="space-y-4 mb-8">
                       <li className="flex gap-3 text-gray-700 font-medium bg-gray-50 p-4 rounded-xl">
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0"/> Acceso 24/7 a tu historial de contratos.
                       </li>
                       <li className="flex gap-3 text-gray-700 font-medium bg-gray-50 p-4 rounded-xl">
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0"/> Actualiza tus datos de contacto corporativo fácilmente.
                       </li>
                    </ul>
                    <Link href="/login" className="inline-flex items-center text-emerald-600 font-bold hover:text-emerald-800 transition group">
                       Explorar el Dashboard <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 duration-300"/>
                    </Link>
                 </motion.div>

                 <motion.div 
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6 }}
                   className="lg:w-1/2 relative"
                 >
                    <div className="absolute -inset-4 bg-emerald-50 rounded-3xl -z-10 transform -rotate-3"></div>
                    {/* Placeholder illustration o reutilizamos el dashboard recortado */}
                    <img src="/images/tech_dashboard.png" alt="Monitor Tecnoloigco" className="w-full rounded-2xl shadow-xl border border-gray-200" />
                 </motion.div>
              </div>
           </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-950 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent"></div>
         
         <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Pase a la modernidad con Limpieza México.</h2>
            <p className="text-xl text-gray-400 mb-10">Más rápido. Más transparente. Cree su cuenta hoy y cotice su primer servicio sin ningún compromiso.</p>
            
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 px-10 py-5 rounded-2xl font-black text-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
            >
              <UserPlus className="w-6 h-6" /> Entrar a la Plataforma Libremente
            </Link>
         </div>
      </section>
      
    </div>
  );
}
