import axios from 'axios';
import { Portfolio, PortfolioStats, Transaction } from './useApi';

const api = axios.create({
  baseURL: 'http://localhost:2000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getPortfolio = () => 
  api.get<Portfolio[]>('/portfolio');

export const getPortfolioStats = () => 
  api.get<PortfolioStats>('/portfolio/stats');

export const executeTransaction = (data: {
  stockSymbol: string;
  stockName: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
}) => api.post(`/transactions/${data.type.toLowerCase()}`, data);

export const getTransactionHistory = () => 
  api.get<Transaction[]>('/transactions/history');