import axios from 'axios';
import { ApiResponse, Portfolio, PortfolioStats, Transaction } from './Portfolio';


const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:2000/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ERR_CONNECTION_REFUSED') {
      console.error('Cannot connect to the server. Please check if the backend is running.');
    }
    return Promise.reject(error);
  }
);

export const getPortfolio = () => 
  api.get<ApiResponse<Portfolio[]>>('/portfolio');

export const getPortfolioStats = () => 
  api.get<ApiResponse<PortfolioStats>>('/portfolio/stats');

// export const buyStock = (data: TransactionRequest) => 
//   api.post<ApiResponse<Transaction>>('/transactions/buy', data);

// export const sellStock = (data: TransactionRequest) => 
//   api.post<ApiResponse<Transaction>>('/transactions/sell', data);

export const getTransactions = () => 
  api.get<ApiResponse<Transaction[]>>('/transactions/history');

export default api;