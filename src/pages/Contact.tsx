import { useState, type FormEvent } from 'react';
import { Clock, Instagram, MapPin, MessageCircle, Navigation, Phone, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { BUSINESS, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL } from '../data/business';
import { buildEnquiryMessage, buildWhatsAppUrl, defaultWhatsAppUrl } from '../utils/whatsapp';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [error, setError] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2 || form.message.trim().length < 3) {
      setError('Please enter your name and a message.');
      return;
    }
    setError('');
    // No backend: the enquiry is sent through WhatsApp.
    const win = window.open(buildWhatsAppUrl(buildEnquiryMessage(form.name.trim(), form.phone.trim(), form.message.trim())), '_blank');
    if (win) win.opener = null;
  };

  const items = [
    { icon: Phone, title: 'Call Us', node: <a href={`tel:${BUSINESS.phoneTel}`} className="hover:text-burgundy">{BUSINESS.phoneDisplay}</a> },
    { icon: MessageCircle, title: 'WhatsApp', node: <a href={defaultWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-burgundy">Chat on {BUSINESS.phoneDisplay}</a> },
    { icon: Instagram, title: 'Instagram', node: <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-burgundy">@avataardg</a> },
    { icon: Clock, title: 'Opening Hours', node: <span>{BUSINESS.hours}</span> },
    { icon: MapPin, title: 'Address', node: <span>{BUSINESS.address}</span> },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionHeading eyebrow="Get in touch" title="Contact Us" subtitle="Questions about a gift or a custom order? We're happy to help." />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {items.map(({ icon: Icon, title, node }) => (
            <div key={title} className="flex items-start gap-4 rounded-2xl border border-gold/30 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-burgundy text-gold">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-burgundy">{title}</h3>
                <div className="text-stone-700">{node}</div>
              </div>
            </div>
          ))}
          <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-3 font-semibold text-cream hover:bg-burgundy-dark">
            <Navigation className="h-4 w-4" /> Get Directions
          </a>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-gold/40 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-burgundy">Send us a message</h2>
          <p className="mt-1 text-sm text-stone-500">Your message opens in WhatsApp – press Send there to reach us.</p>
          <div className="mt-5 space-y-4">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name *" aria-label="Your name" className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/50" />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone (optional)" type="tel" aria-label="Phone" className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/50" />
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} placeholder="How can we help? *" aria-label="Message" className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/50" />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-semibold text-white hover:bg-[#1ebe5b]">
              <Send className="h-4 w-4" /> Send via WhatsApp
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 h-80 overflow-hidden rounded-3xl border border-gold/30 shadow-lg">
        <iframe title="Avataar location map" src={MAPS_EMBED_URL} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </div>
  );
}
