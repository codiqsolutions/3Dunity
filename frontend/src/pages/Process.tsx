import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Lightbulb,
  Box,
  Printer,
  Truck,
  ArrowRight,
  ChevronDown,
} from "../components/icons";

export const Process: React.FC = () => {
  const { openQuote } = (useOutletContext<{ openQuote?: () => void }>() || {});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    {
      num: "01",
      title: "Share Your Idea or 3D File",
      desc: "Whether you have a finalized CAD file (STL, OBJ, STEP, 3MF) or just a sketch with dimensions, share it with us via WhatsApp (+91 88669 61005) or our online quote form.",
      icon: <Lightbulb size={28} />,
      color: "#d97706",
      bg: "#fef3c7",
    },
    {
      num: "02",
      title: "DFM Review & Slicing Optimization",
      desc: "Our additive manufacturing engineers review your geometry for printability, orient layers for maximum tensile strength, and select the best infill density to balance weight and rigidity.",
      icon: <Box size={28} />,
      color: "#0284c7",
      bg: "#e0f2fe",
    },
    {
      num: "03",
      title: "Industrial 3D Printing",
      desc: "We bring your design to life on calibrated industrial-grade 3D printers in our Surat studio. We monitor ambient temperatures, bed adhesion, and dimensional tolerances throughout the cycle.",
      icon: <Printer size={28} />,
      color: "#16a34a",
      bg: "#dcfce7",
    },
    {
      num: "04",
      title: "Finishing, Quality Check & Delivery",
      desc: "Supports are cleanly removed, surfaces undergo gentle bead blasting or smoothing, and the part is verified against digital calipers before being safely boxed for courier delivery.",
      icon: <Truck size={28} />,
      color: "#7c3aed",
      bg: "#ede9fe",
    },
  ];

  const faqs = [
    {
      q: "What file formats do you accept for 3D printing?",
      a: "We accept .STL, .OBJ, .STEP, .STP, .3MF, and .IGES. If you don't have a 3D file, our CAD team can create one from your physical sample, 2D sketches or technical drawings.",
    },
    {
      q: "How long does custom 3D printing usually take?",
      a: "Most single-part orders and small batches are printed and dispatched within 2 to 4 business days. Express turnaround (24-48 hours) is also available for urgent prototypes.",
    },
    {
      q: "What is the maximum build volume you can print?",
      a: "We can print continuous single parts up to 400 x 400 x 450 mm on our large-format FDM printers. For larger architectural or display models, we segment the design into interlocking keyed components with seamless joints.",
    },
    {
      q: "Which material should I choose for outdoor or heat-exposed parts?",
      a: "For heat and UV exposure, we recommend PETG or ASA. For decorative interior items, PLA+ provides the cleanest aesthetic finish with vibrant color reproduction.",
    },
    {
      q: "Can I inspect physical samples at your workshop?",
      a: "Yes! You are welcome to visit our Surat studio at 215 Apple Square, Yogi Chowk, Surat, Gujarat to examine material swatches, mechanical tolerances, and sample prints.",
    },
  ];

  return (
    <div style={{ paddingBottom: "70px" }}>
      {/* Header */}
      <section className="hero-section" style={{ padding: "50px 0 60px" }}>
        <div className="unity-container">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto" }}>
            <span className="hero-badge">TRANSPARENT 4-STEP WORKFLOW</span>
            <h1 className="hero-title">
              How <span className="text-gradient">3D Printing</span> Works
            </h1>
            <p className="hero-subtitle" style={{ margin: "0 auto 30px" }}>
              Our seamless, precision-guided workflow ensures your custom models and batch orders are delivered with zero surprises and unmatched structural fidelity.
            </p>
            <button onClick={openQuote} className="btn-primary-gradient" style={{ padding: "12px 28px" }}>
              Start Your Project Today <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 4 Steps Detail */}
      <section style={{ padding: "60px 0" }}>
        <div className="unity-container">
          <div className="row g-4">
            {steps.map((st, i) => (
              <div key={i} className="col-lg-6">
                <div style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  border: "1px solid #edf2f7",
                  padding: "32px",
                  boxShadow: "var(--card-shadow)",
                  height: "100%",
                  display: "flex",
                  gap: "20px",
                }}>
                  <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    background: st.bg,
                    color: st.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {st.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0084ff", letterSpacing: "0.06em", marginBottom: "4px" }}>
                      STEP {st.num}
                    </div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#071328", marginBottom: "10px" }}>
                      {st.title}
                    </h3>
                    <p style={{ color: "#64748b", fontSize: "0.92rem", lineHeight: 1.6, margin: 0 }}>
                      {st.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material Comparison Guide */}
      <section style={{ padding: "60px 0", background: "#ffffff" }}>
        <div className="unity-container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
            <h2 className="section-title">Material Guide</h2>
            <p className="section-subtitle">Choose the right material for your product's environment and stress profile.</p>
          </div>

          <div style={{ overflowX: "auto", background: "#f8fafc", borderRadius: "20px", border: "1px solid #edf2f7", padding: "20px" }}>
            <table style={{ width: "100%", minWidth: "640px", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                  <th style={{ padding: "14px", color: "#071328" }}>Material</th>
                  <th style={{ padding: "14px", color: "#071328" }}>Strengths</th>
                  <th style={{ padding: "14px", color: "#071328" }}>Heat Resistance</th>
                  <th style={{ padding: "14px", color: "#071328" }}>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "14px", fontWeight: 700, color: "#0084ff" }}>PLA / PLA+</td>
                  <td style={{ padding: "14px", color: "#475569" }}>Easy printing, sharp details, rich colors, biodegradable</td>
                  <td style={{ padding: "14px", color: "#475569" }}>Up to 55°C</td>
                  <td style={{ padding: "14px", color: "#071328" }}>Home decor, architectural scale models, figurines</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "14px", fontWeight: 700, color: "#0084ff" }}>PETG</td>
                  <td style={{ padding: "14px", color: "#475569" }}>Durable, impact resistant, weather/waterproof</td>
                  <td style={{ padding: "14px", color: "#475569" }}>Up to 75°C</td>
                  <td style={{ padding: "14px", color: "#071328" }}>Mechanical brackets, outdoor signs, waterproof vases</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "14px", fontWeight: 700, color: "#0084ff" }}>ABS / ASA</td>
                  <td style={{ padding: "14px", color: "#475569" }}>High tensile strength, easily acetone vapor smoothed</td>
                  <td style={{ padding: "14px", color: "#475569" }}>Up to 95°C</td>
                  <td style={{ padding: "14px", color: "#071328" }}>Automotive fixtures, industrial enclosures, tooling</td>
                </tr>
                <tr>
                  <td style={{ padding: "14px", fontWeight: 700, color: "#0084ff" }}>SLA Photopolymer Resin</td>
                  <td style={{ padding: "14px", color: "#475569" }}>Microscopic layer precision (0.05 mm), injection-mold quality</td>
                  <td style={{ padding: "14px", color: "#475569" }}>Up to 60°C</td>
                  <td style={{ padding: "14px", color: "#071328" }}>Miniatures, jewelry masters, high-detail sculptures</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section style={{ padding: "60px 0" }}>
        <div className="unity-container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 40px" }}>
            <span className="hero-badge">FREQUENT QUESTIONS</span>
            <h2 className="section-title">Everything You Need to Know</h2>
          </div>

          <div style={{ maxWidth: "780px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #edf2f7",
                  overflow: "hidden",
                  boxShadow: "var(--card-shadow)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: "18px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    color: "#071328",
                    fontWeight: 700,
                    fontSize: "1rem",
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    color="#0084ff"
                    style={{
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s",
                      flexShrink: 0,
                      marginLeft: "12px",
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 24px 20px", color: "#64748b", fontSize: "0.92rem", lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Process;
