export default function SectionIntro({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#2F5D50]">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-4xl leading-[1.08] text-[#101014] sm:text-5xl">{title}</h2>
      {children && <div className="mt-5 text-[17px] leading-8 text-[#1F1F25]/75">{children}</div>}
    </div>
  );
}
