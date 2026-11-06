import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export interface ProductLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  productName: string;
}

export const ProductLightbox: React.FC<ProductLightboxProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  productName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoomLevel(1);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || images.length === 0) return null;

  const handlePrev = () => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.35, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div className="product-lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
        {/* Top Controls Bar */}
        <div className="lightbox-top-bar">
          <div className="lightbox-title-group">
            <span className="lightbox-prod-name">{productName}</span>
            <span className="lightbox-counter">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <div className="lightbox-actions-group">
            <button
              type="button"
              onClick={handleZoomIn}
              className="lightbox-tool-btn"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="lightbox-tool-btn"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="lightbox-tool-btn"
              title="Reset Zoom"
              aria-label="Reset Zoom"
            >
              <RotateCcw size={18} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="lightbox-close-btn"
              title="Close (Esc)"
              aria-label="Close lightbox"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Main Image Display */}
        <div className="lightbox-img-stage">
          <img
            src={images[currentIndex]}
            alt={`${productName} view ${currentIndex + 1}`}
            className="lightbox-main-img"
            style={{
              transform: `scale(${zoomLevel})`,
              cursor: zoomLevel > 1 ? 'grab' : 'zoom-in',
            }}
            onClick={zoomLevel === 1 ? handleZoomIn : handleResetZoom}
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="lightbox-arrow-btn prev-arrow"
              title="Previous image"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="lightbox-arrow-btn next-arrow"
              title="Next image"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}

        {/* Bottom Thumbnail Strip */}
        {images.length > 1 && (
          <div className="lightbox-thumbs-strip">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setZoomLevel(1);
                  setCurrentIndex(idx);
                }}
                className={`lightbox-thumb-btn ${idx === currentIndex ? 'is-active' : ''}`}
                aria-label={`Select image ${idx + 1}`}
              >
                <img src={img} alt="" className="lightbox-thumb-img" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

