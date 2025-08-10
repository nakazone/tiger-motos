import axios from 'axios';
import { Motorcycle, InventoryResponse, FilterOptions, User, DashboardStats } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  updateProfile: async (data: Partial<User>) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },
  
  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.put('/auth/change-password', { currentPassword, newPassword });
    return response.data;
  },
};

// Public Motorcycle API
export const motorcycleAPI = {
  getAll: async (filters: FilterOptions = {}, page = 1, limit = 12): Promise<InventoryResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    // Add filters as separate parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await api.get(`/motorcycles?${params}`);
    return response.data;
  },
  
  getFeatured: async (): Promise<Motorcycle[]> => {
    const response = await api.get('/motorcycles/featured');
    return response.data;
  },
  
  getById: async (id: string): Promise<Motorcycle> => {
    const response = await api.get(`/motorcycles/${id}`);
    return response.data;
  },
  
  getByBrand: async (brand: string, page = 1, limit = 12): Promise<InventoryResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    const response = await api.get(`/motorcycles/brand/${brand}?${params}`);
    return response.data;
  },
  
  getByCategory: async (category: string, page = 1, limit = 12): Promise<InventoryResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    const response = await api.get(`/motorcycles/category/${category}?${params}`);
    return response.data;
  },
  
  getSearchSuggestions: async (query: string) => {
    const response = await api.get(`/motorcycles/search/suggestions?q=${query}`);
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/motorcycles/stats/overview');
    return response.data;
  },
};

// Admin Motorcycle API
export const adminMotorcycleAPI = {
  getAll: async (filters: FilterOptions = {}, page = 1, limit = 20): Promise<InventoryResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    // Add filters as separate parameters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await api.get(`/admin/motorcycles?${params}`);
    return response.data;
  },
  
  getById: async (id: string): Promise<Motorcycle> => {
    const response = await api.get(`/admin/motorcycles/${id}`);
    return response.data;
  },
  
  create: async (data: Partial<Motorcycle>): Promise<{ message: string; motorcycle: Motorcycle }> => {
    const response = await api.post('/admin/motorcycles', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<Motorcycle>): Promise<{ message: string; motorcycle: Motorcycle }> => {
    const response = await api.put(`/admin/motorcycles/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/admin/motorcycles/${id}`);
    return response.data;
  },
  
  toggleAvailability: async (id: string): Promise<{ message: string; motorcycle: Motorcycle }> => {
    const response = await api.patch(`/admin/motorcycles/${id}/availability`);
    return response.data;
  },
  
  toggleFeatured: async (id: string): Promise<{ message: string; motorcycle: Motorcycle }> => {
    const response = await api.patch(`/admin/motorcycles/${id}/featured`);
    return response.data;
  },
  
  deleteImage: async (id: string, imageIndex: number): Promise<{ message: string; motorcycle: Motorcycle }> => {
    const response = await api.delete(`/admin/motorcycles/${id}/images/${imageIndex}`);
    return response.data;
  },
  
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },
};

export default api; 