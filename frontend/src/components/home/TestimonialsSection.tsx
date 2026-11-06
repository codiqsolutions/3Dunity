import React, { useEffect, useState } from 'react';
import { Star, Quote, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { reviewApi } from '../../api/reviewApi';
import { Review } from '../../types/review';
import { Skeleton } from '../common/Skeleton';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await reviewApi.getFeatured();
      if (res.data && Array.isArray(res.data)) {
        // Take top 3 matching the 3 cards in reference mock-up
        setReviews(res.data.slice(0, 3));
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load client testimonials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Do not render empty or fake reviews in production if no actual reviews exist
  if (!loading && !error && reviews.length === 0) {
    return null;
  }

  return (
    <section id="testimonials-section" className="testimonials-section" aria-label="Customer Testimonials">
      <div className="container">
        <div className="testimonials-layout">
          {/* Left Column: Title and Blue Accent Bar matching photo */}
          <div className="testimonials-left-col">
            <h2 className="testimonials-title">
              What Our
              <span className="title-highlight">Clients Say</span>
            </h2>
            <div className="testimonials-title-bar" aria-hidden="true" />

            <div className="testimonials-rating-summary">
              <div className="testimonials-stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#F59A16" color="#F59A16" />
                ))}
              </div>
              <span className="testimonials-score-text">
                4.9 / 5.0 Verified Ratings
              </span>
            </div>
          </div>

          {/* Right Column: 3 Customer Review Cards */}
          <div className="testimonials-right-col">
            {/* Loading Skeletons */}
            {loading && (
              <div className="testimonials-cards-grid">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="testimonial-skeleton-card">
                    <Skeleton width="34px" height="34px" borderRadius="var(--radius-full)" style={{ marginBottom: '1rem' }} />
                    <Skeleton width="100%" height="0.9rem" style={{ marginBottom: '0.5rem' }} />
                    <Skeleton width="90%" height="0.9rem" style={{ marginBottom: '1.5rem' }} />
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <Skeleton width="44px" height="44px" borderRadius="var(--radius-full)" />
                      <div style={{ flex: 1 }}>
                        <Skeleton width="60%" height="1rem" style={{ marginBottom: '0.25rem' }} />
                        <Skeleton width="40%" height="0.8rem" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="testimonials-error-box">
                <AlertCircle size={32} color="#EF4444" style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
                  Unable to load testimonials
                </h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {error}
                </p>
                <button onClick={fetchReviews} className="gallery-retry-btn">
                  <RefreshCw size={14} />
                  <span>Retry</span>
                </button>
              </div>
            )}

            {/* Review Cards Grid */}
            {!loading && !error && reviews.length > 0 && (
              <div className="testimonials-cards-grid">
                {reviews.map((rev) => (
                  <div key={rev._id} className="testimonial-card">
                    <div>
                      {/* Top Row: Blue Quote Icon and 5-Star Rating */}
                      <div className="testimonial-card-top">
                        <div className="testimonial-quote-icon">
                          <Quote size={18} fill="#087FC3" />
                        </div>
                        <div className="testimonial-rating-stars">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} size={13} fill="#F59A16" color="#F59A16" />
                          ))}
                        </div>
                      </div>

                      {/* Review Comment Text */}
                      <p className="testimonial-card-comment">
                        "{rev.comment}"
                      </p>
                    </div>

                    {/* Customer Info Footer */}
                    <div className="testimonial-card-footer">
                      <div className="testimonial-avatar-box">
                        <img
                          src={rev.avatarUrl || '/assets/avatar_rohan.jpg'}
                          alt={rev.authorName}
                          className="testimonial-avatar-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="testimonial-author-meta">
                        <h4 className="testimonial-author-name">
                          {rev.authorName}
                        </h4>
                        <span className="testimonial-author-role">
                          {rev.authorRole}
                        </span>
                        {rev.projectType && (
                          <span className="testimonial-project-ref">
                            <CheckCircle2 size={11} color="var(--color-green)" />
                            {rev.projectType}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
