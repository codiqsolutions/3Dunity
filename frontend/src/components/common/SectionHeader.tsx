import React from 'react';
import { Badge } from './Badge';

export interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: 'blue' | 'green' | 'orange' | 'navy' | 'neutral';
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = 'blue',
  badgeIcon,
  title,
  subtitle,
  align = 'center',
  action,
  className = '',
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: align === 'center' ? 'column' : 'row',
        alignItems: align === 'center' ? 'center' : 'flex-end',
        justifyContent: 'space-between',
        textAlign: align,
        marginBottom: '2.75rem',
        gap: '1.25rem',
      }}
    >
      <div style={{ maxWidth: align === 'center' ? '680px' : '620px' }}>
        {badge && (
          <div style={{ marginBottom: '0.85rem' }}>
            <Badge variant={badgeVariant} icon={badgeIcon} size="md">
              {badge}
            </Badge>
          </div>
        )}
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
            color: 'var(--color-navy)',
            letterSpacing: '-0.025em',
            fontWeight: 800,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--color-text-secondary)',
              marginTop: '0.75rem',
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
};

