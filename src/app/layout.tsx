import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BarraMovil from '@/components/layout/BarraMovil';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import { organizationLd, websiteLd, cleaningServiceLd } from '@/lib/seo';

/**
 * Fuentes con next/font: se auto-hospedan, se precargan y usan display:swap.
 * Eso elimina la petición a fonts.googleapis.com (mejor LCP y sin CLS de fuente).
 */
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: '#1F1F25',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Servicio de limpieza en CDMX | Limpieza México',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Servicio de limpieza para oficinas, hogares y espacios especializados en CDMX y Zona Metropolitana. Cotiza en línea en menos de un minuto.',
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  // PENDIENTE_ERICK: pegar aquí el token de Google Search Console cuando lo entregue.
  // verification: { google: 'TOKEN_GSC' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased flex flex-col min-h-screen overflow-x-hidden">
        {/* Entidad del negocio: se declara UNA vez en el layout con @id estable.
            Las páginas internas solo referencian ese @id, no lo duplican. */}
        <JsonLd data={[organizationLd(), websiteLd(), cleaningServiceLd()]} />

        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>

        <Navbar />
        <main id="contenido" className="flex-grow">
          {children}
        </main>
        <Footer />
        <BarraMovil />

        {/* GA4 existente. `lazyOnload` para no competir con el primer render móvil.
            Se dejó UN solo contenedor (antes había GTM + gtag duplicando eventos). */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E4NQM3CMJD"
          strategy="lazyOnload"
        />
        <Script id="ga4" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-E4NQM3CMJD');`}
        </Script>
      </body>
    </html>
  );
}
