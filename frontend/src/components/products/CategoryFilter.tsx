import React from 'react';
import { Category } from '../../types/category';
import { Layers, ChevronRight } from 'lucide-react';

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  totalProductsCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  totalProductsCount,
}) => {
  return (
    <div className="filter-group category-filter-group">
      <h3 className="filter-group-title">
        <Layers size={16} className="filter-icon" />
        <span>Categories</span>
      </h3>

      <ul className="filter-category-list">
        {/* All Products option */}
        <li className="filter-category-item">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`filter-category-btn ${selectedCategory === 'all' || !selectedCategory ? 'is-active' : ''}`}
          >
            <span className="category-name">All Products</span>
            <span className="category-count">{totalProductsCount}</span>
          </button>
        </li>

        {/* Dynamic categories from backend */}
        {categories
          .filter((cat) => cat.slug !== 'more-categories')
          .map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <li key={cat.slug} className="filter-category-item">
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.slug)}
                  className={`filter-category-btn ${isActive ? 'is-active' : ''}`}
                >
                  <span className="category-name">{cat.name}</span>
                  <span className="category-count">{cat.itemCount || 0}</span>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

