import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

export interface ProductListProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onQuickView }) => {
  return (
    <div className="catalogue-list-layout">
      {products.map((product) => (
        <ProductCard
          key={product._id || product.slug}
          product={product}
          viewMode="list"
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

