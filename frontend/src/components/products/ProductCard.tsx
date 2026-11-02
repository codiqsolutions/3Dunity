import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Check,
  Star,
  ArrowRight,
  Eye,
  Layers,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'grid',
  onQuickView,
}) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);

  const isFavorite = isWishlisted(product._id || product.slug);

  const handleCardClick = () => {
    navigate(`/products/${product.slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product._id || product.slug);
  };

  // Determine badge styling matching brand colors
  const getBadgeInfo = () => {
    if (product.badge) {
      const lower = product.badge.toLowerCase();
      if (lower.includes('bestseller')) return { text: product.badge, cls: 'badge-green' };
      if (lower.includes('custom') || lower.includes('popular'))
        return { text: product.badge, cls: 'badge-orange' };
      if (lower.includes('new')) return { text: product.badge, cls: 'badge-blue' };
      return { text: product.badge, cls: 'badge-blue' };
    }
    if (product.isBestSeller) return { text: 'Bestseller', cls: 'badge-green' };
    if (product.customizationAvailable) return { text: 'Customizable', cls: 'badge-orange' };
    if (product.isNewArrival) return { text: 'New Arrival', cls: 'badge-blue' };
    return null;
  };

  const badge = getBadgeInfo();
  const imageSrc = product.thumbnail || product.images?.[0] || '/assets/product_placeholder.jpg';

  // --- LIST VIEW MODE ---
  if (viewMode === 'list') {
    return (
      <article
        className="catalogue-product-card list-mode"
        onClick={handleCardClick}
      >
        {/* Left: Thumbnail & Badges */}
        <div className="list-image-wrapper">
          <img
            src={imageSrc}
            alt={product.name}
            className="list-product-img"
            loading="lazy"
          />

          {badge && (
            <span className={`product-card-badge ${badge.cls}`}>{badge.text}</span>
          )}

          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`product-wishlist-btn ${isFavorite ? 'is-favorited' : ''}`}
            title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Wishlist"
          >
            <Heart
              size={18}
              fill={isFavorite ? '#F59A16' : 'none'}
              color={isFavorite ? '#F59A16' : '#64748B'}
            />
          </button>
        </div>

        {/* Center: Details */}
        <div className="list-details-wrapper">
          <div className="list-category-row">
            <span className="product-category-tag">{product.categoryName}</span>
            <div className="product-rating-row">
              <Star size={14} className="star-filled" />
              <span className="rating-score">{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
              <span className="review-count">({product.reviewCount || 0})</span>
            </div>
          </div>

          <h3 className="list-product-title">{product.name}</h3>

          <p className="list-product-desc">
            {product.shortDescription || product.description}
          </p>

          {/* Quick Specs Chips */}
          <div className="list-specs-chips">
            {product.material && (
              <span className="spec-chip">
                <Layers size={12} />
                <span>{product.material}</span>
              </span>
            )}
            {product.specs?.technology && (
              <span className="spec-chip">
                <span>{product.specs.technology}</span>
              </span>
            )}
            {product.specs?.layerResolution && (
              <span className="spec-chip">
                <span>{product.specs.layerResolution}</span>
              </span>
            )}
            {product.stockStatus === 'in-stock' && (
              <span className="stock-pill in-stock">In Stock</span>
            )}
            {product.stockStatus === 'made-to-order' && (
              <span className="stock-pill made-to-order">Made to Order</span>
            )}
          </div>
        </div>

        {/* Right: Pricing & CTA */}
        <div className="list-actions-wrapper">
          <div className="list-pricing-block">
            <div className="pricing-primary">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="pricing-original">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </div>
            )}
            <span className="gst-inclusive-label">Incl. all taxes</span>
          </div>

          <div className="list-btn-group">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`product-primary-add-btn ${justAdded ? 'is-added' : ''}`}
            >
              {justAdded ? (
                <>
                  <Check size={16} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onQuickView) onQuickView(product);
                else handleCardClick();
              }}
              className="product-quick-view-btn"
              title="Quick view product specs"
            >
              <Eye size={15} />
              <span>Specs</span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  // --- GRID VIEW MODE (Default) ---
  return (
    <article
      className="catalogue-product-card grid-mode"
      onClick={handleCardClick}
    >
      {/* Product Image Area */}
      <div className="card-image-box">
        <img
          src={imageSrc}
          alt={product.name}
          className="card-product-img"
          loading="lazy"
        />

        {/* Badge on Top Left */}
        {badge && (
          <span className={`product-card-badge ${badge.cls}`}>{badge.text}</span>
        )}

        {/* Wishlist Button on Top Right */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`product-wishlist-btn ${isFavorite ? 'is-favorited' : ''}`}
          title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          <Heart
            size={18}
            fill={isFavorite ? '#F59A16' : 'none'}
            color={isFavorite ? '#F59A16' : '#64748B'}
          />
        </button>

        {/* Quick View Button on Hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onQuickView) onQuickView(product);
            else handleCardClick();
          }}
          className="card-quick-view-trigger"
          title="Quick preview"
          aria-label={`Preview ${product.name}`}
        >
          <Eye size={15} />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Content Area */}
      <div className="card-content-box">
        {/* Category & Material Tag */}
        <div className="card-category-row">
          <span className="card-category-label">{product.categoryName}</span>
          {product.material && (
            <span className="card-material-badge">{product.material}</span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="card-product-title" title={product.name}>
          {product.name}
        </h3>

        {/* Rating Row */}
        <div className="card-rating-row">
          <div className="stars-wrap">
            <Star size={13} className="star-filled" />
            <span className="rating-num">{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
          </div>
          <span className="reviews-num">({product.reviewCount || 0} reviews)</span>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="card-footer-row">
          <div className="card-price-group">
            <span className="card-price-current">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="card-price-original">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`card-cart-pill-btn ${justAdded ? 'is-added' : ''}`}
            aria-label="Add to cart"
            title="Add to cart"
          >
            {justAdded ? (
              <Check size={16} />
            ) : (
              <ShoppingBag size={16} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

