import { apiClient } from './client';
import { Category } from '../types/category';

export const categoryApi = {
  async getAll(): Promise<{ success: boolean; data: Category[] }> {
    return apiClient.get('/categories');
  },
  async getBySlug(slug: string): Promise<{ success: boolean; data: Category }> {
    return apiClient.get(`/categories/${slug}`);
  },
};

