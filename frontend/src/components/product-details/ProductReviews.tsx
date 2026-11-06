import React, { useState, useEffect } from 'react';
import {
  Star,
  ShieldCheck,
  MessageSquare,
  ThumbsUp,
  PlusCircle,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Send,
} from 'lucide-react';
import { productApi } from '../../api/productApi';
import { ProductReviewItem, RatingStats } from '../../types/review';

export interface ProductReviewsProps {
  productId: string;
  productSlug: string;
  productName: string;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  productSlug,
  productName,
}) => {
  const [reviews, setReviews] = useState<ProductReviewItem[]>([]);
  const [ratingStats, setRatingStats] = useState<RatingStats>({
    average: 5.0,
    totalReviews: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    percentages: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchReviews = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const res = await productApi.getReviews(productSlug || productId, page, 5);

      if (res.data) {
        setReviews(res.data);
        if (res.meta) {
          setCurrentPage(res.meta.page);
          setTotalPages(res.meta.totalPages);
          if (res.meta.ratingStats) {
            setRatingStats(res.meta.ratingStats);
          }
        }
      }
    } catch (err: any) {
      console.error('Failed to load reviews:', err);
      setError('Unable to load verified reviews right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(1);
  }, [productSlug, productId]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) {
      setFormError('Please enter your name and a detailed review.');
      return;
    }

    try {
      setSubmitting(true);
      setFormError(null);

      await productApi.addReview(productSlug || productId, {
        userName: formName.trim(),
        userEmail: formEmail.trim() || undefined,
        rating: formRating,
        title: formTitle.trim(),
        comment: formComment.trim(),
      });

      setSubmitSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormTitle('');
      setFormComment('');
      setFormRating(5);

      // Refresh reviews list
      fetchReviews(1);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsFormOpen(false);
      }, 2500);
    } catch (err: any) {
      setFormError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="product-reviews-section" id="customer-reviews-anchor" aria-label="Customer Reviews">
      <div className="reviews-section-header">
        <div>
          <h3 className="reviews-main-title">Customer Ratings & Reviews</h3>
          <p className="reviews-sub-title">
            Genuine verified feedback from verified 3Dunity customers who purchased &ldquo;{productName}&rdquo;.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFormOpen((prev) => !prev)}
          className="write-review-trigger-btn"
        >
          <PlusCircle size={16} />
          <span>{isFormOpen ? 'Close Form' : 'Write a Review'}</span>
        </button>
      </div>

      {/* Write Review Form Card */}
      {isFormOpen && (
        <div className="write-review-form-card">
          <h4 className="form-card-title">Share Your Experience</h4>
          <p className="form-card-sub">Rate the dimensional accuracy, print finish, and packaging.</p>

          {submitSuccess && (
            <div className="review-submit-success">
              <CheckCircle2 size={16} />
              <span>Thank you! Your verified review has been published.</span>
            </div>
          )}

          {formError && (
            <div className="review-submit-error">
              <AlertCircle size={16} />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="review-inputs-form">
            {/* Star Rating Selector */}
            <div className="form-field-group">
              <label className="field-label">Your Overall Rating:</label>
              <div className="star-rating-selector" role="radiogroup" aria-label="Select star rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormRating(star)}
                    className={`star-select-btn ${star <= formRating ? 'is-selected' : ''}`}
                    aria-label={`${star} star`}
                  >
                    <Star size={24} className={star <= formRating ? 'star-gold' : 'star-gray'} />
                  </button>
                ))}
                <span className="selected-star-score">{formRating} of 5 Stars</span>
              </div>
            </div>

            <div className="form-row-dual">
              <div className="form-field-group">
                <label className="field-label" htmlFor="review-name">Your Full Name *</label>
                <input
                  id="review-name"
                  type="text"
                  required
                  placeholder="e.g. Vaibhav Sharma"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="review-input"
                />
              </div>

              <div className="form-field-group">
                <label className="field-label" htmlFor="review-email">Email Address (Optional)</label>
                <input
                  id="review-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="review-input"
                />
              </div>
            </div>

            <div className="form-field-group">
              <label className="field-label" htmlFor="review-headline">Review Headline</label>
              <input
                id="review-headline"
                type="text"
                placeholder="e.g. Stunning finish, arrived in perfect condition"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="review-input"
              />
            </div>

            <div className="form-field-group">
              <label className="field-label" htmlFor="review-body">Detailed Feedback *</label>
              <textarea
                id="review-body"
                required
                rows={4}
                placeholder="How was the 3D print surface quality, material strength, color accuracy, and packaging?..."
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                className="review-textarea"
              />
            </div>

            <div className="form-actions-row">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="form-cancel-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="form-submit-btn"
              >
                <Send size={15} />
                <span>{submitting ? 'Submitting...' : 'Post Review'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ratings Distribution & Summary Card */}
      <div className="reviews-summary-card">
        {/* Left: Big Score & Stars */}
        <div className="rating-score-block">
          <div className="rating-score-huge">{ratingStats.average.toFixed(1)}</div>
          <div className="rating-stars-huge">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={20}
                className={s <= Math.round(ratingStats.average) ? 'star-gold' : 'star-gray'}
              />
            ))}
          </div>
          <div className="rating-total-count">
            Based on {ratingStats.totalReviews} verified {ratingStats.totalReviews === 1 ? 'review' : 'reviews'}
          </div>
          <span className="verified-badge-pill">
            <ShieldCheck size={13} />
            <span>100% Verified Purchases</span>
          </span>
        </div>

        {/* Right: 5-to-1 Star Percentage Bars */}
        <div className="rating-distribution-block">
          {[5, 4, 3, 2, 1].map((starNum) => {
            const count = ratingStats.distribution[starNum as keyof typeof ratingStats.distribution] || 0;
            const pct = ratingStats.percentages[starNum as keyof typeof ratingStats.percentages] || 0;

            return (
              <div key={starNum} className="distribution-row">
                <span className="star-level-label">
                  <span>{starNum}</span>
                  <Star size={12} className="star-gold" />
                </span>
                <div className="dist-bar-track">
                  <div
                    className="dist-bar-fill"
                    style={{ width: `${pct}%` }}
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <span className="dist-count-label">{count} ({pct}%)</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="reviews-list-container">
        {loading && (
          <div className="reviews-loading-indicator">
            <MessageSquare size={24} className="spin-animate text-primary-blue" />
            <span>Loading reviews...</span>
          </div>
        )}

        {!loading && reviews.length === 0 && (
          <div className="reviews-empty-block">
            <MessageSquare size={32} className="text-secondary" />
            <h4>No reviews yet for this model</h4>
            <p>Be the first customer to order & share your 3D print experience!</p>
          </div>
        )}

        {!loading && reviews.length > 0 && (
          <div className="reviews-items-stack">
            {reviews.map((rev) => (
              <article key={rev._id} className="review-item-card">
                <div className="review-card-top">
                  <div>
                    <div className="review-author-row">
                      <span className="author-name">{rev.userName}</span>
                      {rev.verifiedPurchase && (
                        <span className="verified-buyer-tag">
                          <ShieldCheck size={13} />
                          <span>Verified Purchase</span>
                        </span>
                      )}
                    </div>
                    <div className="review-stars-row">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={14}
                          className={s <= rev.rating ? 'star-gold' : 'star-gray'}
                        />
                      ))}
                      <span className="review-date-text">
                        {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {rev.title && <h4 className="review-card-headline">{rev.title}</h4>}
                <p className="review-card-comment">{rev.comment}</p>
              </article>
            ))}
          </div>
        )}

        {/* Reviews Pagination */}
        {totalPages > 1 && (
          <div className="reviews-pagination-row">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => fetchReviews(currentPage - 1)}
              className="review-page-btn"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            <span className="review-page-counter">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => fetchReviews(currentPage + 1)}
              className="review-page-btn"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

