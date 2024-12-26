// Stock market data service
export interface Stock {
    symbol: string;
    name: string;
    price: number;
  }
  
  const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM'];
  const API_KEY = '1f4b65858bb4480e8758cd897b1acc88'; // Consider moving this to environment variables
  
  export const fetchStocks = async (): Promise<Stock[]> => {
    try {
      const promises = STOCK_SYMBOLS.map(async (symbol) => {
        try {
          const response = await fetch(
            `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${API_KEY}`
          );
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          // Check if we got valid data
          if (data.code === 400 || data.status === 'error') {
            throw new Error(data.message || 'API Error');
          }

          return {
            symbol: data.symbol,
            name: data.name || symbol,
            price: parseFloat(data.close) || 0,
          };
        } catch (error) {
          console.error(`Error fetching ${symbol}:`, error);
          // Return fallback data for this stock
          return {
            symbol: symbol,
            name: symbol,
            price: 0,
          };
        }
      });

      const results = await Promise.all(promises);
      
      // Filter out any invalid results
      return results.filter(stock => stock.price > 0);
      
    } catch (error) {
      console.error('Error fetching stocks:', error);
      // Return mock data as fallback
      return [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 178.72 },
        { symbol: 'MSFT', name: 'Microsoft Corporation', price: 338.11 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 125.23 },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 127.74 },
        { symbol: 'META', name: 'Meta Platforms Inc.', price: 308.65 },
      ];
    }
  };