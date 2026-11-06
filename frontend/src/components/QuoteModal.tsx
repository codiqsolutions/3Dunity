import React, { useState } from "react";
import { X, Check, Send, WhatsAppIcon } from "./icons";
import { inquiriesAPI } from "../services/api";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, defaultProduct = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryType: "custom-print",
    product: defaultProduct,
    material: "PLA",
    quantity: 1,
    message: defaultProduct ? `Hi, I am interested in custom order for ${defaultProduct}.` : "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

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
        phone: formData.phone,
        email: formData.email,
        inquiryType: formData.inquiryType,
        productName: formData.product,
        preferredColour: formData.material,
        quantity: Number(formData.quantity) || 1,
        message: formData.message,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit quote request. You can also chat directly on WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const phone = import.meta.env.VITE_WHATSAPP_NUMBER || "918866961005";
    const text = encodeURIComponent(
      `Hello 3D Unity! I want a quote for:\n• Name: ${formData.name || "Customer"}\n• Type: ${formData.inquiryType}\n• Material: ${formData.material}\n• Qty: ${formData.quantity}\n• Details: ${formData.message || "Custom 3D requirement"}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      backdropFilter: "blur(4px)",
      zIndex: 2000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        background: "#ffffff",
        borderRadius: "24px",
        maxWidth: "560px",
        width: "100%",
        padding: "32px",
        position: "relative",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        maxHeight: "90vh",
        overflowY: "auto",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "#f1f5f9",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#64748b",
          }}
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "30px 10px" }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#dcfce7",
              color: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <Check size={32} />
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>Quote Request Received!</h3>
            <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "24px" }}>
              Thank you for sharing your requirements. Our 3D printing engineering team will review your specifications and get in touch within 2-4 hours.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button onClick={handleWhatsAppDirect} className="btn-primary-gradient" style={{ background: "#25d366" }}>
                <WhatsAppIcon size={18} /> Chat Directly on WhatsApp
              </button>
              <button onClick={onClose} className="btn-secondary-outline">Close</button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <span className="hero-badge">FAST ESTIMATE & SLICING</span>
              <h2 style={{ fontSize: "1.65rem", fontWeight: 700, color: "#071328", margin: "4px 0 8px" }}>Get a Custom 3D Quote</h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
                Upload or describe your model requirements. We will analyze volume, material and deliver a transparent estimate.
              </p>
            </div>

            {error && (
              <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "16px" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 88669 61005"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Inquiry Category</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "0.9rem",
                      background: "#ffffff",
                    }}
                  >
                    <option value="custom">Custom 3D Printing</option>
                    <option value="product">Product Inquire / Bulk</option>
                    <option value="service">CAD Modeling & Design</option>
                    <option value="general">General Support</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Preferred Material</label>
                  <select
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "0.9rem",
                      background: "#ffffff",
                    }}
                  >
                    <option value="PLA">PLA (Standard & Decor)</option>
                    <option value="PETG">PETG (Durable & Heat)</option>
                    <option value="ABS">ABS (Engineering Parts)</option>
                    <option value="Resin">Ultra-HD SLA Resin</option>
                    <option value="Other">Not Sure (Advise Me)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>Project Requirements / Dimensions / Notes</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us about the size, dimensions, intended use or link to 3D STL files..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "0.9rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary-gradient"
                  style={{ flex: 1, padding: "12px 20px" }}
                >
                  <Send size={18} /> {loading ? "Submitting..." : "Submit Quote Request"}
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  style={{
                    background: "#25d366",
                    color: "#ffffff",
                    fontWeight: 600,
                    borderRadius: "9999px",
                    padding: "12px 20px",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <WhatsAppIcon size={18} /> WhatsApp
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteModal;
