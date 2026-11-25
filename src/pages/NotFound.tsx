import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="font-display text-7xl font-bold text-gold">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-burgundy">Page not found</h1>
      <p className="mt-2 text-stone-600">The page or product you are looking for doesn't exist.</p>
      <Link to="/shop" className="mt-6 inline-block rounded-full bg-burgundy px-7 py-3 font-semibold text-cream hover:bg-burgundy-dark">
        Back to Shop
      </Link>
    </div>
  );
}
