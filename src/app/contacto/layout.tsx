import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Solicite una Cotización B2B",
  description: "Hablemos de su proyecto. Contáctenos para diseñar un esquema de limpieza o mantenimiento técnico a la medida de sus instalaciones empresariales o industriales.",
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
