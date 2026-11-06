import React, { useState } from 'react';
import { Product } from '../../types/product';
import { ProductSpecifications } from './ProductSpecifications';
import {
  FileText,
  Cpu,
  Sliders,
  Truck,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Shield,
  RotateCcw,
} from 'lucide-react';

export interface ProductTabsProps {
  product: Product;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'custom' | 'shipping'>('desc');

  return (
    <section className="product-details-tabs-section" aria-label="Detailed Product Information">
      {/* Tab Navigation Header */}
      <div className="product-tabs-nav-bar" role="tablist">
        <button
          type="button"
          role="tab"
          id="tab-desc"
          aria-selected={activeTab === 'desc'}
          aria-controls="panel-desc"
          onClick={() => setActiveTab('desc')}
          className={`tab-nav-btn ${activeTab === 'desc' ? 'is-active' : ''}`}
        >
          <FileText size={16} />
          <span>Description</span>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-specs"
          aria-selected={activeTab === 'specs'}
          aria-controls="panel-specs"
          onClick={() => setActiveTab('specs')}
          className={`tab-nav-btn ${activeTab === 'specs' ? 'is-active' : ''}`}
        >
          <Cpu size={16} />
          <span>Technical Specifications</span>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-custom"
          aria-selected={activeTab === 'custom'}
          aria-controls="panel-custom"
          onClick={() => setActiveTab('custom')}
          className={`tab-nav-btn ${activeTab === 'custom' ? 'is-active' : ''}`}
        >
          <Sliders size={16} />
          <span>Customization Details</span>
        </button>

        <button
          type="button"
          role="tab"
          id="tab-shipping"
          aria-selected={activeTab === 'shipping'}
          aria-controls="panel-shipping"
          onClick={() => setActiveTab('shipping')}
          className={`tab-nav-btn ${activeTab === 'shipping' ? 'is-active' : ''}`}
        >
          <Truck size={16} />
          <span>Shipping & Returns</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="product-tabs-content-card">
        {/* TAB 1: DESCRIPTION */}
        {activeTab === 'desc' && (
          <div
            id="panel-desc"
            role="tabpanel"
            aria-labelledby="tab-desc"
            className="tab-panel-body"
          >
            <h3 className="tab-panel-heading">Product Overview & Features</h3>
            <p className="tab-description-para">{product.description}</p>

            <div className="tab-feature-highlights-grid">
              <div className="feature-highlight-card">
                <div className="highlight-icon-wrap">
                  <Sparkles size={20} className="text-primary-blue" />
                </div>
                <div>
                  <h4 className="highlight-title">Artisan & Precision Crafted</h4>
                  <p className="highlight-desc">
                    Printed with high-grade European filaments and resins with zero layer seam lines.
                  </p>
                </div>
              </div>

              <div className="feature-highlight-card">
                <div className="highlight-icon-wrap">
                  <Shield size={20} className="text-secondary-green" />
                </div>
                <div>
                  <h4 className="highlight-title">Durability Guaranteed</h4>
                  <p className="highlight-desc">
                    Gyroid infill matrix guarantees impact resilience without adding unnecessary dead weight.
                  </p>
                </div>
              </div>

              <div className="feature-highlight-card">
                <div className="highlight-icon-wrap">
                  <CheckCircle size={20} className="text-accent-orange" />
                </div>
                <div>
                  <h4 className="highlight-title">Quality Inspected</h4>
                  <p className="highlight-desc">
                    Each individual print undergoes a 12-point dimensional tolerance check before packaging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TECHNICAL SPECIFICATIONS */}
        {activeTab === 'specs' && (
          <div
            id="panel-specs"
            role="tabpanel"
            aria-labelledby="tab-specs"
            className="tab-panel-body"
          >
            <ProductSpecifications product={product} />
          </div>
        )}

        {/* TAB 3: CUSTOMIZATION DETAILS */}
        {activeTab === 'custom' && (
          <div
            id="panel-custom"
            role="tabpanel"
            aria-labelledby="tab-custom"
            className="tab-panel-body"
          >
            <h3 className="tab-panel-heading">Customization Options & Guidelines</h3>
            <p className="tab-description-para">
              3Dunity specializes in tailored 3D manufacturing. Customize this model to match your exact
              dimensional, material, or branding requirements.
            </p>

            <div className="custom-guidelines-list">
              <div className="guideline-item">
                <strong className="guideline-label">Material Adaptations:</strong>
                <p>
                  Choose between standard PLA, impact-resistant PETG Pro, engineering-grade ABS, or SLA 8K
                  Resin depending on indoor/outdoor exposure and mechanical load.
                </p>
              </div>

              <div className="guideline-item">
                <strong className="guideline-label">Custom Scaling:</strong>
                <p>
                  Need a different size? Choose from our standard scale options or specify exact millimeters/centimeters
                  in the custom dimensions form.
                </p>
              </div>

              <div className="guideline-item">
                <strong className="guideline-label">Monogram & Text Engraving:</strong>
                <p>
                  We can deboss or emboss names, serial numbers, company monograms, or dates directly into the 3D model geometry.
                </p>
              </div>

              <div className="guideline-item">
                <strong className="guideline-label">Have Your Own 3D CAD File?</strong>
                <p>
                  Upload your proprietary .STL, .OBJ, or .STEP file using the uploader above or request a bespoke quote.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SHIPPING & RETURNS */}
        {activeTab === 'shipping' && (
          <div
            id="panel-shipping"
            role="tabpanel"
            aria-labelledby="tab-shipping"
            className="tab-panel-body"
          >
            <h3 className="tab-panel-heading">Shipping, Turnaround & Returns Policy</h3>

            <div className="shipping-policy-grid">
              <div className="shipping-policy-card">
                <div className="policy-icon-wrap">
                  <Truck size={22} className="text-primary-blue" />
                </div>
                <h4 className="policy-title">Pan-India Express Delivery</h4>
                <p className="policy-text">
                  Standard delivery timeline is 3–5 business days across all metro cities and tier 1/2 towns via
                  Bluedart, Delhivery, and DTDC.
                </p>
                <div className="policy-tag">Free Shipping On All Standard Orders</div>
              </div>

              <div className="shipping-policy-card">
                <div className="policy-icon-wrap">
                  <Cpu size={22} className="text-secondary-green" />
                </div>
                <h4 className="policy-title">Production & Quality Control</h4>
                <p className="policy-text">
                  In-stock ready models ship within 24 hours. Custom and Made-to-Order models require {product.productionTime || '2–3 business days'} for precision printing and post-processing.
                </p>
              </div>

              <div className="shipping-policy-card">
                <div className="policy-icon-wrap">
                  <RotateCcw size={22} className="text-accent-orange" />
                </div>
                <h4 className="policy-title">7-Day Replacement Guarantee</h4>
                <p className="policy-text">
                  If your print arrives damaged, defective, or with dimensional variance beyond tolerance, we will
                  reprint and replace it at zero additional cost.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

