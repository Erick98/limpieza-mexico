import { Metadata } from "next";

// /login no aporta valor de indexación: fuera del sitemap y marcada noindex.
export const metadata: Metadata = {
  title: "Acceso a clientes",
  description: "Portal de acceso para clientes y colaboradores de Limpieza México.",
  robots: "noindex, follow",
  alternates: { canonical: "/login" },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
