import React, { useEffect, useState } from 'react';
import { ArrowRight, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { serviceApi } from '../../api/serviceApi';
import { Service } from '../../types/service';
import { ServiceCard } from './ServiceCard';
import { ServiceDetailModal } from './ServiceDetailModal';
import { Skeleton } from '../common/Skeleton';

export const ServicesSection: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await serviceApi.getAll();
      if (res.data && Array.isArray(res.data)) {
        setServices(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve 3Dunity services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleViewAllServices = () => {
    navigate('/services');
  };

  return (
    <section id="services-section" className="services-section">
      <div className="container">
        {/* Section Header with exact styling matching photo */}
        <div className="services-header-row">
          <div className="services-header-text">
            <h2 className="services-section-title">
              Our <span className="title-highlight">Services</span>
            </h2>
            <p className="services-section-subtitle">
              End-to-end 3D solutions from design to high-quality printing, tailored to your needs.
            </p>
          </div>

          <button
            onClick={handleViewAllServices}
            className="services-view-all-btn"
            aria-label="View all services"
          >
            <span>View All Services</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="services-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="service-skeleton-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <Skeleton width="56px" height="56px" borderRadius="var(--radius-full)" />
                  <Skeleton width="80px" height="24px" borderRadius="var(--radius-full)" />
                </div>
                <Skeleton width="65%" height="1.4rem" style={{ marginBottom: '0.75rem' }} />
                <Skeleton width="100%" height="1rem" style={{ marginBottom: '0.4rem' }} />
                <Skeleton width="90%" height="1rem" style={{ marginBottom: '1.5rem' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Skeleton width="40%" height="1rem" />
                  <Skeleton width="30%" height="1rem" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State with Retry Button */}
        {!loading && error && (
          <div className="services-error-card">
            <AlertCircle size={32} color="#EF4444" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
              Unable to load services
            </h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              {error}
            </p>
            <button onClick={fetchServices} className="services-retry-btn">
              <RefreshCw size={14} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && services.length === 0 && (
          <div className="services-error-card">
            <p style={{ color: 'var(--color-text-secondary)' }}>
              No services found at this time.
            </p>
          </div>
        )}

        {/* Clean 3-Column Desktop Grid (Responsive to Tablet & Mobile) */}
        {!loading && !error && services.length > 0 && (
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                onSelect={(s) => setSelectedService(s)}
              />
            ))}
          </div>
        )}

        {/* Detail Modal for Learn More */}
        <ServiceDetailModal
          service={selectedService}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
        />
      </div>
    </section>
  );
};

