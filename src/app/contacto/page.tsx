"use client";

import { useState, useEffect } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Contacto() {
  const [companySettings, setCompanySettings] = useState({
    contactoWhatsapp: "+52 55 1234 5678",
    direccionFisica: "Sófocles 133, Polanco, Granada, Miguel Hidalgo, 11530 Ciudad de México, CDMX"
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "company"), (docSnap) => {
      if (docSnap.exists()) {
        setCompanySettings(docSnap.data() as any);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Hablemos de su <span className="text-emerald-600">Proyecto</span>
          </h1>
          <p className="text-xl text-gray-600">
            Nuestro equipo de ingeniería de servicios está listo para diseñar un operativo a la medida de sus instalaciones.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          {/* Contact Info */}
          <div className="bg-emerald-900 text-white p-10 lg:p-16 lg:w-1/3 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-8">Información de Contacto</h3>
              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Oficinas Corporativas</h4>
                    <p className="text-emerald-100/80 whitespace-pre-line">{companySettings.direccionFisica}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Phone className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">WhatsApp Ventas</h4>
                    <p className="text-emerald-100/80">{companySettings.contactoWhatsapp}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Mail className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Correo Electrónico</h4>
                    <p className="text-emerald-100/80">contacto@limpiezamexico.com<br />ventas@limpiezamexico.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16">
              <p className="text-sm text-emerald-400 font-semibold mb-4">MÁS DE 5,000 PROYECTOS EXITOSOS EN TODO EL PAÍS</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-10 lg:p-16 lg:w-2/3">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Envíenos un mensaje</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Ej. Juan Pérez" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                  <input type="text" id="company" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Nombre de su empresa" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="juan@empresa.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input type="tel" id="phone" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="(55) 0000-0000" />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">Servicio de interés</label>
                <select id="service" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white">
                  <option value="">Seleccione una opción</option>
                  <option value="corporativo">Servicios Corporativos (Oficinas, Industria)</option>
                  <option value="executive">Servicios Executive (Robots, Sanitización)</option>
                  <option value="reclutamiento">Reclutamiento Doméstico</option>
                  <option value="transversal">Servicios Transversales (Plagas, Cisternas)</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Detalles del proyecto</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none" placeholder="Cuéntenos sobre dimensiones, tipo de inmueble y requerimientos específicos..."></textarea>
              </div>

              <button type="button" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-emerald-500/30">
                Solicitar Cotización
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
