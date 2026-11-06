import React from 'react';
import { MapPin, Mail, Phone, Instagram, Youtube, Linkedin, Facebook } from 'lucide-react';

export interface TopBarProps {
  location?: string;
  email?: string;
  phone?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  location = 'Surat, India',
  email = 'hello@3dunity.com',
  phone = '+91 98765 43210',
}) => {
  return (
    <div className="top-utility-bar">
      <div className="container top-utility-inner">
        {/* Left Side: Contact & Location */}
        <div className="top-utility-contact">
          <div className="top-utility-item">
            <MapPin size={13} className="top-utility-icon" />
            <span>{location}</span>
          </div>
          <a href={`mailto:${email}`} className="top-utility-item top-utility-link">
            <Mail size={13} className="top-utility-icon" />
            <span>{email}</span>
          </a>
          <a href={`tel:${phone.replace(/\s+/g, '')}`} className="top-utility-item top-utility-link">
            <Phone size={13} className="top-utility-icon" />
            <span>{phone}</span>
          </a>
        </div>

        {/* Right Side: Social Media Links */}
        <div className="top-utility-social">
          <span className="top-utility-social-label">Follow Us:</span>
          <div className="top-utility-social-icons">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="top-social-link"
              aria-label="Instagram"
            >
              <Instagram size={14} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="top-social-link"
              aria-label="YouTube"
            >
              <Youtube size={14} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="top-social-link"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="top-social-link"
              aria-label="Facebook"
            >
              <Facebook size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

