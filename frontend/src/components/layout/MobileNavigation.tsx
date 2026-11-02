import React, { useEffect } from 'react';
import { X, Search, ShoppingBag, ArrowRight, MapPin, Mail, Phone, Instagram, Youtube, Linkedin, Facebook } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeItem: string;
  onNavigate: (href: string) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onCustomQuote: () => void;
  cartCount: number;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  navItems,
  activeItem,
  onNavigate,
  onOpenSearch,
  onOpenCart,
  onCustomQuote,
  cartCount,
}) => {
  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="mobile-nav-backdrop" onClick={onClose}>
      <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="mobile-nav-header">
          <div className="brand-logo-container">
            <img
              src="/3Dunity_logo.jpeg"
              alt="3Dunity Logo"
              className="brand-logo-img"
              width="38"
              height="38"
            />
            <div className="brand-title">
              3D<span className="brand-accent">unity</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mobile-close-btn"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Quick Action Strip (Search & Cart) */}
        <div className="mobile-quick-actions">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="mobile-action-btn"
          >
            <Search size={18} />
            <span>Search Models</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenCart();
            }}
            className="mobile-action-btn mobile-cart-btn"
          >
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="mobile-cart-badge">{cartCount}</span>}
            </div>
            <span>Cart ({cartCount})</span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mobile-nav-list">
          {navItems.map((item) => {
            const isActive = activeItem === item.href || (item.href === '/' && activeItem === '');
            return (
              <button
                key={item.href}
                onClick={() => {
                  onNavigate(item.href);
                  onClose();
                }}
                className={`mobile-nav-item ${isActive ? 'active' : ''}`}
              >
                <span>{item.label}</span>
                <ArrowRight size={16} className="mobile-nav-arrow" />
              </button>
            );
          })}
        </nav>

        {/* Primary Call to Action */}
        <div className="mobile-cta-wrapper">
          <button
            onClick={() => {
              onClose();
              onCustomQuote();
            }}
            className="mobile-quote-btn"
          >
            Get a Custom Quote
          </button>
        </div>

        {/* Drawer Footer Contact Info */}
        <div className="mobile-drawer-footer">
          <div className="mobile-contact-item">
            <MapPin size={14} color="var(--color-primary)" />
            <span>Surat, Gujarat, India</span>
          </div>
          <div className="mobile-contact-item">
            <Mail size={14} color="var(--color-primary)" />
            <span>hello@3dunity.com</span>
          </div>
          <div className="mobile-contact-item">
            <Phone size={14} color="var(--color-primary)" />
            <span>+91 98765 43210</span>
          </div>

          <div className="mobile-social-row">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mobile-social-icon">
              <Instagram size={16} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="mobile-social-icon">
              <Youtube size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mobile-social-icon">
              <Linkedin size={16} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mobile-social-icon">
              <Facebook size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

