import React from 'react';
import { Skeleton } from '../common/Skeleton';

export interface ProductSkeletonProps {
  viewMode?: 'grid' | 'list';
  count?: number;
}

export const ProductSkeleton: React.FC<ProductSkeletonProps> = ({
  viewMode = 'grid',
  count = 8,
}) => {
  const items = Array.from({ length: count }, (_, i) => i);

  if (viewMode === 'list') {
    return (
      <div className="catalogue-list-layout">
        {items.map((i) => (
          <div key={i} className="catalogue-product-card list-mode skeleton-card">
            <div className="list-image-wrapper">
              <Skeleton width="100%" height="100%" borderRadius="16px 0 0 16px" />
            </div>
            <div className="list-details-wrapper" style={{ padding: '1.25rem' }}>
              <Skeleton width="30%" height="1rem" style={{ marginBottom: '0.75rem' }} />
              <Skeleton width="75%" height="1.5rem" style={{ marginBottom: '0.75rem' }} />
              <Skeleton width="90%" height="1rem" style={{ marginBottom: '0.5rem' }} />
              <Skeleton width="55%" height="1rem" style={{ marginBottom: '1rem' }} />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Skeleton width="60px" height="24px" borderRadius="12px" />
                <Skeleton width="70px" height="24px" borderRadius="12px" />
              </div>
            </div>
            <div className="list-actions-wrapper" style={{ padding: '1.25rem' }}>
              <Skeleton width="80px" height="2rem" style={{ marginBottom: '0.5rem' }} />
              <Skeleton width="100%" height="42px" borderRadius="8px" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="catalogue-grid-layout">
      {items.map((i) => (
        <div key={i} className="catalogue-product-card grid-mode skeleton-card">
          <div style={{ padding: '0.85rem' }}>
            <Skeleton height="190px" borderRadius="14px" />
          </div>
          <div style={{ padding: '0 1rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <Skeleton width="40%" height="0.85rem" />
              <Skeleton width="25%" height="0.85rem" />
            </div>
            <Skeleton width="85%" height="1.2rem" style={{ marginBottom: '0.5rem' }} />
            <Skeleton width="45%" height="0.85rem" style={{ marginBottom: '0.85rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton width="35%" height="1.5rem" />
              <Skeleton width="36px" height="36px" borderRadius="18px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

