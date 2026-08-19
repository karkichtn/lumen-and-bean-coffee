import Hero from '@/components/Hero';
import ProductCatalog from '@/components/ProductCatalog';
import CoffeeLabCustomizer from '@/components/CoffeeLabCustomizer';
import BrewGuides from '@/components/BrewGuides';
import SubscriptionBuilder from '@/components/SubscriptionBuilder';
import ReviewsSection from '@/components/ReviewsSection';
import LocationsSection from '@/components/LocationsSection';

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <ProductCatalog />
      <CoffeeLabCustomizer />
      <BrewGuides />
      <SubscriptionBuilder />
      <LocationsSection />
      <ReviewsSection />
    </div>
  );
}
