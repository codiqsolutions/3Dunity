import React, { useEffect } from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';
import { Category } from '../../types/category';
import { CategoryFilter } from './CategoryFilter';
import { MaterialFilter } from './MaterialFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { AvailabilityFilter } from './AvailabilityFilter';
import { CustomizationFilter } from './CustomizationFilter';

export interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
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
  activeCount: number;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
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
  activeCount,
}) => {
  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="mobile-filter-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div
        className="mobile-filter-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <Filter size={18} className="text-primary-blue" />
            <span className="drawer-title">Filter Products</span>
            {activeCount > 0 && (
              <span className="drawer-badge">{activeCount} Active</span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="drawer-close-btn"
            aria-label="Close filters drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="drawer-body">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            totalProductsCount={totalProductsCount}
          />

          <div className="filter-divider" />

          <MaterialFilter
            selectedMaterial={selectedMaterial}
            onSelectMaterial={onSelectMaterial}
          />

          <div className="filter-divider" />

          <PriceRangeFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onApplyPrice={onApplyPrice}
            absoluteMin={0}
            absoluteMax={3000}
          />

          <div className="filter-divider" />

          <AvailabilityFilter
            selectedAvailability={selectedAvailability}
            onSelectAvailability={onSelectAvailability}
          />

          <div className="filter-divider" />

          <CustomizationFilter
            selectedCustomizable={selectedCustomizable}
            onSelectCustomizable={onSelectCustomizable}
          />
        </div>

        {/* Drawer Footer Actions */}
        <div className="drawer-footer">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="drawer-reset-btn"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="drawer-apply-btn"
          >
            Show {totalProductsCount} Products
          </button>
        </div>
      </div>
    </div>
  );
};

