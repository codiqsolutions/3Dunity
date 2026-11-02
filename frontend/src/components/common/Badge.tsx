import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'orange' | 'navy' | 'neutral';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  icon,
  className = '',
}) => {
  const variantStyles: Record<string, React.CSSProperties> = {
    blue: {
      backgroundColor: 'var(--color-primary-light)',
      color: 'var(--color-primary)',
      borderColor: 'rgba(8, 127, 195, 0.25)',
    },
    green: {
      backgroundColor: 'var(--color-green-light)',
      color: 'var(--color-green)',
      borderColor: 'rgba(85, 184, 50, 0.25)',
    },
    orange: {
      backgroundColor: 'var(--color-orange-light)',
      color: 'var(--color-orange)',
      borderColor: 'rgba(245, 154, 22, 0.25)',
    },
    navy: {
      backgroundColor: 'rgba(23, 59, 112, 0.08)',
      color: 'var(--color-navy)',
      borderColor: 'rgba(23, 59, 112, 0.2)',
    },
    neutral: {
      backgroundColor: '#f1f5f9',
      color: 'var(--color-text-secondary)',
      borderColor: 'var(--color-border)',
    },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      fontSize: '0.72rem',
      padding: '0.2rem 0.55rem',
      gap: '0.3rem',
    },
    md: {
      fontSize: '0.8rem',
      padding: '0.3rem 0.75rem',
      gap: '0.4rem',
    },
  };

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        letterSpacing: '0.01em',
        borderRadius: 'var(--radius-full)',
        border: '1px solid transparent',
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </span>
  );
};

