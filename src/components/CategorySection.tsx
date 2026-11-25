import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import ImageWithFallback from './ImageWithFallback';
import SectionHeading from './SectionHeading';

export default function CategorySection({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      {showHeading && (
        <SectionHeading eyebrow="Browse" title="Shop by Categories" subtitle="A gift for every person and every occasion." />
      )}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          const total = PRODUCTS.filter((p) => p.category === c.slug).length;
          return (
            <Link
              key={c.slug}
              to={`/shop?category=${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <ImageWithFallback
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-burgundy/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-cream">
                <Icon className="mb-2 h-5 w-5 text-gold" />
                <h3 className="font-display text-base font-semibold leading-tight sm:text-xl">{c.name}</h3>
                <p className="mt-1 hidden text-xs text-cream/80 sm:block">{c.tagline}</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-gold">{total} products</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
