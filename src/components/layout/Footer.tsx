"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Footer() {
  const [companySettings, setCompanySettings] = useState({
    contactoWhatsapp: "+52 55 1234 5678",
    direccionFisica: "Sófocles 133, Polanco, Granada, Miguel Hidalgo, 11530 Ciudad de México, CDMX"
  });

  useEffect(() => {
    const companyRef = doc(db, "settings", "company");
    const unsub = onSnapshot(companyRef, (docSnap) => {
      if (docSnap.exists()) {
        setCompanySettings(docSnap.data() as any);
      }
    });
    return () => unsub();
  }, []);

  return (
    <footer className="bg-gray-950 text-gray-300 py-16 border-t border-gray-900 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block transition-transform hover:opacity-90 bg-white/5 p-2 rounded-lg backdrop-blur-sm border border-white/10">
              <Image 
                src="/logo.png" 
                alt="Limpieza México" 
                width={280} 
                height={90} 
                className="w-auto h-16 lg:h-20 object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              La empresa líder en soluciones integrales de limpieza y mantenimiento para corporativos, naves industriales y residencias en todo México.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Servicios</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/servicios-corporativos" className="text-sm hover:text-emerald-400 transition-colors">Limpieza Corporativa</Link>
              </li>
              <li>
                <Link href="/servicios-executive" className="text-sm hover:text-emerald-400 transition-colors">Servicios Executive</Link>
              </li>
              <li>
                <Link href="/reclutamiento-domestico" className="text-sm hover:text-emerald-400 transition-colors">Reclutamiento Doméstico</Link>
              </li>
              <li>
                <Link href="/servicios-transversales" className="text-sm hover:text-emerald-400 transition-colors">Servicios Transversales</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm">{companySettings.direccionFisica}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm">Contacto: {companySettings.contactoWhatsapp}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm">contacto@limpiezamexico.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Certifications */}
          <div>
            <h3 className="text-white font-semibold mb-6">Boletín Informativo</h3>
            <p className="text-sm text-gray-400 mb-4">
              Recibe consejos de limpieza corporativa y noticias sobre nuevas tecnologías.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Limpieza México. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link href="/privacidad" className="hover:text-white transition-colors">Aviso de Privacidad</Link>
            <Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
