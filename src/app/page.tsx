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
        {/* Background Image/Gradient */}
        <div className="absolute inset-0 bg-gray-900 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10" />
          {/* We use a placeholder image URL for the background */}
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center"
            style={{ backgroundImage: 'url("/images/hero_office_cleaning.png")' }}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm font-medium">Líderes en limpieza corporativa a nivel nacional</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Excelencia en <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Limpieza y Mantenimiento</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Soluciones integrales de primer nivel para corporativos, condominios, naves industriales y residencias. Impulsamos tu productividad a través de espacios impecables.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contacto" 
                className="group relative inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 overflow-hidden text-white font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                Solicitar Cotización <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/servicios-corporativos" 
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md border border-white/20 transition-all"
              >
                Conocer Servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Pillars */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="max-w-2xl">
              <h2 className="text-emerald-700 font-black tracking-widest uppercase text-xs mb-3">Nuestros Pilares</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Soluciones adaptadas a cada necesidad
              </h3>
            </div>
            <p className="text-gray-700 max-w-md text-lg leading-relaxed font-medium">
              Diseñamos operativos de servicio enfocados en la calidad técnica, eficiencia y cuidado del medio ambiente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Servicios Corporativos",
                description: "Mantenimiento integral para oficinas, corporativos y complejos industriales.",
                icon: <Building2 className="w-8 h-8 text-emerald-600" />,
                link: "/servicios-corporativos",
                bgImg: "/images/service_office.png",
              },
              {
                title: "Servicios Executive",
                description: "Tecnología de punta, robots autónomos y sanitización hiper-profesional.",
                icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
                link: "/servicios-executive",
                bgImg: "/images/service_sanitization.png",
              },
              {
                title: "Reclutamiento",
                description: "Personal doméstico y corporativo altamente calificado y con garantías legales.",
                icon: <Users className="w-8 h-8 text-emerald-600" />,
                link: "/reclutamiento-domestico",
                bgImg: "/images/service_industrial.png",
              },
              {
                title: "Especializados",
                description: "Control de plagas, limpieza en alturas y conservación de espacios urbanos.",
                icon: <Droplets className="w-8 h-8 text-emerald-600" />,
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
                className="group relative rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={service.bgImg} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8 flex-1 flex flex-col bg-white relative z-20 -mt-6 rounded-t-3xl border-t border-gray-100">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h4>
                  <p className="text-gray-600 mb-6 flex-1">{service.description}</p>
                  <Link 
                    href={service.link}
                    className="inline-flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors"
                  >
                    Saber más <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
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
