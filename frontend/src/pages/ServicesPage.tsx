import React, { useState } from 'react';
import { ServicesHero } from '../components/services/ServicesHero';
import { ServicesSection } from '../components/home/ServicesSection';
import { CtaBannerSection } from '../components/home/CtaBannerSection';
import { SearchModal } from '../components/home/SearchModal';
import { ProductQuickViewModal } from '../components/home/ProductQuickViewModal';
import { Product } from '../types/product';

interface ServicesPageProps {
  isSearchOpen?: boolean;
  onCloseSearch?: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  isSearchOpen = false,
  onCloseSearch = () => {},
}) => {
  const [searchSelectedProduct, setSearchSelectedProduct] = useState<Product | null>(null);

  const handleScrollToServices = () => {
    const el = document.getElementById('services-section');
    if (el) {
      const navHeight = 74;
      const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  };

  return (
    <main className="services-page-main">
      {/* 1. Hero Section for Our Services */}
      <ServicesHero onExploreServices={handleScrollToServices} />

      {/* 2. Detailed Services Grid Section */}
      <ServicesSection />

      {/* 3. Custom Project Inquiry Banner */}
      <CtaBannerSection />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={onCloseSearch}
        onSelectProduct={(p) => setSearchSelectedProduct(p)}
      />

      {/* Quick View Modal for search results */}
      <ProductQuickViewModal
        product={searchSelectedProduct}
        isOpen={!!searchSelectedProduct}
        onClose={() => setSearchSelectedProduct(null)}
      />
    </main>
  );
};

export default ServicesPage;

