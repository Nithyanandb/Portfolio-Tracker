export const API_BASE_URL = 'http://localhost:2000';

export const API_ENDPOINTS = {
  transactions: {
    buy: '/transaction/buy',
    sell: '/transaction/sell',
    history: '/transaction/history',
    portfolio: '/transaction/portfolio'
  }
};

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: API_ENDPOINTS
};