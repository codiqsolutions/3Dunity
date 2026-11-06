import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryGridSection } from '../components/home/CategoryGridSection';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { CtaBannerSection } from '../components/home/CtaBannerSection';
import { GallerySection } from '../components/home/GallerySection';
import { ProductQuickViewModal } from '../components/home/ProductQuickViewModal';
import { SearchModal } from '../components/home/SearchModal';
import { Product } from '../types/product';

interface HomePageProps {
  isSearchOpen: boolean;
  onCloseSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ isSearchOpen, onCloseSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchSelectedProduct, setSearchSelectedProduct] = useState<Product | null>(null);

  const handleSelectCategoryFromGrid = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    const element = document.getElementById('featured-products');
    if (element) {
      const navHeight = 72;
      const pos = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  return (
    <main>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Section 03: Explore Our 3D Collection */}
      <CategoryGridSection
        activeCategorySlug={selectedCategory}
        onSelectCategory={handleSelectCategoryFromGrid}
      />

      {/* 3. Section 04: Featured Products */}
      <FeaturedProductsSection
        selectedCategorySlug={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* 4. Section 05: Our Services */}
      <ServicesSection />

      {/* 5. Section 06: How It Works */}
      <HowItWorksSection />

      {/* 6. Section 07: Need a Custom 3D Model? Banner */}
      <CtaBannerSection />

      {/* 7. Section 08: From Our Gallery */}
      <GallerySection />

      {/* 8. Section 09: Client Testimonials */}
      <TestimonialsSection />

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

