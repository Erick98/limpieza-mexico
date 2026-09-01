/**
 * Inyecta un bloque JSON-LD. Server Component (cero JS al cliente).
 * Se sanea `<` para evitar romper el script si algún texto trae HTML.
 */
export default function JsonLd({ data }: { data: unknown | unknown[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
