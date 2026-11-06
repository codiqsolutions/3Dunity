import React from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Printer,
  Box,
  Cpu,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { Service } from '../../types/service';
import { useNavigate } from 'react-router-dom';

export interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  if (!isOpen || !service) return null;

  const renderIcon = (name: string, color: string) => {
    const props = { size: 36, color, strokeWidth: 1.8 };
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

  const handleRequestQuote = () => {
    onClose();
    navigate('/custom-quote');
  };

  return (
    <div className="service-modal-backdrop" onClick={onClose}>
      <div
        className="service-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-service-title"
      >
        {/* Close Button */}
        <button
          className="service-modal-close"
          onClick={onClose}
          aria-label="Close service details"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="service-modal-header">
          <div
            className="service-modal-icon-box"
            style={{
              backgroundColor: service.colorScheme.bg,
              borderColor: service.colorScheme.border,
            }}
          >
            {renderIcon(service.iconName, service.colorScheme.text)}
          </div>
          <div>
            {service.badge && (
              <span
                className="service-modal-badge"
                style={{
                  backgroundColor: service.colorScheme.bg,
                  color: service.colorScheme.text,
                  borderColor: service.colorScheme.border,
                }}
              >
                {service.badge}
              </span>
            )}
            <h2 id="modal-service-title" className="service-modal-title">
              {service.title}
            </h2>
            <div className="service-modal-turnaround">
              <Clock size={14} color="#087FC3" />
              <span>Standard Turnaround: {service.turnaroundTime}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="service-modal-body">
          <div className="service-modal-section">
            <h4 className="service-modal-section-title">Overview</h4>
            <p className="service-modal-desc">{service.description}</p>
          </div>

          {/* Key Capabilities */}
          {service.features && service.features.length > 0 && (
            <div className="service-modal-section">
              <h4 className="service-modal-section-title">Key Capabilities & Standards</h4>
              <div className="service-features-grid">
                {service.features.map((feat, i) => (
                  <div key={i} className="service-modal-feature-item">
                    <CheckCircle2 size={16} color="var(--color-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Supported Materials */}
          {service.materialsSupported && service.materialsSupported.length > 0 && (
            <div className="service-modal-section">
              <h4 className="service-modal-section-title">
                <Layers size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                Supported Materials & Formats
              </h4>
              <div className="service-materials-wrap">
                {service.materialsSupported.map((mat, i) => (
                  <span key={i} className="service-material-pill">
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="service-modal-footer">
          <button className="service-modal-cancel-btn" onClick={onClose}>
            Back to Services
          </button>
          <button className="service-modal-quote-btn" onClick={handleRequestQuote}>
            <span>Request Quote for {service.title}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

