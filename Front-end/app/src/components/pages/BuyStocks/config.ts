export const API_BASE_URL = 'http://localhost:2000';

export const API_ENDPOINTS = {
  transactions: {
    buy: '/transaction/buy',
    sell: '/transaction/sell',
    history: '/transaction/history',
    portfolio: '/transaction/portfolio',
    performance: '/transaction/portfolio/performance',
  },
} as const;