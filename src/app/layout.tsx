import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/components/auth/AuthContext";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://limpiezamexico.com'),
  title: {
    default: "Limpieza México | Servicios Integrales de Limpieza y Mantenimiento",
    template: "%s | Limpieza México"
  },
  description: "La empresa líder en soluciones de limpieza corporativa, ejecutiva, doméstica y servicios especializados en todo México. Transformamos sus espacios con calidad técnica y tecnología de punta.",
  keywords: ["limpieza corporativa", "limpieza profunda", "mantenimiento integral", "servicios executive", "limpieza doméstica", "Limpieza México", "sanitización", "jardinería empresarial"],
  authors: [{ name: "Limpieza México" }],
  creator: "Limpieza México",
  publisher: "Limpieza México",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    title: "Limpieza México | Servicios Corporativos Integrales",
    description: "Expertos en soluciones de limpieza para empresas, industrias y corporativos a nivel nacional.",
    siteName: "Limpieza México",
    images: [{
      url: "/images/og-image-default.jpg", // Asegurarse de subir esta imagen
      width: 1200,
      height: 630,
      alt: "Limpieza México - Portada Oficial"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Limpieza México | Servicios Integrales",
    description: "Expertos en soluciones de limpieza para empresas, industrias y corporativos a nivel nacional.",
    images: ["/images/og-image-default.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TLRW34VF');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TLRW34VF"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
