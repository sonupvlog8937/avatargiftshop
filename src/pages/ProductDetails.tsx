import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Check, ChevronRight, MessageCircle, ShoppingBag, Zap } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import ProductCard from '../components/ProductCard';
import QuantitySelector from '../components/QuantitySelector';
import { useCart } from '../context/CartContext';
import { getCategory } from '../data/categories';
import { getProductBySlug, PRODUCTS } from '../data/products';
import { discountPercent, formatINR } from '../utils/format';
import { productWhatsAppUrl } from '../utils/whatsapp';
import NotFound from './NotFound';

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) return <NotFound />;

  const category = getCategory(product.category);
  const off = discountPercent(product.price, product.salePrice);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addItem(product.id, qty);
    navigate('/checkout');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-stone-500" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-burgundy">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/shop" className="hover:text-burgundy">Shop</Link>
        {category && (
          <>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/shop?category=${category.slug}`} className="hover:text-burgundy">{category.name}</Link>
          </>
        )}
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-white">
            <ImageWithFallback src={product.images[activeImg]} alt={product.name} loading="eager" className="aspect-square w-full object-cover" />
            {off > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-burgundy px-3 py-1 text-sm font-bold text-gold">{off}% OFF</span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition ${i === activeImg ? 'border-burgundy' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <ImageWithFallback src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.badge && <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-burgundy">{product.badge}</span>}
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-burgundy sm:text-4xl">{product.name}</h1>

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold text-burgundy">{formatINR(product.salePrice)}</span>
            {off > 0 && (
              <>
                <span className="text-lg text-stone-400 line-through">{formatINR(product.price)}</span>
                <span className="text-sm font-semibold text-emerald-700">You save {formatINR(product.price - product.salePrice)}</span>
              </>
            )}
          </div>

          <p className={`mt-3 text-sm font-semibold ${product.inStock ? 'text-emerald-700' : 'text-red-600'}`}>
            {product.inStock ? '● In Stock' : '● Out of Stock – message us for availability'}
          </p>

          <p className="mt-5 leading-relaxed text-stone-700">{product.description}</p>

          <ul className="mt-5 space-y-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm text-stone-700">
                <Check className="h-4 w-4 text-gold-dark" /> {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm font-medium">Quantity</span>
            <QuantitySelector value={qty} onChange={setQty} />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-burgundy py-3.5 font-semibold text-cream transition hover:bg-burgundy-dark disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              {added ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
              {added ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold py-3.5 font-semibold text-burgundy transition hover:bg-gold-dark hover:text-white disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400"
            >
              <Zap className="h-5 w-5" /> Buy Now
            </button>
            <a
              href={productWhatsAppUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#25D366] py-3.5 font-semibold text-[#128C7E] transition hover:bg-[#25D366] hover:text-white sm:col-span-2"
            >
              <MessageCircle className="h-5 w-5" /> Order on WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs text-stone-500">Orders are confirmed only after the shop replies on WhatsApp. No online payment on this website.</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-display text-2xl font-semibold text-burgundy">You may also like</h2>
          <div className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
