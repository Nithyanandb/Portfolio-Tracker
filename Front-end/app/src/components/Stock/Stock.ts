export interface Stock {
    id: string;
    symbol: string;
    name: string;
    price: number;
    quantity: number;
    lastUpdated: string;
  }

export const API_BASE_URL = 'http://localhost:2000';

export const API_ENDPOINTS = {
  TRANSACTIONS: {
    BUY: '/transaction/buy',
    SELL: '/transaction/sell',
    ALL: '/transaction/all',
  },
} as const;