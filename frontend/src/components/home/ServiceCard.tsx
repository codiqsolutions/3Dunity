import React from 'react';
import {
  Printer,
  Box,
  Cpu,
  SlidersHorizontal,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { Service } from '../../types/service';

export interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const renderIcon = (name: string, color: string) => {
    const props = { size: 28, color, strokeWidth: 1.8 };
    switch (name.toLowerCase()) {
      case 'printer':
        return <Printer {...props} />;
      case 'box':
        return <Box {...props} />;
      case 'cpu':
        return <Cpu {...props} />;
      case 'sliders':
        return <SlidersHorizontal {...props} />;
      case 'layers':
        return <Layers {...props} />;
      case 'sparkles':
        return <Sparkles {...props} />;
      default:
        return <Box {...props} />;
    }
  };

  const { colorScheme } = service;

  return (
    <div
      className="service-card"
      onClick={() => onSelect(service)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(service);
        }
      }}
    >
      {/* Top Header: Pastel Icon Circle & Badge */}
      <div className="service-card-top">
        <div
          className="service-icon-circle"
          style={{
            backgroundColor: colorScheme.bg,
            borderColor: colorScheme.border,
          }}
        >
          {renderIcon(service.iconName, colorScheme.text)}
        </div>

        {service.badge && (
          <span
            className="service-card-badge"
            style={{
              backgroundColor: colorScheme.bg,
              color: colorScheme.text,
              borderColor: colorScheme.border,
            }}
          >
            {service.badge}
          </span>
        )}
      </div>

      {/* Service Content */}
      <div className="service-card-content">
        <h3 className="service-card-title">{service.title}</h3>
        <p className="service-card-desc">{service.shortDescription}</p>

        {/* Feature quick tags preview */}
        {service.features && service.features.length > 0 && (
          <div className="service-quick-features">
            {service.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="service-feature-pill">
                <span className="service-feature-dot" style={{ backgroundColor: colorScheme.text }} />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Turnaround Time + Learn More CTA */}
      <div className="service-card-footer">
        <div className="service-turnaround-badge">
          <Clock size={13} className="service-clock-icon" />
          <span>{service.turnaroundTime}</span>
        </div>

        <button
          type="button"
          className="service-learn-more-btn"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(service);
          }}
        >
          <span>Learn More</span>
          <ArrowRight size={14} className="service-arrow-icon" />
        </button>
      </div>
    </div>
  );
};

