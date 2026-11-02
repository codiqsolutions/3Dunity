import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  Zap,
  Heart,
  Layers,
  Sparkles,
  Sliders,
  Check,
  ShieldCheck,
  Minus,
  Plus,
} from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ProductPrice } from './ProductPrice';
import { ProductAvailability } from './ProductAvailability';
import { MaterialSelector } from './MaterialSelector';
import { ColorSelector } from './ColorSelector';
import { SizeSelector } from './SizeSelector';
import { CustomDimensionsForm, CustomDimensionsState } from './CustomDimensionsForm';
import { PersonalizationForm } from './PersonalizationForm';
import { DesignUpload, UploadedFileItem } from './DesignUpload';
import { ProductQuoteModal } from './ProductQuoteModal';

export interface ProductInformationProps {
  product: Product;
  onColorChange?: (colorImage?: string) => void;
}

export const ProductInformation: React.FC<ProductInformationProps> = ({
  product,
  onColorChange,
}) => {
  const { addItem, openCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Customization selection state
  const defaultMaterial =
    product.customizationOptions?.materialOptions?.[0]?.material ||
    product.material ||
    'Standard PLA';

  const defaultColor =
    product.customizationOptions?.colorOptions?.[0]?.name ||
    product.specs?.colors?.[0]?.name ||
    'White';

  const defaultSize =
    product.sizeOptions?.[0]?.name || 'Standard Scale';

  const [selectedMaterial, setSelectedMaterial] = useState(defaultMaterial);
  const [materialModifier, setMaterialModifier] = useState(
    product.customizationOptions?.materialOptions?.[0]?.priceModifier || 0
  );

  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [colorModifier, setColorModifier] = useState(0);

  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [sizeModifier, setSizeModifier] = useState(
    product.sizeOptions?.[0]?.priceModifier || 0
  );

  const [isCustomSizeActive, setIsCustomSizeActive] = useState(false);
  const [customDimensions, setCustomDimensions] = useState<CustomDimensionsState>({
    length: '',
    width: '',
    height: '',
    unit: 'cm',
  });

  const [customText, setCustomText] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const isFavorite = isWishlisted(product._id || product.slug);

  // Total price modifier
  const totalModifier =
    (isCustomSizeActive ? 0 : sizeModifier) +
    materialModifier +
    colorModifier +
    (customText.trim() ? 50 : 0);

  const currentUnitPrice = Math.max(1, product.price + totalModifier);

  const handleMaterialChange = (mat: string, modifier: number) => {
    setSelectedMaterial(mat);
    setMaterialModifier(modifier);
  };

  const handleColorChange = (col: string, modifier: number, image?: string) => {
    setSelectedColor(col);
    setColorModifier(modifier);
    if (onColorChange) {
      onColorChange(image);
    }
  };

  const handleSizeChange = (sz: string, modifier: number) => {
    setSelectedSize(sz);
    setSizeModifier(modifier);
  };

  const getCustomDimensionsConfig = () => {
    if (!isCustomSizeActive) return undefined;
    return {
      length: parseFloat(customDimensions.length) || 0,
      width: parseFloat(customDimensions.width) || 0,
      height: parseFloat(customDimensions.height) || 0,
      unit: customDimensions.unit,
    };
  };

  const handleAddToCart = () => {
    addItem(product, {
      quantity,
      material: selectedMaterial,
      color: selectedColor,
      size: isCustomSizeActive ? 'Custom Scale' : selectedSize,
      customDimensions: getCustomDimensionsConfig(),
      customText: customText.trim() || undefined,
      uploadedFiles: uploadedFiles.map((f) => f.url),
      unitPrice: currentUnitPrice,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, {
      quantity,
      material: selectedMaterial,
      color: selectedColor,
      size: isCustomSizeActive ? 'Custom Scale' : selectedSize,
      customDimensions: getCustomDimensionsConfig(),
      customText: customText.trim() || undefined,
      uploadedFiles: uploadedFiles.map((f) => f.url),
      unitPrice: currentUnitPrice,
    });
    openCart();
  };

  const scrollToReviews = () => {
    const el = document.getElementById('customer-reviews-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="product-information-panel">
      {/* Category & Product ID Row */}
      <div className="info-top-badge-row">
        <Link
          to={`/products?category=${product.category}`}
          className="info-category-link"
        >
          {product.categoryName}
        </Link>

        {product.productId && (
          <span className="info-sku-badge">
            SKU: {product.productId}
          </span>
        )}

        {product.customizationAvailable && (
          <span className="info-custom-eligible-badge">
            <Sparkles size={12} />
            <span>Customizable</span>
          </span>
        )}
      </div>

      {/* Product Title */}
      <h1 className="info-product-title">{product.name}</h1>

      {/* Ratings & Reviews summary */}
      <div className="info-rating-row">
        <div className="info-stars" onClick={scrollToReviews} role="button" tabIndex={0}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={15}
              className={s <= Math.round(product.rating || 5) ? 'star-gold' : 'star-gray'}
            />
          ))}
          <span className="info-rating-num">{product.rating ? product.rating.toFixed(1) : '5.0'}</span>
        </div>

        <button
          type="button"
          onClick={scrollToReviews}
          className="info-review-count-btn"
        >
          ({product.reviewCount || 0} customer reviews)
        </button>

        <span className="rating-divider">•</span>

        <span className="info-tech-pill">
          {product.printingTechnology || product.specs?.technology || 'FDM Precision'}
        </span>
      </div>

      {/* Dynamic Price Display */}
      <ProductPrice
        basePrice={product.price}
        originalPrice={product.originalPrice}
        priceModifier={totalModifier}
      />

      {/* Short Description */}
      <p className="info-short-desc">
        {product.shortDescription || product.description}
      </p>

      {/* Stock & Manufacturing Availability Pill */}
      <ProductAvailability
        stockStatus={product.stockStatus}
        productionTime={product.productionTime}
        stock={product.stock}
      />

      {/* Divider */}
      <div className="info-section-divider" />

      {/* =================================================================
          CUSTOMIZATION OPTIONS INTERFACE (SECTION 4)
         ================================================================= */}
      <div className="customization-interface-wrapper">
        <div className="customization-header">
          <Sliders size={16} className="text-primary-blue" />
          <h3 className="customization-title">Configure Your 3D Print</h3>
        </div>

        {/* A. Material Selection */}
        {product.customizationOptions?.materialOptions && product.customizationOptions.materialOptions.length > 0 && (
          <MaterialSelector
            options={product.customizationOptions.materialOptions}
            selectedMaterial={selectedMaterial}
            onSelectMaterial={handleMaterialChange}
          />
        )}

        {/* B. Color Selection */}
        {product.customizationOptions?.colorOptions && product.customizationOptions.colorOptions.length > 0 && (
          <ColorSelector
            colors={product.customizationOptions.colorOptions}
            selectedColor={selectedColor}
            onSelectColor={handleColorChange}
          />
        )}

        {/* C. Size Selection */}
        {product.sizeOptions && product.sizeOptions.length > 0 && (
          <SizeSelector
            sizeOptions={product.sizeOptions}
            allowCustomDimensions={product.customizationOptions?.allowCustomDimensions ?? true}
            selectedSize={selectedSize}
            isCustomSizeActive={isCustomSizeActive}
            onSelectSize={handleSizeChange}
            onToggleCustomSize={setIsCustomSizeActive}
          />
        )}

        {/* Custom Dimensions Sub-form */}
        {isCustomSizeActive && (
          <CustomDimensionsForm
            dimensions={customDimensions}
            onChange={setCustomDimensions}
          />
        )}

        {/* D. Personalization / Text Engraving */}
        {product.customizationOptions?.allowCustomText && (
          <PersonalizationForm
            customText={customText}
            specialInstructions={specialInstructions}
            maxTextLength={product.customizationOptions.maxTextLength || 35}
            onTextChange={setCustomText}
            onInstructionsChange={setSpecialInstructions}
          />
        )}

        {/* E. Custom Design File Upload */}
        {product.customizationOptions?.allowFileUpload && (
          <DesignUpload
            uploadedFiles={uploadedFiles}
            onFilesChange={setUploadedFiles}
          />
        )}
      </div>

      {/* =================================================================
          PURCHASE & CART ACTIONS
         ================================================================= */}
      <div className="purchase-actions-container">
        {/* Quantity Selector */}
        <div className="quantity-control-wrap">
          <label className="qty-label" htmlFor="prod-qty">Quantity:</label>
          <div className="qty-input-box">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="qty-btn"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <input
              id="prod-qty"
              type="number"
              min={1}
              max={100}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              className="qty-display"
              aria-label="Product quantity"
            />
            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="qty-btn"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Primary Buttons Row */}
        <div className="primary-buttons-grid">
          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`btn-primary-add-cart ${justAdded ? 'is-added' : ''}`}
          >
            {justAdded ? (
              <>
                <Check size={18} />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={18} />
                <span>Add to Cart • ₹{(currentUnitPrice * quantity).toLocaleString('en-IN')}</span>
              </>
            )}
          </button>

          {/* Buy Now */}
          <button
            type="button"
            onClick={handleBuyNow}
            className="btn-buy-now"
          >
            <Zap size={18} />
            <span>Buy Now</span>
          </button>

          {/* Add to Wishlist Heart */}
          <button
            type="button"
            onClick={() => toggleWishlist(product._id || product.slug)}
            className={`btn-wishlist-toggle ${isFavorite ? 'is-favorited' : ''}`}
            title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Wishlist"
          >
            <Heart
              size={20}
              fill={isFavorite ? '#F59A16' : 'none'}
              color={isFavorite ? '#F59A16' : '#64748B'}
            />
          </button>
        </div>

        {/* Request Customization / Quote button */}
        <div className="custom-quote-row">
          <button
            type="button"
            onClick={() => setIsQuoteModalOpen(true)}
            className="btn-request-custom-quote"
          >
            <Sparkles size={16} />
            <span>Need Custom Dimensions or Bulk Order? Request Custom Quote</span>
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="info-trust-badges-grid">
        <div className="trust-badge-cell">
          <ShieldCheck size={16} className="text-secondary-green" />
          <span>Dimension Tolerance Guarantee</span>
        </div>
        <div className="trust-badge-cell">
          <Check size={16} className="text-primary-blue" />
          <span>Non-Toxic Biodegradable Material</span>
        </div>
      </div>

      {/* Custom Quote Modal */}
      <ProductQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        product={product}
        currentConfiguration={{
          material: selectedMaterial,
          color: selectedColor,
          size: isCustomSizeActive ? 'Custom Dimensions' : selectedSize,
          customDimensions: isCustomSizeActive ? customDimensions : undefined,
          customText: customText.trim() || undefined,
          uploadedFiles,
        }}
      />
    </div>
  );
};
