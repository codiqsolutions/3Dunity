import React from 'react';
import { Tag, ShieldCheck } from 'lucide-react';

export interface ProductPriceProps {
  basePrice: number;
  originalPrice?: number;
  priceModifier?: number;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
  basePrice,
  originalPrice,
  priceModifier = 0,
}) => {
  const finalPrice = Math.max(1, basePrice + priceModifier);
  const effectiveOriginal = originalPrice ? originalPrice + priceModifier : undefined;

  const discountPercent =
    effectiveOriginal && effectiveOriginal > finalPrice
      ? Math.round(((effectiveOriginal - finalPrice) / effectiveOriginal) * 100)
      : 0;

  return (
    <div className="product-details-price-block">
      <div className="price-row-primary">
        <span className="price-currency">₹</span>
        <span className="price-amount">{finalPrice.toLocaleString('en-IN')}</span>

        {effectiveOriginal && effectiveOriginal > finalPrice && (
          <span className="price-original">
            ₹{effectiveOriginal.toLocaleString('en-IN')}
          </span>
        )}

        {discountPercent > 0 && (
          <span className="price-discount-badge">
            <Tag size={12} />
            <span>{discountPercent}% OFF</span>
          </span>
        )}
      </div>

      <div className="price-meta-row">
        <span className="price-tax-note">Inclusive of GST & all taxes</span>
        <span className="price-shipping-pill">Free Shipping Pan-India</span>
      </div>
    </div>
  );
};

