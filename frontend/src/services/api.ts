// frontend/src/services/api.ts
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 — token expired / invalid
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      // Only redirect if we're on an admin page
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  register: (data: { email: string; password: string }) =>
    api.post('/api/auth/register', data),
  getMe: () => api.get('/api/auth/me'),
  logout: () => api.post('/api/auth/logout'),
};

// ─── Products ──────────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll: (params?: Record<string, string | number>) =>
    api.get('/api/products', { params }),
  getBySlug: (slug: string) => api.get(`/api/products/${slug}`),
  getById: (id: string) => api.get(`/api/products/id/${id}`),
  create: (data: FormData | Record<string, unknown>) =>
    api.post('/api/products', data),
  update: (id: string, data: FormData | Record<string, unknown>) =>
    api.put(`/api/products/${id}`, data),
  delete: (id: string) => api.delete(`/api/products/${id}`),
};

// ─── Categories ───────────────────────────────────────────────────────────────
export const categoriesAPI = {
  getAll: () => api.get('/api/categories'),
  create: (data: { name: string; slug?: string; description?: string }) =>
    api.post('/api/categories', data),
  delete: (id: string) => api.delete(`/api/categories/${id}`),
};

// ─── Inquiries ────────────────────────────────────────────────────────────────
export const inquiriesAPI = {
  create: (data: Record<string, unknown>) => api.post('/api/inquiries', data),
  getAll: (params?: Record<string, string>) =>
    api.get('/api/inquiries', { params }),
  updateStatus: (id: string, status: string, adminNote?: string) =>
    api.put(`/api/inquiries/${id}/status`, { status, adminNote }),
};

// ─── Settings ─────────────────────────────────────────────────────────────────
export const settingsAPI = {
  get: () => api.get('/api/settings'),
  update: (data: Record<string, unknown>) => api.put('/api/settings', data),
};

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const dashboardAPI = {
  getStats: () => api.get('/api/dashboard/stats'),
};

// ─── Upload ───────────────────────────────────────────────────────────────────
export const uploadAPI = {
  upload: (file: File, folder = '3dunity/products') => {
    const form = new FormData();
    form.append('image', file);
    form.append('folder', folder);
    return api.post('/api/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default api;

