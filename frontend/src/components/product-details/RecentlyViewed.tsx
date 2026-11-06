import React, { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import { ProductCard } from '../products/ProductCard';
import { History } from 'lucide-react';

export interface RecentlyViewedProps {
  currentProduct: Product;
}

const STORAGE_KEY = '3dunity_recently_viewed_v1';
const MAX_RECENT_ITEMS = 6;

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ currentProduct }) => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const list: Product[] = stored ? JSON.parse(stored) : [];

      // Exclude current product from display list
      const displayList = list.filter((p) => p.slug !== currentProduct.slug && p._id !== currentProduct._id);
      setRecentProducts(displayList.slice(0, 4));

      // Append/move current product to front of recent list
      const updated = [
        currentProduct,
        ...list.filter((p) => p.slug !== currentProduct.slug && p._id !== currentProduct._id),
      ].slice(0, MAX_RECENT_ITEMS);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to manage recently viewed storage:', err);
    }
  }, [currentProduct.slug, currentProduct._id]);

  if (recentProducts.length === 0) return null;

  return (
    <section className="recently-viewed-section" aria-label="Recently Viewed Products">
      <div className="section-title-row">
        <div className="title-with-badge">
          <History size={18} className="text-primary-blue" />
          <h3 className="related-heading">Recently Viewed</h3>
        </div>
      </div>

      <div className="related-products-grid">
        {recentProducts.map((prod) => (
          <ProductCard
            key={prod._id || prod.slug}
            product={prod}
            viewMode="grid"
          />
        ))}
      </div>
    </section>
  );
};

