import { API_CONFIG } from '../config/api.config';
import { MarketIndex } from '../types/market';

export const fetchMarketIndex = async (symbol: string): Promise<MarketIndex> => {
  const url = `${API_CONFIG.BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_CONFIG.ALPHA_VANTAGE_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const quote = data['Global Quote'];
    
    if (!quote) {
      throw new Error('No data available');
    }

    return {
      symbol,
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      timestamp: new Date().getTime(),
      volume: parseInt(quote['06. volume'], 10)
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    throw error;
  }
};