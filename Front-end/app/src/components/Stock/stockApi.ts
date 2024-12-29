import { API_CONFIG, StockQuote } from '../config/API_CONFIG';

export const stockApi = {
  async getQuote(symbol: string) {
    try {
      const response = await fetch(API_CONFIG.getEndpointUrl('QUOTE', symbol));
      const data: StockQuote = await response.json();
      
      // Transform the data to match our app's format
      const quote = data['Global Quote'];
      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: parseInt(quote['06. volume']),
        high: parseFloat(quote['03. high']),
        low: parseFloat(quote['04. low']),
        previousClose: parseFloat(quote['08. previous close']),
        lastUpdated: quote['07. latest trading day']
      };
    } catch (error) {
      console.error('Error fetching stock quote:', error);
      throw error;
    }
  },

  async getNews() {
    try {
      const response = await fetch(API_CONFIG.getEndpointUrl('NEWS'));
      const data = await response.json();
      return data.feed?.slice(0, 10) || []; // Return latest 10 news items
    } catch (error) {
      console.error('Error fetching market news:', error);
      throw error;
    }
  },

  async searchSymbols(query: string) {
    try {
      const response = await fetch(API_CONFIG.getEndpointUrl('SEARCH', query));
      const data = await response.json();
      return data.bestMatches || [];
    } catch (error) {
      console.error('Error searching symbols:', error);
      throw error;
    }
  }
};