import React from 'react';
import { Home, Gift, Gamepad2, Building2, Cog, Package, LayoutGrid, LucideIcon } from 'lucide-react';
import { Category } from '../../types/category';

export interface CategoryCardProps {
  category: Category;
  isActive: boolean;
  onClick: (slug: string) => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Gift,
  Gamepad2,
  Building2,
  Cog,
  Package,
  LayoutGrid,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isActive,
  onClick,
}) => {
  const IconComponent = ICON_MAP[category.icon] || Package;

  return (
    <button
      onClick={() => onClick(category.slug)}
      className={`collection-category-card ${isActive ? 'is-active' : ''}`}
      aria-label={`Filter by ${category.name}`}
      title={`${category.name} (${category.itemCount || 0} models)`}
    >
      <div className="category-card-icon-box">
        <IconComponent size={26} strokeWidth={1.8} />
      </div>
      <span className="category-card-title">{category.name}</span>
      {category.itemCount !== undefined && category.itemCount > 0 && (
        <span className="category-card-count">{category.itemCount} Items</span>
      )}
    </button>
  );
};

