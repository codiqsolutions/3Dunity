import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Layers,
  Truck,
  Box,
  Heart,
  Sparkles,
  Sliders,
  Shield,
  Lightbulb,
  Printer,
  Star,
  QuoteIcon,
} from "../components/icons";
import { CATEGORIES, PRODUCTS, GALLERY_ITEMS, TESTIMONIALS } from "../data/mockData";

export const Home: React.FC = () => {
  const { openQuote } = (useOutletContext<{ openQuote?: () => void }>() || {});
  const [activeCategory, setActiveCategory] = useState("all");

  const featuredProducts = PRODUCTS.slice(0, 5);
  const galleryPreview = GALLERY_ITEMS.slice(0, 6);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Box": return <Box size={22} />;
      case "Heart": return <Heart size={22} />;
      case "Sparkles": return <Sparkles size={22} />;
      case "Layers": return <Layers size={22} />;
      case "Sliders": return <Sliders size={22} />;
      case "Shield": return <Shield size={22} />;
      default: return <Sparkles size={22} />;
    }
  };

  return (
    <div style={{ paddingBottom: "40px" }}>
      {/* 1. HERO BANNER */}
      <section className="hero-section">
        <div className="unity-container">
          <div className="row align-items-center g-5">
            {/* Left Col: Hero Content */}
            <div className="col-lg-6">
              <span className="hero-badge">3D PRINTING & CUSTOM MODEL SOLUTIONS</span>
              <h1 className="hero-title">
                Bring Your Ideas to Life in <span className="text-gradient">3D</span>
              </h1>
              <p className="hero-subtitle">
                High-quality, customizable 3D models for personal, professional and business needs. From one-off artistic decor to functional engineering prototypes.
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "40px" }}>
                <Link to="/products" className="btn-primary-gradient" style={{ fontSize: "1rem", padding: "12px 28px" }}>
                  Explore Products <ArrowRight size={18} />
                </Link>
                <button
                  type="button"
                  onClick={openQuote}
                  className="btn-secondary-outline"
                  style={{ fontSize: "1rem", padding: "12px 28px" }}
                >
                  <Box size={18} color="#0084ff" /> Get Custom Model
                </button>
              </div>

              {/* 3 Value Highlights */}
              <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", paddingTop: "16px", borderTop: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#e0f2fe", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a" }}>High Precision</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Up to 50 Microns</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#e0f2fe", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Layers size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a" }}>Multiple Materials</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>PLA, PETG, ABS, Resin</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#e0f2fe", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Truck size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a" }}>Pan India Delivery</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>Fast & Safe Packaging</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: 3D Printer Visual Composite */}
            <div className="col-lg-6">
              <div style={{
                position: "relative",
                background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,249,255,0.9) 100%)",
                borderRadius: "28px",
                padding: "20px",
                boxShadow: "0 20px 40px -10px rgba(0, 132, 255, 0.12)",
                border: "1px solid rgba(226, 232, 240, 0.8)",
              }}>
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80"
                  alt="3D Unity High Precision 3D Printing Studio"
                  style={{
                    width: "100%",
                    height: "380px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />

                {/* Floating Studio Badge */}
                <div style={{
                  position: "absolute",
                  bottom: "35px",
                  left: "35px",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(8px)",
                  padding: "12px 18px",
                  borderRadius: "14px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--brand-gradient)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Printer size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#071328" }}>Surat 3D Printing Studio</div>
                    <div style={{ fontSize: "0.76rem", color: "#0084ff", fontWeight: 600 }}>Active Precision Printing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE OUR 3D COLLECTION */}
      <section style={{ padding: "60px 0" }}>
        <div className="unity-container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Explore Our 3D Collection</h2>
              <p className="section-subtitle">Discover a wide range of 3D printed products or create your own custom model.</p>
            </div>
            <Link to="/products" className="view-all-link">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="row g-3 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-7">
            {CATEGORIES.slice(1, 8).map((cat) => (
              <div key={cat.id} className="col">
                <Link
                  to={`/products?category=${cat.slug}`}
                  className={`category-pill-card ${activeCategory === cat.slug ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.slug)}
                >
                  <div className="category-icon-box">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <h4 className="category-name">{cat.name}</h4>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section style={{ padding: "40px 0 70px" }}>
        <div className="unity-container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Hand-crafted, precision-printed bestsellers curated for our clients.</p>
            </div>
            <Link to="/products" className="view-all-link">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
            {featuredProducts.map((p) => (
              <div key={p._id} className="col">
                <div className="product-card">
                  {p.badge && (
                    <span className={`badge-overlay ${p.badge === "Bestseller" ? "badge-bestseller" : p.badge === "Customised" ? "badge-customised" : "badge-popular"}`}>
                      {p.badge}
                    </span>
                  )}
                  <button className="product-wishlist-btn" title="Save to favorites">
                    <Heart size={16} />
                  </button>

                  <Link to={`/products/${p.slug}`} className="product-image-wrap">
                    <img src={p.images[0]} alt={p.name} loading="lazy" />
                  </Link>

                  <div className="product-info">
                    <Link to={`/products/${p.slug}`} className="product-title" title={p.name}>
                      {p.name}
                    </Link>
                    <div className="product-rating">
                      <Star size={14} />
                      <span style={{ fontWeight: 600, color: "#0f172a" }}>{p.rating}</span>
                      <span>({p.reviewsCount})</span>
                    </div>

                    <div className="product-bottom-row">
                      <div>
                        <span className="product-price">₹{p.price.toLocaleString("en-IN")}</span>
                        {p.originalPrice && (
                          <span style={{ fontSize: "0.8rem", color: "#94a3b8", textDecoration: "line-through", marginLeft: "6px" }}>
                            ₹{p.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                      <Link to={`/products/${p.slug}`} className="product-action-btn" title="View details">
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR SERVICES */}
      <section style={{ padding: "60px 0", background: "linear-gradient(180deg, #f8fafc 0%, #f0f7ff 100%)" }}>
        <div className="unity-container">
          <div className="section-header">
            <div>
              <div style={{ display: "inline-block", color: "#0084ff", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em", marginBottom: "6px" }}>
                OUR SERVICES
              </div>
              <h2 className="section-title">End-to-End 3D Solutions</h2>
              <p className="section-subtitle">From design concept to production-grade high-quality 3D printing.</p>
            </div>
            <Link to="/services" className="btn-primary-gradient" style={{ padding: "10px 22px" }}>
              View All Services <ArrowRight size={16} />
            </Link>
          </div>

          <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-4">
            <div className="col">
              <div className="service-card">
                <div className="service-icon-box" style={{ background: "#e0f2fe", color: "#0284c7" }}>
                  <Box size={28} />
                </div>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#071328", marginBottom: "10px" }}>
                  3D Modeling & Design
                </h4>
                <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                  Convert your ideas, 2D sketches, or reference photos into print-ready detailed 3D CAD models.
                </p>
              </div>
            </div>

            <div className="col">
              <div className="service-card">
                <div className="service-icon-box" style={{ background: "#dcfce7", color: "#16a34a" }}>
                  <Printer size={28} />
                </div>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#071328", marginBottom: "10px" }}>
                  3D Printing (FDM / Resin)
                </h4>
                <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                  High-speed, durable FDM parts and razor-sharp 8K SLA resin printing with smooth surface finishes.
                </p>
              </div>
            </div>

            <div className="col">
              <div className="service-card">
                <div className="service-icon-box" style={{ background: "#ffedd5", color: "#ea580c" }}>
                  <Sliders size={28} />
                </div>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#071328", marginBottom: "10px" }}>
                  Customization & Prototyping
                </h4>
                <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                  Rapid prototyping for startups and bespoke personalized products with custom sizing and colors.
                </p>
              </div>
            </div>

            <div className="col">
              <div className="service-card">
                <div className="service-icon-box" style={{ background: "#f3e8ff", color: "#9333ea" }}>
                  <Layers size={28} />
                </div>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#071328", marginBottom: "10px" }}>
                  Design to Production
                </h4>
                <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                  Batch manufacturing, structural stress testing, and complete finishing for market-ready products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section style={{ padding: "70px 0" }}>
        <div className="unity-container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
            <span className="hero-badge">TRANSPARENT PROCESS</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">From your idea to a real 3D product – simple, reliable and transparent.</p>
          </div>

          <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-4">
            <div className="col">
              <div className="step-card">
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <Lightbulb size={24} />
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0084ff", letterSpacing: "0.06em", marginBottom: "4px" }}>STEP 01</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>Share Your Idea</h4>
                <p style={{ color: "#64748b", fontSize: "0.88rem", lineHeight: 1.5, margin: 0 }}>
                  Send your sketch, 3D STL file, or simple requirement via WhatsApp or our quote form.
                </p>
              </div>
            </div>

            <div className="col">
              <div className="step-card">
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#e0f2fe", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <Box size={24} />
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0084ff", letterSpacing: "0.06em", marginBottom: "4px" }}>STEP 02</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>We Create the Model</h4>
                <p style={{ color: "#64748b", fontSize: "0.88rem", lineHeight: 1.5, margin: 0 }}>
                  Our team analyzes slice layers, optimizes geometry, and approves with you before printing.
                </p>
              </div>
            </div>

            <div className="col">
              <div className="step-card">
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <Printer size={24} />
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0084ff", letterSpacing: "0.06em", marginBottom: "4px" }}>STEP 03</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>3D Printing</h4>
                <p style={{ color: "#64748b", fontSize: "0.88rem", lineHeight: 1.5, margin: 0 }}>
                  We print your model on industrial-grade 3D printers using your selected material & color.
                </p>
              </div>
            </div>

            <div className="col">
              <div className="step-card">
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#ede9fe", color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <Truck size={24} />
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0084ff", letterSpacing: "0.06em", marginBottom: "4px" }}>STEP 04</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>Delivery to You</h4>
                <p style={{ color: "#64748b", fontSize: "0.88rem", lineHeight: 1.5, margin: 0 }}>
                  Post-processed, quality inspected, safely cushioned, and shipped right to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROMOTIONAL CTA BANNER */}
      <section style={{ padding: "20px 0 60px" }}>
        <div className="unity-container">
          <div className="custom-cta-banner">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <span style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", padding: "4px 12px", borderRadius: "9999px", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "12px" }}>
                  CUSTOM ENGINEERING & CRAFTSMANSHIP
                </span>
                <h3 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "12px" }}>
                  Need a Custom 3D Model?
                </h3>
                <p style={{ color: "#e0f2fe", fontSize: "1rem", lineHeight: 1.6, maxWidth: "560px", marginBottom: "20px" }}>
                  Tell us your idea, sketch or upload your 3D file. We will turn it into high-precision tangible reality.
                </p>
                <button
                  onClick={openQuote}
                  className="btn-secondary-outline"
                  style={{ background: "#ffffff", color: "#0284c7", fontWeight: 700, padding: "12px 28px", border: "none" }}
                >
                  Get a Quote Now <ArrowRight size={16} />
                </button>
              </div>
              <div className="col-lg-4 d-none d-lg-block text-end">
                <div style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.02) 70%)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Box size={90} color="#ffffff" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FROM OUR GALLERY */}
      <section style={{ padding: "40px 0 60px" }}>
        <div className="unity-container">
          <div className="section-header">
            <div>
              <h2 className="section-title">From Our Gallery</h2>
              <p className="section-subtitle">A glimpse of our latest 3D printed creations and client deliveries.</p>
            </div>
            <Link to="/gallery" className="view-all-link">
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </div>

          <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-6">
            {galleryPreview.map((item) => (
              <div key={item.id} className="col">
                <div style={{
                  height: "160px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "var(--card-shadow)",
                  position: "relative",
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                  />
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "8px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                    color: "#ffffff",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}>
                    {item.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHAT OUR CLIENTS SAY */}
      <section style={{ padding: "40px 0 70px" }}>
        <div className="unity-container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
            <span className="hero-badge">CLIENT EXPERIENCES</span>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">Real feedback from architects, designers, makers, and enthusiasts across India.</p>
          </div>

          <div className="row g-4 row-cols-1 row-cols-md-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="col">
                <div className="testimonial-card">
                  <div style={{ color: "#0084ff", marginBottom: "16px" }}>
                    <QuoteIcon size={32} />
                  </div>
                  <p style={{ color: "#334155", fontSize: "0.95rem", lineHeight: 1.6, fontStyle: "italic", marginBottom: "20px" }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#071328" }}>{t.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
