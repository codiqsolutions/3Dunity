import React from 'react';
import { PackageSearch, RotateCcw } from 'lucide-react';

export interface GalleryEmptyStateProps {
  categoryName?: string;
  onReset: () => void;
}

export const GalleryEmptyState: React.FC<GalleryEmptyStateProps> = ({ categoryName, onReset }) => {
  return (
    <div className="gallery-empty-state-card">
      <div className="empty-state-icon-circle">
        <PackageSearch size={36} color="#087FC3" />
      </div>
      <h3 className="empty-state-title">No Projects Found</h3>
      <p className="empty-state-desc">
        {categoryName && categoryName !== 'All Projects'
          ? `We currently don't have published gallery pieces under "${categoryName}". Check back soon or explore other categories.`
          : 'No gallery creations match your active filter criteria.'}
      </p>
      <button type="button" onClick={onReset} className="empty-state-reset-btn">
        <RotateCcw size={15} />
        <span>View All Projects</span>
      </button>
    </div>
  );
};

