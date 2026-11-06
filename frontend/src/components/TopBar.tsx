import React from "react";
import { MapPin, Mail, Phone, Instagram, Youtube, Linkedin, Facebook } from "./icons";

export const TopBar: React.FC = () => {
  return (
    <div className="top-info-bar">
      <div className="unity-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
        {/* Left: Contact Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <MapPin size={14} color="#00b4d8" />
            <a href="https://maps.google.com/?q=215+apple+square,+yogi+chowk,+surat,+gujrat,+395010" target="_blank" rel="noopener noreferrer">
              Surat, Gujarat, India
            </a>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Mail size={14} color="#00b4d8" />
            <a href="mailto:3duniti1@gmail.com">3duniti1@gmail.com</a>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Phone size={14} color="#00b4d8" />
            <a href="tel:+918866961005">+91 88669 61005</a>
          </span>
        </div>

        {/* Right: Social Media links */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#64748b", fontSize: "0.8rem", marginRight: "4px" }}>Follow Us:</span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" style={{ display: "inline-flex", alignItems: "center" }}>
            <Instagram size={15} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" style={{ display: "inline-flex", alignItems: "center" }}>
            <Youtube size={15} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ display: "inline-flex", alignItems: "center" }}>
            <Linkedin size={15} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" style={{ display: "inline-flex", alignItems: "center" }}>
            <Facebook size={15} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
