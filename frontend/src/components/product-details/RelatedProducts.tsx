import React, { useEffect, useState } from 'react';
import { productApi } from '../../api/productApi';
import { Product } from '../../types/product';
import { ProductCard } from '../products/ProductCard';
import { Sparkles } from 'lucide-react';

export interface RelatedProductsProps {
  productId: string;
  productSlug: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ productId, productSlug }) => {
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchRelated = async () => {
      try {
        setLoading(true);
        const res = await productApi.getRelated(productSlug || productId, 4);
        if (isMounted && res.data) {
          setRelated(res.data.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load related products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRelated();
    return () => {
      isMounted = false;
    };
  }, [productId, productSlug]);

  if (!loading && related.length === 0) return null;

  return (
    <section className="related-products-section" aria-label="Related 3D Models">
      <div className="section-title-row">
        <div className="title-with-badge">
          <Sparkles size={18} className="text-primary-blue" />
          <h3 className="related-heading">Related 3D Models You May Like</h3>
        </div>
        <span className="related-subtitle">Complementary designs & matching materials</span>
      </div>

      <div className="related-products-grid">
        {related.map((prod) => (
          <ProductCard
            key={prod._id || prod.slug}
            product={prod}
            viewMode="grid"
          />
        ))}
      </div>
    </section>
  );
};

