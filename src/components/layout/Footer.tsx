import Link from 'next/link';
import {
  SERVICIOS,
  ZONAS,
  ADDRESS,
  EMAIL_CONTACTO,
  EMAIL_VENTAS,
  PHONE_CONFIRMED,
  PHONE_DISPLAY,
  PHONE_E164,
  SOCIAL,
  whatsappUrl,
} from '@/lib/site';

/**
 * Footer. Server Component (antes era cliente por Firestore + newsletter).
 * Enlaces sociales: solo perfiles reales (site.ts SOCIAL). Antes había href="#",
 * que es ruido para el usuario y para el crawler.
 * El bloque de enlaces por zona reparte autoridad hacia las páginas locales.
 */
export default function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="border-t border-[#EDEDEA] bg-[#1F1F25] text-white mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl mb-3">Limpieza México</p>
            <p className="text-[15px] leading-relaxed text-[#9B9BA3]">
              Servicios de limpieza y mantenimiento para empresas y hogares en la Ciudad de
              México y la Zona Metropolitana.
            </p>
          </div>

          <nav aria-labelledby="footer-servicios">
            <p id="footer-servicios" className="font-semibold mb-3">
              Servicios
            </p>
            <ul className="space-y-2 text-[15px] text-[#9B9BA3]">
              {SERVICIOS.map((s) => (
                <li key={s.slug}>
                  <Link href={s.slug} className="hover:text-white hover:underline">
                    {s.nombre}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/servicio-de-limpieza-cdmx" className="hover:text-white hover:underline">
                  Servicio de limpieza en CDMX
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-zonas">
            <p id="footer-zonas" className="font-semibold mb-3">
              Zonas de servicio
            </p>
            <ul className="space-y-2 text-[15px] text-[#9B9BA3]">
              {ZONAS.map((z) => (
                <li key={z.slug}>
                  <Link href={z.slug} className="hover:text-white hover:underline">
                    Limpieza en {z.nombre}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/preguntas-frecuentes" className="hover:text-white hover:underline">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-semibold mb-3">Contacto</p>
            <address className="not-italic space-y-2 text-[15px] text-[#9B9BA3]">
              <p>{ADDRESS.full}</p>
              <p>
                <a href={`mailto:${EMAIL_CONTACTO}`} className="hover:text-white hover:underline">
                  {EMAIL_CONTACTO}
                </a>
              </p>
              <p>
                <a href={`mailto:${EMAIL_VENTAS}`} className="hover:text-white hover:underline">
                  {EMAIL_VENTAS}
                </a>
              </p>
              {/* Teléfono: solo si hay dato real confirmado. */}
              {PHONE_CONFIRMED && PHONE_DISPLAY && (
                <p>
                  <a href={`tel:${PHONE_E164}`} className="hover:text-white hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                  {whatsappUrl() && (
                    <>
                      {' · '}
                      <a
                        href={whatsappUrl()!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white hover:underline"
                      >
                        WhatsApp
                      </a>
                    </>
                  )}
                </p>
              )}
            </address>
            <ul className="mt-5 flex gap-4 text-sm" aria-label="Redes sociales">
              {SOCIAL.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="text-[#9B9BA3] hover:text-white hover:underline"
                  >
                    {r.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between text-sm text-[#9B9BA3]">
          <p>© {anio} Limpieza México. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            <Link href="/privacidad" className="hover:text-white hover:underline">
              Aviso de privacidad
            </Link>
            <Link href="/terminos" className="hover:text-white hover:underline">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
