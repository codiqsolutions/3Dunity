import React from 'react';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = 'var(--radius-sm)',
  className = '',
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#E2E8F0',
        backgroundImage: 'linear-gradient(90deg, #E2E8F0 0%, #F1F5F9 50%, #E2E8F0 100%)',
        backgroundSize: '200% 100%',
        animation: 'skeletonShimmer 1.5s infinite linear',
        ...style,
      }}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
      }}
    >
      <Skeleton height="200px" borderRadius="var(--radius-md)" />
      <Skeleton width="40%" height="0.9rem" />
      <Skeleton width="85%" height="1.25rem" />
      <Skeleton width="60%" height="0.85rem" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <Skeleton width="30%" height="1.5rem" />
        <Skeleton width="35%" height="2.2rem" borderRadius="var(--radius-md)" />
      </div>
    </div>
  );
};

