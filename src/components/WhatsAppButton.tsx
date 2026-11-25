import { MessageCircle } from 'lucide-react';
import { defaultWhatsAppUrl } from '../utils/whatsapp';

/** Floating WhatsApp button shown on every page. */
export default function WhatsAppButton() {
  return (
    <a
      href={defaultWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Avataar on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-4 text-white shadow-lg shadow-black/20 transition hover:scale-105 sm:px-5 sm:py-3"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden text-sm font-semibold sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
