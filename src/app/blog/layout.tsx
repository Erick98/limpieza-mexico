import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog y Recursos | Guías Corporativas",
  description: "Manténgase actualizado con recursos sobre normatividad en limpieza, calculadoras financieras para facility management y protocolos de desinfección en México.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
