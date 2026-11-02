import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, UploadCloud, Layers } from 'lucide-react';
import { productApi } from '../../api/productApi';
import { Product } from '../../types/product';

export interface ProductQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  currentConfiguration?: {
    material: string;
    color: string;
    size: string;
    customDimensions?: any;
    customText?: string;
    uploadedFiles?: any[];
  };
}

export const ProductQuoteModal: React.FC<ProductQuoteModalProps> = ({
  isOpen,
  onClose,
  product,
  currentConfiguration,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState(
    currentConfiguration?.customText
      ? `Custom Text Request: "${currentConfiguration.customText}". Need quotation for custom production.`
      : ''
  );
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Full name and email address are required.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg(null);

      const dimensionsStr = currentConfiguration?.customDimensions
        ? `${currentConfiguration.customDimensions.length} × ${currentConfiguration.customDimensions.width} × ${currentConfiguration.customDimensions.height} ${currentConfiguration.customDimensions.unit}`
        : currentConfiguration?.size || product.dimensions;

      const payload = {
        productId: product.productId || String(product._id),
        productName: product.name,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        companyName: companyName.trim(),
        projectTitle: `Custom Quote: ${product.name}`,
        projectDescription: specialInstructions.trim() || `Custom quotation requested for ${product.name}`,
        technology: product.printingTechnology || product.specs?.technology || 'FDM',
        material: currentConfiguration?.material || product.material || 'PLA',
        colorPreference: currentConfiguration?.color || 'White',
        dimensions: dimensionsStr,
        customText: currentConfiguration?.customText,
        uploadedFileUrls: currentConfiguration?.uploadedFiles?.map((f) => f.url) || [],
        specialInstructions: specialInstructions.trim(),
      };

      const res = await productApi.submitCustomQuote(payload);

      setSuccessMsg(
        res.message || 'Your custom quote request has been received! Our engineering team will review the tolerances.'
      );

      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit quote request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="quote-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="quote-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="quote-modal-header">
          <div>
            <div className="quote-badge">
              <Layers size={13} />
              <span>Bespoke Engineering Quote</span>
            </div>
            <h3 className="quote-modal-title">Request Custom Quote</h3>
            <span className="quote-product-ref">
              For: <strong>{product.name}</strong> ({product.productId || 'SKU: 3DM'})
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="quote-modal-close"
            aria-label="Close quote modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="quote-success-banner">
            <CheckCircle2 size={18} />
            <div>
              <strong>Quote Request Submitted!</strong>
              <p>{successMsg}</p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="quote-error-banner">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        {!successMsg && (
          <form onSubmit={handleSubmit} className="quote-form-body">
            <div className="quote-form-row">
              <div className="quote-field">
                <label className="field-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="quote-input"
                />
              </div>

              <div className="quote-field">
                <label className="field-label">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="quote-input"
                />
              </div>
            </div>

            <div className="quote-form-row">
              <div className="quote-field">
                <label className="field-label">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="quote-input"
                />
              </div>

              <div className="quote-field">
                <label className="field-label">Company / Organization (Optional)</label>
                <input
                  type="text"
                  placeholder="Studio Forma Labs"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="quote-input"
                />
              </div>
            </div>

            {/* Current Selected Configuration Summary */}
            <div className="quote-config-summary">
              <span className="summary-title">Configured Requirements:</span>
              <div className="summary-chips">
                <span className="summary-chip">
                  Material: {currentConfiguration?.material || product.material}
                </span>
                <span className="summary-chip">
                  Color: {currentConfiguration?.color || 'White'}
                </span>
                <span className="summary-chip">
                  Size: {currentConfiguration?.size || product.dimensions}
                </span>
                {currentConfiguration?.customText && (
                  <span className="summary-chip">
                    Engraving: &ldquo;{currentConfiguration.customText}&rdquo;
                  </span>
                )}
                {currentConfiguration?.uploadedFiles && currentConfiguration.uploadedFiles.length > 0 && (
                  <span className="summary-chip">
                    {currentConfiguration.uploadedFiles.length} Design Files Attached
                  </span>
                )}
              </div>
            </div>

            <div className="quote-field">
              <label className="field-label">Project Requirements & Notes</label>
              <textarea
                rows={3}
                placeholder="Mention any custom tolerance requirements, surface treatment (e.g. vapor smoothed, paint matched), or batch quantity..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="quote-textarea"
              />
            </div>

            <div className="quote-modal-footer">
              <button
                type="button"
                onClick={onClose}
                className="quote-btn-cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="quote-btn-submit"
              >
                <Send size={15} />
                <span>{submitting ? 'Submitting...' : 'Send Request for Review'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

