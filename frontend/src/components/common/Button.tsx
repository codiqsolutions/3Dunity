import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'navy' | 'secondary' | 'outline' | 'ghost' | 'green' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to?: string;
  href?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  to,
  href,
  fullWidth = false,
  disabled,
  style,
  className = '',
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontFamily: 'var(--font-sans)',
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--transition-normal)',
    textDecoration: 'none',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    position: 'relative',
    userSelect: 'none',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '0.45rem 0.9rem',
      fontSize: '0.85rem',
      gap: '0.4rem',
    },
    md: {
      padding: '0.65rem 1.35rem',
      fontSize: '0.925rem',
      gap: '0.55rem',
    },
    lg: {
      padding: '0.85rem 1.85rem',
      fontSize: '1.025rem',
      gap: '0.65rem',
    },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: '#FFFFFF',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid transparent',
    },
    navy: {
      backgroundColor: 'var(--color-navy)',
      color: '#FFFFFF',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid transparent',
    },
    secondary: {
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-navy)',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      border: '1.5px solid var(--color-primary)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text)',
      border: '1px solid transparent',
    },
    green: {
      backgroundColor: 'var(--color-green)',
      color: '#FFFFFF',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid transparent',
    },
    orange: {
      backgroundColor: 'var(--color-orange)',
      color: '#FFFFFF',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid transparent',
    },
  };

  const combinedStyles: React.CSSProperties = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  const content = (
    <>
      {isLoading ? (
        <Loader2 size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="animate-spin" />
      ) : (
        leftIcon && <span style={{ display: 'inline-flex' }}>{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span style={{ display: 'inline-flex' }}>{rightIcon}</span>}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} style={combinedStyles} className={className}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} style={combinedStyles} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      style={combinedStyles}
      className={className}
    >
      {content}
    </button>
  );
};

