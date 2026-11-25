import ShoppingCart from '../components/ShoppingCart';

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-center font-display text-4xl font-semibold text-burgundy">Shopping Cart</h1>
      <ShoppingCart />
    </div>
  );
}
