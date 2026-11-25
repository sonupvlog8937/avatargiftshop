interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: Props) {
  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl font-semibold text-burgundy sm:text-4xl">{title}</h2>
      <div className={`mt-4 flex items-center gap-2 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="h-px w-12 bg-gold" />
        <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
        <span className="h-px w-12 bg-gold" />
      </div>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-stone-600">{subtitle}</p>}
    </div>
  );
}
