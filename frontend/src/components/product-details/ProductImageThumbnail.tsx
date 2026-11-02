import React from 'react';
import { Play, Box } from 'lucide-react';

export interface ProductImageThumbnailProps {
  src: string;
  alt: string;
  isActive: boolean;
  onClick: () => void;
  isVideo?: boolean;
  is3D?: boolean;
}

export const ProductImageThumbnail: React.FC<ProductImageThumbnailProps> = ({
  src,
  alt,
  isActive,
  onClick,
  isVideo = false,
  is3D = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`product-thumb-pill-btn ${isActive ? 'is-active' : ''}`}
      aria-label={alt}
    >
      <img src={src} alt="" className="thumb-img" loading="lazy" />

      {isVideo && (
        <span className="thumb-overlay-badge video-badge">
          <Play size={12} fill="#FFFFFF" />
        </span>
      )}

      {is3D && (
        <span className="thumb-overlay-badge model-badge">
          <Box size={12} />
        </span>
      )}
    </button>
  );
};

