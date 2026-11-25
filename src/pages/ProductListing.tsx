import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import type { SortOption } from '../types';

const SORTS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

export default function ProductListing() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const category = params.get('category') ?? 'all';
  const sort = (params.get('sort') as SortOption) ?? 'featured';

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'all' && value !== 'featured') next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const inCategory = category === 'all' || p.category === category;
      const matches =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term) ||
        p.category.replace(/-/g, ' ').includes(term);
      return inCategory && matches;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.salePrice - b.salePrice);
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.salePrice - a.salePrice);
    else if (sort === 'name-asc') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [q, category, sort]);

  const activeCategory = CATEGORIES.find((c) => c.slug === category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="font-display text-4xl font-semibold text-burgundy">{activeCategory ? activeCategory.name : 'All Products'}</h1>
        <p className="mt-2 text-stone-600">{activeCategory ? activeCategory.tagline : 'Browse our complete collection of gifts, flowers and decor.'}</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gold/30 bg-white p-4 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-stone-300 bg-cream px-4 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/50">
          <Search className="h-4 w-4 text-stone-500" />
          <input
            value={q}
            onChange={(e) => update('q', e.target.value)}
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full bg-transparent py-2.5 text-sm outline-none"
          />
          {q && (
            <button onClick={() => update('q', '')} aria-label="Clear search">
              <X className="h-4 w-4 text-stone-500" />
            </button>
          )}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <SlidersHorizontal className="h-4 w-4 text-burgundy" />
          <span className="sr-only">Sort by</span>
          <select
            value={sort}
            onChange={(e) => update('sort', e.target.value)}
            className="rounded-full border border-stone-300 bg-white px-4 py-2.5 outline-none focus:border-gold"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ slug: 'all', name: 'All' }, ...CATEGORIES].map((c) => (
          <button
            key={c.slug}
            onClick={() => update('category', c.slug)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
              category === c.slug
                ? 'border-burgundy bg-burgundy text-cream'
                : 'border-gold/50 bg-white text-stone-700 hover:border-burgundy hover:text-burgundy'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-stone-500">{results.length} product{results.length !== 1 && 's'} found</p>

      {results.length === 0 ? (
        <div className="rounded-3xl border border-gold/30 bg-white py-16 text-center">
          <p className="font-display text-2xl text-burgundy">No products found</p>
          <p className="mt-2 text-stone-600">Try a different search or category.</p>
          <button onClick={() => setParams({}, { replace: true })} className="mt-5 rounded-full bg-burgundy px-6 py-2.5 font-semibold text-cream">
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
