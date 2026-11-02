import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Box, ShieldCheck, Layers, Truck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 76;
      const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-exact-section">
      {/* Background decorative ambient lights */}
      <div className="hero-ambient-green" />
      <div className="hero-ambient-blue" />

      <div className="container hero-exact-container">
        <div className="hero-exact-grid">
          {/* =================================================================
              Left Column: Badge, Headline, Description, CTAs, 3 Benefits
             ================================================================= */}
          <div className="hero-content-column">
            {/* 1. Pill Badge */}
            <div className="hero-pill-badge">
              3D PRINTING & CUSTOM MODEL SOLUTIONS
            </div>

            {/* 2. Headline */}
            <h1 className="hero-main-heading">
              Bring Your Ideas to <br />
              Life in <span className="hero-heading-3d">3D</span>
            </h1>

            {/* 3. Description */}
            <p className="hero-lead-description">
              High-quality, customizable 3D models for personal, professional and business needs.
            </p>

            {/* 4. CTA Buttons */}
            <div className="hero-cta-buttons">
              <button
                onClick={() => navigate('/products')}
                className="hero-btn-primary"
                aria-label="Explore Products"
              >
                <span>Explore Products</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => scrollTo('custom-configurator')}
                className="hero-btn-secondary"
                aria-label="Get Custom Model"
              >
                <Box size={18} className="hero-btn-icon" />
                <span>Get Custom Model</span>
              </button>
            </div>

            {/* 5. Benefits Row (3 items) */}
            <div className="hero-benefits-row">
              {/* Benefit 1 */}
              <div className="hero-benefit-item">
                <div className="hero-benefit-icon-wrapper">
                  <ShieldCheck size={20} />
                </div>
                <div className="hero-benefit-text">
                  <span className="benefit-line1">High Precision</span>
                  <span className="benefit-line2">Printing</span>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="hero-benefit-item">
                <div className="hero-benefit-icon-wrapper">
                  <Layers size={20} />
                </div>
                <div className="hero-benefit-text">
                  <span className="benefit-line1">Multiple</span>
                  <span className="benefit-line2">Materials</span>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="hero-benefit-item">
                <div className="hero-benefit-icon-wrapper">
                  <Truck size={20} />
                </div>
                <div className="hero-benefit-text">
                  <span className="benefit-line1">Pan India</span>
                  <span className="benefit-line2">Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              Right Column: 3D Printing Machine & Product Composition Render
             ================================================================= */}
          <div className="hero-visual-column">
            <div className="hero-visual-stage">
              {/* Organic curved waves in top-right */}
              <div className="hero-wave-accent-green" />
              <div className="hero-wave-accent-cyan" />

              {/* High-quality 3D composition */}
              <div className="hero-composition-card">
                <img
                  src="/assets/hero_3d_composition.jpg"
                  alt="3Dunity Printing Machine, Geometric Deer, Spiral Vase, Architectural Model, Mechanical Gears, Astronaut Figurine and Planter"
                  className="hero-composition-img"
                  loading="eager"
                  width="744"
                  height="412"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom organic curve divider into the next section */}
      <div className="hero-bottom-curve">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="hero-curve-svg"
        >
          <path
            d="M0 48H1440V18C1260 38 1020 48 720 32C420 16 180 34 0 48Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
};
