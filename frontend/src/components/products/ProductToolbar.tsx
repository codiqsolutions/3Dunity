import React from 'react';
import {
  LayoutGrid,
  List,
  Filter,
  ArrowUpDown,
  X,
  Search,
} from 'lucide-react';

export type ViewMode = 'grid' | 'list';

export interface ActiveFilterItem {
  key: string;
  label: string;
  onRemove: () => void;
}

export interface ProductToolbarProps {
  totalCount: number;
  currentPage: number;
  limit: number;
  sort: string;
  onSortChange: (sort: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  activeFilters: ActiveFilterItem[];
  onClearAllFilters: () => void;
  onOpenMobileFilters: () => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const ProductToolbar: React.FC<ProductToolbarProps> = ({
  totalCount,
  currentPage,
  limit,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  activeFilters,
  onClearAllFilters,
  onOpenMobileFilters,
  searchQuery,
  onClearSearch,
}) => {
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount);

  return (
    <div className="catalogue-toolbar">
      {/* Top Bar: Count & Sort & Views */}
      <div className="toolbar-main-row">
        {/* Left: Product Count & Mobile Filter Trigger */}
        <div className="toolbar-left-group">
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="mobile-filter-trigger-btn"
            aria-label="Open filter sidebar"
          >
            <Filter size={16} />
            <span>Filters</span>
            {activeFilters.length > 0 && (
              <span className="trigger-badge">{activeFilters.length}</span>
            )}
          </button>

          <p className="toolbar-results-count">
            Showing <strong className="count-highlight">{startItem}–{endItem}</strong> of{' '}
            <strong className="count-highlight">{totalCount}</strong> products
          </p>
        </div>

        {/* Right: Sort Dropdown & View Mode Switcher */}
        <div className="toolbar-right-group">
          {/* Sort By Dropdown */}
          <div className="toolbar-sort-wrap">
            <label htmlFor="product-sort-select" className="sort-label">
              <ArrowUpDown size={14} className="sort-icon" />
              <span>Sort By:</span>
            </label>
            <select
              id="product-sort-select"
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="toolbar-sort-select"
            >
              <option value="latest">Latest Arrivals</option>
              <option value="popular">Bestsellers & Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>

          {/* Grid vs List View Toggles */}
          <div className="toolbar-view-toggle-group" role="group" aria-label="Product display mode">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`view-toggle-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`view-toggle-btn ${viewMode === 'list' ? 'is-active' : ''}`}
              title="List View"
              aria-label="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips & Search Term Indicator */}
      {(activeFilters.length > 0 || (searchQuery && searchQuery.trim() !== '')) && (
        <div className="toolbar-active-chips-row">
          <span className="active-filters-label">Active Filters:</span>

          {/* Search chip if searching */}
          {searchQuery && searchQuery.trim() !== '' && onClearSearch && (
            <span className="active-filter-chip search-chip">
              <Search size={12} className="chip-icon" />
              <span>&ldquo;{searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={onClearSearch}
                className="chip-remove-btn"
                title="Clear search query"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {/* Filter chips */}
          {activeFilters.map((filter) => (
            <span key={filter.key} className="active-filter-chip">
              <span>{filter.label}</span>
              <button
                type="button"
                onClick={filter.onRemove}
                className="chip-remove-btn"
                title={`Remove ${filter.label}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={onClearAllFilters}
            className="clear-all-chips-btn"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

