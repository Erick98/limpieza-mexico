import Link from 'next/link';

/** Migas visibles. El JSON-LD BreadcrumbList lo emite cada página con breadcrumbLd(). */
export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="text-sm text-[#9B9BA3] mb-6">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => {
          const ultimo = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-1.5">
              {ultimo ? (
                <span aria-current="page" className="text-[#1F1F25]">
                  {it.name}
                </span>
              ) : (
                <>
                  <Link href={it.path} className="hover:underline">
                    {it.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
