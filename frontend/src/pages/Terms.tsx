import React from "react";
import { Link } from "react-router-dom";
import { Shield } from "../components/icons";

export const Terms: React.FC = () => {
  return (
    <div style={{ paddingBottom: "70px", paddingTop: "30px" }}>
      <div className="unity-container">
        <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "16px" }}>
          <Link to="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link> &gt;{" "}
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Terms & Conditions</span>
        </div>

        <div style={{
          background: "#ffffff",
          borderRadius: "24px",
          border: "1px solid #edf2f7",
          padding: "48px 40px",
          boxShadow: "var(--card-shadow)",
          maxWidth: "920px",
          margin: "0 auto",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={22} />
            </div>
            <div>
              <span className="hero-badge" style={{ margin: 0 }}>SERVICE AGREEMENT</span>
              <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#071328", margin: "4px 0 0" }}>
                Terms & Conditions
              </h1>
            </div>
          </div>

          <p style={{ color: "#64748b", fontSize: "0.9rem", borderBottom: "1px solid #edf2f7", paddingBottom: "20px", marginBottom: "30px" }}>
            Effective Date: January 1, 2025 | 3D Unity (Surat, Gujarat)
          </p>

          <div style={{ color: "#334155", fontSize: "0.95rem", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "24px" }}>
            <section>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>
                1. Nature of Business & Informational Catalogue
              </h3>
              <p>
                3D Unity operates an informational catalogue and custom 3D printing design studio. We do not provide automated e-commerce checkout without prior model verification. All orders, customized dimensions, and bulk production quotes are confirmed directly with clients through authorized inquiry forms or WhatsApp verification.
              </p>
            </section>

            <section>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>
                2. Dimensional Tolerances & 3D Printing Characteristics
              </h3>
              <p>
                Additive manufacturing involves layer-by-layer polymer extrusion or resin curing. Microscopic layer lines (typically 0.1mm - 0.2mm) are inherent to the FDM process and are not deemed manufacturing defects. Standard manufacturing tolerance is ±0.3mm or ±0.5% (whichever is greater), unless high-precision SLA resin is explicitly ordered.
              </p>
            </section>

            <section>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>
                3. Order Confirmation & Payment Policies
              </h3>
              <p>
                Because custom 3D prints are tailored to client specifications, work begins upon mutual approval of the digital slice preview and agreed payment terms. We accept UPI, Bank Transfer (NEFT/IMPS), and verified payment links.
              </p>
            </section>

            <section>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>
                4. Shipping, Transit & Replacement Guarantee
              </h3>
              <p>
                All prints are carefully bubble-wrapped and dispatched via reliable courier networks. In the rare event an item suffers transit damage, notify us within 48 hours of delivery with unboxing photos, and 3D Unity will reprint and replace the damaged part free of charge.
              </p>
            </section>

            <section>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>
                5. Jurisdiction
              </h3>
              <p>
                Any dispute arising from our services shall be subject to the exclusive jurisdiction of the courts of Surat, Gujarat, India.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
