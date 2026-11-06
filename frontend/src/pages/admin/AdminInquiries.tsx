import React, { useState, useEffect } from "react";
import { WhatsAppIcon, Search } from "../../components/icons";
import { inquiriesAPI } from "../../services/api";

interface InquiryRecord {
  _id: string;
  name: string;
  phone: string;
  email: string;
  inquiryType: string;
  productName?: string;
  preferredSize?: string;
  preferredColour?: string;
  quantity?: number;
  message: string;
  status: "new" | "contacted" | "in-progress" | "completed" | "closed" | string;
  createdAt: string;
}

export const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await inquiriesAPI.getAll();
      setInquiries(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load inquiries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await inquiriesAPI.updateStatus(id, newStatus);
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
      );
    } catch (err) {
      alert("Failed to update status on server");
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = filterStatus === "All" || inq.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inq.phone.includes(searchTerm) ||
                          (inq.message || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#071328", marginBottom: "4px" }}>
          Customer Inquiries & Quotes
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
          Manage quote requests, direct inquiries, and WhatsApp follow-ups.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div style={{
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #edf2f7",
        padding: "16px 20px",
        marginBottom: "24px",
        display: "flex",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
      }}>
        <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
          <input
            type="text"
            placeholder="Search inquiries by name, phone or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px 10px 36px",
              borderRadius: "10px",
              border: "1.5px solid #cbd5e1",
              fontSize: "0.88rem",
              outline: "none",
            }}
          />
          <Search size={16} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "12px" }} />
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["All", "New", "Contacted", "In-Progress", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                padding: "8px 16px",
                borderRadius: "9999px",
                border: "none",
                background: filterStatus === status ? "#0084ff" : "#f1f5f9",
                color: filterStatus === status ? "#ffffff" : "#475569",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiry Cards Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
          Loading customer inquiries from database...
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
          No inquiries matching criteria found.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredInquiries.map((inq) => (
            <div
              key={inq._id}
              style={{
                background: "#ffffff",
                borderRadius: "20px",
                border: "1px solid #edf2f7",
                padding: "24px",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#071328", margin: 0 }}>{inq.name}</h3>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0084ff", background: "#e0f2fe", padding: "2px 8px", borderRadius: "6px" }}>
                      {inq.inquiryType}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "16px", marginTop: "4px", fontSize: "0.85rem", color: "#64748b" }}>
                    <span>Phone: <strong style={{ color: "#0f172a" }}>{inq.phone}</strong></span>
                    {inq.email && <span>Email: {inq.email}</span>}
                    <span>Received: {new Date(inq.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Status and Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq._id, e.target.value)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      background: inq.status === "new" ? "#fee2e2" : inq.status === "in-progress" ? "#fef3c7" : inq.status === "completed" ? "#dcfce7" : "#e0f2fe",
                      color: inq.status === "new" ? "#dc2626" : inq.status === "in-progress" ? "#d97706" : inq.status === "completed" ? "#16a34a" : "#0284c7",
                      cursor: "pointer",
                      textTransform: "capitalize",
                    }}
                  >
                    <option value="new">Status: New</option>
                    <option value="contacted">Status: Contacted</option>
                    <option value="in-progress">Status: In Progress</option>
                    <option value="completed">Status: Completed</option>
                    <option value="closed">Status: Closed</option>
                  </select>

                  <a
                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hello ${inq.name}! Thank you for contacting 3D Unity regarding your ${inq.productName || "custom 3D requirement"}. How can we assist you with slicing, material options, and pricing today?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "#25d366",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      textDecoration: "none",
                    }}
                  >
                    <WhatsAppIcon size={16} /> Open WhatsApp
                  </a>
                </div>
              </div>

              {/* Inquiry Details Box */}
              <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "14px 18px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", gap: "24px", marginBottom: "8px", fontSize: "0.85rem", color: "#334155" }}>
                  {inq.productName && <span><strong>Product / Reference:</strong> {inq.productName}</span>}
                  {inq.preferredColour && <span><strong>Preferred Material/Color:</strong> {inq.preferredColour}</span>}
                  {inq.quantity && <span><strong>Quantity:</strong> {inq.quantity} pcs</span>}
                </div>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#475569", lineHeight: 1.6 }}>
                  "{inq.message}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
