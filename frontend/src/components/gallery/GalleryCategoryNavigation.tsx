import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryCategoryCount } from '../../types/gallery';

export interface GalleryCategoryNavigationProps {
  categories: GalleryCategoryCount[];
  activeCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  totalCount?: number;
}

export const GalleryCategoryNavigation: React.FC<GalleryCategoryNavigationProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  totalCount,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll positions to show/hide scroll chevrons
  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="gallery-nav-wrapper">
      <div className="container">
        <div className="gallery-nav-container">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="gallery-nav-scroll-btn left"
              aria-label="Scroll categories left"
            >
              <ChevronLeft size={16} />
            </button>
          )}

          {/* Horizontally scrollable tabs list */}
          <div
            ref={scrollContainerRef}
            className="gallery-categories-scroll-list"
            onScroll={checkScroll}
            role="tablist"
            aria-label="Gallery category filters"
          >
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.slug.toLowerCase();
              const count = cat.slug === 'all' && totalCount !== undefined ? totalCount : cat.count;

              return (
                <button
                  key={cat.slug}
                  role="tab"
                  aria-selected={isActive}
                  className={`gallery-nav-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => onSelectCategory(cat.slug)}
                >
                  <span className="tab-label">{cat.name}</span>
                  {typeof count === 'number' && (
                    <span className="tab-count-pill">{count}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="gallery-nav-scroll-btn right"
              aria-label="Scroll categories right"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

