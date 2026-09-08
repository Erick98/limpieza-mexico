import Link from 'next/link';

export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-7 text-sm text-[#1F1F25]/55">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => {
          const ultimo = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-2">
              {ultimo ? (
                <span aria-current="page" className="rounded-full bg-white px-3 py-1 text-[#1F1F25]">
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
