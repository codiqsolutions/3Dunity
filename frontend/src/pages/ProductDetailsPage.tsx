import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronRight,
  Home,
  AlertTriangle,
  ArrowLeft,
  Loader2,
  Sparkles,
  Layers,
  RefreshCw,
  Box,
} from 'lucide-react';
import { productApi } from '../api/productApi';
import { Product } from '../types/product';
import { SearchModal } from '../components/home/SearchModal';
import { ProductGallery } from '../components/product-details/ProductGallery';
import { ProductInformation } from '../components/product-details/ProductInformation';
import { ProductTabs } from '../components/product-details/ProductTabs';
import { ShippingInformation } from '../components/product-details/ShippingInformation';
import { ProductReviews } from '../components/product-details/ProductReviews';
import { RelatedProducts } from '../components/product-details/RelatedProducts';
import { RecentlyViewed } from '../components/product-details/RecentlyViewed';
import { CustomQuoteCTA } from '../components/product-details/CustomQuoteCTA';
import { ProductQuoteModal } from '../components/product-details/ProductQuoteModal';

interface ProductDetailsPageProps {
  isSearchOpen: boolean;
  onCloseSearch: () => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  isSearchOpen,
  onCloseSearch,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColorImage, setSelectedColorImage] = useState<string | undefined>(undefined);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);

  // Fetch product on slug change
  useEffect(() => {
    let isMounted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!slug) {
      setError('Product identifier was not specified.');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        setSelectedColorImage(undefined);

        const res = await productApi.getBySlug(slug);
        if (isMounted) {
          if (res.data) {
            setProduct(res.data);
            document.title = `${res.data.name} | 3Dunity India`;
          } else {
            setError('Product not found in our 3D catalogue.');
          }
        }
      } catch (err: any) {
        console.error('Error fetching product details:', err);
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              'Unable to load the requested 3D model. Please check the URL or try again later.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Schema.org JSON-LD Structured Data
  useEffect(() => {
    if (!product) return;

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.images && product.images.length > 0 ? product.images : [product.thumbnail],
      description: product.shortDescription || product.description,
      sku: product.productId || product._id,
      brand: {
        '@type': 'Brand',
        name: '3Dunity',
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: product.price,
        itemCondition: 'https://schema.org/NewCondition',
        availability:
          product.stockStatus === 'out-of-stock'
            ? 'https://schema.org/OutOfStock'
            : 'https://schema.org/InStock',
        url: window.location.href,
      },
      aggregateRating:
        product.rating && product.rating > 0
          ? {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: product.reviewCount || 1,
            }
          : undefined,
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.id = 'product-jsonld';
    scriptTag.textContent = JSON.stringify(schemaData);
    document.head.appendChild(scriptTag);

    return () => {
      const existing = document.getElementById('product-jsonld');
      if (existing) existing.remove();
    };
  }, [product]);

  // Loading Skeleton State
  if (loading) {
    return (
      <div className="product-details-page-root" role="main" aria-busy="true">
        {/* Breadcrumb Skeleton */}
        <div className="details-breadcrumb-bar">
          <div className="details-page-container">
            <div className="skeleton-bar" style={{ width: '280px', height: '16px' }} />
          </div>
        </div>

        <div className="details-page-container" style={{ paddingTop: '2.5rem' }}>
          {/* Two-Column Overview Skeleton */}
          <div className="product-overview-section">
            <div className="product-gallery-skeleton">
              <div
                className="skeleton-box"
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  borderRadius: '16px',
                  backgroundColor: '#E2E8F0',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginTop: '1rem',
                }}
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="skeleton-box"
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '10px',
                      backgroundColor: '#E2E8F0',
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="product-info-skeleton" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="skeleton-bar" style={{ width: '120px', height: '24px', backgroundColor: '#E2E8F0' }} />
              <div className="skeleton-bar" style={{ width: '75%', height: '36px', backgroundColor: '#E2E8F0' }} />
              <div className="skeleton-bar" style={{ width: '180px', height: '20px', backgroundColor: '#E2E8F0' }} />
              <div className="skeleton-bar" style={{ width: '140px', height: '40px', backgroundColor: '#E2E8F0', margin: '0.5rem 0' }} />
              <div className="skeleton-bar" style={{ width: '100%', height: '80px', backgroundColor: '#E2E8F0' }} />
              <div className="skeleton-bar" style={{ width: '100%', height: '52px', backgroundColor: '#E2E8F0', marginTop: '1rem' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error / 404 State
  if (error || !product) {
    return (
      <div className="product-details-page-root">
        <div className="details-breadcrumb-bar">
          <div className="details-page-container">
            <ul className="details-breadcrumb-list">
              <li>
                <Link to="/" className="breadcrumb-crumb-link">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-sep">/</li>
              <li>
                <Link to="/products" className="breadcrumb-crumb-link">
                  Products
                </Link>
              </li>
              <li className="breadcrumb-sep">/</li>
              <li className="breadcrumb-current-item">Error</li>
            </ul>
          </div>
        </div>

        <div className="details-page-container" style={{ padding: '5rem 1rem', textAlign: 'center' }}>
          <div
            style={{
              maxWidth: '520px',
              margin: '0 auto',
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '3rem 2rem',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: '#FEF3C7',
                color: 'var(--color-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
              }}
            >
              <AlertTriangle size={32} />
            </div>

            <h2
              style={{
                fontSize: '1.6rem',
                fontWeight: 700,
                color: 'var(--color-navy)',
                marginBottom: '0.75rem',
              }}
            >
              3D Model Not Found
            </h2>

            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}
            >
              {error || "The 3D printed model or design you are searching for does not exist or may have been retired."}
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.6rem',
                  backgroundColor: 'var(--color-primary-blue)',
                  color: '#FFFFFF',
                  borderRadius: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(8, 127, 195, 0.25)',
                }}
              >
                <ArrowLeft size={18} />
                <span>Browse 3D Catalogue</span>
              </Link>

              <button
                type="button"
                onClick={() => window.location.reload()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.4rem',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-navy)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <RefreshCw size={18} />
                <span>Retry</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Extract category display string
  const categoryName = product.categoryName || product.category || '3D Products';
  const categorySlug = product.category || categoryName.toLowerCase().replace(/\s+/g, '-');

  return (
    <main className="product-details-page-root">
      {/* =========================================================================
          SECTION 2: BREADCRUMB NAVIGATION
          Home > Products > Category > Product Name
          ========================================================================= */}
      <nav className="details-breadcrumb-bar" aria-label="Breadcrumb">
        <div className="details-page-container">
          <ul className="details-breadcrumb-list">
            <li>
              <Link to="/" className="breadcrumb-crumb-link" title="Return to 3Dunity Homepage">
                <Home size={14} style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: '4px' }} />
                <span>Home</span>
              </Link>
            </li>
            <li className="breadcrumb-sep" aria-hidden="true">
              <ChevronRight size={13} />
            </li>
            <li>
              <Link to="/products" className="breadcrumb-crumb-link" title="Explore All Products">
                Products
              </Link>
            </li>
            <li className="breadcrumb-sep" aria-hidden="true">
              <ChevronRight size={13} />
            </li>
            <li>
              <Link
                to={`/products?category=${encodeURIComponent(categorySlug)}`}
                className="breadcrumb-crumb-link"
                title={`View all products in ${categoryName}`}
              >
                {categoryName}
              </Link>
            </li>
            <li className="breadcrumb-sep" aria-hidden="true">
              <ChevronRight size={13} />
            </li>
            <li className="breadcrumb-current-item" aria-current="page" title={product.name}>
              {product.name}
            </li>
          </ul>
        </div>
      </nav>

      {/* =========================================================================
          MAIN PRODUCT CONTAINER
          ========================================================================= */}
      <div className="details-page-container" style={{ paddingTop: '2rem' }}>
        {/* =======================================================================
            SECTIONS 3 & 4: PRODUCT OVERVIEW & CUSTOMIZATION
            Left: Gallery (Zoom, Lightbox, Videos, 3D Preview)
            Right: Product Information & Customization Configuration
            ======================================================================= */}
        <section className="product-overview-section" aria-label="Product Overview & Customization">
          {/* Left Column: Product Media Gallery */}
          <div className="product-gallery-column">
            <ProductGallery
              product={product}
              selectedColorImage={selectedColorImage}
            />
          </div>

          {/* Right Column: Product Info, Customizer, Actions */}
          <div className="product-information-column">
            <ProductInformation
              product={product}
              onColorChange={(newImage) => setSelectedColorImage(newImage)}
            />
          </div>
        </section>

        {/* =======================================================================
            SECTION 6: PRODUCT DESCRIPTION & SPECIFICATIONS TABS
            Tabs: Description, Technical Specifications, Customization Details, Shipping
            ======================================================================= */}
        <ProductTabs product={product} />

        {/* =======================================================================
            SECTION 7: MANUFACTURING & DELIVERY TIMELINE
            Phase 1 (Production) vs Phase 2 (Shipping) + PIN Code Availability Check
            ======================================================================= */}
        <div style={{ marginTop: '2.5rem' }}>
          <ShippingInformation product={product} />
        </div>

        {/* =======================================================================
            SECTION 8: CUSTOMER REVIEWS & RATINGS
            Summary rating score, 5-to-1 star distribution bars, verified review form
            ======================================================================= */}
        <ProductReviews
          productId={product._id}
          productSlug={product.slug}
          productName={product.name}
        />

        {/* =======================================================================
            SECTION 9: RELATED PRODUCTS
            4 dynamically fetched related products from same category or material
            ======================================================================= */}
        <RelatedProducts
          productId={product._id}
          productSlug={product.slug}
        />

        {/* =======================================================================
            SECTION 10: RECENTLY VIEWED PRODUCTS
            Stored in browser localStorage across customer session
            ======================================================================= */}
        <RecentlyViewed currentProduct={product} />

        {/* =======================================================================
            SECTION 11: CUSTOM PRODUCT CTA BANNER
            "Have Your Own 3D Design in Mind?" -> Request Custom Quote
            ======================================================================= */}
        <CustomQuoteCTA onRequestQuote={() => setIsQuoteModalOpen(true)} />
      </div>

      {/* Bespoke Custom 3D Model Quote Modal */}
      <ProductQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={product}
      />

      {/* Search Overlay Modal if opened from Header */}
      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={onCloseSearch}
          onSelectProduct={(selectedProd) => {
            onCloseSearch();
            navigate(`/products/${selectedProd.slug}`);
          }}
        />
      )}
    </main>
  );
};
