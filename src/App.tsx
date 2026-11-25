import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import About from './pages/About';
import CartPage from './pages/CartPage';
import CategoriesPage from './pages/CategoriesPage';
import CheckoutPage from './pages/CheckoutPage';
import Contact from './pages/Contact';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProductDetails from './pages/ProductDetails';
import ProductListing from './pages/ProductListing';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<ProductListing />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="product/:slug" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
