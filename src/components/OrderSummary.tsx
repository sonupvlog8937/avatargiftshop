import type { ReactNode } from 'react';
import { DELIVERY } from '../data/business';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/format';
import ImageWithFallback from './ImageWithFallback';

interface Props {
  showItems?: boolean;
  children?: ReactNode;
}

/** Totals box (and optional item list). Reused in cart and checkout. */
export default function OrderSummary({ showItems = false, children }: Props) {
  const { lines, subtotal, deliveryCharge, total } = useCart();
  const remaining = DELIVERY.freeAbove - subtotal;

  return (
    <aside className="rounded-3xl border border-gold/40 bg-white p-6 shadow-sm">
      <h2 className="font-display text-xl font-semibold text-burgundy">Order Summary</h2>

      {showItems && (
        <ul className="mt-4 divide-y divide-stone-100">
          {lines.map((l) => (
            <li key={l.product.id} className="flex items-center gap-3 py-3">
              <ImageWithFallback src={l.product.images[0]} alt={l.product.name} className="h-14 w-14 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{l.product.name}</p>
                <p className="text-xs text-stone-500">
                  {l.quantity} × {formatINR(l.product.salePrice)}
                </p>
              </div>
              <p className="text-sm font-semibold">{formatINR(l.lineTotal)}</p>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-stone-600">Subtotal</dt>
          <dd className="font-medium">{formatINR(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-stone-600">Delivery Charges</dt>
          <dd className="font-medium">{deliveryCharge === 0 ? 'Free' : formatINR(deliveryCharge)}</dd>
        </div>
        <div className="flex justify-between border-t border-gold/40 pt-3 text-lg">
          <dt className="font-display font-semibold text-burgundy">Total</dt>
          <dd className="font-bold text-burgundy">{formatINR(total)}</dd>
        </div>
      </dl>

      {subtotal > 0 && remaining > 0 && (
        <p className="mt-3 rounded-lg bg-softpink px-3 py-2 text-xs text-burgundy">
          Add items worth {formatINR(remaining)} more for free delivery.
        </p>
      )}
      <p className="mt-3 text-xs text-stone-500">Final delivery charges and availability are confirmed by the shop on WhatsApp.</p>
      {children && <div className="mt-5">{children}</div>}
    </aside>
  );
}
