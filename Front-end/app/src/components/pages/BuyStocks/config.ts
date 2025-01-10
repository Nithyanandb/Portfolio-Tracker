export const API_BASE_URL = 'https://production-backend-production.up.railway.app';

export const API_ENDPOINTS = {
  transactions: {
    buy: '/transaction/buy',
    sell: '/transaction/sell',
    history: '/transaction/history',
    portfolio: '/transaction/portfolio',
    performance: '/transaction/portfolio/performance',
  },
} as const;