import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CtaBannerSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCustomQuote = () => {
    navigate('/custom-quote');
  };

  return (
    <section className="custom-cta-section" aria-label="Custom 3D Model Call to Action">
      <div className="container">
        <div className="custom-cta-banner">
          {/* Subtle Ambient Color Accents (Green & Orange) */}
          <div className="cta-ambient-glow-green" aria-hidden="true" />
          <div className="cta-ambient-glow-orange" aria-hidden="true" />

          {/* Organic Wave / Gradient Overlay */}
          <div className="cta-wave-overlay" aria-hidden="true" />

          {/* Left Side: Headline & Description */}
          <div className="custom-cta-content">
            <h2 className="custom-cta-title">
              Need a Custom 3D Model?
            </h2>
            <p className="custom-cta-desc">
              Tell us your idea, and we'll turn it into a high-quality 3D-printed reality.
            </p>
          </div>

          {/* Right Side: CTA Button */}
          <div className="custom-cta-right-box">
            <button
              onClick={handleCustomQuote}
              className="custom-cta-btn"
              aria-label="Get a Custom Quote"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Large Geometric 3D Product Render (Geodesic Dome / Faceted Architecture) */}
          <div className="custom-cta-render-wrapper" aria-hidden="true">
            <img
              src="/assets/geodesic_dome_render.png"
              alt="Geometric 3D Geodesic Dome Model"
              className="custom-cta-render-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
