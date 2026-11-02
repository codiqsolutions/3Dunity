import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { productApi } from '../../api/productApi';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { ProductQuickViewModal } from './ProductQuickViewModal';
import { Skeleton } from '../common/Skeleton';

export interface FeaturedProductsSectionProps {
  selectedCategorySlug?: string;
  onCategoryChange?: (slug: string) => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  selectedCategorySlug = 'all',
  onCategoryChange,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch dynamically from backend API
      const res = await productApi.getFeatured(5);
      if (res.data && Array.isArray(res.data)) {
        setProducts(res.data.slice(0, 5));
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load featured 3D products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/products');
  };

  return (
    <section id="featured-products" className="featured-products-section">
      <div className="container">
        {/* Section Header */}
        <div className="featured-header-row">
          <h2 className="featured-section-title">
            Featured Products
          </h2>

          <button onClick={handleViewAll} className="featured-view-all-link">
            <span>View All Products</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Loading Skeletons State */}
        {loading && (
          <div className="featured-products-grid">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="featured-skeleton-card">
                <Skeleton height="160px" borderRadius="var(--radius-lg)" />
                <div style={{ padding: '0.85rem 0.25rem 0.25rem' }}>
                  <Skeleton width="85%" height="1.1rem" style={{ marginBottom: '0.65rem' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton width="40%" height="1.25rem" />
                    <Skeleton width="32px" height="32px" borderRadius="var(--radius-full)" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State with Retry Button */}
        {!loading && error && (
          <div className="featured-error-card">
            <AlertCircle size={32} color="#EF4444" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
              Unable to load featured products
            </h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              {error}
            </p>
            <button onClick={fetchFeaturedProducts} className="featured-retry-btn">
              <RefreshCw size={14} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="featured-error-card">
            <p style={{ color: 'var(--color-text-secondary)' }}>
              No featured products available at this time.
            </p>
          </div>
        )}

        {/* Products Grid (5 cards across matching photo) */}
        {!loading && !error && products.length > 0 && (
          <div className="featured-products-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Quick View / Product Detail Modal */}
        <ProductQuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      </div>
    </section>
  );
};
