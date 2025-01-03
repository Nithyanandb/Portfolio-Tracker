import axios from 'axios';
import { ApiResponse, Portfolio, PortfolioStats, LoginActivityData } from './Portfolio';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:2000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Enhanced error handling and token management
api.interceptors.request.use(config => {
  const authData = localStorage.getItem('auth');
  if (authData) {
    const { token } = JSON.parse(authData);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Improved response interceptor with better error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth');
      window.location.href = '/login';
    }
    if (error.response?.status === 429) {
      // Rate limiting handling
      console.warn('Rate limit reached');
    }
    return Promise.reject(error);
  }
);

// Enhanced API methods with better typing and error handling
export const portfolioApi = {
  getPortfolio: () => 
    api.get<ApiResponse<Portfolio[]>>('/portfolio'),

  getPortfolioStats: () => 
    api.get<ApiResponse<PortfolioStats>>('/portfolio/stats'),

  getLoginActivity: () => 
    api.get<ApiResponse<LoginActivityData[]>>('/api/user/login-activity'),

  recordLogin: () => 
    api.post<void>('/api/user/record-login'),

  // New methods for better activity tracking
  getDetailedActivity: (startDate: string, endDate: string) =>
    api.get<ApiResponse<LoginActivityData[]>>('/api/user/login-activity/detailed', {
      params: { startDate, endDate }
    }),

  getActivityStats: () =>
    api.get<ApiResponse<ActivityStats>>('/api/user/login-activity/stats')
};

export default portfolioApi;