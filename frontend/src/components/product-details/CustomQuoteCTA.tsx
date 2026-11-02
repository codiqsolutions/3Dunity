import React from 'react';
import { Sparkles, ArrowRight, UploadCloud, Layers } from 'lucide-react';

export interface CustomQuoteCTAProps {
  onRequestQuote: () => void;
}

export const CustomQuoteCTA: React.FC<CustomQuoteCTAProps> = ({ onRequestQuote }) => {
  return (
    <section className="product-custom-cta-banner" aria-label="Custom 3D Printing Inquiries">
      <div className="custom-banner-card">
        {/* Decorative Ambient Accents */}
        <div className="banner-glow-circle circle-blue" aria-hidden="true" />
        <div className="banner-glow-circle circle-orange" aria-hidden="true" />

        <div className="banner-content-col">
          <div className="banner-pill-tag">
            <Sparkles size={13} className="text-accent-orange" />
            <span>Industrial & Bespoke Fabrication</span>
          </div>

          <h2 className="banner-headline">
            Have Your Own 3D Design in Mind?
          </h2>

          <p className="banner-subline">
            Share your idea, upload a reference sketch or proprietary 3D CAD design (.STL, .OBJ, .STEP),
            and our engineering team will turn it into high-precision reality.
          </p>

          <div className="banner-actions-row">
            <button
              type="button"
              onClick={onRequestQuote}
              className="banner-primary-btn"
            >
              <span>Request Custom Quote</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="banner-graphic-col">
          <div className="graphic-card-frame">
            <Layers size={48} className="graphic-icon" />
            <span className="graphic-title">Custom Tolerances ±0.05mm</span>
            <span className="graphic-sub">FDM • SLA Resin • SLS Carbon Nylon</span>
          </div>
        </div>
      </div>
    </section>
  );
};

