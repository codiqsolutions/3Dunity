import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Send,
  Check,
} from "../components/icons";
import { inquiriesAPI } from "../services/api";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Custom 3D Printing",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await inquiriesAPI.create({
        name: formData.name,
        phone: formData.phone || "Not provided",
        email: formData.email,
        inquiryType: "general",
        message: `Subject: ${formData.subject}\n\n${formData.message}`,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit inquiry. Please try again or reach out directly on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById("contact-form-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ paddingBottom: "70px" }}>
      {/* Contact Hero Header */}
      <section className="hero-section" style={{ padding: "40px 0 50px" }}>
        <div className="unity-container">
          <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "12px" }}>
            <span>Home</span> &gt; <span style={{ color: "#0f172a", fontWeight: 600 }}>Contact Us</span>
          </div>

          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <h1 className="hero-title" style={{ marginBottom: "16px" }}>
                Contact <span className="text-gradient">Us</span>
              </h1>
              <p className="hero-subtitle">
                Have a question, project idea, or custom requirement? We're here to help you bring it to life with 3D printing.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button onClick={scrollToForm} className="btn-primary-gradient" style={{ padding: "12px 28px" }}>
                  <Send size={16} /> Send Us a Message
                </button>
                <a href="tel:+918866961005" className="btn-secondary-outline" style={{ padding: "12px 28px" }}>
                  <Phone size={16} color="#0084ff" /> Call Now
                </a>
              </div>
            </div>

            <div className="col-lg-5">
              <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "var(--card-shadow)" }}>
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                  alt="3D Unity Workshop"
                  style={{ width: "100%", height: "280px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form & Contact Information Grid */}
      <section id="contact-form-section" style={{ padding: "50px 0" }}>
        <div className="unity-container">
          <div className="row g-5">
            {/* Left: Get In Touch Cards & Map */}
            <div className="col-lg-5">
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#071328", marginBottom: "8px" }}>
                Get in Touch
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: "28px" }}>
                Reach out to us for inquiries, custom orders, or any technical support.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "30px" }}>
                <a
                  href="tel:+918866961005"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 20px",
                    background: "#ffffff",
                    borderRadius: "18px",
                    border: "1px solid #edf2f7",
                    boxShadow: "var(--card-shadow)",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#e0f2fe", color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Call Us</div>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: "#071328" }}>+91 88669 61005</div>
                    </div>
                  </div>
                  <ArrowRight size={18} color="#0084ff" />
                </a>

                <a
                  href="mailto:3duniti1@gmail.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 20px",
                    background: "#ffffff",
                    borderRadius: "18px",
                    border: "1px solid #edf2f7",
                    boxShadow: "var(--card-shadow)",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Email Us</div>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: "#071328" }}>3duniti1@gmail.com</div>
                    </div>
                  </div>
                  <ArrowRight size={18} color="#0084ff" />
                </a>

                <a
                  href="https://maps.google.com/?q=215+apple+square,+yogi+chowk,+surat,+gujrat,+395010"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 20px",
                    background: "#ffffff",
                    borderRadius: "18px",
                    border: "1px solid #edf2f7",
                    boxShadow: "var(--card-shadow)",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.82rem", color: "#64748b" }}>Our Office</div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#071328" }}>
                        215 Apple Square, Yogi Chowk, Surat
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} color="#0084ff" />
                </a>
              </div>

              <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid #edf2f7", boxShadow: "var(--card-shadow)" }}>
                <iframe
                  title="3D Unity Location Map"
                  src="https://maps.google.com/maps?q=Yogi+Chowk,+Surat,+Gujarat&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="col-lg-7">
              <div style={{
                background: "#ffffff",
                borderRadius: "24px",
                border: "1px solid #edf2f7",
                padding: "36px",
                boxShadow: "var(--card-shadow)",
              }}>
                <h3 style={{ fontSize: "1.7rem", fontWeight: 800, color: "#071328", marginBottom: "6px" }}>
                  Send Us a <span className="text-gradient">Message</span>
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.92rem", marginBottom: "26px" }}>
                  Fill out the form below and our team will get back to you shortly with a personalized quote or answer.
                </p>

                {error && (
                  <div style={{ background: "#fee2e2", color: "#dc2626", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px" }}>
                    {error}
                  </div>
                )}

                {submitted ? (
                  <div style={{ textAlign: "center", padding: "40px 20px" }}>
                    <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <Check size={32} />
                    </div>
                    <h4 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#071328", marginBottom: "8px" }}>Message Sent Successfully!</h4>
                    <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: "20px" }}>
                      Thank you for contacting 3D Unity. We have received your inquiry and will reach out to you within a few hours.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn-secondary-outline">Send Another Inquiry</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3" style={{ marginBottom: "16px" }}>
                      <div className="col-md-6">
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "12px",
                            border: "1.5px solid #cbd5e1",
                            fontSize: "0.92rem",
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "12px",
                            border: "1.5px solid #cbd5e1",
                            fontSize: "0.92rem",
                          }}
                        />
                      </div>
                    </div>

                    <div className="row g-3" style={{ marginBottom: "16px" }}>
                      <div className="col-md-6">
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "12px",
                            border: "1.5px solid #cbd5e1",
                            fontSize: "0.92rem",
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Subject *</label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            borderRadius: "12px",
                            border: "1.5px solid #cbd5e1",
                            fontSize: "0.92rem",
                            background: "#ffffff",
                          }}
                        >
                          <option value="Custom 3D Printing">Custom 3D Printing</option>
                          <option value="Bulk Order">Bulk Production Order</option>
                          <option value="3D CAD Design">3D CAD Modeling & Design</option>
                          <option value="Architectural Model">Architectural Scale Model</option>
                          <option value="General Support">General Support / Partnership</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Your Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Tell us about your requirement, idea or any query..."
                        value={formData.message}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          border: "1.5px solid #cbd5e1",
                          fontSize: "0.92rem",
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary-gradient"
                      style={{ padding: "14px 32px", fontSize: "1rem" }}
                    >
                      <Send size={18} /> {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
