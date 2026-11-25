import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import { discountPercent, formatINR } from '../utils/format';
import { productWhatsAppUrl } from '../utils/whatsapp';
import ImageWithFallback from './ImageWithFallback';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const off = discountPercent(product.price, product.salePrice);

  const handleAdd = () => {
    addItem(product.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gold/30 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-softpink/40">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        {off > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-burgundy px-2.5 py-1 text-xs font-bold text-gold">
            {off}% OFF
          </span>
        )}
        {product.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-burgundy">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.75rem] font-display text-lg font-semibold leading-snug text-ink transition hover:text-burgundy">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-bold text-burgundy">{formatINR(product.salePrice)}</span>
          {off > 0 && <span className="text-sm text-stone-400 line-through">{formatINR(product.price)}</span>}
        </div>

        <p className={`mt-1 text-xs font-semibold ${product.inStock ? 'text-emerald-700' : 'text-red-600'}`}>
          {product.inStock ? '● In Stock' : '● Out of Stock'}
        </p>

        <div className="mt-4 grid gap-2">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-burgundy py-2.5 text-sm font-semibold text-cream transition hover:bg-burgundy-dark disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
            {added ? 'Added!' : product.inStock ? 'Add to Cart' : 'Unavailable'}
          </button>
          <a
            href={productWhatsAppUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366] py-2.5 text-sm font-semibold text-[#128C7E] transition hover:bg-[#25D366] hover:text-white"
          >
            <MessageCircle className="h-4 w-4" /> Order on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
