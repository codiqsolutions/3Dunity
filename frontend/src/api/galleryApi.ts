import { apiClient } from './client';
import { GalleryItem, GalleryCategoryCount, GalleryListResponse } from '../types/gallery';

export interface GalleryQueryParams {
  category?: string;
  page?: number;
  limit?: number;
  featured?: boolean;
  search?: string;
}

export const galleryApi = {
  getAll: async (params?: GalleryQueryParams): Promise<GalleryListResponse> => {
    return apiClient.get('/gallery', { params });
  },

  getCategories: async (): Promise<{ success: boolean; data: GalleryCategoryCount[] }> => {
    return apiClient.get('/gallery/categories');
  },

  getFeatured: async (limit = 6): Promise<{ success: boolean; count: number; data: GalleryItem[] }> => {
    return apiClient.get('/gallery/featured', { params: { limit } });
  },

  getBySlug: async (slug: string): Promise<{ success: boolean; data: GalleryItem }> => {
    return apiClient.get(`/gallery/${slug}`);
  },

  getById: async (id: string): Promise<{ success: boolean; data: GalleryItem }> => {
    return apiClient.get(`/gallery/${id}`);
  },
};
