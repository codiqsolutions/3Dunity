import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Layers, Cpu, Maximize2, ArrowRight } from 'lucide-react';
import { GalleryItem } from '../../types/gallery';
import { useNavigate } from 'react-router-dom';

export interface GalleryLightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const GalleryLightboxModal: React.FC<GalleryLightboxModalProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const navigate = useNavigate();
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(items.length - 1);
    }
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  const handleInquire = () => {
    onClose();
    navigate('/custom-quote');
  };

  return (
    <div className="gallery-lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      {/* Lightbox Dialog Container */}
      <div className="gallery-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Top Controls: Counter & Close Button */}
        <div className="gallery-lightbox-top-bar">
          <span className="gallery-counter-badge">
            {currentIndex + 1} of {items.length}
          </span>
          <button
            onClick={onClose}
            className="gallery-lightbox-close-btn"
            aria-label="Close preview"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="gallery-lightbox-body">
          {/* Left / Center Image View */}
          <div className="gallery-lightbox-image-box">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="gallery-lightbox-img"
            />

            {/* Left Nav Arrow */}
            <button
              onClick={handlePrev}
              className="gallery-lightbox-nav-btn prev"
              aria-label="Previous item"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNext}
              className="gallery-lightbox-nav-btn next"
              aria-label="Next item"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Right Information Column */}
          <div className="gallery-lightbox-info-col">
            <span className="gallery-item-category-tag">
              {currentItem.category}
            </span>

            <h3 className="gallery-item-modal-title">
              {currentItem.title}
            </h3>

            {currentItem.description && (
              <p className="gallery-item-modal-desc">
                {currentItem.description}
              </p>
            )}

            {/* Project Specs */}
            <div className="gallery-item-specs-grid">
              {currentItem.technology && (
                <div className="gallery-spec-pill">
                  <Cpu size={14} color="#087FC3" />
                  <span>Tech: <strong>{currentItem.technology}</strong></span>
                </div>
              )}
              {currentItem.material && (
                <div className="gallery-spec-pill">
                  <Layers size={14} color="#55B832" />
                  <span>Material: <strong>{currentItem.material}</strong></span>
                </div>
              )}
              {currentItem.dimensions && (
                <div className="gallery-spec-pill">
                  <Maximize2 size={14} color="#F59A16" />
                  <span>Size: <strong>{currentItem.dimensions}</strong></span>
                </div>
              )}
            </div>

            {/* Inquiry Action Button */}
            <div className="gallery-lightbox-footer-action">
              <button onClick={handleInquire} className="gallery-inquire-btn">
                <span>Inquire About Custom Model</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

