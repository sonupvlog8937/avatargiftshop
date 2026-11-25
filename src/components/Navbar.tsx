import { useEffect, useState, type FormEvent } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS } from '../data/business';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { count } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
    setSearchOpen(false);
    setQuery('');
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-1 text-sm font-medium tracking-wide transition hover:text-burgundy ${
      isActive ? 'text-burgundy after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-gold' : 'text-stone-700'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-gold/30 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-24">
        <button
          className="rounded-full p-2 text-burgundy hover:bg-softpink lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link to="/" aria-label={`${BUSINESS.name} – Home`} className="flex items-center">
          <img
            src="/images/logo.png"
            alt={BUSINESS.name}
            width={800}
            height={546}
            className="h-14 w-auto object-contain lg:h-[4.5rem]"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            className="rounded-full p-2 text-burgundy hover:bg-softpink"
            aria-label="Search products"
            onClick={() => setSearchOpen((o) => !o)}
          >
            <Search className="h-5 w-5" />
          </button>
          <Link to="/cart" className="relative rounded-full p-2 text-burgundy hover:bg-softpink" aria-label={`Cart, ${count} items`}>
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-burgundy px-1 text-[11px] font-bold text-gold">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <form onSubmit={submitSearch} className="border-t border-gold/20 bg-white px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-full border border-gold/60 bg-cream px-4">
            <Search className="h-4 w-4 text-stone-500" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search flowers, teddy, hampers…"
              className="w-full bg-transparent py-2.5 text-sm outline-none"
            />
            <button type="submit" className="text-sm font-semibold text-burgundy">
              Search
            </button>
          </div>
        </form>
      )}

      {menuOpen && (
        <nav className="border-t border-gold/20 bg-white px-4 pb-4 lg:hidden" aria-label="Mobile">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `block border-b border-stone-100 py-3 text-base font-medium ${isActive ? 'text-burgundy' : 'text-stone-700'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
