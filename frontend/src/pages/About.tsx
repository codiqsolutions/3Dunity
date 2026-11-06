import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  Check,
  ArrowRight,
  MapPin,
} from "../components/icons";

export const About: React.FC = () => {
  const { openQuote } = (useOutletContext<{ openQuote?: () => void }>() || {});

  const stats = [
    { value: "1,500+", label: "3D Prints Delivered" },
    { value: "50µm", label: "Layer Precision Accuracy" },
    { value: "99.4%", label: "First-Time Print Success" },
    { value: "4.8 / 5", label: "Client Satisfaction Rating" },
  ];

  return (
    <div style={{ paddingBottom: "70px" }}>
      {/* Hero Header */}
      <section className="hero-section" style={{ padding: "50px 0 60px" }}>
        <div className="unity-container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="hero-badge">THE 3D UNITY STORY</span>
              <h1 className="hero-title">
                Turning Creative Ideas Into <span className="text-gradient">3D Reality</span>
              </h1>
              <p className="hero-subtitle">
                Based in Surat, Gujarat, 3D Unity was founded with a singular ambition: to bridge the gap between creative imagination and physical engineering using advanced additive manufacturing.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button onClick={openQuote} className="btn-primary-gradient" style={{ padding: "12px 28px" }}>
                  Start a Project <ArrowRight size={16} />
                </button>
                <Link to="/products" className="btn-secondary-outline" style={{ padding: "12px 28px" }}>
                  Browse Collection
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "var(--card-shadow)" }}>
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                  alt="3D Printing Workshop"
                  style={{ width: "100%", height: "340px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "40px 0 60px" }}>
        <div className="unity-container">
          <div style={{
            background: "#ffffff",
            borderRadius: "24px",
            border: "1px solid #edf2f7",
            padding: "36px 20px",
            boxShadow: "var(--card-shadow)",
          }}>
            <div className="row g-4 text-center">
              {stats.map((st, i) => (
                <div key={i} className="col-6 col-md-3">
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0084ff", marginBottom: "4px" }}>
                    {st.value}
                  </div>
                  <div style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: 600 }}>
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Craftsmanship */}
      <section style={{ padding: "40px 0 60px" }}>
        <div className="unity-container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "var(--card-shadow)" }}>
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
                  alt="Crafted 3D Art"
                  style={{ width: "100%", height: "380px", objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <span className="hero-badge">OUR PHILOSOPHY</span>
              <h2 className="section-title" style={{ marginBottom: "16px" }}>
                Precision Engineering Meets Artistry
              </h2>
              <p style={{ color: "#475569", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: "20px" }}>
                At 3D Unity, we believe 3D printing is not just a rapid prototyping utility — it is a modern art form. Every model sliced in our workshop undergoes rigorous computational analysis to ensure smooth exterior contours, reinforced internal webbing, and optimal layer bonding.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#1e293b" }}>
                  <div style={{ color: "#16a34a" }}><Check size={18} /></div>
                  <strong>Industrial Grade Hardware:</strong> Calibrated heated chambers and dual extrusion nozzles.
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#1e293b" }}>
                  <div style={{ color: "#16a34a" }}><Check size={18} /></div>
                  <strong>Eco-Conscious Bio-Materials:</strong> 100% recyclable, plant-derived biodegradable PLA and clean-cure resins.
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#1e293b" }}>
                  <div style={{ color: "#16a34a" }}><Check size={18} /></div>
                  <strong>Bespoke Attention to Detail:</strong> Every order is individually inspected and hand-finished by specialists.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Location Banner */}
      <section style={{ padding: "40px 0 60px" }}>
        <div className="unity-container">
          <div style={{
            background: "#ffffff",
            borderRadius: "24px",
            border: "1px solid #edf2f7",
            padding: "40px",
            boxShadow: "var(--card-shadow)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#0084ff", fontWeight: 700, fontSize: "0.85rem", marginBottom: "6px" }}>
                <MapPin size={16} /> SURAT FACILITY
              </div>
              <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#071328", marginBottom: "6px" }}>
                Visit Our Studio in Surat
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0, maxWidth: "520px" }}>
                215 Apple Square, Yogi Chowk, Surat, Gujarat - 395010. Explore physical material swatches, functional prototypes, and live printing demonstrations.
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <Link to="/contact" className="btn-primary-gradient" style={{ padding: "12px 24px" }}>
                Schedule a Visit <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
