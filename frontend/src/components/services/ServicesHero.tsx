import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowDown,
  FileUp,
  Layers,
  Cpu,
  Boxes,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export interface ServicesHeroProps {
  onExploreServices?: () => void;
  onStartCustomProject?: () => void;
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({
  onExploreServices,
  onStartCustomProject,
}) => {
  const navigate = useNavigate();

  // Handle scroll to services section
  const handleScrollToServices = () => {
    if (onExploreServices) {
      onExploreServices();
      return;
    }
    const element =
      document.getElementById('services-section') ||
      document.getElementById('our-services') ||
      document.getElementById('services-grid');
    if (element) {
      const navHeight = 74;
      const targetPos =
        element.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  };

  // Handle navigate to custom configurator / inquiry
  const handleStartCustom = () => {
    if (onStartCustomProject) {
      onStartCustomProject();
      return;
    }
    navigate('/#custom-configurator');
    setTimeout(() => {
      const el = document.getElementById('custom-configurator');
      if (el) {
        const navHeight = 74;
        const targetPos =
          el.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <section className="services-hero-section" aria-label="Our Services Hero">
      {/* Background Subtle Geometric Grid Accents */}
      <div className="services-hero-bg-pattern" aria-hidden="true" />
      <div className="services-hero-ambient-glow" aria-hidden="true" />

      <div className="container">
        <div className="services-hero-grid">
          {/* ========================================================
              LEFT COLUMN: Header Content & CTAs
              ======================================================== */}
          <div className="services-hero-content">
            {/* Small Label with Sparkle Icon */}
            <div className="services-hero-badge">
              <Sparkles size={14} className="services-badge-icon" />
              <span>OUR SERVICES</span>
            </div>

            {/* Main Heading */}
            <h1 className="services-hero-title">
              Turning Your Ideas{' '}
              <span className="services-title-highlight">Into Reality</span>
            </h1>

            {/* Description */}
            <p className="services-hero-description">
              From custom 3D design to precision printing, we transform your
              concepts into real-world creations through innovative technology
              and creativity.
            </p>

            {/* Key Value Metric Pills */}
            <div className="services-hero-trust-pills">
              <div className="trust-pill-item">
                <Cpu size={15} className="trust-pill-icon blue" />
                <span>0.05mm - 0.12mm Accuracy</span>
              </div>
              <div className="trust-pill-item">
                <Boxes size={15} className="trust-pill-icon orange" />
                <span>15+ Pro Materials</span>
              </div>
              <div className="trust-pill-item">
                <Zap size={15} className="trust-pill-icon green" />
                <span>24–48h Rapid Dispatch</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="services-hero-cta-group">
              {/* Primary Button */}
              <button
                type="button"
                onClick={handleScrollToServices}
                className="services-primary-btn"
                aria-label="Explore our 3D printing and modeling services"
              >
                <span>Explore Our Services</span>
                <ArrowDown size={17} className="btn-bounce-icon" />
              </button>

              {/* Secondary Button */}
              <button
                type="button"
                onClick={handleStartCustom}
                className="services-secondary-btn"
                aria-label="Start a custom 3D printing project inquiry"
              >
                <FileUp size={17} />
                <span>Start a Custom Project</span>
              </button>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Asymmetric 3D Product Visual Composition
              Featuring Architectural Model, Decorative Object,
              Customized Figurine, and Prototype
              ======================================================== */}
          <div className="services-hero-visual-wrapper">
            <div className="services-composition-stage">
              {/* Decorative 3D-inspired Wireframe Element */}
              <div className="decorative-3d-wireframe" aria-hidden="true">
                <svg
                  width="130"
                  height="130"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="wireframe-svg"
                >
                  <polygon
                    points="50,5 90,27 90,73 50,95 10,73 10,27"
                    stroke="#087FC3"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    opacity="0.45"
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="95"
                    stroke="#087FC3"
                    strokeWidth="1.2"
                    opacity="0.45"
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="90"
                    y2="27"
                    stroke="#087FC3"
                    strokeWidth="1.2"
                    opacity="0.45"
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="10"
                    y2="27"
                    stroke="#087FC3"
                    strokeWidth="1.2"
                    opacity="0.45"
                  />
                  <circle cx="50" cy="50" r="3" fill="#087FC3" opacity="0.6" />
                </svg>
              </div>

              {/* 1. Main Featured Card: Architectural Model */}
              <div className="services-product-card card-architectural">
                <div className="product-card-img-wrap">
                  <img
                    src="/assets/gallery_house.jpg"
                    alt="Miniature Architectural Model - Scale 1:100 Modern Villa"
                    className="product-card-img"
                    loading="eager"
                  />
                  <div className="product-card-overlay" />
                </div>
                <div className="product-card-info-badge">
                  <div className="badge-dot blue" />
                  <div>
                    <div className="card-info-title">Miniature Architectural Model</div>
                    <div className="card-info-subtitle">Scale 1:100 Maquette • Multi-Floor FDM</div>
                  </div>
                </div>
              </div>

              {/* 2. Top-Right Card: Decorative Object */}
              <div className="services-product-card card-decorative">
                <div className="product-card-img-wrap">
                  <img
                    src="/assets/gallery_vase.jpg"
                    alt="Decorative Object - Spiral Parametric Vase"
                    className="product-card-img"
                    loading="eager"
                  />
                  <div className="product-card-overlay" />
                </div>
                <div className="product-card-info-badge compact">
                  <div className="badge-dot orange" />
                  <div>
                    <div className="card-info-title">Decorative Object</div>
                    <div className="card-info-subtitle">Parametric Spiral Vase</div>
                  </div>
                </div>
              </div>

              {/* 3. Bottom-Left Card: Customized Figurine */}
              <div className="services-product-card card-figurine">
                <div className="product-card-img-wrap">
                  <img
                    src="/assets/product_astronaut.jpg"
                    alt="Customized Figurine - Detailed Astronaut with Mirror Visor"
                    className="product-card-img"
                    loading="eager"
                  />
                  <div className="product-card-overlay" />
                </div>
                <div className="product-card-info-badge compact">
                  <div className="badge-dot green" />
                  <div>
                    <div className="card-info-title">Customized Figurine</div>
                    <div className="card-info-subtitle">8K Ultra-Res SLA Resin</div>
                  </div>
                </div>
              </div>

              {/* 4. Bottom-Right Card: Functional Prototype */}
              <div className="services-product-card card-prototype">
                <div className="product-card-img-wrap">
                  <img
                    src="/assets/gallery_gears.jpg"
                    alt="Engineering Prototype - Meshing Spur & Cycloidal Gears"
                    className="product-card-img"
                    loading="eager"
                  />
                  <div className="product-card-overlay" />
                </div>
                <div className="product-card-info-badge compact">
                  <div className="badge-dot navy" />
                  <div>
                    <div className="card-info-title">Functional Prototype</div>
                    <div className="card-info-subtitle">Precision Industrial PETG</div>
                  </div>
                </div>
              </div>

              {/* Small Floating 3D Spec Pill Badge */}
              <div className="floating-spec-pill" title="Live Precision Specs">
                <div className="pulse-indicator">
                  <span className="pulse-dot" />
                  <span className="pulse-ring" />
                </div>
                <div className="spec-pill-text">
                  <strong>Production Active:</strong> FDM & Resin 3D Lab
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

