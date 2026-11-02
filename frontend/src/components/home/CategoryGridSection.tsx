import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { categoryApi } from '../../api/categoryApi';
import { Category } from '../../types/category';
import { CategoryCard } from './CategoryCard';
import { Skeleton } from '../common/Skeleton';

export interface CategoryGridSectionProps {
  activeCategorySlug: string;
  onSelectCategory: (slug: string) => void;
}

export const CategoryGridSection: React.FC<CategoryGridSectionProps> = ({
  activeCategorySlug,
  onSelectCategory,
}) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await categoryApi.getAll();
      if (res.data && Array.isArray(res.data)) {
        // Sort by order ascending
        const sorted = [...res.data].sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(sorted);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load product categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (slug: string) => {
    if (slug === 'more-categories' || slug === 'all') {
      navigate('/products');
    } else {
      navigate(`/products?category=${slug}`);
    }
  };

  return (
    <section id="categories-section" className="collection-section">
      <div className="container">
        {/* Section Header */}
        <div className="collection-header-row">
          <div>
            <h2 className="collection-heading">
              Explore Our <span className="collection-blue-highlight">3D Collection</span>
            </h2>
            <p className="collection-subheading">
              Discover a wide range of 3D printed products or create your own custom model.
            </p>
          </div>

          <button
            onClick={() => handleCategoryClick('all')}
            className="view-all-products-link"
          >
            <span>View All Products</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="collection-cards-grid">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="collection-skeleton-card">
                <Skeleton width="38px" height="38px" borderRadius="var(--radius-md)" />
                <Skeleton width="70%" height="0.95rem" style={{ marginTop: '0.75rem' }} />
                <Skeleton width="45%" height="0.75rem" style={{ marginTop: '0.35rem' }} />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="collection-error-card">
            <AlertCircle size={32} color="#EF4444" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ color: 'var(--color-navy)', marginBottom: '0.25rem' }}>Unable to load categories</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              {error}
            </p>
            <button onClick={fetchCategories} className="collection-retry-btn">
              <RefreshCw size={14} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && categories.length === 0 && (
          <div className="collection-error-card">
            <p style={{ color: 'var(--color-text-secondary)' }}>No categories currently available.</p>
          </div>
        )}

        {/* Category Cards Horizontal Grid */}
        {!loading && !error && categories.length > 0 && (
          <div className="collection-cards-grid">
            {categories.map((cat) => {
              const isActive = activeCategorySlug === cat.slug;
              return (
                <CategoryCard
                  key={cat._id || cat.slug}
                  category={cat}
                  isActive={isActive}
                  onClick={handleCategoryClick}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
