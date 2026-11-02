import React from 'react';
import { PackageSearch, RotateCcw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface EmptyProductsProps {
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const EmptyProducts: React.FC<EmptyProductsProps> = ({
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="catalogue-empty-state">
      <div className="empty-icon-wrap">
        <PackageSearch size={48} className="empty-icon" />
      </div>

      <h3 className="empty-title">No Products Found</h3>

      <p className="empty-description">
        We couldn't find any 3D products matching your current filters or search term.
        Try broadening your criteria or reset your filters to see the full catalogue.
      </p>

      <div className="empty-actions">
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="empty-reset-btn"
          >
            <RotateCcw size={15} />
            <span>Clear All Filters</span>
          </button>
        )}

        <Link to="/#custom-configurator" className="empty-custom-btn">
          <Sparkles size={15} />
          <span>Request Custom 3D Model</span>
        </Link>
      </div>
    </div>
  );
};

