/**
 * Bloque de preguntas frecuentes. Usa <details>/<summary> nativo: accesible,
 * funciona sin JavaScript y el texto queda en el HTML para que Google lo indexe
 * (un acordeón con JS que oculta el contenido es peor para SEO).
 */
/** Slug estable a partir del título: evita ids duplicados cuando hay varios
 *  bloques Faq en la misma página (/preguntas-frecuentes monta tres).
 *  Un id repetido produce HTML inválido y un aria-labelledby ambiguo. */
function aId(texto: string): string {
  return (
    'faq-' +
    texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  );
}

export default function Faq({
  faqs,
  titulo = 'Preguntas frecuentes',
}: {
  faqs: { q: string; a: string }[];
  titulo?: string;
}) {
  const id = aId(titulo);
  return (
    <section aria-labelledby={id} className="mt-16">
      <h2 id={id} className="font-display text-3xl mb-6">
        {titulo}
      </h2>
      <div className="divide-y divide-[#EDEDEA] border-y border-[#EDEDEA]">
        {faqs.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="cursor-pointer list-none font-semibold text-[17px] flex justify-between gap-4">
              <span>{f.q}</span>
              <span aria-hidden="true" className="text-[#9B9BA3] group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-3 text-[15px] leading-relaxed text-[#1F1F25]/80">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
