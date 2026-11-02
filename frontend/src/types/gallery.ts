export interface GalleryItem {
  _id: string;
  projectId?: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  shortDescription?: string;
  description?: string;
  coverImage: string;
  images: string[];
  videos?: string[];
  materials?: string[];
  printingTechnology?: string;
  dimensions?: string;
  weight?: string;
  surfaceFinish?: string;
  customizationDetails?: string;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  displayOrder: number;
  // Legacy compatibility fields
  image?: string;
  material?: string;
  technology?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryCategoryCount {
  name: string;
  slug: string;
  count: number;
}

export interface GalleryListResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: GalleryItem[];
}
