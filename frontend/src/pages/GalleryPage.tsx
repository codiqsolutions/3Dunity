import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { galleryApi } from '../api/galleryApi';
import { GalleryItem, GalleryCategoryCount } from '../types/gallery';
import { Product } from '../types/product';
import { GalleryHero } from '../components/gallery/GalleryHero';
import { GalleryCategoryNavigation } from '../components/gallery/GalleryCategoryNavigation';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { GalleryProjectModal } from '../components/gallery/GalleryProjectModal';
import { GalleryCTA } from '../components/gallery/GalleryCTA';
import { GallerySkeleton } from '../components/gallery/GallerySkeleton';
import { GalleryEmptyState } from '../components/gallery/GalleryEmptyState';
import { GalleryPagination } from '../components/gallery/GalleryPagination';
import { SearchModal } from '../components/home/SearchModal';
import { ProductQuickViewModal } from '../components/home/ProductQuickViewModal';
import { AlertCircle, RefreshCw } from 'lucide-react';

const FALLBACK_CATEGORIES: GalleryCategoryCount[] = [
  { name: 'All Projects', slug: 'all', count: 12 },
  { name: 'Home Decor', slug: 'home-decor', count: 4 },
  { name: 'Personalized Gifts', slug: 'personalized-gifts', count: 2 },
  { name: 'Toys & Figures', slug: 'toys-figures', count: 2 },
  { name: 'Architectural Models', slug: 'architectural-models', count: 2 },
  { name: 'Engineering & Prototypes', slug: 'engineering-prototypes', count: 1 },
  { name: 'Custom Creations', slug: 'custom-creations', count: 1 },
];

interface GalleryPageProps {
  isSearchOpen?: boolean;
  onCloseSearch?: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  isSearchOpen = false,
  onCloseSearch = () => {},
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state
  const activeCategory = searchParams.get('category') || 'all';
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const projectParam = searchParams.get('project');

  // Component state
  const [categories, setCategories] = useState<GalleryCategoryCount[]>(FALLBACK_CATEGORIES);
  const [projects, setProjects] = useState<GalleryItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal project details state
  const [selectedProject, setSelectedProject] = useState<GalleryItem | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(-1);

  // Global search quick view state
  const [searchSelectedProduct, setSearchSelectedProduct] = useState<Product | null>(null);

  // 1. Fetch Categories & Counts
  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      try {
        const res = await galleryApi.getCategories();
        if (isMounted && res.data && res.data.length > 0) {
          setCategories(res.data);
        }
      } catch (err) {
        console.warn('Could not fetch dynamic gallery categories, using predefined categories:', err);
      }
    };
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Fetch Projects for active Category and Page
  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await galleryApi.getAll({
        category: activeCategory,
        page: currentPage,
        limit: 12,
      });

      if (res && res.data) {
        setProjects(res.data);
        setTotalItems(res.total ?? res.data.length);
        setTotalPages(res.totalPages ?? 1);

        // If projectParam exists in URL, open matching project in modal
        if (projectParam) {
          const matchIndex = res.data.findIndex(
            (p) => p.slug === projectParam || p._id === projectParam
          );
          if (matchIndex !== -1) {
            setSelectedProject(res.data[matchIndex]);
            setSelectedProjectIndex(matchIndex);
          }
        }
      }
    } catch (err: any) {
      console.error('Failed to load gallery projects:', err);
      setError(err.message || 'Unable to retrieve gallery creations. Please check your network.');
    } finally {
      setLoading(false);
    }
  }, [activeCategory, currentPage, projectParam]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Handle category selection
  const handleSelectCategory = (categorySlug: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (categorySlug === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', categorySlug);
    }
    nextParams.delete('page');
    nextParams.delete('project');
    setSearchParams(nextParams);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', newPage.toString());
    setSearchParams(nextParams);

    // Smooth scroll to top of gallery section
    const el = document.getElementById('gallery-projects-grid');
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 120;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  // Handle card click -> opens modal
  const handleOpenProjectModal = (project: GalleryItem) => {
    const idx = projects.findIndex((p) => p._id === project._id || p.slug === project.slug);
    setSelectedProject(project);
    setSelectedProjectIndex(idx !== -1 ? idx : 0);

    // Optionally update URL query param
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('project', project.slug);
    setSearchParams(nextParams, { replace: true });
  };

  // Close modal
  const handleCloseProjectModal = () => {
    setSelectedProject(null);
    setSelectedProjectIndex(-1);

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('project');
    setSearchParams(nextParams, { replace: true });
  };

  // Navigate to previous project in modal
  const handlePrevProject = () => {
    if (projects.length === 0) return;
    const prevIdx = selectedProjectIndex > 0 ? selectedProjectIndex - 1 : projects.length - 1;
    const prevProj = projects[prevIdx];
    setSelectedProject(prevProj);
    setSelectedProjectIndex(prevIdx);

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('project', prevProj.slug);
    setSearchParams(nextParams, { replace: true });
  };

  // Navigate to next project in modal
  const handleNextProject = () => {
    if (projects.length === 0) return;
    const nextIdx = selectedProjectIndex < projects.length - 1 ? selectedProjectIndex + 1 : 0;
    const nextProj = projects[nextIdx];
    setSelectedProject(nextProj);
    setSelectedProjectIndex(nextIdx);

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('project', nextProj.slug);
    setSearchParams(nextParams, { replace: true });
  };

  // Active Category Name
  const currentCategoryObj = categories.find(
    (c) => c.slug.toLowerCase() === activeCategory.toLowerCase()
  );
  const currentCategoryName = currentCategoryObj ? currentCategoryObj.name : 'All Projects';

  return (
    <main className="gallery-page-main">
      {/* 1. Gallery Hero Section */}
      <GalleryHero />

      {/* 2. Horizontal Category Filter Navigation */}
      <GalleryCategoryNavigation
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        totalCount={categories.find((c) => c.slug === 'all')?.count || totalItems}
      />

      {/* 3. Main Gallery Masonry Section */}
      <section
        id="gallery-projects-grid"
        className="gallery-main-section"
        aria-label="Gallery Creations"
      >
        <div className="container">
          {/* Section Sub-Header */}
          <div className="gallery-section-bar">
            <div>
              <h2 className="gallery-active-category-title">{currentCategoryName}</h2>
              <span className="gallery-active-count">
                {loading
                  ? 'Loading creations...'
                  : `${totalItems} ${totalItems === 1 ? 'project' : 'projects'} showcased`}
              </span>
            </div>
          </div>

          {/* Loading Skeletons */}
          {loading && <GallerySkeleton />}

          {/* Error State */}
          {!loading && error && (
            <div className="gallery-error-card" role="alert">
              <AlertCircle size={36} color="#EF4444" style={{ marginBottom: '0.75rem' }} />
              <h3 style={{ color: 'var(--color-navy)', marginBottom: '0.45rem' }}>
                Failed to load gallery projects
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
                {error}
              </p>
              <button onClick={() => loadProjects()} className="gallery-retry-btn">
                <RefreshCw size={15} />
                <span>Retry Loading</span>
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && projects.length === 0 && (
            <GalleryEmptyState
              categoryName={currentCategoryName}
              onReset={() => handleSelectCategory('all')}
            />
          )}

          {/* Asymmetric Masonry Gallery Grid */}
          {!loading && !error && projects.length > 0 && (
            <>
              <GalleryGrid
                projects={projects}
                onSelectProject={handleOpenProjectModal}
              />

              {/* Pagination */}
              <GalleryPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={12}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </section>

      {/* 4. Project Detail Modal */}
      <GalleryProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseProjectModal}
        onPrevProject={handlePrevProject}
        onNextProject={handleNextProject}
        hasPrev={projects.length > 1}
        hasNext={projects.length > 1}
        currentIndex={selectedProjectIndex >= 0 ? selectedProjectIndex : 0}
        totalProjects={projects.length}
      />

      {/* 5. Custom Project Call-To-Action */}
      <GalleryCTA />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={onCloseSearch}
        onSelectProduct={(p) => setSearchSelectedProduct(p)}
      />

      {/* Quick View Modal for search results */}
      <ProductQuickViewModal
        product={searchSelectedProduct}
        isOpen={!!searchSelectedProduct}
        onClose={() => setSearchSelectedProduct(null)}
      />
    </main>
  );
};

export default GalleryPage;

