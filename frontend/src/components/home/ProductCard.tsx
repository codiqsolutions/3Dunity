import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Check, Star } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

export interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  // Determine badge styling matching photo
  const getBadgeClass = (badgeText?: string) => {
    if (!badgeText) return '';
    const lower = badgeText.toLowerCase();
    if (lower.includes('bestseller')) return 'badge-green';
    if (lower.includes('custom') || lower.includes('popular')) return 'badge-orange';
    return 'badge-blue';
  };

  const badgeClass = getBadgeClass(product.badge);

  return (
    <div className="exact-product-card" onClick={() => navigate(`/products/${product.slug}`)}>
      {/* Product Image Area */}
      <div className="exact-product-image-box">
        <img
          src={product.thumbnail || product.images[0]}
          alt={product.name}
          className="exact-product-img"
          loading="lazy"
        />

        {/* Badge on top right */}
        {product.badge && (
          <span className={`exact-product-badge ${badgeClass}`}>
            {product.badge}
          </span>
        )}

        {/* Quick Add Overlay on Hover */}
        <button
          onClick={handleAddToCart}
          className={`quick-add-pill-btn ${justAdded ? 'added' : ''}`}
          aria-label="Add to cart"
        >
          {justAdded ? (
            <>
              <Check size={14} />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag size={14} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>

      {/* Product Details Content */}
      <div className="exact-product-content">
        <h3 className="exact-product-title" title={product.name}>
          {product.name}
        </h3>

        {/* Bottom Row: Rupee Price and Action Button */}
        <div className="exact-product-footer">
          <div className="exact-price-container">
            <span className="exact-product-price">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="exact-product-strike-price">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            className="exact-product-action-circle"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            title="View Product Specs"
            aria-label={`View ${product.name}`}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
