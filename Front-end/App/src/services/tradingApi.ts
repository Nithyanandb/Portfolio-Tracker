import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export interface TradingPosition {
  symbol: string;
  type: 'ALGO' | 'OPTION';
  status: 'ACTIVE' | 'PENDING' | 'CLOSED';
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  pnl: number;
  pnlPercentage: number;
}

export const tradingApi = {
  // Algo Trading endpoints
  startAlgoStrategy: async (params: {
    strategyId: string;
    symbol: string;
    config: Record<string, any>;
  }) => {
    return axios.post(`${API_BASE_URL}/algo/start`, params);
  },

  stopAlgoStrategy: async (strategyId: string) => {
    return axios.post(`${API_BASE_URL}/algo/stop/${strategyId}`);
  },

  getAlgoPerformance: async (strategyId: string) => {
    return axios.get(`${API_BASE_URL}/algo/performance/${strategyId}`);
  },

  // Options Trading endpoints
  getOptionChain: async (symbol: string, expiryDate: string) => {
    return axios.get(`${API_BASE_URL}/options/chain`, {
      params: { symbol, expiryDate }
    });
  },

  placeOptionOrder: async (params: {
    symbol: string;
    type: 'CALL' | 'PUT';
    strike: number;
    expiry: string;
    quantity: number;
  }) => {
    return axios.post(`${API_BASE_URL}/options/order`, params);
  },

  // Shared endpoints
  getMarketData: async (symbol: string) => {
    return axios.get(`${API_BASE_URL}/market/data/${symbol}`);
  },

  getPositions: async () => {
    return axios.get<TradingPosition[]>(`${API_BASE_URL}/positions`);
  }
}; 