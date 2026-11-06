import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, FileUp, Menu, X, ArrowRight, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const Navbar: React.FC<{ onOpenSearch?: () => void }> = ({ onOpenSearch }) => {
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="site-header">
      <div className="container">
        <nav className="navbar">
          {/* Logo */}
          <Link to="/" className="brand-logo-container" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="/3Dunity_logo.jpeg"
              alt="3Dunity Logo"
              className="brand-logo-img"
              width="44"
              height="44"
            />
            <div>
              <div className="brand-title">
                3D<span className="brand-accent">unity</span>
              </div>
              <div className="brand-tagline">3D Print & Additive Studio</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            <li>
              <button onClick={() => scrollToSection('featured-products')} className="nav-link">
                Ready-Made Models
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('categories-section')} className="nav-link">
                Categories
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('custom-configurator')} className="nav-link">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  Custom 3D Printing
                  <Badge variant="green" size="sm">Instant Quote</Badge>
                </span>
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('materials-matrix')} className="nav-link">
                Materials & Tech
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('how-it-works')} className="nav-link">
                How It Works
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('testimonials')} className="nav-link">
                Reviews
              </button>
            </li>
          </ul>

          {/* Navbar Actions */}
          <div className="navbar-actions">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="nav-icon-btn"
              title="Search products & specs"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="nav-icon-btn"
              title="View Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            {/* Request Quote CTA Button */}
            <Button
              variant="primary"
              size="sm"
              leftIcon={<FileUp size={15} />}
              onClick={() => scrollToSection('custom-configurator')}
            >
              Upload & Quote
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              className="nav-icon-btn mobile-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div className="brand-title" style={{ fontSize: '1.25rem' }}>
                3D<span className="brand-accent">unity</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="nav-icon-btn"
                aria-label="Close Mobile Menu"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
              <button onClick={() => scrollToSection('featured-products')} className="mobile-nav-link">
                <span>Ready-Made Models</span>
                <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollToSection('categories-section')} className="mobile-nav-link">
                <span>Product Categories</span>
                <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollToSection('custom-configurator')} className="mobile-nav-link">
                <span>Custom 3D Printing & Quote</span>
                <Badge variant="green" size="sm">Instant</Badge>
              </button>
              <button onClick={() => scrollToSection('materials-matrix')} className="mobile-nav-link">
                <span>Materials & Tech</span>
                <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="mobile-nav-link">
                <span>How It Works</span>
                <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="mobile-nav-link">
                <span>Customer Reviews</span>
                <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollToSection('faq-section')} className="mobile-nav-link">
                <span>FAQ & Guides</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Button
                variant="primary"
                fullWidth
                leftIcon={<FileUp size={16} />}
                onClick={() => scrollToSection('custom-configurator')}
              >
                Get Custom Quote
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

