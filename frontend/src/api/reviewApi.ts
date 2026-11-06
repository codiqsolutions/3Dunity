import { apiClient } from './client';
import { Review } from '../types/review';

export const reviewApi = {
  async getFeatured(): Promise<{ success: boolean; data: Review[] }> {
    return apiClient.get('/reviews/featured');
  },
};

