import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

export interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onQuickView }) => {
  return (
    <div className="catalogue-grid-layout">
      {products.map((product) => (
        <ProductCard
          key={product._id || product.slug}
          product={product}
          viewMode="grid"
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

