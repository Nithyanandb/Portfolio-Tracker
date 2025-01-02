import axios from 'axios';
import { ApiResponse, Portfolio, PortfolioStats } from './Portfolio';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:2000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Important for handling cookies
});

// Add auth token to requests
api.interceptors.request.use(config => {
  const authData = localStorage.getItem('auth');
  if (authData) {
    const { token } = JSON.parse(authData);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const getPortfolio = () => 
  api.get<ApiResponse<Portfolio[]>>('/portfolio');

export const getPortfolioStats = () => 
  api.get<ApiResponse<PortfolioStats>>('/portfolio/stats');

// Fetch login activity data
export const fetchLoginActivity = () => 
  api.get<ApiResponse<{ date: string; count: number }[]>>('/api/user/login-activity');

// Add error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;