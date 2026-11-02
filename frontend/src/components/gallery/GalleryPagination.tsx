import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
}

export const GalleryPagination: React.FC<GalleryPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="gallery-pagination-wrapper" aria-label="Gallery pagination">
      {/* Summary indicator */}
      <div className="gallery-pagination-summary">
        Showing <span className="highlight-num">{startItem}-{endItem}</span> of{' '}
        <span className="highlight-num">{totalItems}</span> creations
      </div>

      {/* Pages controls */}
      <div className="gallery-pagination-controls">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-nav-btn prev"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        {/* Page Number Buttons */}
        <div className="pagination-pages-group">
          {pages.map((p) => {
            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={isActive ? 'page' : undefined}
                className={`pagination-page-btn ${isActive ? 'is-active' : ''}`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-nav-btn next"
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
};

