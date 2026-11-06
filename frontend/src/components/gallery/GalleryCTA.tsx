import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileUp, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export const GalleryCTA: React.FC = () => {
  const navigate = useNavigate();

  const handleStartCustom = () => {
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

  const handleContact = () => {
    navigate('/#contact-section');
    setTimeout(() => {
      const el = document.getElementById('contact-section');
      if (el) {
        const navHeight = 76;
        const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <section className="gallery-cta-section">
      <div className="container">
        <div className="gallery-cta-card">
          {/* Subtle Background 3D Mesh Accents */}
          <div className="cta-pattern-overlay" />

          <div className="gallery-cta-inner">
            {/* Small Badge */}
            <div className="gallery-cta-badge">
              <Sparkles size={14} className="badge-icon" />
              <span>BESPOKE ADDITIVE FABRICATION</span>
            </div>

            {/* Heading */}
            <h2 className="gallery-cta-title">
              Have an Idea Worth Creating?
            </h2>

            {/* Description */}
            <p className="gallery-cta-desc">
              From personalized gifts to custom prototypes, turn your imagination into something real with 3Dunity.
            </p>

            {/* Key Advantages Row */}
            <div className="gallery-cta-perks">
              <div className="cta-perk-item">
                <CheckCircle2 size={15} color="#55B832" />
                <span>Instant Online Quotation</span>
              </div>
              <div className="cta-perk-item">
                <CheckCircle2 size={15} color="#55B832" />
                <span>Design Validation & Slicing</span>
              </div>
              <div className="cta-perk-item">
                <CheckCircle2 size={15} color="#55B832" />
                <span>Fast Dispatch Pan-India</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="gallery-cta-actions">
              <button
                type="button"
                onClick={handleStartCustom}
                className="cta-btn-primary"
              >
                <FileUp size={18} />
                <span>Start Your Custom Project</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={handleContact}
                className="cta-btn-secondary"
              >
                <Mail size={17} />
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

