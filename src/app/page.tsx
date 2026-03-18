"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, ShieldCheck, Users, Droplets, CheckCircle2 } from "lucide-react";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Limpieza México",
    "image": "https://limpiezamexico.com/images/og-image-default.jpg",
    "url": "https://limpiezamexico.com",
    "telephone": "+525555555555",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ciudad de México",
      "addressRegion": "CDMX",
      "addressCountry": "MX"
    },
    "description": "La empresa líder en soluciones de limpieza corporativa, ejecutiva, doméstica y servicios especializados en todo México.",
    "priceRange": "$$"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900/40 z-10" />
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/hero_ultra_premium.png")' }}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-semibold text-emerald-100 tracking-wide uppercase">El Estándar de Oro en Limpieza Corporativa</span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter mb-6 leading-[1.05]">
              Excelencia Absoluta en <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Limpieza B2B</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed font-light">
              Elevando la imagen de las empresas líderes en México mediante operaciones de mantenimiento hiper-profesionales, garantizadas bajo estándares internacionales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link 
                href="/contacto" 
                className="group w-full sm:w-auto relative inline-flex justify-center items-center gap-2 px-10 py-5 rounded-full bg-emerald-600/90 backdrop-blur-sm overflow-hidden text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] transform hover:-translate-y-1 border border-emerald-400/30"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                Solicitar Cotización Express <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link 
                href="/servicios-corporativos" 
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold backdrop-blur-md border border-white/10 transition-colors"
              >
                Conocer Infraestructura
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-8 text-sm text-gray-400 font-medium">
               <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Personal Verificado</div>
               <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Sistema Híbrido Tech</div>
               <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Cobertura Nacional</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Marquee Belt */}
      <section className="bg-gray-900 border-y border-white/5 py-8 overflow-hidden relative">
         <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
         <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
         <div className="flex w-fit animate-marquee items-center opacity-60 hover:opacity-100 transition-opacity duration-500">
            {/* Generamos logos ficticios texto corporativo que lucen como logos por su tipografía */}
            {[...Array(2)].map((_, j) => (
              <div key={j} className="flex gap-20 px-10 items-center">
                 <span className="font-black text-2xl tracking-tighter text-white">TERRANOVA</span>
                 <span className="font-serif italic font-bold text-xl text-white">Symmetria Group</span>
                 <span className="font-sans font-bold text-2xl tracking-widest text-white uppercase">Axiom</span>
                 <span className="font-mono font-bold text-xl text-white">| NEXUS |</span>
                 <span className="font-extrabold text-2xl text-white tracking-tight">O K T A V E</span>
                 <span className="font-bold text-2xl text-white flex items-center gap-1"><Building2 className="w-6 h-6"/> URBANIA</span>
              </div>
            ))}
         </div>
      </section>

      {/* Services Pillars (Glassmorphism on Dark Mesh) */}
      <section className="py-24 relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(16,185,129,0.15)_0%,_transparent_50%),radial-gradient(circle_at_100%_100%,_rgba(20,184,166,0.1)_0%,_transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="max-w-2xl">
              <h2 className="text-emerald-400 font-bold tracking-[0.2em] text-xs mb-3">INFRAESTRUCTURA OPERATIVA</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1]">
                Soluciones B2B Adaptadas
              </h3>
            </div>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed font-light">
              Diseñamos operativos de servicio enfocados en la calidad técnica, máxima eficiencia y sustentabilidad medioambiental corporativa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Corporativo",
                description: "Mantenimiento integral para oficinas y complejos corporativos A+.",
                icon: <Building2 className="w-8 h-8 text-emerald-400" />,
                link: "/servicios-corporativos",
                bgImg: "/images/service_office.png",
              },
              {
                title: "Executive",
                description: "Tecnología de punta, robots autónomos y sanitización técnica.",
                icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
                link: "/servicios-executive",
                bgImg: "/images/service_sanitization.png",
              },
              {
                title: "Staffing",
                description: "Personal corporativo e industrial altamente calificado y afianzado.",
                icon: <Users className="w-8 h-8 text-emerald-400" />,
                link: "/reclutamiento-domestico",
                bgImg: "/images/service_industrial.png",
              },
              {
                title: "Especializado",
                description: "Control de plagas, alturas y blindaje de espacios sensibles.",
                icon: <Droplets className="w-8 h-8 text-emerald-400" />,
                link: "/servicios-transversales",
                bgImg: "/images/service_inhouse.png",
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 border border-white/10 flex flex-col h-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
              >
                <div className="h-48 relative overflow-hidden border-b border-white/10">
                  <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/10 transition-colors z-10" />
                  <img src={service.bgImg} alt={service.title} className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8 flex-1 flex flex-col relative z-20">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner backdrop-blur-md">
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">{service.title}</h4>
                  <p className="text-gray-400 mb-6 flex-1 text-sm font-light leading-relaxed">{service.description}</p>
                  <Link 
                    href={service.link}
                    className="inline-flex items-center text-emerald-400 font-bold group-hover:text-emerald-300 transition-colors text-sm hover:underline"
                  >
                    Detalles Técnicos <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-emerald-500/10 transform translate-x-4 translate-y-4 rounded-3xl" />
              <img 
                src="/images/dom_cleaning.png" 
                alt="Profesionales de limpieza" 
                className="relative z-10 rounded-3xl object-cover w-full h-[600px] shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map((i) => (
                    <img key={i} className="w-12 h-12 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Avatar" />
                  ))}
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Más de</p>
                  <p className="text-xl font-bold text-gray-900">1,500 Clientes</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="text-emerald-700 font-black tracking-widest uppercase text-xs mb-3">La Diferencia</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-8 leading-tight">
                Limpieza profunda con tecnología de punta
              </h3>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Personal Altamente Capacitado",
                    desc: "Todo nuestro personal pasa por rigurosos filtros de confianza y constante capacitación técnica."
                  },
                  {
                    title: "Productos Certificados",
                    desc: "Utilizamos químicos biodegradables de grado industrial que protegen sus instalaciones y la salud."
                  },
                  {
                    title: "Tecnología Autónoma disponible",
                    desc: "Proveemos robots de limpieza de última generación para operaciones continuas en grandes superficies."
                  },
                  {
                    title: "Supervisión Digital en Tiempo Real",
                    desc: "Tendrá acceso a un portal exclusivo para ver reportes, asistencias y solicitar nuevos servicios."
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }}
                    className="flex gap-4 p-4 rounded-2xl hover:bg-emerald-50/50 transition-colors border border-transparent hover:border-emerald-100 group cursor-pointer"
                  >
                    <div className="bg-emerald-100 p-2 rounded-xl h-fit group-hover:scale-110 group-hover:bg-emerald-200 transition-all">
                       <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">{item.title}</h4>
                      <p className="text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform & Technology Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute inset-0 bg-emerald-500/10 transform -translate-x-4 -translate-y-4 rounded-3xl" />
              <img 
                src="/images/tech_dashboard.png" 
                alt="Dashboard corporativo de Limpieza México" 
                className="relative z-10 rounded-3xl object-cover w-full shadow-2xl border border-gray-200/50"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <h2 className="text-emerald-700 font-black tracking-widest uppercase text-xs mb-3">Nuestra Tecnología</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
                Control Total en la Palma de su Mano
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                No somos solo una empresa de limpieza; somos una <strong className="text-gray-900">plataforma tecnológica integral</strong>. Hemos desarrollado un portal exclusivo donde nuestros clientes pueden auditar y gestionar el servicio en tiempo real.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Visualización de reportes fotográficos de supervisión.",
                  "Cotizador en línea de servicios adicionales o eventuales.",
                  "Expedientes de los colaboradores y pagos seguros.",
                  "Historial de pólizas, facturas y comprobantes."
                ].map((feature, idx) => (
                   <li key={idx} className="flex gap-3 items-center text-gray-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      {feature}
                   </li>
                ))}
              </ul>
              
              <div className="mt-10">
                 <Link href="/login" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-800 transition-colors">
                   Descubrir el Portal de Clientes <ArrowRight className="w-4 h-4"/>
                 </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-emerald-900/20 z-10" />
          <img 
            src="/images/cta_modern_building.png" 
            alt="Corporate background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">¿Listo para transformar sus espacios?</h2>
          <p className="text-xl md:text-2xl text-gray-300/90 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Contacte hoy mismo con uno de nuestros ejecutivos y diseñemos un plan a la medida de los requerimientos de su empresa o residencia.
          </p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link 
              href="/contacto" 
              className="group relative overflow-hidden px-8 py-4 rounded-full bg-emerald-500 text-gray-950 font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:-translate-y-1"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              Contactar Asesor
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-gray-900 font-bold transition-all hover:-translate-y-1"
            >
              Iniciar sesión
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
