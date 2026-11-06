import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu } from 'lucide-react';
import { TopBar } from './TopBar';
import { MobileNavigation, NavItem } from './MobileNavigation';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export interface HeaderProps {
  onOpenSearch: () => void;
  onOpenCart?: () => void;
  onCustomQuote?: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Our Services', href: '/services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '#contact-section' },
];

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenCart,
  onCustomQuote,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for sticky shadow and active section highlight
  useEffect(() => {
    if (location.pathname.startsWith('/products')) {
      setActiveSection('/products');
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    if (location.pathname.startsWith('/gallery')) {
      setActiveSection('/gallery');
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    if (location.pathname.startsWith('/services')) {
      setActiveSection('/services');
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is in viewport
      const sections = ['contact-section', 'gallery', 'how-it-works', 'our-services', 'featured-products'];
      let current = '/';

      if (window.scrollY < 300) {
        current = '/';
      } else {
        for (const sec of sections) {
          const el = document.getElementById(sec);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 140 && rect.bottom >= 140) {
              current = `#${sec}`;
              break;
            }
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (href: string) => {
    if (href === '/') {
      setActiveSection('/');
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href === '/products') {
      setActiveSection('/products');
      if (location.pathname !== '/products') {
        navigate('/products');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href === '/gallery') {
      setActiveSection('/gallery');
      if (location.pathname !== '/gallery') {
        navigate('/gallery');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href === '/services') {
      setActiveSection('/services');
      if (location.pathname !== '/services') {
        navigate('/services');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate(`/${href}`);
        setTimeout(() => {
          const targetId = href.replace('#', '');
          const element = document.getElementById(targetId);
          if (element) {
            const navHeight = 76;
            const targetPos = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
          }
        }, 120);
      } else {
        setActiveSection(href);
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          const navHeight = 76;
          const targetPos = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
  };

  const handleCustomQuoteClick = () => {
    if (onCustomQuote) {
      onCustomQuote();
    } else {
      if (location.pathname !== '/') {
        navigate('/#custom-configurator');
        setTimeout(() => {
          const el = document.getElementById('custom-configurator');
          if (el) {
            const navHeight = 76;
            const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
          }
        }, 120);
      } else {
        const el = document.getElementById('custom-configurator');
        if (el) {
          const navHeight = 76;
          const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      }
    }
  };

  const handleCartClick = () => {
    if (onOpenCart) {
      onOpenCart();
    } else {
      openCart();
    }
  };

  return (
    <header className="site-header-wrapper">
      {/* 1. Top Utility Contact & Social Bar */}
      <TopBar />

      {/* 2. Main White Sticky Header */}
      <nav className={`main-navbar ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo on the left */}
          <Link
            to="/"
            className="brand-logo-container"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
          >
            <img
              src="/3Dunity_logo.jpeg"
              alt="3Dunity"
              className="brand-logo-img"
              width="44"
              height="44"
            />
            <div className="brand-title">
              3D<span className="brand-accent">unity</span>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <ul className="navbar-links">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <li key={item.href} className="navbar-link-item">
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`navbar-link-btn ${isActive ? 'is-active' : ''}`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="active-blue-indicator" />}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right Action Icons & Button */}
          <div className="navbar-actions-group">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="action-icon-btn"
              title="Search products and CAD models"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Icon with Badge */}
            <button
              onClick={() => {
                navigate('/products?wishlist=true');
              }}
              className="action-icon-btn wishlist-icon-btn"
              title="My Wishlist"
              aria-label="Wishlist"
              style={{ position: 'relative' }}
            >
              <Heart size={20} fill={wishlistCount > 0 ? '#F59A16' : 'none'} color={wishlistCount > 0 ? '#F59A16' : 'currentColor'} />
              {wishlistCount > 0 && (
                <span className="cart-count-pill" style={{ backgroundColor: '#F59A16' }}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon with Badge */}
            <button
              onClick={handleCartClick}
              className="action-icon-btn cart-icon-btn"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              <span className="cart-count-pill">{totalItems}</span>
            </button>

            {/* "Get a Custom Quote" Button */}
            <button
              onClick={handleCustomQuoteClick}
              className="custom-quote-pill-btn"
            >
              Get a Custom Quote
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="action-icon-btn mobile-menu-toggle"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Reusable Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={NAV_ITEMS}
        activeItem={activeSection}
        onNavigate={handleNavClick}
        onOpenSearch={onOpenSearch}
        onOpenCart={handleCartClick}
        onCustomQuote={handleCustomQuoteClick}
        cartCount={totalItems}
      />
    </header>
  );
};

