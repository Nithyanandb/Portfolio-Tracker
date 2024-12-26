// API Configuration
export const API_CONFIG = {
    BASE_URL: 'https://www.alphavantage.co/query',
    API_KEY: process.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo',
    ENDPOINTS: {
      TIME_SERIES_DAILY: 'TIME_SERIES_DAILY',
      QUOTE: 'GLOBAL_QUOTE',
      COMPANY_INFO: 'OVERVIEW',
      TECHNICAL_INDICATORS: 'TECHNICAL_INDICATORS'
    },
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  };