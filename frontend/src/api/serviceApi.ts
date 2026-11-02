import { apiClient } from './client';
import { Service } from '../types/service';

export interface ServiceResponse {
  success: boolean;
  count: number;
  data: Service[];
}

export interface SingleServiceResponse {
  success: boolean;
  data: Service;
}

export const serviceApi = {
  getAll: async (): Promise<ServiceResponse> => {
    return apiClient.get('/services');
  },

  getBySlug: async (slug: string): Promise<SingleServiceResponse> => {
    return apiClient.get(`/services/${slug}`);
  },
};
