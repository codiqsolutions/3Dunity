import React from 'react';
import { Zap, Phone, ShieldCheck, Clock } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="announcement-bar">
      <div className="container announcement-inner">
        <div className="announcement-message">
          <Zap size={14} className="announcement-highlight" />
          <span>
            Industrial 3D Printing & Additive Fabrication —{' '}
            <strong className="announcement-highlight">48-Hr Rapid Dispatch</strong> on Ready Models & Custom Runs
          </span>
        </div>

        <div className="announcement-links">
          <span className="announcement-link">
            <Clock size={13} />
            <span>Turnaround: 24-48 hrs</span>
          </span>
          <span className="announcement-link">
            <ShieldCheck size={13} />
            <span>ISO 9001 Tolerances</span>
          </span>
          <a href="tel:+18005553386" className="announcement-link">
            <Phone size={13} />
            <span>Support: +1 (800) 555-3386</span>
          </a>
        </div>
      </div>
    </div>
  );
};

