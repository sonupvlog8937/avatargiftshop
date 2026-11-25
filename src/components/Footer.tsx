import { Link } from 'react-router-dom';
import { Clock, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS, MAPS_DIRECTIONS_URL } from '../data/business';
import { CATEGORIES } from '../data/categories';
import { defaultWhatsAppUrl } from '../utils/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-burgundy text-cream/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" aria-label={`${BUSINESS.name} – Home`} className="inline-block rounded-2xl bg-cream p-3">
            <img src="/images/logo.png" alt={BUSINESS.name} className="h-24 w-auto object-contain" />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            Beautiful flowers, thoughtful gifts and premium surprises for every celebration – from our store in Gaya.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-gold/50 p-2 text-gold transition hover:bg-gold hover:text-burgundy">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={defaultWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="rounded-full border border-gold/50 p-2 text-gold transition hover:bg-gold hover:text-burgundy">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg text-gold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              ['/', 'Home'],
              ['/shop', 'Shop'],
              ['/categories', 'Categories'],
              ['/about', 'About Us'],
              ['/contact', 'Contact'],
              ['/cart', 'Shopping Cart'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition hover:text-gold">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg text-gold">Categories</h3>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={`/shop?category=${c.slug}`} className="transition hover:text-gold">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg text-gold">Visit & Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">{BUSINESS.address}</a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${BUSINESS.phoneTel}`} className="hover:text-gold">{BUSINESS.phoneDisplay}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{BUSINESS.hours}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/20 py-5 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved. Orders are confirmed by the shop on WhatsApp.
      </div>
    </footer>
  );
}
