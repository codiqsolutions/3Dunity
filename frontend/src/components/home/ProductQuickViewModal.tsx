import React, { useState } from 'react';
import { Star, ShieldCheck, Box, Layers, Clock, Cpu, ShoppingBag, Check, FileCode } from 'lucide-react';
import { Product } from '../../types/product';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useCart } from '../../context/CartContext';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Sync state when product opens
  React.useEffect(() => {
    if (product) {
      setSelectedImageIndex(0);
      setSelectedMaterial(product.specs.availableMaterials[0] || 'Standard PLA');
      setSelectedColor(product.specs.colors[0]?.name || 'Industrial Blue');
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedMaterial, selectedColor);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  const images = product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      subtitle={`Category: ${product.categoryName}`}
      maxWidth="780px"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
        }}
        className="quickview-grid"
      >
        {/* Left Column: Image & Gallery */}
        <div>
          <div
            style={{
              width: '100%',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              backgroundColor: '#F8FAFC',
              border: '1px solid var(--color-border)',
              marginBottom: '0.85rem',
            }}
          >
            <img
              src={images[selectedImageIndex] || product.thumbnail}
              alt={product.name}
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: `2px solid ${selectedImageIndex === idx ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    padding: 0,
                  }}
                >
                  <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}

          {/* CAD file badge */}
          {product.cadFileAvailable && (
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: 'var(--color-primary-light)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--color-primary)',
                fontWeight: 600,
              }}
            >
              <FileCode size={16} />
              <span>Certified .STL & .STEP CAD inspection files included</span>
            </div>
          )}
        </div>

        {/* Right Column: Specs, Customization, Add to Cart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            {/* Rating & Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F59A16', fontWeight: 700, fontSize: '0.9rem' }}>
                <Star size={16} fill="#F59A16" color="#F59A16" />
                <span>{product.rating.toFixed(1)}</span>
                <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>
                  ({product.reviewCount} verified reviews)
                </span>
              </div>
              {product.badge && <Badge variant="blue" size="sm">{product.badge}</Badge>}
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-navy)', fontFamily: 'var(--font-display)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span style={{ fontSize: '1rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem', lineHeight: 1.55 }}>
              {product.description}
            </p>
          </div>

          {/* 3D Specs Matrix */}
          <div
            style={{
              backgroundColor: '#F8FAFC',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              padding: '0.85rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.65rem',
              fontSize: '0.8rem',
            }}
          >
            <div>
              <span style={{ color: 'var(--color-text-secondary)' }}>Technology:</span>
              <div style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{product.specs.technology}</div>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-secondary)' }}>Layer Pitch:</span>
              <div style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{product.specs.layerResolution}</div>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-secondary)' }}>Dimensions:</span>
              <div style={{ fontWeight: 600, color: 'var(--color-navy)' }}>
                {product.specs.dimensionsMm.length} × {product.specs.dimensionsMm.width} × {product.specs.dimensionsMm.height} mm
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-secondary)' }}>Infill Core:</span>
              <div style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{product.specs.infill}</div>
            </div>
          </div>

          {/* Material Select */}
          {product.specs.availableMaterials.length > 0 && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.4rem' }}>
                Print Material:
              </label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {product.specs.availableMaterials.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: `1.5px solid ${selectedMaterial === mat ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      backgroundColor: selectedMaterial === mat ? 'var(--color-primary-light)' : '#FFFFFF',
                      color: selectedMaterial === mat ? 'var(--color-primary)' : 'var(--color-text)',
                    }}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Swatch Select */}
          {product.specs.colors.length > 0 && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.4rem' }}>
                Color: <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{selectedColor}</span>
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {product.specs.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: c.hex,
                      border: '2px solid #FFFFFF',
                      boxShadow: selectedColor === c.name ? `0 0 0 2px var(--color-primary)` : '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add Button */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: 'auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#F8FAFC',
              }}
            >
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{ padding: '0.6rem 0.85rem', fontWeight: 700 }}
              >
                -
              </button>
              <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 700, fontSize: '0.95rem' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                style={{ padding: '0.6rem 0.85rem', fontWeight: 700 }}
              >
                +
              </button>
            </div>

            <Button
              variant={added ? 'green' : 'primary'}
              size="lg"
              fullWidth
              leftIcon={added ? <Check size={18} /> : <ShoppingBag size={18} />}
              onClick={handleAddToCart}
            >
              {added ? 'Added to Cart' : `Add to Cart • ₹${(product.price * quantity).toLocaleString('en-IN')}`}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

