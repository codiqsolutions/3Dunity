import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Category } from '../../types/category';
import { CategoryFilter } from './CategoryFilter';
import { MaterialFilter } from './MaterialFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { AvailabilityFilter } from './AvailabilityFilter';
import { CustomizationFilter } from './CustomizationFilter';

export interface ProductSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedMaterial: string;
  onSelectMaterial: (material: string) => void;
  minPrice?: number;
  maxPrice?: number;
  onApplyPrice: (min?: number, max?: number) => void;
  selectedAvailability: string;
  onSelectAvailability: (availability: string) => void;
  selectedCustomizable?: boolean;
  onSelectCustomizable: (customizable?: boolean) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  totalProductsCount: number;
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedMaterial,
  onSelectMaterial,
  minPrice,
  maxPrice,
  onApplyPrice,
  selectedAvailability,
  onSelectAvailability,
  selectedCustomizable,
  onSelectCustomizable,
  onResetFilters,
  hasActiveFilters,
  totalProductsCount,
}) => {
  return (
    <aside className="catalogue-sidebar" aria-label="Product Catalogue Filters">
      {/* Top Header Card */}
      <div className="sidebar-header-card">
        <div className="sidebar-title-wrap">
          <Filter size={18} className="sidebar-filter-icon" />
          <h2 className="sidebar-heading">Filters</h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="sidebar-reset-btn"
            title="Clear all active filters"
          >
            <RotateCcw size={13} />
            <span>Reset All</span>
          </button>
        )}
      </div>

      <div className="sidebar-scrollable-content">
        {/* A. Categories */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          totalProductsCount={totalProductsCount}
        />

        <div className="filter-divider" />

        {/* B. Material */}
        <MaterialFilter
          selectedMaterial={selectedMaterial}
          onSelectMaterial={onSelectMaterial}
        />

        <div className="filter-divider" />

        {/* C. Price Range */}
        <PriceRangeFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onApplyPrice={onApplyPrice}
          absoluteMin={0}
          absoluteMax={3000}
        />

        <div className="filter-divider" />

        {/* D. Availability */}
        <AvailabilityFilter
          selectedAvailability={selectedAvailability}
          onSelectAvailability={onSelectAvailability}
        />

        <div className="filter-divider" />

        {/* E. Customization */}
        <CustomizationFilter
          selectedCustomizable={selectedCustomizable}
          onSelectCustomizable={onSelectCustomizable}
        />
      </div>
    </aside>
  );
};

