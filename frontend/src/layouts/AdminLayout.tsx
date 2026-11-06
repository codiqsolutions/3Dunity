import React from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Layers,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Sliders,
} from "../components/icons";

export const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Overview", to: "/admin/dashboard", icon: <Sliders size={18} /> },
    { name: "Products", to: "/admin/products", icon: <Box size={18} /> },
    { name: "Categories", to: "/admin/categories", icon: <Layers size={18} /> },
    { name: "Inquiries", to: "/admin/inquiries", icon: <Mail size={18} /> },
    { name: "Website Settings", to: "/admin/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Left Admin Sidebar */}
      <aside style={{
        width: "260px",
        background: "#071328",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}>
        {/* Admin Brand */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px" }}>
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <polygon points="20,4 36,32 4,32" fill="url(#adm-prism)" />
                <defs>
                  <linearGradient id="adm-prism" x1="4" y1="4" x2="36" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00b4d8" />
                    <stop offset="1" stopColor="#0084ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
                3D<span style={{ color: "#00b4d8" }}>unity</span>
              </div>
              <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.08em" }}>
                ADMIN CONSOLE
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ padding: "20px 12px", display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "11px 16px",
                borderRadius: "12px",
                fontSize: "0.9rem",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#ffffff" : "#94a3b8",
                background: isActive ? "var(--brand-gradient)" : "transparent",
                textDecoration: "none",
                transition: "all 0.2s",
              })}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div style={{ padding: "20px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "10px",
              color: "#94a3b8",
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            <ExternalLink size={16} /> View Public Website
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "10px",
              color: "#ef4444",
              background: "rgba(239, 68, 68, 0.1)",
              border: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowX: "hidden" }}>
        {/* Top Header */}
        <header style={{
          background: "#ffffff",
          height: "70px",
          borderBottom: "1px solid #edf2f7",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
            Workspace: <strong style={{ color: "#071328" }}>3D Unity Production Manager</strong>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Logged in as: <strong>admin@3dunity.com</strong></span>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#e0f2fe",
              color: "#0284c7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.85rem",
            }}>
              AD
            </div>
          </div>
        </header>

        {/* Subpage Content */}
        <main style={{ padding: "32px", flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
