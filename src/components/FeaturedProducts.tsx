import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import SectionHeading from './SectionHeading';

export default function FeaturedProducts() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Handpicked" title="Featured Products" subtitle="Our most loved gifts, ready to be wrapped and delivered." />
        <div className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/shop" className="inline-flex items-center gap-2 rounded-full border-2 border-burgundy px-7 py-3 font-semibold text-burgundy transition hover:bg-burgundy hover:text-cream">
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
