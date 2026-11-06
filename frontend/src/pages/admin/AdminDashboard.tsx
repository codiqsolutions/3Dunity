import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Layers,
  Mail,
  Sliders,
  Plus,
  WhatsAppIcon,
} from "../../components/icons";
import { dashboardAPI } from "../../services/api";

interface RecentInquiry {
  _id: string;
  name: string;
  phone: string;
  inquiryType?: string;
  productName?: string;
  message?: string;
  status: string;
  createdAt: string;
}

export const AdminDashboard: React.FC = () => {
  const [statsData, setStatsData] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalInquiries: 0,
    newInquiries: 0,
    recentInquiries: [] as RecentInquiry[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await dashboardAPI.getStats();
        if (res.data?.success && res.data?.data) {
          setStatsData(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "Active Products", value: statsData.totalProducts.toString(), icon: <Box size={22} />, color: "#0284c7", bg: "#e0f2fe" },
    { label: "Product Categories", value: statsData.totalCategories.toString(), icon: <Layers size={22} />, color: "#16a34a", bg: "#dcfce7" },
    { label: "Inquiries Received", value: statsData.totalInquiries.toString(), icon: <Mail size={22} />, color: "#ea580c", bg: "#ffedd5" },
    { label: "New Alerts", value: statsData.newInquiries.toString(), icon: <Sliders size={22} />, color: "#7c3aed", bg: "#ede9fe" },
  ];

  return (
    <div>
      {/* Title & Quick Add */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#071328", marginBottom: "4px" }}>
            Dashboard Overview
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
            Live metrics and customer inquiry status from MongoDB database.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/admin/products/add" className="btn-primary-gradient" style={{ padding: "10px 20px" }}>
            <Plus size={16} /> Add Product
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="row g-4" style={{ marginBottom: "32px" }}>
        {stats.map((st, i) => (
          <div key={i} className="col-sm-6 col-xl-3">
            <div style={{
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #edf2f7",
              padding: "22px 24px",
              boxShadow: "var(--card-shadow)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600, marginBottom: "4px" }}>
                  {st.label}
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#071328" }}>
                  {loading ? "..." : st.value}
                </div>
              </div>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: st.bg,
                color: st.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {st.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Recent Inquiries */}
      <div className="row g-4">
        <div className="col-12">
          <div style={{
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #edf2f7",
            padding: "24px",
            boxShadow: "var(--card-shadow)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#071328", margin: 0 }}>
                Recent Customer Inquiries
              </h3>
              <Link to="/admin/inquiries" style={{ fontSize: "0.85rem", color: "#0084ff", fontWeight: 600, textDecoration: "none" }}>
                View All &rarr;
              </Link>
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                Loading live inquiries...
              </div>
            ) : statsData.recentInquiries.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                No inquiries recorded in database yet.
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1.5px solid #edf2f7", color: "#64748b", textAlign: "left" }}>
                      <th style={{ padding: "10px 12px" }}>Client</th>
                      <th style={{ padding: "10px 12px" }}>Requirement</th>
                      <th style={{ padding: "10px 12px" }}>Status</th>
                      <th style={{ padding: "10px 12px" }}>Date</th>
                      <th style={{ padding: "10px 12px" }}>Quick WhatsApp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statsData.recentInquiries.map((inq) => (
                      <tr key={inq._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "14px 12px" }}>
                          <div style={{ fontWeight: 700, color: "#0f172a" }}>{inq.name}</div>
                          <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{inq.phone}</div>
                        </td>
                        <td style={{ padding: "14px 12px" }}>
                          <div style={{ fontWeight: 600, color: "#334155" }}>{inq.productName || "Custom Inquiry"}</div>
                          <span style={{ fontSize: "0.75rem", color: "#0084ff" }}>{inq.inquiryType || "General"}</span>
                        </td>
                        <td style={{ padding: "14px 12px" }}>
                          <span style={{
                            padding: "4px 10px",
                            borderRadius: "9999px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            textTransform: "capitalize",
                            background: inq.status === "new" ? "#fee2e2" : inq.status === "in-progress" ? "#fef3c7" : inq.status === "completed" ? "#dcfce7" : "#e0f2fe",
                            color: inq.status === "new" ? "#dc2626" : inq.status === "in-progress" ? "#d97706" : inq.status === "completed" ? "#16a34a" : "#0284c7",
                          }}>
                            {inq.status}
                          </span>
                        </td>
                        <td style={{ padding: "14px 12px", color: "#64748b", fontSize: "0.82rem" }}>
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "14px 12px" }}>
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${inq.name}! Following up regarding your 3D Unity inquiry.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              background: "#dcfce7",
                              color: "#16a34a",
                              padding: "6px 12px",
                              borderRadius: "8px",
                              fontSize: "0.8rem",
                              fontWeight: 700,
                              textDecoration: "none",
                            }}
                          >
                            <WhatsAppIcon size={14} /> Reply
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
