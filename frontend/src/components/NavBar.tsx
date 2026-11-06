import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, ArrowRight, X } from "./icons";
import logo from "../assets/logo.jpg";

interface NavBarProps {
  onOpenQuote?: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="main-header">
      <div className="unity-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "76px" }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}><img src={logo} alt="3D Unity" style={{ width: "76px", height: "76px", marginRight: "8px" }} />
          {/* Geometric 3D Prism Logo */}
          <div style={{
            width: "0px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          </div>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: "1.55rem", fontWeight: 800, color: "#071328", letterSpacing: "-0.03em" }}>3D</span>
            <span style={{ fontSize: "1.55rem", fontWeight: 700, color: "#0084ff", letterSpacing: "-0.02em" }}>unity</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: "none" }} className="d-lg-flex align-items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `nav-link-custom ${isActive ? "active" : ""}`}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `nav-link-custom ${isActive ? "active" : ""}`}>
            Products
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => `nav-link-custom ${isActive ? "active" : ""}`}>
            Our Services
          </NavLink>
          <NavLink to="/process" className={({ isActive }) => `nav-link-custom ${isActive ? "active" : ""}`}>
            How It Works
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => `nav-link-custom ${isActive ? "active" : ""}`}>
            Gallery
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link-custom ${isActive ? "active" : ""}`}>
            Contact Us
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              background: "#f1f5f9",
              border: "none",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#334155",
              transition: "all 0.2s",
            }}
            title="Search products"
          >
            <Search size={18} />
          </button>

          {/* Quick Quote / Cart badge button */}
          <Link
            to="/products"
            style={{
              background: "#f1f5f9",
              border: "none",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#334155",
              position: "relative",
              textDecoration: "none",
            }}
            title="Browse Catalogue"
          >
            <ShoppingBag size={18} />
            <span style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              background: "#f97316",
              color: "#ffffff",
              fontSize: "0.68rem",
              fontWeight: 700,
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              0
            </span>
          </Link>

          {/* CTA Quote Button */}
          <button
            onClick={onOpenQuote}
            className="btn-primary-gradient d-none d-sm-inline-flex"
            style={{ fontSize: "0.9rem", padding: "10px 20px" }}
          >
            Get a Custom Quote <ArrowRight size={16} />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="d-lg-none"
            style={{
              background: "#f8fafc",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              color: "#0f172a",
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Slide-down Search Bar */}
      {searchOpen && (
        <div style={{ background: "#ffffff", borderTop: "1px solid #f1f5f9", padding: "12px 0", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
          <div className="unity-container">
            <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="Search 3D models, sculptures, miniature houses, gears, keychains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "9999px",
                  border: "1.5px solid #0084ff",
                  outline: "none",
                  fontSize: "0.95rem",
                }}
              />
              <button type="submit" className="btn-primary-gradient">Search</button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="d-lg-none" style={{ background: "#ffffff", borderTop: "1px solid #edf2f7", padding: "16px 20px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <NavLink to="/" end onClick={() => setMobileMenuOpen(false)} className="nav-link-custom">
              Home
            </NavLink>
            <NavLink to="/products" onClick={() => setMobileMenuOpen(false)} className="nav-link-custom">
              Products
            </NavLink>
            <NavLink to="/services" onClick={() => setMobileMenuOpen(false)} className="nav-link-custom">
              Our Services
            </NavLink>
            <NavLink to="/process" onClick={() => setMobileMenuOpen(false)} className="nav-link-custom">
              How It Works
            </NavLink>
            <NavLink to="/gallery" onClick={() => setMobileMenuOpen(false)} className="nav-link-custom">
              Gallery
            </NavLink>
            <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className="nav-link-custom">
              Contact Us
            </NavLink>
            <div style={{ marginTop: "12px" }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenQuote) onOpenQuote();
                }}
                className="btn-primary-gradient w-100"
              >
                Get a Custom Quote <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
