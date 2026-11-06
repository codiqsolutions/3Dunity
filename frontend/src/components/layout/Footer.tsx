import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { newsletterApi } from '../../api/newsletterApi';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus('error');
      setMessage('Please enter a valid email format.');
      return;
    }

    try {
      setStatus('loading');
      setMessage('');
      const res = await newsletterApi.subscribe(email.trim(), 'footer_newsletter');
      setStatus('success');
      setMessage(res.message || 'Thank you for subscribing!');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Unable to subscribe. Please try again.');
    }
  };

  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="container">
        {/* Main 5-Column Grid */}
        <div className="footer-main-grid">
          {/* Column 1 – Brand */}
          <div className="footer-col-brand">
            <Link to="/" className="footer-brand-logo-row" aria-label="3Dunity Home">
              <img
                src="/3Dunity_logo.jpeg"
                alt="3Dunity Logo"
                className="footer-brand-logo-img"
              />
              <span className="footer-brand-name">3Dunity</span>
            </Link>

            <p className="footer-brand-desc">
              Your trusted partner for custom 3D modeling and printing solutions. Turn your ideas into tangible reality with precision and quality.
            </p>

            <div className="footer-social-row">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn"
                aria-label="Follow us on YouTube"
              >
                <Youtube size={17} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-btn"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={17} />
              </a>
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div className="footer-col-quick">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/" className="footer-nav-link">Home</Link>
              </li>
              <li>
                <Link to="/products" className="footer-nav-link">Products</Link>
              </li>
              <li>
                <Link to="/services" className="footer-nav-link">Our Services</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="footer-nav-link">How It Works</Link>
              </li>
              <li>
                <Link to="/gallery" className="footer-nav-link">Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-nav-link">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 – Important Links */}
          <div className="footer-col-important">
            <h4 className="footer-col-title">Important Links</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/about" className="footer-nav-link">About Us</Link>
              </li>
              <li>
                <Link to="/privacy" className="footer-nav-link">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="footer-nav-link">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/shipping" className="footer-nav-link">Shipping & Delivery</Link>
              </li>
              <li>
                <Link to="/returns" className="footer-nav-link">Return & Refund</Link>
              </li>
              <li>
                <Link to="/404" className="footer-nav-link">404 - Page Not Found</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 – Contact Us */}
          <div className="footer-col-contact">
            <h4 className="footer-col-title">Contact Us</h4>
            <div className="footer-contact-list">
              <a href="tel:+919876543210" className="footer-contact-item">
                <Phone size={15} />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:hello@3dunity.com" className="footer-contact-item">
                <Mail size={15} />
                <span>hello@3dunity.com</span>
              </a>
              <div className="footer-contact-item">
                <MapPin size={15} />
                <span>Surat, Gujarat, India</span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Surat,+Gujarat,+India"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-directions-btn"
            >
              <span>Get Directions</span>
              <ArrowRight size={13} />
            </a>
          </div>

          {/* Column 5 – Stay Updated (Newsletter) */}
          <div className="footer-col-newsletter">
            <h4 className="footer-col-title">Stay Updated</h4>
            <p className="footer-newsletter-desc">
              Get the latest products, offers and 3D printing tips.
            </p>

            <form onSubmit={handleSubscribe} className="footer-newsletter-form" noValidate>
              <div className="footer-input-wrap">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Enter your email"
                  className="footer-email-input"
                  aria-label="Email address for newsletter"
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  className="footer-submit-btn"
                  aria-label="Subscribe to newsletter"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <Loader2 size={16} className="spinner" />
                  ) : (
                    <ArrowRight size={16} />
                  )}
                </button>
              </div>

              {/* Success / Error Feedback */}
              {status === 'success' && (
                <div className="footer-feedback-msg success">
                  <CheckCircle2 size={13} />
                  <span>{message}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="footer-feedback-msg error">
                  <AlertCircle size={13} />
                  <span>{message}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Divider and Copyright Row */}
        <div className="footer-bottom-divider" />
        <div className="footer-bottom-row">
          <div>
            © 2025 3Dunity. All Rights Reserved.
          </div>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms" className="footer-bottom-link">Terms & Conditions</Link>
            <span>|</span>
            <Link to="/sitemap" className="footer-bottom-link">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
