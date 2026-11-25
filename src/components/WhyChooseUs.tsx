import { Gift, HeartHandshake, MapPin, PackageCheck, PartyPopper } from 'lucide-react';
import SectionHeading from './SectionHeading';

const REASONS = [
  { icon: Gift, title: 'Premium Gift Collection', text: 'Carefully selected flowers, hampers and decor with a luxurious finish.' },
  { icon: PackageCheck, title: 'Beautiful Packaging', text: 'Every gift is wrapped with care so it is ready to impress.' },
  { icon: PartyPopper, title: 'Gifts for Every Occasion', text: 'Birthdays, anniversaries, festivals or just-because surprises.' },
  { icon: MapPin, title: 'Local Store in Gaya', text: 'Visit us at Dighi More, Rajendra Ashram and see gifts in person.' },
  { icon: HeartHandshake, title: 'Friendly Customer Support', text: 'Chat with us on WhatsApp for help choosing the perfect gift.' },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-b from-cream to-softpink/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Our Promise" title="Why Choose Avataar?" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {REASONS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-gold/30 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-burgundy text-gold">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-burgundy">{title}</h3>
              <p className="mt-2 text-sm text-stone-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
