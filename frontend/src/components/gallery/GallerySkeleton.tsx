import React from 'react';

export const GallerySkeleton: React.FC = () => {
  // Array of heights for asymmetric masonry skeleton simulation
  const skeletonCards = [
    { height: 380, widthVar: 'tall' },
    { height: 280, widthVar: 'standard' },
    { height: 320, widthVar: 'medium' },
    { height: 340, widthVar: 'tall' },
    { height: 290, widthVar: 'standard' },
    { height: 360, widthVar: 'medium' },
  ];

  return (
    <div className="gallery-masonry-wrapper" aria-busy="true" aria-label="Loading creations">
      <div className="gallery-masonry-layout">
        {skeletonCards.map((card, idx) => (
          <div key={idx} className="gallery-masonry-col-item">
            <div className={`gallery-skeleton-card ${card.widthVar}`} style={{ minHeight: `${card.height}px` }}>
              <div className="skeleton-media-box shimmer" />
              <div className="skeleton-footer-box">
                <div className="skeleton-line title shimmer" />
                <div className="skeleton-line sub shimmer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

