import { ExternalLink, Star } from 'lucide-react';
import { BUSINESS, MAPS_VIEW_URL } from '../data/business';
import SectionHeading from './SectionHeading';

/** Shows only the real Google rating + count. No fabricated testimonials. */
export default function ReviewsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Loved by Gaya" title="Customer Reviews" />
      <div className="mx-auto max-w-2xl rounded-3xl border border-gold/40 bg-white p-8 text-center shadow-lg sm:p-12">
        <p className="font-display text-6xl font-bold text-burgundy">
          {BUSINESS.rating}
          <span className="text-2xl text-stone-400">/5</span>
        </p>
        <div className="mt-3 flex justify-center gap-1" aria-label={`${BUSINESS.rating} out of 5 stars`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-6 w-6 fill-gold text-gold" />
          ))}
        </div>
        <p className="mt-4 text-lg text-stone-700">
          Based on <strong>{BUSINESS.reviewCount} Google reviews</strong>
        </p>
        <a
          href={MAPS_VIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-cream transition hover:bg-burgundy-dark"
        >
          Read reviews on Google <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
