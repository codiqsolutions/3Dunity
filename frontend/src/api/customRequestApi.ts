import { apiClient } from './client';
import { CustomQuoteEstimate, CustomRequestResponse } from '../types/customRequest';

export const customRequestApi = {
  async getEstimate(params: {
    technology: string;
    material: string;
    infillPercentage: number;
    surfaceFinish: string;
    quantity: number;
  }): Promise<{ success: boolean; data: CustomQuoteEstimate }> {
    return apiClient.post('/custom-requests/estimate', params);
  },

  async submitRequest(formData: FormData): Promise<{ success: boolean; data: CustomRequestResponse; message: string }> {
    return apiClient.post('/custom-requests', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

