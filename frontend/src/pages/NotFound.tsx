import React from "react";
import { Link } from "react-router-dom";
import { Box, ArrowRight } from "../components/icons";

export const NotFound: React.FC = () => {
  return (
    <div style={{ padding: "100px 20px", textAlign: "center" }}>
      <div className="unity-container" style={{ maxWidth: "560px" }}>
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "20px",
          background: "#e0f2fe",
          color: "#0284c7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
        }}>
          <Box size={44} />
        </div>

        <div style={{ fontSize: "5rem", fontWeight: 900, color: "#071328", lineHeight: 1, marginBottom: "12px" }}>
          404
        </div>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#071328", marginBottom: "12px" }}>
          Model Not Found
        </h2>
        <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: 1.6, marginBottom: "30px" }}>
          The page or 3D creation you are looking for has been moved, sliced differently, or does not exist.
        </p>

        <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
          <Link to="/" className="btn-primary-gradient" style={{ padding: "12px 28px" }}>
            Return to Home <ArrowRight size={16} />
          </Link>
          <Link to="/products" className="btn-secondary-outline" style={{ padding: "12px 28px" }}>
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
