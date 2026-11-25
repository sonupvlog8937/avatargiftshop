import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Info, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { CustomerDetails } from '../types';
import { buildOrderMessage, buildWhatsAppUrl } from '../utils/whatsapp';
import { validateCustomer, type FormErrors } from '../utils/validation';
import OrderSummary from './OrderSummary';

const EMPTY: CustomerDetails = {
  name: '',
  phone: '',
  address: '',
  city: 'Gaya',
  pincode: '',
  deliveryInstructions: '',
  notes: '',
};

const inputClass = (error?: string) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-gold ${
    error ? 'border-red-400' : 'border-stone-300 focus:border-gold'
  }`;

export default function CheckoutForm() {
  const { lines, subtotal, deliveryCharge, total, clearCart } = useCart();
  const [form, setForm] = useState<CustomerDetails>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof CustomerDetails]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;

    const found = validateCustomer(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`field-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    const message = buildOrderMessage(form, lines, { subtotal, deliveryCharge, total });
    const url = buildWhatsAppUrl(message);
    setWaUrl(url);

    // Opens WhatsApp (app on mobile, WhatsApp Web on desktop). The cart is NOT cleared here.
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    setPopupBlocked(!win);
  };

  /* ---------- Empty cart ---------- */
  if (lines.length === 0) {
    return (
      <div role="alert" className="mx-auto max-w-lg rounded-3xl border border-red-200 bg-white p-10 text-center shadow-sm">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-4 font-display text-2xl font-semibold text-burgundy">Your cart is empty</h2>
        <p className="mt-2 text-stone-600">Please add at least one product before placing an order.</p>
        <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-burgundy px-7 py-3 font-semibold text-cream hover:bg-burgundy-dark">
          <ShoppingBag className="h-4 w-4" /> Browse Products
        </Link>
      </div>
    );
  }

  const field = (name: keyof CustomerDetails, label: string, required = false) => (
    <label htmlFor={`field-${name}`} className="block">
      <span className="mb-1 block text-sm font-medium text-stone-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
    </label>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 lg:grid-cols-[1fr_400px]">
      <div className="space-y-5 rounded-3xl border border-gold/40 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-burgundy">Delivery Details</h2>

        <div>
          {field('name', 'Full Name', true)}
          <input id="field-name" name="name" value={form.name} onChange={onChange} autoComplete="name" className={inputClass(errors.name)} placeholder="Your full name" />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          {field('phone', 'Mobile Number', true)}
          <input id="field-phone" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={onChange} autoComplete="tel" className={inputClass(errors.phone)} placeholder="10-digit mobile number" />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>

        <div>
          {field('address', 'Delivery Address', true)}
          <textarea id="field-address" name="address" rows={3} value={form.address} onChange={onChange} autoComplete="street-address" className={inputClass(errors.address)} placeholder="House / flat no., street, landmark" />
          {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            {field('city', 'City')}
            <input id="field-city" name="city" value={form.city} onChange={onChange} autoComplete="address-level2" className={inputClass()} />
          </div>
          <div>
            {field('pincode', 'Pincode')}
            <input id="field-pincode" name="pincode" inputMode="numeric" maxLength={6} value={form.pincode} onChange={onChange} autoComplete="postal-code" className={inputClass(errors.pincode)} placeholder="823001" />
            {errors.pincode && <p className="mt-1 text-xs text-red-600">{errors.pincode}</p>}
          </div>
        </div>

        <div>
          {field('deliveryInstructions', 'Delivery Instructions (optional)')}
          <textarea id="field-deliveryInstructions" name="deliveryInstructions" rows={2} value={form.deliveryInstructions} onChange={onChange} className={inputClass()} placeholder="Preferred time, gate code, call before arriving…" />
        </div>

        <div>
          {field('notes', 'Order Notes (optional)')}
          <textarea id="field-notes" name="notes" rows={2} value={form.notes} onChange={onChange} className={inputClass()} placeholder="Message for the card, personalisation details…" />
        </div>
      </div>

      <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
        <OrderSummary showItems>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-semibold text-white shadow-lg shadow-[#25D366]/30 transition hover:bg-[#1ebe5b]"
          >
            <MessageCircle className="h-5 w-5" /> Place Order on WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-stone-500">
            WhatsApp will open with your order message ready. Press <strong>Send</strong> there to share it with us.
          </p>
        </OrderSummary>

        <div className="flex gap-3 rounded-2xl border border-gold/50 bg-softpink/60 p-4 text-sm text-burgundy">
          <Info className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            <strong>Your order is not confirmed yet.</strong> It is confirmed only after the shop owner replies to your WhatsApp message with availability and delivery details. No online payment is taken on this website.
          </p>
        </div>

        {waUrl && (
          <div role="status" className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900">
            <p className="font-semibold">
              {popupBlocked ? 'WhatsApp could not open automatically.' : 'WhatsApp opened in a new tab.'}
            </p>
            <p className="mt-1">Don't forget to press <strong>Send</strong> in WhatsApp. Your cart is still saved here.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-4 py-2 font-semibold text-white">
                Open WhatsApp again
              </a>
              <button type="button" onClick={() => { clearCart(); setWaUrl(null); setForm(EMPTY); }} className="rounded-full border border-emerald-700 px-4 py-2 font-semibold">
                I've sent it – clear cart
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
