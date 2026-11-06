import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  Printer,
  Box,
  Sliders,
  Layers,
  Sparkles,
  Shield,
  Check,
  ArrowRight,
  Lightbulb,
  Truck,
  Heart,
} from "../components/icons";

export const Services: React.FC = () => {
  const { openQuote } = (useOutletContext<{ openQuote?: () => void }>() || {});

  const servicesList = [
    {
      title: "3D Printing",
      desc: "High-quality, precise and durable 3D prints using advanced FDM and SLA technologies with multi-color capabilities.",
      icon: <Printer size={28} />,
      color: "#0284c7",
      bg: "#e0f2fe",
    },
    {
      title: "3D Modeling & Design",
      desc: "Convert your napkin sketches, CAD blueprints or photo references into parametric, print-optimized 3D models.",
      icon: <Box size={28} />,
      color: "#059669",
      bg: "#d1fae5",
    },
    {
      title: "Prototyping",
      desc: "Rapid, agile and cost-effective prototypes for ergonomic fit testing, mechanical stress checks and investor demos.",
      icon: <Sliders size={28} />,
      color: "#d97706",
      bg: "#fef3c7",
    },
    {
      title: "Customization",
      desc: "Personalized corporate gifts, bespoke home decor, custom trophy awards, and tailor-made parts per your specs.",
      icon: <Heart size={28} />,
      color: "#ea580c",
      bg: "#ffedd5",
    },
    {
      title: "Small Batch Production",
      desc: "Bridge the gap before injection molding. Low-volume on-demand manufacturing runs from 10 to 1,000+ units.",
      icon: <Layers size={28} />,
      color: "#7c3aed",
      bg: "#ede9fe",
    },
    {
      title: "Post Processing",
      desc: "Professional smoothing, vapor polishing, sanding, primer priming, custom spray coating and multi-part assembly.",
      icon: <Sparkles size={28} />,
      color: "#db2777",
      bg: "#fce7f3",
    },
  ];

  const industries = [
    { name: "Home Decor", icon: <Box size={24} /> },
    { name: "Personalized Gifts", icon: <Heart size={24} /> },
    { name: "Toys & Figures", icon: <Sparkles size={24} /> },
    { name: "Architecture & Models", icon: <Layers size={24} /> },
    { name: "Engineering Parts", icon: <Sliders size={24} /> },
    { name: "Education & Research", icon: <Shield size={24} /> },
    { name: "And More", icon: <ArrowRight size={24} /> },
  ];

  return (
    <div style={{ paddingBottom: "70px" }}>
      {/* Services Hero Header */}
      <section className="hero-section" style={{ padding: "50px 0 60px" }}>
        <div className="unity-container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="hero-badge">OUR COMPREHENSIVE EXPERTISE</span>
              <h1 className="hero-title">
                Complete 3D Printing <span className="text-gradient">Solutions</span>
              </h1>
              <p className="hero-subtitle">
                From concept to creation, we provide end-to-end 3D printing and digital manufacturing services tailored for individuals, architects, creators, and businesses.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button onClick={openQuote} className="btn-primary-gradient" style={{ padding: "12px 28px" }}>
                  Get a Quote <ArrowRight size={16} />
                </button>
                <Link to="/gallery" className="btn-secondary-outline" style={{ padding: "12px 28px" }}>
                  Explore Our Work
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "var(--card-shadow)" }}>
                <img
                  src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80"
                  alt="3D Printing Engineering"
                  style={{ width: "100%", height: "320px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Main Services Grid */}
      <section style={{ padding: "60px 0" }}>
        <div className="unity-container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">A complete range of 3D printing and prototyping services to turn your ideas into reality.</p>
          </div>

          <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
            {servicesList.map((s, idx) => (
              <div key={idx} className="col">
                <div className="service-card">
                  <div className="service-icon-box" style={{ background: s.bg, color: s.color }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#071328", marginBottom: "10px" }}>
                    {s.title}
                  </h3>
                  <p style={{ color: "#64748b", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "20px" }}>
                    {s.desc}
                  </p>
                  <button
                    onClick={openQuote}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#0084ff",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    Request this Service <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section style={{ padding: "20px 0 60px" }}>
        <div className="unity-container">
          <div className="custom-cta-banner">
            <h3 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "10px" }}>
              Need a Custom 3D Solution?
            </h3>
            <p style={{ color: "#e0f2fe", fontSize: "1rem", maxWidth: "560px", marginBottom: "20px" }}>
              Share your blueprint, 3D CAD file or concept sketch with us and receive an engineered quote.
            </p>
            <button onClick={openQuote} className="btn-secondary-outline" style={{ background: "#ffffff", color: "#0284c7", fontWeight: 700, border: "none" }}>
              Request a Custom Quote <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section style={{ padding: "40px 0 60px", background: "#ffffff" }}>
        <div className="unity-container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
            <h2 className="section-title">Industries We Serve</h2>
            <p className="section-subtitle">We create precision 3D solutions for a wide range of applications.</p>
          </div>

          <div className="row g-3 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-7">
            {industries.map((ind, i) => (
              <div key={i} className="col">
                <div style={{
                  background: "#f8fafc",
                  border: "1px solid #edf2f7",
                  borderRadius: "16px",
                  padding: "20px 10px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}>
                  <div style={{ color: "#0084ff" }}>{ind.icon}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e293b" }}>{ind.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose 3Dunity */}
      <section style={{ padding: "60px 0" }}>
        <div className="unity-container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="hero-badge">UNCOMPROMISING QUALITY</span>
              <h2 className="section-title" style={{ marginBottom: "24px" }}>
                Why Choose 3Dunity?
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#e0f2fe", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#071328", marginBottom: "4px" }}>High Precision & Clean Layers</h4>
                    <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                      Calibrated dual-drive extruders and 8K photopolymer resin vats ensure crisp geometries with minimal layer lines.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#071328", marginBottom: "4px" }}>Tested & Quality Certified Materials</h4>
                    <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                      We stock premium virgin filament (PLA+, PETG, ABS, ASA, TPU Flexible, Carbon-Fiber, and High-Toughness Resins).
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Sliders size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#071328", marginBottom: "4px" }}>Fully Customizable</h4>
                    <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                      Scale up, scale down, hollow, reinforce with specialized infill, or color-code multiple interlocking parts.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#ede9fe", color: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#071328", marginBottom: "4px" }}>On-Time Guaranteed Dispatch</h4>
                    <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                      Standard orders dispatched within 48 to 72 hours with end-to-end live courier tracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "var(--card-shadow)" }}>
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
                  alt="Architectural House 3D Model"
                  style={{ width: "100%", height: "420px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Idea to Reality Flow */}
      <section style={{ padding: "40px 0 60px", background: "#f8fafc" }}>
        <div className="unity-container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
            <h2 className="section-title">From Idea to Reality</h2>
            <p className="section-subtitle">A simple and transparent process to get your 3D product made.</p>
          </div>

          <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-4">
            <div className="col">
              <div className="step-card">
                <Lightbulb size={24} color="#0084ff" />
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#071328", margin: "12px 0 6px" }}>Share Your Idea</h4>
                <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>Tell us your requirements, sketch or reference.</p>
              </div>
            </div>
            <div className="col">
              <div className="step-card">
                <Box size={24} color="#0084ff" />
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#071328", margin: "12px 0 6px" }}>Design & Prepare</h4>
                <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>We create or optimize your 3D CAD model.</p>
              </div>
            </div>
            <div className="col">
              <div className="step-card">
                <Printer size={24} color="#0084ff" />
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#071328", margin: "12px 0 6px" }}>3D Printing</h4>
                <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>Your model is printed with high-quality material.</p>
              </div>
            </div>
            <div className="col">
              <div className="step-card">
                <Truck size={24} color="#0084ff" />
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#071328", margin: "12px 0 6px" }}>Finishing & Delivery</h4>
                <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>We finish, quality check and deliver it to you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
