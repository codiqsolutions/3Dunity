import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Heart,
  Play,
  Box,
  Image as ImageIcon,
} from 'lucide-react';
import { Product } from '../../types/product';
import { useWishlist } from '../../context/WishlistContext';
import { ProductImageThumbnail } from './ProductImageThumbnail';
import { ProductLightbox } from './ProductLightbox';
import { Product3DViewer } from './Product3DViewer';

export interface ProductGalleryProps {
  product: Product;
  selectedColorImage?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  product,
  selectedColorImage,
}) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const isFavorite = isWishlisted(product._id || product.slug);

  // Gallery items: images + optional video
  const rawImages = product.images && product.images.length > 0
    ? product.images
    : [product.thumbnail || '/assets/product_placeholder.jpg'];

  // If a specific color image is selected and available, prepend or use it
  const images = selectedColorImage ? [selectedColorImage, ...rawImages.filter(img => img !== selectedColorImage)] : rawImages;

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'photos' | 'video' | '3d'>('photos');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  const hasVideo = product.videos && product.videos.length > 0;
  const has3D = Boolean(product.model3DUrl);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.75)',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setZoomStyle({ transform: 'scale(1)' });
  };

  // Determine badge styling matching brand colors
  const getBadgeClass = (badgeText?: string) => {
    if (!badgeText) return '';
    const lower = badgeText.toLowerCase();
    if (lower.includes('bestseller')) return 'badge-green';
    if (lower.includes('custom') || lower.includes('popular')) return 'badge-orange';
    return 'badge-blue';
  };

  const badgeClass = getBadgeClass(product.badge);

  return (
    <div className="product-details-gallery-root" aria-label="Product Media Gallery">
      {/* Top View Mode Tabs (Photos / Video / 3D Inspection) */}
      {(hasVideo || has3D) && (
        <div className="gallery-mode-tabs">
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`gallery-mode-btn ${activeTab === 'photos' ? 'is-active' : ''}`}
          >
            <ImageIcon size={14} />
            <span>Photos ({images.length})</span>
          </button>

          {hasVideo && (
            <button
              type="button"
              onClick={() => setActiveTab('video')}
              className={`gallery-mode-btn ${activeTab === 'video' ? 'is-active' : ''}`}
            >
              <Play size={14} />
              <span>Demo Video</span>
            </button>
          )}

          {has3D && (
            <button
              type="button"
              onClick={() => setActiveTab('3d')}
              className={`gallery-mode-btn ${activeTab === '3d' ? 'is-active' : ''}`}
            >
              <Box size={14} />
              <span>3D Model Preview</span>
            </button>
          )}
        </div>
      )}

      {/* Main Display Stage */}
      {activeTab === 'photos' && (
        <div className="gallery-main-wrapper">
          {/* Main Photo Box with Zoom */}
          <div
            className="gallery-main-viewport"
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsLightboxOpen(true)}
            title="Click to open fullscreen zoom viewer"
          >
            <img
              src={images[activeIndex]}
              alt={`${product.name} view ${activeIndex + 1}`}
              className="gallery-main-img"
              style={zoomStyle}
            />

            {/* Product Badge */}
            {product.badge && (
              <span className={`product-card-badge ${badgeClass} gallery-badge`}>
                {product.badge}
              </span>
            )}

            {/* Wishlist Heart Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product._id || product.slug);
              }}
              className={`gallery-wishlist-btn ${isFavorite ? 'is-favorited' : ''}`}
              title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                fill={isFavorite ? '#F59A16' : 'none'}
                color={isFavorite ? '#F59A16' : '#64748B'}
              />
            </button>

            {/* Fullscreen Lightbox Trigger */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(true);
              }}
              className="gallery-fullscreen-btn"
              title="Fullscreen Lightbox"
              aria-label="Fullscreen Lightbox"
            >
              <Maximize2 size={16} />
            </button>

            {/* Hover Zoom Hint */}
            <div className={`gallery-zoom-hint ${isHovered ? 'is-hidden' : ''}`}>
              <span>Roll over image to zoom in</span>
            </div>

            {/* Prev/Next Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="gallery-nav-arrow arrow-prev"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="gallery-nav-arrow arrow-next"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Strip */}
          {images.length > 1 && (
            <div className="gallery-thumbnails-strip">
              {images.map((img, idx) => (
                <ProductImageThumbnail
                  key={idx}
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  isActive={idx === activeIndex}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}

              {hasVideo && (
                <button
                  type="button"
                  onClick={() => setActiveTab('video')}
                  className="product-thumb-pill-btn video-thumb-pill"
                  title="Watch Demonstration Video"
                >
                  <img src={images[0]} alt="" className="thumb-img" />
                  <span className="thumb-overlay-badge video-badge">
                    <Play size={14} fill="#FFFFFF" />
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Video Player Stage */}
      {activeTab === 'video' && hasVideo && (
        <div className="gallery-video-wrapper">
          <video
            controls
            autoPlay
            className="gallery-video-player"
            poster={images[0]}
          >
            <source src={product.videos![0]} type="video/mp4" />
            Your browser does not support HTML5 video streaming.
          </video>
        </div>
      )}

      {/* 3D Model Viewer Stage */}
      {activeTab === '3d' && (
        <Product3DViewer
          model3DUrl={product.model3DUrl}
          productName={product.name}
          technology={product.printingTechnology || product.specs?.technology}
          dimensions={product.dimensions}
        />
      )}

      {/* Lightbox Modal */}
      <ProductLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={images}
        initialIndex={activeIndex}
        productName={product.name}
      />
    </div>
  );
};

