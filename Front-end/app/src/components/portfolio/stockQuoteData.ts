import { API_CONFIG } from '../config/API_CONFIG';
import { fetchWithCache } from '../types/apiUtils';
import type { StockQuote } from '../types/stockTypes';

export const fetchQuote = async (symbol: string): Promise<StockQuote | null> => {
  try {
    const data = await fetchWithCache(API_CONFIG.BASE_URL, {
      function: API_CONFIG.ENDPOINTS.QUOTE,
      symbol,
      apikey: API_CONFIG.API_KEY
    });

    const quote = data['Global Quote'];
    return {
      symbol,
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      avgVolume: parseInt(quote['07. latest trading day']),
      marketCap: parseFloat(quote['08. previous close']) * parseInt(quote['06. volume']),
      peRatio: 0, // Would need additional API call
      week52High: 0, // Would need additional API call
      week52Low: 0, // Would need additional API call
      dividendYield: 0, // Would need additional API call
      beta: 0 // Would need additional API call
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
};