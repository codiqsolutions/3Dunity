import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Youtube, Linkedin, Facebook, ArrowRight, Check } from "./icons";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="footer-dark">
      <div className="unity-container">
        <div className="row g-4 justify-content-between">
          {/* Col 1: Brand Info */}
          <div className="col-lg-3 col-md-6">
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "16px" }}>
              <div style={{ width: "34px", height: "34px" }}>
                <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                  <polygon points="20,4 36,32 4,32" fill="url(#footer-prism1)" />
                  <polygon points="20,4 20,32 4,32" fill="url(#footer-prism2)" opacity="0.85" />
                  <polygon points="20,16 30,32 10,32" fill="#ffffff" opacity="0.3" />
                  <defs>
                    <linearGradient id="footer-prism1" x1="4" y1="4" x2="36" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00b4d8" />
                      <stop offset="0.5" stopColor="#0084ff" />
                      <stop offset="1" stopColor="#10b981" />
                    </linearGradient>
                    <linearGradient id="footer-prism2" x1="4" y1="4" x2="20" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0284c7" />
                      <stop offset="1" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em" }}>3D</span>
                <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#00b4d8", letterSpacing: "-0.02em" }}>unity</span>
              </div>
            </Link>
            <p style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "20px" }}>
              Your trusted partner for custom 3D modeling and printing solutions. Turn your ideas into tangible reality with precision and quality.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Instagram size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Youtube size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Linkedin size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "16px" }}>Quick Links</h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/process">How It Works</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Important Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "16px" }}>Important Links</h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/process">Shipping & Delivery</Link></li>
              <li><Link to="/contact">Return & Refund</Link></li>
              <li><Link to="/admin/login">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="col-lg-2 col-md-6">
            <h6 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "16px" }}>Contact Us</h6>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <Phone size={15} color="#00b4d8" style={{ marginTop: "3px", flexShrink: 0 }} />
                <a href="tel:+918866961005">+91 88669 61005</a>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <Mail size={15} color="#00b4d8" style={{ marginTop: "3px", flexShrink: 0 }} />
                <a href="mailto:3duniti1@gmail.com">3duniti1@gmail.com</a>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <MapPin size={15} color="#00b4d8" style={{ marginTop: "3px", flexShrink: 0 }} />
                <span>215 Apple Square, Yogi Chowk, Surat, Gujarat, 395010</span>
              </div>
              <div style={{ marginTop: "4px" }}>
                <a
                  href="https://maps.google.com/?q=215+apple+square,+yogi+chowk,+surat,+gujrat,+395010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-outline"
                  style={{
                    padding: "6px 14px",
                    fontSize: "0.78rem",
                    background: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(255,255,255,0.15)",
                    color: "#ffffff",
                  }}
                >
                  Get Directions <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Col 5: Stay Updated */}
          <div className="col-lg-3 col-md-6">
            <h6 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "16px" }}>Stay Updated</h6>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "14px" }}>
              Get the latest products, offers and 3D printing tips.
            </p>
            {subscribed ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#10b981", fontSize: "0.88rem" }}>
                <Check size={18} /> Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", background: "rgba(255,255,255,0.08)", borderRadius: "9999px", padding: "4px 4px 4px 16px", border: "1px solid rgba(255,255,255,0.15)" }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#ffffff",
                    fontSize: "0.88rem",
                    flex: 1,
                    minWidth: "100px",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#0084ff",
                    border: "none",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <span>© 2025 3Dunity. All Rights Reserved.</span>
            <div style={{ display: "flex", gap: "20px" }}>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/contact">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
