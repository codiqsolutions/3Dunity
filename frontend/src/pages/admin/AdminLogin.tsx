import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowRight } from "../../components/icons";
import { useAuth } from "../../context/AuthContext";

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(email.trim(), password.trim());
    if (result.success) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError(result.error || "Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{
        background: "#ffffff",
        borderRadius: "24px",
        border: "1px solid #edf2f7",
        padding: "44px 40px",
        boxShadow: "var(--card-shadow)",
        maxWidth: "460px",
        width: "100%",
      }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: "#e0f2fe",
            color: "#0284c7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <Shield size={28} />
          </div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#071328", marginBottom: "6px" }}>Admin Portal</h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>Sign in to manage 3D Unity products, inquiries &amp; settings</p>
        </div>
        {error && (
          <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "16px" }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@3dunity.com"
              style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1.5px solid #cbd5e1", fontSize: "0.92rem", outline: "none" }}
            />
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1.5px solid #cbd5e1", fontSize: "0.92rem", outline: "none" }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary-gradient w-100"
            style={{ justifyContent: "center", padding: "12px", fontSize: "1rem" }}
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"} <ArrowRight size={16} />
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "24px", borderTop: "1px solid #f1f5f9", paddingTop: "18px" }}>
          <Link to="/" style={{ color: "#64748b", fontSize: "0.88rem", textDecoration: "none" }}>&larr; Back to Public Website</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
