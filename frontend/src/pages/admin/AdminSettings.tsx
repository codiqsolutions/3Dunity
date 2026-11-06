import React, { useState, useEffect } from "react";
import { Check, ArrowRight } from "../../components/icons";
import { settingsAPI } from "../../services/api";

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    businessName: "3D Unity",
    email: "3duniti1@gmail.com",
    whatsappNumber: "918866961005",
    phone: "+91 88669 61005",
    address: "215 Apple Square, Yogi Chowk, Surat, Gujarat 395010",
    workingHours: "Mon - Sat: 10:00 AM - 7:00 PM | Sunday: Closed",
    instagramUrl: "",
    youtubeUrl: "",
    deliveryFee: "60",
    heroHeading: "Bring Your Ideas to Life in 3D",
    heroSubheading: "High-quality, customizable 3D models for personal, professional and business needs.",
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await settingsAPI.get();
        if (res.data?.data) {
          setSettings((prev) => ({ ...prev, ...res.data.data }));
        }
      } catch (err) {
        console.error("Failed to fetch settings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await settingsAPI.update(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
        Loading settings...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "780px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#071328", marginBottom: "4px" }}>
          Website & Business Settings
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
          Manage contact numbers, workshop location, and WhatsApp routing.
        </p>
      </div>

      {saved && (
        <div style={{ background: "#dcfce7", color: "#16a34a", padding: "14px 20px", borderRadius: "12px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px", fontWeight: 700 }}>
          <Check size={20} /> Settings saved and synced to database successfully!
        </div>
      )}

      {error && (
        <div style={{ background: "#fee2e2", color: "#dc2626", padding: "14px 20px", borderRadius: "12px", marginBottom: "24px", fontWeight: 600 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        background: "#ffffff",
        borderRadius: "20px",
        border: "1px solid #edf2f7",
        padding: "32px",
        boxShadow: "var(--card-shadow)",
      }}>
        {/* Business Name & Official Email */}
        <div className="row g-3" style={{ marginBottom: "20px" }}>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={settings.businessName}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              Primary Contact Email
            </label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
        </div>

        {/* WhatsApp & Calling Number */}
        <div className="row g-3" style={{ marginBottom: "20px" }}>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              WhatsApp Business Number (digits with country code)
            </label>
            <input
              type="text"
              name="whatsappNumber"
              value={settings.whatsappNumber}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              Display Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
        </div>

        {/* Workshop Address */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
            Studio & Workshop Address
          </label>
          <input
            type="text"
            name="address"
            value={settings.address}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
          />
        </div>

        {/* Working Hours */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
            Working Hours
          </label>
          <input
            type="text"
            name="workingHours"
            value={settings.workingHours}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
          />
        </div>

        {/* Social Links & Delivery */}
        <div className="row g-3" style={{ marginBottom: "24px" }}>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              Instagram Profile URL
            </label>
            <input
              type="url"
              name="instagramUrl"
              value={settings.instagramUrl}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
          <div className="col-md-6">
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
              Pan-India Flat Shipping Charge (INR ₹)
            </label>
            <input
              type="text"
              name="deliveryFee"
              value={settings.deliveryFee}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", fontSize: "0.9rem" }}
            />
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary-gradient" style={{ padding: "12px 28px" }}>
          {saving ? "Saving..." : "Save & Apply Settings"} <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
