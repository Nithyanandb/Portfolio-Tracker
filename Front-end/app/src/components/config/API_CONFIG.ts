/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';

// API Response Types
const stockQuoteSchema = z.object({
  "Global Quote": z.object({
    "01. symbol": z.string(),
    "02. open": z.string(),
    "03. high": z.string(),
    "04. low": z.string(),
    "05. price": z.string(),
    "06. volume": z.string(),
    "07. latest trading day": z.string(),
    "08. previous close": z.string(),
    "09. change": z.string(),
    "10. change percent": z.string()
  })
});

export type StockQuote = z.infer<typeof stockQuoteSchema>;

export const API_CONFIG = {
  BASE_URL: 'https://www.alphavantage.co/query',
  API_KEY: 'NVJ4UOWBV4BCOGD5',

  ENDPOINTS: {
    QUOTE: 'GLOBAL_QUOTE',
    SEARCH: 'SYMBOL_SEARCH',
    NEWS: 'NEWS_SENTIMENT',
    INTRADAY: 'TIME_SERIES_INTRADAY',
    DAILY: 'TIME_SERIES_DAILY',
    COMPANY_OVERVIEW: 'OVERVIEW'
  },

  CACHE_DURATION: 1 * 60 * 1000, // 1 minute cache (Alpha Vantage has rate limits)

  getEndpointUrl: (endpoint: keyof typeof API_CONFIG.ENDPOINTS, symbol?: string) => {
    const baseParams = `apikey=${API_CONFIG.API_KEY}&function=${API_CONFIG.ENDPOINTS[endpoint]}`;
    
    switch (endpoint) {
      case 'QUOTE':
        return `${API_CONFIG.BASE_URL}?${baseParams}&symbol=${symbol}`;
      case 'SEARCH':
        return `${API_CONFIG.BASE_URL}?${baseParams}&keywords=${symbol}`;
      case 'NEWS':
        return `${API_CONFIG.BASE_URL}?${baseParams}&tickers=${symbol}`;
      case 'INTRADAY':
        return `${API_CONFIG.BASE_URL}?${baseParams}&symbol=${symbol}&interval=5min`;
      case 'DAILY':
        return `${API_CONFIG.BASE_URL}?${baseParams}&symbol=${symbol}`;
      case 'COMPANY_OVERVIEW':
        return `${API_CONFIG.BASE_URL}?${baseParams}&symbol=${symbol}`;
      default:
        throw new Error(`Invalid endpoint: ${endpoint}`);
    }
  }
};