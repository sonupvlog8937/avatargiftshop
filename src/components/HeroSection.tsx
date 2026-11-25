import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { defaultWhatsAppUrl } from '../utils/whatsapp';
import ImageWithFallback from './ImageWithFallback';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-softpink/60 to-cream">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-burgundy/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:gap-10 lg:py-14">
        <div className="animate-fade-up text-center md:text-left">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/60 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-burgundy">
            <Sparkles className="h-3.5 w-3.5 text-gold-dark" /> Gaya's Gift Boutique
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-burgundy sm:text-5xl lg:text-6xl">
            Make Every Moment <span className="italic text-gold-dark">Beautiful</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-stone-600 sm:text-lg md:mx-0">
            Find the perfect gift for every celebration. Explore beautiful flowers, thoughtful gifts and premium surprises.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-burgundy px-7 py-3.5 font-semibold text-cream shadow-lg shadow-burgundy/20 transition hover:-translate-y-0.5 hover:bg-burgundy-dark"
            >
              Explore Collection <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={defaultWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-burgundy px-7 py-3.5 font-semibold text-burgundy transition hover:-translate-y-0.5 hover:bg-burgundy hover:text-cream"
            >
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg md:max-w-none">
          <div className="pointer-events-none absolute inset-x-3 bottom-2 top-3 translate-x-2 rotate-2 rounded-[2rem] border-2 border-gold/55" />
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=75"
            alt="Beautiful flowers and gifts from Avataar"
            loading="eager"
            className="hero-photo relative w-full rounded-[2rem] object-cover shadow-xl shadow-burgundy/15"
          />
        </div>
      </div>
    </section>
  );
}
