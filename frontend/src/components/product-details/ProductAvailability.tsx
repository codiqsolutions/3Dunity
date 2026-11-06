import React from 'react';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export interface ProductAvailabilityProps {
  stockStatus?: 'in-stock' | 'made-to-order' | 'out-of-stock';
  productionTime?: string;
  stock?: number;
}

export const ProductAvailability: React.FC<ProductAvailabilityProps> = ({
  stockStatus = 'in-stock',
  productionTime = '2–3 Business Days',
  stock = 20,
}) => {
  if (stockStatus === 'out-of-stock' || stock <= 0) {
    return (
      <div className="stock-status-pill pill-out-of-stock">
        <AlertCircle size={15} />
        <span>Currently Out of Stock (Contact for Waitlist)</span>
      </div>
    );
  }

  if (stockStatus === 'made-to-order') {
    return (
      <div className="stock-status-pill pill-made-to-order">
        <Clock size={15} />
        <div>
          <span className="status-title">Made to Order</span>
          <span className="status-sub">Print & QC Lead Time: {productionTime}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="stock-status-pill pill-in-stock">
      <CheckCircle2 size={15} />
      <div>
        <span className="status-title">In Stock & Ready to Dispatch</span>
        <span className="status-sub">Dispatched within 24 Hours • Pan-India Delivery</span>
      </div>
    </div>
  );
};

