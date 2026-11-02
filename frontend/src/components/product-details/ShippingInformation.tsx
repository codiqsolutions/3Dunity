import React, { useState } from 'react';
import { Truck, Clock, ShieldCheck, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product } from '../../types/product';

export interface ShippingInformationProps {
  product: Product;
}

export const ShippingInformation: React.FC<ShippingInformationProps> = ({ product }) => {
  const [pincode, setPincode] = useState('');
  const [checkedPincode, setCheckedPincode] = useState<string | null>(null);
  const [isDeliverable, setIsDeliverable] = useState<boolean | null>(null);

  const isMadeToOrder = product.stockStatus === 'made-to-order';
  const manufacturingDays = product.productionTime || (isMadeToOrder ? '2–3 Business Days' : 'Same Day');
  const shippingDays = '3–5 Business Days';

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length !== 6 || isNaN(Number(pincode))) {
      setIsDeliverable(false);
      setCheckedPincode(pincode);
      return;
    }

    // Deliverable across all 6-digit Indian pincodes
    setIsDeliverable(true);
    setCheckedPincode(pincode.trim());
  };

  return (
    <div className="shipping-info-delivery-card">
      <div className="delivery-card-header">
        <div className="delivery-icon-title">
          <Truck size={18} className="text-primary-blue" />
          <h4 className="delivery-card-title">Manufacturing & Pan-India Delivery</h4>
        </div>
        <span className="free-shipping-tag">FREE DELIVERY</span>
      </div>

      {/* Two Phase Timeline: Manufacturing Time vs Shipping Time */}
      <div className="delivery-timeline-grid">
        <div className="timeline-phase-col">
          <div className="phase-badge phase-prep">
            <Clock size={13} />
            <span>Phase 1: Production</span>
          </div>
          <div className="phase-value">
            {isMadeToOrder ? manufacturingDays : 'Within 24 Hours'}
          </div>
          <p className="phase-description">
            {isMadeToOrder
              ? 'Precision 3D slicing, G-Code printing, wash & UV cure'
              : 'Pre-inspected unit packaged from ready warehouse stock'}
          </p>
        </div>

        <div className="timeline-arrow-col" aria-hidden="true">
          →
        </div>

        <div className="timeline-phase-col">
          <div className="phase-badge phase-ship">
            <Truck size={13} />
            <span>Phase 2: Shipping</span>
          </div>
          <div className="phase-value">{shippingDays}</div>
          <p className="phase-description">
            Pan-India express air dispatch with real-time tracking via SMS & WhatsApp
          </p>
        </div>
      </div>

      {/* Pincode Delivery Availability Checker */}
      <div className="pincode-checker-block">
        <form onSubmit={handleCheckPincode} className="pincode-form">
          <div className="pincode-input-field">
            <MapPin size={16} className="pin-icon" />
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit PIN code"
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value);
                setCheckedPincode(null);
                setIsDeliverable(null);
              }}
              className="pincode-text-input"
              aria-label="Enter PIN code for delivery check"
            />
          </div>
          <button type="submit" className="pincode-check-btn">
            Check Delivery
          </button>
        </form>

        {checkedPincode && isDeliverable && (
          <div className="pincode-result success">
            <CheckCircle2 size={14} />
            <span>
              Express Delivery available to <strong>{checkedPincode}</strong>! Estimated arrival in 4–6 days.
            </span>
          </div>
        )}

        {checkedPincode && isDeliverable === false && (
          <div className="pincode-result error">
            <AlertCircle size={14} />
            <span>Please enter a valid 6-digit Indian PIN code.</span>
          </div>
        )}
      </div>

      {/* Trust assurance footnote */}
      <div className="delivery-trust-row">
        <span className="trust-item">
          <ShieldCheck size={14} className="text-secondary-green" />
          <span>Damage-Proof Custom Foam Packaging</span>
        </span>
        <span className="trust-item">
          <CheckCircle2 size={14} className="text-primary-blue" />
          <span>7-Day Reprint & Replace Guarantee</span>
        </span>
      </div>
    </div>
  );
};

