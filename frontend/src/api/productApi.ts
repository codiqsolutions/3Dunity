import { apiClient } from './client';
import { Product } from '../types/product';
import { ProductReviewsResponse, ReviewSubmissionInput } from '../types/review';

export interface ProductQueryParams {
  category?: string;
  search?: string;
  material?: string;
  availability?: string;
  customizable?: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  technology?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

export const productApi = {
  async getAll(params?: ProductQueryParams): Promise<ProductsResponse> {
    return apiClient.get('/products', { params });
  },

  async getFeatured(limit = 8): Promise<{ success: boolean; data: Product[] }> {
    return apiClient.get('/products/featured', { params: { limit } });
  },

  async getBySlug(slug: string): Promise<{ success: boolean; data: Product }> {
    return apiClient.get(`/products/${slug}`);
  },

  async getRelated(identifier: string, limit = 4): Promise<{ success: boolean; data: Product[] }> {
    return apiClient.get(`/products/${identifier}/related`, { params: { limit } });
  },

  async getReviews(
    identifier: string,
    page = 1,
    limit = 10
  ): Promise<ProductReviewsResponse> {
    return apiClient.get(`/products/${identifier}/reviews`, { params: { page, limit } });
  },

  async addReview(
    identifier: string,
    data: ReviewSubmissionInput
  ): Promise<{ success: boolean; data: any; message: string }> {
    return apiClient.post(`/products/${identifier}/reviews`, data);
  },

  async uploadFiles(files: File[]): Promise<{
    success: boolean;
    data: Array<{
      url: string;
      filename: string;
      originalName: string;
      size: number;
      mimetype: string;
    }>;
  }> {
    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));

    return apiClient.post('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async submitCustomQuote(payload: any): Promise<{ success: boolean; message: string; data: any }> {
    return apiClient.post('/custom-requests', payload);
  },

  async addCartItem(payload: {
    productId: string;
    quantity: number;
    selectedMaterial?: string;
    selectedColor?: string;
    selectedSize?: string;
    customDimensions?: any;
    customText?: string;
    uploadedFiles?: string[];
  }): Promise<{ success: boolean; message: string; data: any; unitPrice?: number }> {
    return apiClient.post('/cart/items', payload);
  },
};
