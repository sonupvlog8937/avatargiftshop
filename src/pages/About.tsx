import { Link } from 'react-router-dom';
import { Heart, MapPin, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import StoreLocation from '../components/StoreLocation';
import WhyChooseUs from '../components/WhyChooseUs';
import { BUSINESS } from '../data/business';

export default function About() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Our Story" title="About Avataar :: Decor & Gifts" />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="flex aspect-[4/3] w-full items-center justify-center rounded-3xl border border-gold/40 bg-white p-6 shadow-xl">
            <img src="/images/logo.png" alt={BUSINESS.name} className="max-h-full w-auto object-contain" />
          </div>
          <div className="space-y-4 leading-relaxed text-stone-700">
            <p>
              Avataar :: Decor & Gifts is a gift shop in Gaya, Bihar, offering flowers, bouquets, soft toys, hampers, home decor and personalised gifts for every celebration.
            </p>
            <p>
              We love helping people say what words cannot – with beautiful presentation, thoughtful choices and friendly service. Visit us at {BUSINESS.addressLines[0]} or order from home on WhatsApp.
            </p>
            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {[
                { icon: Heart, text: 'Made with care' },
                { icon: Sparkles, text: 'Premium finish' },
                { icon: MapPin, text: 'Local in Gaya' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 rounded-xl bg-softpink px-4 py-3 text-sm font-medium text-burgundy">
                  <Icon className="h-4 w-4" /> {text}
                </div>
              ))}
            </div>
            <Link to="/shop" className="mt-4 inline-block rounded-full bg-burgundy px-7 py-3 font-semibold text-cream hover:bg-burgundy-dark">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>
      <WhyChooseUs />
      <StoreLocation />
    </>
  );
}
