import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export interface GalleryImageViewerProps {
  images: string[];
  title: string;
}

export const GalleryImageViewer: React.FC<GalleryImageViewerProps> = ({ images, title }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  // Reset image index when image set changes
  useEffect(() => {
    setActiveImageIndex(0);
    setIsZoomed(false);
  }, [images]);

  const validImages = images && images.length > 0 ? images : ['/assets/gallery_deer.jpg'];
  const currentImage = validImages[activeImageIndex] || validImages[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : validImages.length - 1));
    setIsZoomed(false);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev < validImages.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  return (
    <div className="gallery-viewer-container">
      {/* Main Large Stage */}
      <div
        className={`gallery-viewer-stage ${isZoomed ? 'is-zoomed' : ''}`}
        onClick={toggleZoom}
        onMouseMove={handleMouseMove}
        title={isZoomed ? 'Click to reset zoom' : 'Click to zoom in'}
      >
        <img
          src={currentImage}
          alt={`${title} - view ${activeImageIndex + 1}`}
          className="gallery-viewer-main-img"
          style={
            isZoomed
              ? {
                  transform: 'scale(2.2)',
                  transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                  cursor: 'zoom-out',
                }
              : { cursor: 'zoom-in' }
          }
        />

        {/* Counter Pill in Corner */}
        {validImages.length > 1 && (
          <div className="viewer-counter-pill">
            <span>
              {activeImageIndex + 1} / {validImages.length}
            </span>
          </div>
        )}

        {/* Zoom Toggle Pill */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
          className="viewer-zoom-toggle-btn"
          aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
        >
          {isZoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
        </button>

        {/* Left / Right Arrow Navigation if multiple images */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="viewer-nav-btn prev"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="viewer-nav-btn next"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row if multiple images */}
      {validImages.length > 1 && (
        <div className="viewer-thumbnails-row" role="tablist" aria-label="Project photo thumbnails">
          {validImages.map((imgUrl, idx) => {
            const isSelected = idx === activeImageIndex;
            return (
              <button
                key={`${imgUrl}-${idx}`}
                role="tab"
                aria-selected={isSelected}
                className={`viewer-thumb-btn ${isSelected ? 'is-selected' : ''}`}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setIsZoomed(false);
                }}
                aria-label={`View photo ${idx + 1}`}
              >
                <img src={imgUrl} alt={`${title} thumb ${idx + 1}`} className="viewer-thumb-img" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

