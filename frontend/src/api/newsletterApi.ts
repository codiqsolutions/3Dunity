import { apiClient } from './client';

export interface NewsletterResponse {
  success: boolean;
  message: string;
}

export const newsletterApi = {
  subscribe: async (email: string, source = 'homepage_footer'): Promise<NewsletterResponse> => {
    return apiClient.post('/newsletter/subscribe', { email, source });
  },
};

