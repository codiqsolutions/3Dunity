import React from "react";
import { Link } from "react-router-dom";
import { Shield } from "../components/icons";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div style={{ paddingBottom: "70px", paddingTop: "30px" }}>
      <div className="unity-container">
        <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "16px" }}>
          <Link to="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link> &gt;{" "}
          <span style={{ color: "#0f172a", fontWeight: 600 }}>Privacy Policy</span>
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
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#e0f2fe", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={22} />
            </div>
            <div>
              <span className="hero-badge" style={{ margin: 0 }}>DATA PROTECTION & PRIVACY</span>
              <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#071328", margin: "4px 0 0" }}>
                Privacy Policy
              </h1>
            </div>
          </div>

          <p style={{ color: "#64748b", fontSize: "0.9rem", borderBottom: "1px solid #edf2f7", paddingBottom: "20px", marginBottom: "30px" }}>
            Effective Date: January 1, 2025 | Last Updated: November 2026
          </p>

          <div style={{ color: "#334155", fontSize: "0.95rem", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "24px" }}>
            <section>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>
                1. Information We Collect
              </h3>
              <p>
                When you browse our website, submit custom inquiry forms, or connect with us via WhatsApp, 3D Unity collects personal information necessary to deliver our services, including:
              </p>
              <ul style={{ paddingLeft: "20px" }}>
                <li>Your name and contact phone number / WhatsApp handle.</li>
                <li>Email address for quotes, digital invoice delivery, and proof approvals.</li>
                <li>Delivery shipping address for courier fulfillment across India.</li>
                <li>Digital CAD models (STL, OBJ, STEP, 3MF) and design reference files you upload.</li>
              </ul>
            </section>

            <section>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>
                2. Intellectual Property & Confidentiality of 3D Files
              </h3>
              <p>
                We recognize that your 3D models, prototypes, and creative concepts are confidential intellectual property. 3D Unity guarantees:
              </p>
              <ul style={{ paddingLeft: "20px" }}>
                <li>Your proprietary 3D CAD files are used solely to slice, estimate, and print your order.</li>
                <li>We never resell, redistribute, or share your proprietary designs with any third parties.</li>
                <li>Non-Disclosure Agreements (NDAs) can be executed upon request for commercial prototypes.</li>
              </ul>
            </section>

            <section>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>
                3. How We Use Your Information
              </h3>
              <p>
                We use collected information exclusively to prepare project estimates, communicate slicing specifications, coordinate logistics with courier partners, and provide post-purchase customer care. We do not sell your personal data to marketing brokers.
              </p>
            </section>

            <section>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>
                4. Contact Details for Privacy Queries
              </h3>
              <p>
                If you have questions regarding our privacy practices or wish to request file deletion from our servers, please contact us:
              </p>
              <div style={{ background: "#f8fafc", padding: "16px 20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <div><strong>Business Name:</strong> 3D Unity</div>
                <div><strong>Email:</strong> 3duniti1@gmail.com</div>
                <div><strong>Mobile:</strong> +91 88669 61005</div>
                <div><strong>Address:</strong> 215 Apple Square, Yogi Chowk, Surat, Gujarat - 395010</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
