import React, { useEffect, useState } from 'react';
import { ArrowRight, AlertCircle, RefreshCw, ZoomIn, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { galleryApi } from '../../api/galleryApi';
import { GalleryItem } from '../../types/gallery';
import { GalleryLightboxModal } from './GalleryLightboxModal';
import { Skeleton } from '../common/Skeleton';

export const GallerySection: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const navigate = useNavigate();

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await galleryApi.getAll();
      if (res.data && Array.isArray(res.data)) {
        setItems(res.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve 3Dunity gallery projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleViewAllGallery = () => {
    navigate('/gallery');
  };

  // Filter items
  const filteredItems = selectedFilter === 'all'
    ? items
    : items.filter((item) => item.categorySlug === selectedFilter);

  const filterTabs = [
    { label: 'All Projects', slug: 'all' },
    { label: 'Home Decor', slug: 'home-decor' },
    { label: 'Architectural', slug: 'architectural-models' },
    { label: 'Toys & Figures', slug: 'toys-figures' },
    { label: 'Prototypes', slug: 'engineering-prototypes' },
    { label: 'Personalized', slug: 'personalized-gifts' },
  ];

  return (
    <section id="gallery-section" className="gallery-section">
      <div className="container">
        {/* Header Row matching photo layout */}
        <div className="gallery-header-row">
          <div className="gallery-header-text">
            <h2 className="gallery-section-title">
              From Our <span className="title-highlight">Gallery</span>
            </h2>
            <p className="gallery-section-subtitle">
              A glimpse of our 3D printed creations.
            </p>
          </div>

          <button
            onClick={handleViewAllGallery}
            className="gallery-view-all-link"
            aria-label="View full gallery"
          >
            <span>View Full Gallery</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="gallery-filter-bar">
          {filterTabs.map((tab) => (
            <button
              key={tab.slug}
              className={`gallery-filter-pill ${selectedFilter === tab.slug ? 'active' : ''}`}
              onClick={() => setSelectedFilter(tab.slug)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Loading State Skeletons */}
        {loading && (
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="gallery-skeleton-card">
                <Skeleton height="150px" borderRadius="16px" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="gallery-error-card">
            <AlertCircle size={32} color="#EF4444" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
              Unable to load gallery projects
            </h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              {error}
            </p>
            <button onClick={fetchGallery} className="gallery-retry-btn">
              <RefreshCw size={14} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="gallery-error-card">
            <p style={{ color: 'var(--color-text-secondary)' }}>
              No projects found in this category.
            </p>
          </div>
        )}

        {/* Responsive Image Grid (6 items across matching photo) */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="gallery-grid">
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                className="gallery-card"
                onClick={() => setLightboxIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxIndex(index);
                  }
                }}
              >
                <div className="gallery-card-image-box">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-card-img"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="gallery-card-overlay">
                    <div className="gallery-zoom-icon-box">
                      <Eye size={18} />
                    </div>
                    <div className="gallery-card-meta">
                      <span className="gallery-overlay-category">{item.category}</span>
                      <h4 className="gallery-overlay-title">{item.title}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        <GalleryLightboxModal
          items={filteredItems}
          currentIndex={lightboxIndex ?? 0}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      </div>
    </section>
  );
};

