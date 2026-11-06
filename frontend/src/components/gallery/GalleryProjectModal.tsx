import React, { useEffect, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  Cpu,
  Maximize2,
  Scale,
  Sparkles,
  Sliders,
  FileUp,
  Share2,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GalleryItem } from '../../types/gallery';
import { GalleryImageViewer } from './GalleryImageViewer';

export interface GalleryProjectModalProps {
  project: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevProject?: () => void;
  onNextProject?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  currentIndex?: number;
  totalProjects?: number;
}

export const GalleryProjectModal: React.FC<GalleryProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onPrevProject,
  onNextProject,
  hasPrev = true,
  hasNext = true,
  currentIndex,
  totalProjects,
}) => {
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  // Prevent background scrolling while open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard navigation: Escape to close, Left/Right arrows to navigate
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrevProject) {
        onPrevProject();
      } else if (e.key === 'ArrowRight' && onNextProject) {
        onNextProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevProject, onNextProject]);

  const handleShare = () => {
    if (!project) return;
    const url = window.location.origin + `/gallery?project=${project.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleInquireCustom = () => {
    onClose();
    navigate('/#custom-configurator');
    setTimeout(() => {
      const el = document.getElementById('custom-configurator');
      if (el) {
        const navHeight = 76;
        const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }, 120);
  };

  if (!isOpen || !project) return null;

  // Prepare images array
  const imageList = project.images && project.images.length > 0
    ? project.images
    : [project.coverImage || project.image || '/assets/gallery_deer.jpg'];

  // Check which specs are available to render
  const hasMaterials = (project.materials && project.materials.length > 0) || project.material;
  const materialsList = project.materials && project.materials.length > 0
    ? project.materials
    : project.material
    ? [project.material]
    : [];

  const printingTech = project.printingTechnology || project.technology;
  const dimensions = project.dimensions;
  const weight = project.weight;
  const surfaceFinish = project.surfaceFinish;
  const customization = project.customizationDetails;

  return (
    <div
      className="gallery-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
    >
      <div
        className="gallery-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar Header with Prev / Next / Counter / Close */}
        <div className="gallery-modal-top-bar">
          <div className="modal-top-left">
            <span className="modal-project-badge">{project.category}</span>
            {currentIndex !== undefined && totalProjects !== undefined && (
              <span className="modal-counter-indicator">
                {currentIndex + 1} of {totalProjects}
              </span>
            )}
          </div>

          <div className="modal-top-controls">
            {/* Prev Project Button */}
            {onPrevProject && (
              <button
                type="button"
                onClick={onPrevProject}
                disabled={!hasPrev}
                className="modal-nav-ctrl-btn"
                title="Previous project (Left Arrow)"
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>
            )}

            {/* Next Project Button */}
            {onNextProject && (
              <button
                type="button"
                onClick={onNextProject}
                disabled={!hasNext}
                className="modal-nav-ctrl-btn"
                title="Next project (Right Arrow)"
                aria-label="Next project"
              >
                <ChevronRight size={18} />
              </button>
            )}

            {/* Share Link Button */}
            <button
              type="button"
              onClick={handleShare}
              className="modal-share-btn"
              title="Share project link"
              aria-label="Share project"
            >
              {copied ? <Check size={16} color="#55B832" /> : <Share2 size={16} />}
              {copied && <span className="copied-tooltip">Copied link!</span>}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="modal-close-icon-btn"
              aria-label="Close modal dialog"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Main Body (2 Columns Desktop, Stacked Mobile) */}
        <div className="gallery-modal-body">
          {/* Left Column: Image Viewer */}
          <div className="gallery-modal-media-col">
            <GalleryImageViewer images={imageList} title={project.title} />
          </div>

          {/* Right Column: Project Specifications & Info */}
          <div className="gallery-modal-info-col">
            <div className="modal-info-scroll-wrap">
              {/* Category & Status */}
              <div className="modal-meta-header">
                <span className="modal-cat-tag">{project.category}</span>
                {project.projectId && (
                  <span className="modal-id-tag">{project.projectId}</span>
                )}
              </div>

              {/* Title */}
              <h2 id="gallery-modal-title" className="modal-project-title">
                {project.title}
              </h2>

              {/* Description */}
              <p className="modal-project-desc">
                {project.description || project.shortDescription || 'Precision 3D printed custom design created at 3Dunity additive studio.'}
              </p>

              {/* Specifications Matrix - Only renders available fields */}
              <div className="modal-specs-section">
                <h4 className="modal-section-subtitle">
                  <Sliders size={15} className="sub-icon" />
                  <span>Technical Specifications</span>
                </h4>

                <div className="modal-specs-grid">
                  {/* Printing Technology */}
                  {printingTech && (
                    <div className="modal-spec-row">
                      <div className="spec-label">
                        <Cpu size={14} className="spec-icon" />
                        <span>Technology</span>
                      </div>
                      <div className="spec-value">{printingTech}</div>
                    </div>
                  )}

                  {/* Materials */}
                  {hasMaterials && (
                    <div className="modal-spec-row">
                      <div className="spec-label">
                        <Layers size={14} className="spec-icon" />
                        <span>Materials</span>
                      </div>
                      <div className="spec-value">
                        <div className="modal-material-tags">
                          {materialsList.map((mat, i) => (
                            <span key={i} className="modal-mat-badge">
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dimensions */}
                  {dimensions && (
                    <div className="modal-spec-row">
                      <div className="spec-label">
                        <Maximize2 size={14} className="spec-icon" />
                        <span>Dimensions</span>
                      </div>
                      <div className="spec-value">{dimensions}</div>
                    </div>
                  )}

                  {/* Weight */}
                  {weight && (
                    <div className="modal-spec-row">
                      <div className="spec-label">
                        <Scale size={14} className="spec-icon" />
                        <span>Weight</span>
                      </div>
                      <div className="spec-value">{weight}</div>
                    </div>
                  )}

                  {/* Surface Finish */}
                  {surfaceFinish && (
                    <div className="modal-spec-row">
                      <div className="spec-label">
                        <Sparkles size={14} className="spec-icon" />
                        <span>Surface Finish</span>
                      </div>
                      <div className="spec-value">{surfaceFinish}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Customization Details (if available) */}
              {customization && (
                <div className="modal-customization-box">
                  <div className="custom-box-header">
                    <CheckCircle2 size={15} color="#087FC3" />
                    <span className="custom-box-title">Customization Options</span>
                  </div>
                  <p className="custom-box-text">{customization}</p>
                </div>
              )}

              {/* Modal CTA Action */}
              <div className="modal-action-footer">
                <button
                  type="button"
                  onClick={handleInquireCustom}
                  className="modal-custom-quote-btn"
                >
                  <FileUp size={16} />
                  <span>Request Custom Project Like This</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

