import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productApi, ProductQueryParams } from '../api/productApi';
import { categoryApi } from '../api/categoryApi';
import { Product } from '../types/product';
import { Category } from '../types/category';
import { useWishlist } from '../context/WishlistContext';

import { ProductsHeroBanner } from '../components/products/ProductsHeroBanner';
import { ProductSidebar } from '../components/products/ProductSidebar';
import { ProductToolbar, ViewMode, ActiveFilterItem } from '../components/products/ProductToolbar';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductList } from '../components/products/ProductList';
import { ProductSkeleton } from '../components/products/ProductSkeleton';
import { EmptyProducts } from '../components/products/EmptyProducts';
import { Pagination } from '../components/products/Pagination';
import { CustomProductCTA } from '../components/products/CustomProductCTA';
import { MobileFilterDrawer } from '../components/products/MobileFilterDrawer';
import { ProductQuickViewModal } from '../components/home/ProductQuickViewModal';
import { SearchModal } from '../components/home/SearchModal';
import { AlertCircle, RefreshCw } from 'lucide-react';

export interface ProductsPageProps {
  isSearchOpen?: boolean;
  onCloseSearch?: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  isSearchOpen = false,
  onCloseSearch = () => {},
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isWishlisted, wishlist } = useWishlist();

  // Filters from URL Search Params
  const categoryParam = searchParams.get('category') || 'all';
  const materialParam = searchParams.get('material') || 'all';
  const minPriceParam = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPriceParam = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const availabilityParam = searchParams.get('availability') || 'all';
  const customizableParam = searchParams.get('customizable');
  const customizableVal =
    customizableParam === 'true' ? true : customizableParam === 'false' ? false : undefined;
  const sortParam = searchParams.get('sort') || 'latest';
  const pageParam = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const searchParam = searchParams.get('search') || '';
  const wishlistOnly = searchParams.get('wishlist') === 'true';

  // Data states
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // UI states
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Helper to update URL Search Params
  const updateUrlParams = useCallback(
    (newParams: Record<string, string | number | boolean | undefined>) => {
      const current = new URLSearchParams(searchParams);

      Object.entries(newParams).forEach(([key, val]) => {
        if (val === undefined || val === '' || val === 'all') {
          current.delete(key);
        } else {
          current.set(key, String(val));
        }
      });

      // Reset page to 1 whenever any filter other than page changes
      if (!('page' in newParams)) {
        current.delete('page');
      }

      setSearchParams(current, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Clear all filters
  const handleClearAllFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  // Load Categories once on mount
  useEffect(() => {
    let isMounted = true;
    const fetchCats = async () => {
      try {
        const res = await categoryApi.getAll();
        if (isMounted && res.data) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    fetchCats();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch Products whenever URL search parameters change
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const query: ProductQueryParams = {
        category: categoryParam !== 'all' ? categoryParam : undefined,
        material: materialParam !== 'all' ? materialParam : undefined,
        availability: availabilityParam !== 'all' ? availabilityParam : undefined,
        customizable: customizableVal,
        minPrice: minPriceParam,
        maxPrice: maxPriceParam,
        sort: sortParam,
        page: pageParam,
        limit: 12,
        search: searchParam.trim() ? searchParam.trim() : undefined,
      };

      const res = await productApi.getAll(query);

      if (res.data) {
        let loadedProducts = res.data;

        // If user specifically filtered by wishlist
        if (wishlistOnly) {
          loadedProducts = loadedProducts.filter((p) =>
            isWishlisted(p._id || p.slug)
          );
          setProducts(loadedProducts);
          setTotalCount(loadedProducts.length);
          setTotalPages(Math.ceil(loadedProducts.length / 12) || 1);
        } else {
          setProducts(loadedProducts);
          setTotalCount(res.meta?.totalCount || loadedProducts.length);
          setTotalPages(res.meta?.totalPages || 1);
        }
      }
    } catch (err: any) {
      console.error('Failed to load catalogue products:', err);
      setError(err.message || 'Unable to load products. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [
    categoryParam,
    materialParam,
    availabilityParam,
    customizableVal,
    minPriceParam,
    maxPriceParam,
    sortParam,
    pageParam,
    searchParam,
    wishlistOnly,
    isWishlisted,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Build active filter chips for the toolbar
  const activeFilters: ActiveFilterItem[] = [];

  if (categoryParam && categoryParam !== 'all') {
    const catObj = categories.find((c) => c.slug === categoryParam);
    activeFilters.push({
      key: 'category',
      label: `Category: ${catObj ? catObj.name : categoryParam}`,
      onRemove: () => updateUrlParams({ category: 'all' }),
    });
  }

  if (materialParam && materialParam !== 'all') {
    activeFilters.push({
      key: 'material',
      label: `Material: ${materialParam}`,
      onRemove: () => updateUrlParams({ material: 'all' }),
    });
  }

  if (minPriceParam !== undefined || maxPriceParam !== undefined) {
    let label = 'Price: ';
    if (minPriceParam !== undefined && maxPriceParam !== undefined) {
      label += `₹${minPriceParam} - ₹${maxPriceParam}`;
    } else if (minPriceParam !== undefined) {
      label += `Above ₹${minPriceParam}`;
    } else {
      label += `Under ₹${maxPriceParam}`;
    }
    activeFilters.push({
      key: 'price',
      label,
      onRemove: () => updateUrlParams({ minPrice: undefined, maxPrice: undefined }),
    });
  }

  if (availabilityParam && availabilityParam !== 'all') {
    activeFilters.push({
      key: 'availability',
      label: availabilityParam === 'in-stock' ? 'In Stock' : 'Made to Order',
      onRemove: () => updateUrlParams({ availability: 'all' }),
    });
  }

  if (customizableVal !== undefined) {
    activeFilters.push({
      key: 'customizable',
      label: customizableVal ? 'Customizable' : 'Standard Catalog',
      onRemove: () => updateUrlParams({ customizable: undefined }),
    });
  }

  if (wishlistOnly) {
    activeFilters.push({
      key: 'wishlist',
      label: 'My Wishlist Items',
      onRemove: () => updateUrlParams({ wishlist: undefined }),
    });
  }

  const hasActiveFilters = activeFilters.length > 0 || Boolean(searchParam && searchParam.trim() !== '');

  // Calculate sum of all category counts for "All Products"
  const totalCatalogCount = categories.reduce(
    (sum, c) => (c.slug !== 'more-categories' ? sum + (c.itemCount || 0) : sum),
    0
  ) || 12;

  return (
    <main className="catalogue-page-root">
      {/* 1. Products Hero Banner */}
      <ProductsHeroBanner />

      {/* Top Anchor for smooth scroll on pagination */}
      <div id="catalogue-top-anchor" style={{ position: 'relative', top: '-80px' }} />

      {/* 2. Main Two-Column Catalogue Layout */}
      <section className="catalogue-page-wrapper">
        <div className="container catalogue-container-grid">
          {/* LEFT SIDE: Filter Sidebar (Desktop Sticky) */}
          <ProductSidebar
            categories={categories}
            selectedCategory={categoryParam}
            onSelectCategory={(cat) => updateUrlParams({ category: cat })}
            selectedMaterial={materialParam}
            onSelectMaterial={(mat) => updateUrlParams({ material: mat })}
            minPrice={minPriceParam}
            maxPrice={maxPriceParam}
            onApplyPrice={(min, max) => updateUrlParams({ minPrice: min, maxPrice: max })}
            selectedAvailability={availabilityParam}
            onSelectAvailability={(avail) => updateUrlParams({ availability: avail })}
            selectedCustomizable={customizableVal}
            onSelectCustomizable={(cust) => updateUrlParams({ customizable: cust })}
            onResetFilters={handleClearAllFilters}
            hasActiveFilters={hasActiveFilters}
            totalProductsCount={totalCatalogCount}
          />

          {/* RIGHT SIDE: Toolbar, Product Grid / List, Pagination */}
          <div className="catalogue-main-content">
            {/* Toolbar */}
            <ProductToolbar
              totalCount={totalCount}
              currentPage={pageParam}
              limit={12}
              sort={sortParam}
              onSortChange={(sort) => updateUrlParams({ sort })}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              activeFilters={activeFilters}
              onClearAllFilters={handleClearAllFilters}
              onOpenMobileFilters={() => setMobileDrawerOpen(true)}
              searchQuery={searchParam}
              onClearSearch={() => updateUrlParams({ search: undefined })}
            />

            {/* Error Message */}
            {!loading && error && (
              <div
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '12px',
                  padding: '2rem',
                  textAlign: 'center',
                  marginBottom: '2rem',
                }}
              >
                <AlertCircle size={32} color="#EF4444" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ color: '#991B1B', marginBottom: '0.25rem' }}>Failed to load catalogue</h4>
                <p style={{ color: '#7F1D1D', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                  {error}
                </p>
                <button
                  type="button"
                  onClick={fetchProducts}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'var(--color-navy)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 1.25rem',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <RefreshCw size={14} />
                  <span>Retry</span>
                </button>
              </div>
            )}

            {/* Loading Skeletons */}
            {loading && <ProductSkeleton viewMode={viewMode} count={8} />}

            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
              <EmptyProducts
                onResetFilters={handleClearAllFilters}
                hasActiveFilters={hasActiveFilters}
              />
            )}

            {/* Product Grid or List */}
            {!loading && !error && products.length > 0 && (
              <>
                {viewMode === 'grid' ? (
                  <ProductGrid
                    products={products}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ) : (
                  <ProductList
                    products={products}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                )}

                {/* Server-Side Pagination */}
                <Pagination
                  currentPage={pageParam}
                  totalPages={totalPages}
                  onPageChange={(page) => updateUrlParams({ page })}
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* 3. Section 07: Custom 3D Model Call-to-Action Banner */}
      <CustomProductCTA />

      {/* Mobile Slide-Out Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        categories={categories}
        selectedCategory={categoryParam}
        onSelectCategory={(cat) => updateUrlParams({ category: cat })}
        selectedMaterial={materialParam}
        onSelectMaterial={(mat) => updateUrlParams({ material: mat })}
        minPrice={minPriceParam}
        maxPrice={maxPriceParam}
        onApplyPrice={(min, max) => updateUrlParams({ minPrice: min, maxPrice: max })}
        selectedAvailability={availabilityParam}
        onSelectAvailability={(avail) => updateUrlParams({ availability: avail })}
        selectedCustomizable={customizableVal}
        onSelectCustomizable={(cust) => updateUrlParams({ customizable: cust })}
        onResetFilters={handleClearAllFilters}
        hasActiveFilters={hasActiveFilters}
        totalProductsCount={totalCount}
        activeCount={activeFilters.length}
      />

      {/* Global Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={onCloseSearch}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />
    </main>
  );
};

export default ProductsPage;
