/**
 * FAQ accesible con <details>/<summary>: indexable, sin JavaScript extra.
 */
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
      <h2 id={id} className="font-display text-4xl leading-tight text-[#101014]">
        {titulo}
      </h2>
      <div className="mt-7 overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-[0_18px_55px_rgba(31,31,37,0.06)]">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-black/10 p-5 last:border-b-0 sm:p-6">
            <summary className="flex cursor-pointer list-none justify-between gap-4 text-[17px] font-bold text-[#101014]">
              <span>{f.q}</span>
              <span aria-hidden="true" className="text-[#2F5D50] transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 text-[15px] leading-7 text-[#1F1F25]/75">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
