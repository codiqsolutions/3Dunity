import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, Layers, Award, ShieldCheck } from 'lucide-react';

export const GalleryHero: React.FC = () => {
  return (
    <section className="gallery-hero-section">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="gallery-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current" aria-current="page">
            Gallery
          </span>
        </nav>

        {/* Hero Content Grid */}
        <div className="gallery-hero-grid">
          {/* Left Column: Heading and Description */}
          <div className="gallery-hero-content">
            {/* Small Brand Badge */}
            <div className="gallery-hero-badge">
              <Sparkles size={14} className="badge-sparkle-icon" />
              <span>OUR CREATIONS</span>
            </div>

            {/* Main Page Title */}
            <h1 className="gallery-hero-title">
              Where Creativity Meets{' '}
              <span className="gallery-hero-title-accent">3D Printing</span>
            </h1>

            {/* Description */}
            <p className="gallery-hero-desc">
              Explore our collection of imaginative designs, customized creations, and precision-crafted 3D printed products.
            </p>

            {/* Value Proposition Pills */}
            <div className="gallery-hero-stats-row">
              <div className="gallery-stat-pill">
                <Layers size={15} className="stat-pill-icon" />
                <span>300+ Bespoke Models Built</span>
              </div>
              <div className="gallery-stat-pill">
                <Award size={15} className="stat-pill-icon" />
                <span>0.05mm - 0.12mm Pitch</span>
              </div>
              <div className="gallery-stat-pill">
                <ShieldCheck size={15} className="stat-pill-icon" />
                <span>Production & Museum Grade</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Preview */}
          <div className="gallery-hero-visual-col">
            <div className="gallery-hero-visual-card">
              <div className="hero-visual-image-wrapper">
                <img
                  src="/assets/hero_3d_composition.jpg"
                  alt="3Dunity Creative Gallery Showcase"
                  className="hero-visual-img"
                  loading="eager"
                />
                <div className="hero-visual-gradient" />
              </div>

              {/* Floating Overlay Card */}
              <div className="hero-floating-tag">
                <div className="floating-tag-indicator" />
                <div>
                  <div className="floating-tag-title">Curated Studio Showcase</div>
                  <div className="floating-tag-sub">Updated with latest prototypes & bespoke prints</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

