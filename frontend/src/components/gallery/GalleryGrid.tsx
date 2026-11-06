import React from 'react';
import { GalleryItem } from '../../types/gallery';
import { GalleryCard } from './GalleryCard';

export interface GalleryGridProps {
  projects: GalleryItem[];
  onSelectProject: (project: GalleryItem) => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ projects, onSelectProject }) => {
  return (
    <div className="gallery-masonry-wrapper">
      <div className="gallery-masonry-layout">
        {projects.map((project, index) => (
          <div key={project._id || project.slug} className="gallery-masonry-col-item">
            <GalleryCard
              project={project}
              index={index}
              onSelect={onSelectProject}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

