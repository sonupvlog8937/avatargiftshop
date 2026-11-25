import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { discountPercent, formatINR } from '../utils/format';
import ImageWithFallback from './ImageWithFallback';
import OrderSummary from './OrderSummary';
import QuantitySelector from './QuantitySelector';

export default function ShoppingCart() {
  const { lines, setQuantity, removeItem, clearCart } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-gold/40 bg-white p-10 text-center shadow-sm">
        <ShoppingBag className="mx-auto h-14 w-14 text-gold" />
        <h2 className="mt-4 font-display text-2xl font-semibold text-burgundy">Your cart is empty</h2>
        <p className="mt-2 text-stone-600">Looks like you haven't added any gifts yet.</p>
        <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-burgundy px-7 py-3 font-semibold text-cream hover:bg-burgundy-dark">
          Continue Shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">
        {lines.map(({ product, quantity, lineTotal }) => {
          const off = discountPercent(product.price, product.salePrice);
          return (
            <div key={product.id} className="flex gap-4 rounded-2xl border border-gold/30 bg-white p-4 shadow-sm">
              <Link to={`/product/${product.slug}`} className="shrink-0">
                <ImageWithFallback src={product.images[0]} alt={product.name} className="h-24 w-24 rounded-xl object-cover sm:h-28 sm:w-28" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link to={`/product/${product.slug}`} className="line-clamp-2 font-display text-base font-semibold hover:text-burgundy sm:text-lg">
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm">
                      <span className="font-semibold text-burgundy">{formatINR(product.salePrice)}</span>
                      {off > 0 && <span className="ml-2 text-xs text-stone-400 line-through">{formatINR(product.price)}</span>}
                    </p>
                    {!product.inStock && <p className="text-xs font-semibold text-red-600">Currently out of stock – shop will confirm</p>}
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    aria-label={`Remove ${product.name}`}
                    className="rounded-full p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <QuantitySelector size="sm" value={quantity} onChange={(q) => setQuantity(product.id, q)} />
                  <p className="font-bold text-ink">{formatINR(lineTotal)}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Link to="/shop" className="font-semibold text-burgundy underline-offset-4 hover:underline">
            ← Continue Shopping
          </Link>
          <button onClick={() => window.confirm('Remove all items from the cart?') && clearCart()} className="text-sm text-stone-500 hover:text-red-600">
            Clear cart
          </button>
        </div>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <OrderSummary>
          <Link to="/checkout" className="flex items-center justify-center gap-2 rounded-full bg-burgundy py-3.5 font-semibold text-cream transition hover:bg-burgundy-dark">
            Proceed to Checkout <ArrowRight className="h-4 w-4" />
          </Link>
        </OrderSummary>
      </div>
    </div>
  );
}
