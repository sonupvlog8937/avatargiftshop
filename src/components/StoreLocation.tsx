import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { BUSINESS, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL, MAPS_VIEW_URL } from '../data/business';
import SectionHeading from './SectionHeading';

export default function StoreLocation() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Visit Us" title="Store Location" subtitle="Drop by our boutique in Gaya and explore our collection in person." />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5 rounded-3xl border border-gold/30 bg-cream p-6 sm:p-8">
            <div className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-burgundy" />
              <div>
                <h3 className="font-display text-lg font-semibold text-burgundy">Address</h3>
                <p className="text-stone-700">{BUSINESS.address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-burgundy" />
              <div>
                <h3 className="font-display text-lg font-semibold text-burgundy">Business Hours</h3>
                <p className="text-stone-700">{BUSINESS.hours}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-burgundy" />
              <div>
                <h3 className="font-display text-lg font-semibold text-burgundy">Phone</h3>
                <a href={`tel:${BUSINESS.phoneTel}`} className="text-stone-700 hover:text-burgundy">{BUSINESS.phoneDisplay}</a>
              </div>
            </div>
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-3 font-semibold text-cream transition hover:bg-burgundy-dark"
            >
              <Navigation className="h-4 w-4" /> Get Directions
            </a>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-gold/30 bg-softpink/40 shadow-lg">
            <iframe
              title="Avataar Decor & Gifts location on Google Maps"
              src={MAPS_EMBED_URL}
              className="relative z-10 h-full min-h-[320px] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Visible behind the iframe: shows only if the embedded map is blocked */}
            <a
              href={MAPS_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-burgundy"
            >
              <MapPin className="h-10 w-10" />
              <span className="font-display text-lg font-semibold">View on Google Maps</span>
              <span className="text-sm text-stone-600">{BUSINESS.address}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
