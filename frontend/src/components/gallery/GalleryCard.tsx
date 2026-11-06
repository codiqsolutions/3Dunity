import React, { useState } from 'react';
import { Eye, ArrowUpRight, Cpu, Layers } from 'lucide-react';
import { GalleryItem } from '../../types/gallery';

export interface GalleryCardProps {
  project: GalleryItem;
  index: number;
  onSelect: (project: GalleryItem) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ project, index, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determine card height variant for authentic masonry cadence
  // Mix of tall, medium, and standard cards based on displayOrder / index
  const getCardVariant = (idx: number) => {
    const cycle = idx % 6;
    if (cycle === 0 || cycle === 4) return 'card-tall';
    if (cycle === 2 || cycle === 5) return 'card-medium';
    return 'card-standard';
  };

  const cardVariant = getCardVariant(index);
  const primaryImage = project.coverImage || project.image || '/assets/gallery_deer.jpg';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelect(project);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(project);
    }
  };

  return (
    <article
      className={`gallery-masonry-card ${cardVariant}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View project details for ${project.title}`}
    >
      <div className="gallery-card-inner">
        {/* Image Container */}
        <div className="gallery-card-media-wrap">
          {!imageLoaded && <div className="gallery-card-img-placeholder shimmer" />}
          <img
            src={primaryImage}
            alt={project.title}
            className={`gallery-card-image ${imageLoaded ? 'is-loaded' : 'is-loading'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Top Category Badge */}
          <div className="gallery-card-top-tag">
            <span className="gallery-card-cat-pill">{project.category}</span>
          </div>

          {/* Quick specs pill on bottom-left before hover */}
          {(project.printingTechnology || project.materials?.[0]) && (
            <div className="gallery-card-tech-tag">
              <Cpu size={12} className="tag-icon" />
              <span>{project.printingTechnology || project.materials?.[0]}</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="gallery-card-hover-overlay">
            {/* View Project Floating Action Icon */}
            <div className="gallery-card-action-circle" title="View Project Details">
              <Eye size={18} />
            </div>

            {/* Content info on hover */}
            <div className="gallery-card-hover-info">
              <span className="gallery-hover-cat">{project.category}</span>
              <h3 className="gallery-hover-title">{project.title}</h3>
              {project.shortDescription && (
                <p className="gallery-hover-desc">{project.shortDescription}</p>
              )}

              {/* View Project Pill Button */}
              <div className="gallery-hover-action-btn">
                <span>View Project</span>
                <ArrowUpRight size={15} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Static Card Footer (Ensures accessibility and mobile readability) */}
        <div className="gallery-card-footer">
          <div className="gallery-card-footer-info">
            <h4 className="gallery-card-footer-title">{project.title}</h4>
            <div className="gallery-card-footer-meta">
              <span className="footer-meta-category">{project.category}</span>
              {project.dimensions && (
                <>
                  <span className="meta-bullet">•</span>
                  <span className="footer-meta-dim">{project.dimensions}</span>
                </>
              )}
            </div>
          </div>
          <button
            type="button"
            className="gallery-card-expand-icon-btn"
            aria-label={`Open details for ${project.title}`}
          >
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};

