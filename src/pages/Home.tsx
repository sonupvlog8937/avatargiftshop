import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import WhyChooseUs from '../components/WhyChooseUs';
import ReviewsSection from '../components/ReviewsSection';
import StoreLocation from '../components/StoreLocation';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <WhyChooseUs />
      <ReviewsSection />
      <StoreLocation />
    </>
  );
}
