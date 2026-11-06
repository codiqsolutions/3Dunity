import React from 'react';
import { Sparkles, ArrowRight, UploadCloud, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CustomProductCTA: React.FC = () => {
  const navigate = useNavigate();

  const handleCustomQuote = () => {
    navigate('/#custom-configurator');
    setTimeout(() => {
      const el = document.getElementById('custom-configurator');
      if (el) {
        const navHeight = 76;
        const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <section className="catalogue-custom-cta-section">
      <div className="container">
        <div className="custom-cta-card">
          {/* Decorative Background Shapes */}
          <div className="cta-accent-circle circle-1" aria-hidden="true" />
          <div className="cta-accent-circle circle-2" aria-hidden="true" />

          {/* Left Content */}
          <div className="custom-cta-content">
            <div className="custom-cta-badge">
              <Sparkles size={14} className="badge-icon" />
              <span>Bespoke 3D Manufacturing</span>
            </div>

            <h2 className="custom-cta-title">
              Can't Find What You're Looking For?
            </h2>

            <p className="custom-cta-desc">
              Tell us your idea, upload your sketch or CAD file (.STL, .OBJ, .STEP), and
              we'll turn it into a high-precision 3D-printed reality with fast turnaround.
            </p>

            <div className="custom-cta-features">
              <span className="cta-feature-item">
                <CheckCircle size={15} className="feature-icon" />
                <span>Custom Dimensions & Tolerances</span>
              </span>
              <span className="cta-feature-item">
                <CheckCircle size={15} className="feature-icon" />
                <span>Instant Material Sourcing</span>
              </span>
              <span className="cta-feature-item">
                <CheckCircle size={15} className="feature-icon" />
                <span>Confidential Non-Disclosure</span>
              </span>
            </div>

            <div className="custom-cta-buttons">
              <button
                type="button"
                onClick={handleCustomQuote}
                className="custom-cta-btn-primary"
              >
                <span>Request Custom Quote</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={handleCustomQuote}
                className="custom-cta-btn-secondary"
              >
                <UploadCloud size={16} />
                <span>Upload 3D File</span>
              </button>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="custom-cta-visual">
            <div className="visual-image-wrapper">
              <img
                src="/assets/product_deer.jpg"
                alt="Custom Geometric 3D Model"
                className="visual-model-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="visual-float-pill">
                <span className="float-pill-dot" />
                <span>Tolerance ±0.05mm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

