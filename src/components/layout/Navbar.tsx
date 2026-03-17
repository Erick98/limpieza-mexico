"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Inicio", href: "/" },
  {
    name: "Servicios Corporativos",
    href: "/servicios-corporativos",
    subItems: [
      { name: "Oficinas", href: "/servicios-corporativos#oficinas" },
      { name: "Condominios", href: "/servicios-corporativos#condominios" },
      { name: "Restaurantes", href: "/servicios-corporativos#restaurantes" },
      { name: "Escuelas", href: "/servicios-corporativos#escuelas" },
      { name: "Naves Industriales", href: "/servicios-corporativos#industriales" },
    ],
  },
  {
    name: "Executive",
    href: "/servicios-executive",
    subItems: [
      { name: "Robots Autónomos", href: "/servicios-executive#robots" },
      { name: "Sanitización", href: "/servicios-executive#sanitizacion" },
      { name: "Cuidado de Pisos", href: "/servicios-executive#pisos" },
      { name: "Paneles Solares", href: "/servicios-executive#paneles" },
    ],
  },
  {
    name: "Reclutamiento",
    href: "/reclutamiento-domestico",
    subItems: [
      { name: "Personal de Limpieza", href: "/reclutamiento-domestico#limpieza" },
      { name: "Niñeras", href: "/reclutamiento-domestico#nineras" },
      { name: "Amas de Llaves", href: "/reclutamiento-domestico#amas-de-llaves" },
      { name: "Cocineras", href: "/reclutamiento-domestico#cocineras" },
      { name: "Gestión de Nómina", href: "/reclutamiento-domestico#nomina" },
    ],
  },
  { name: "Transversales", href: "/servicios-transversales" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // const { user } = useAuth(); // Uncomment if useAuth is needed

  // Páginas con fondo oscuro en el hero que requieren menú con texto blanco inicialmente
  const isDarkHeroPage = pathname === "/" || pathname === "/servicios-executive";
  // Mostrar la versión "clara" (fondo, texto oscuro) si el usuario hizo scroll o si NO estamos en una página de fondo oscuro
  const showLightNavbar = scrolled || !isDarkHeroPage;

  // Transparencia en Home pre-scroll, solido en las demás
  const isHome = pathname === '/'; // This variable was added in the instruction's code edit

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 print:hidden ${showLightNavbar ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="transition-transform hover:scale-105">
              <Image
                src="/logo.png"
                alt="Limpieza México"
                width={250}
                height={80}
                className={`w-auto h-14 lg:h-16 object-contain transition-all duration-300 drop-shadow-md`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${pathname === item.href
                      ? "text-emerald-500"
                      : showLightNavbar
                        ? "text-gray-700 hover:text-emerald-500"
                        : "text-gray-100 hover:text-white"
                    }`}
                >
                  {item.name}
                  {item.subItems && (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.subItems && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full pt-4 w-56"
                      >
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden py-2 border border-gray-100">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            <Link
              href="/login"
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Portal de Clientes
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${showLightNavbar ? "text-gray-900" : "text-white"}`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-y-auto max-h-[calc(100vh-5rem)]"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-3 rounded-md text-base font-medium ${pathname === item.href
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <div className="pl-6 pb-2 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 pb-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-md border border-transparent text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                >
                  Portal de Clientes
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
