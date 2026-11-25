import CheckoutForm from '../components/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-center text-4xl font-semibold text-burgundy">Checkout</h1>
      <p className="mx-auto mb-8 mt-2 max-w-xl text-center text-stone-600">
        Enter your delivery details, review your order and send it to us on WhatsApp.
      </p>
      <CheckoutForm />
    </div>
  );
}
