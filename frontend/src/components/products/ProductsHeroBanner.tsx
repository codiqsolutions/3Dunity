import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Layers } from 'lucide-react';

export const ProductsHeroBanner: React.FC = () => {
  return (
    <section className="products-hero-banner">
      {/* Background Decorative Blobs */}
      <div className="banner-blob blob-1" aria-hidden="true" />
      <div className="banner-blob blob-2" aria-hidden="true" />
      <div className="banner-blob blob-3" aria-hidden="true" />

      <div className="container banner-inner">
        {/* Left Column: Breadcrumb + Heading + Subtitle */}
        <div className="banner-content">
          {/* Breadcrumb Navigation */}
          <nav className="products-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">
              Home
            </Link>
            <ChevronRight size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current" aria-current="page">
              Products
            </span>
          </nav>

          <div className="banner-badge">
            <Sparkles size={14} className="badge-icon" />
            <span>Premium 3D Catalogue</span>
          </div>

          <h1 className="banner-title">Our Products</h1>

          <p className="banner-description">
            Explore our wide range of 3D-printed products or create your own custom design.
            From high-precision engineering parts to artistic home decor.
          </p>

          <div className="banner-perks">
            <span className="banner-perk-item">
              <span className="perk-dot dot-blue" /> Pan India Delivery
            </span>
            <span className="banner-perk-item">
              <span className="perk-dot dot-green" /> 100% Quality Inspected
            </span>
            <span className="banner-perk-item">
              <span className="perk-dot dot-orange" /> Custom Options Available
            </span>
          </div>
        </div>

        {/* Right Column: 3D Visual with Printer & Orange Print Element */}
        <div className="banner-visual">
          <div className="banner-visual-glow" />
          <div className="banner-printer-card">
            <img
              src="/assets/hero_3d_printer.png"
              alt="3D Printer manufacturing custom model"
              className="banner-printer-img"
              onError={(e) => {
                // Fallback to high quality unsplash printer if local image is missing
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
              }}
            />
            {/* Overlay floating badge */}
            <div className="banner-floating-tag">
              <Layers size={16} className="tag-icon" />
              <div>
                <span className="tag-label">Extrusion Precision</span>
                <span className="tag-val">0.08mm Ultra-Layer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

