// Stock market data service
export interface Stock {
    symbol: string;
    name: string;
    price: number;
    change?: number;
    volume?: number;
    high?: number;
    low?: number;
    marketCap?: number;
    previousClose?: number;
    openPrice?: number;
  }
  
  const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM'];
  
  const mockStockData: Record<string, string> = {
    'AAPL': 'Apple Inc.',
    'MSFT': 'Microsoft Corporation',
    'GOOGL': 'Alphabet Inc.',
    'AMZN': 'Amazon.com Inc.',
    'META': 'Meta Platforms Inc.',
    'TSLA': 'Tesla Inc.',
    'NVDA': 'NVIDIA Corporation',
    'JPM': 'JPMorgan Chase & Co.'
  };
  
  let stockPrices: Record<string, number> = {};
  
  // Initialize base prices
  STOCK_SYMBOLS.forEach(symbol => {
    stockPrices[symbol] = Math.random() * 1000 + 100;
  });
  
  export const fetchStocks = async (): Promise<Stock[]> => {
    // Update prices with small random changes
    STOCK_SYMBOLS.forEach(symbol => {
      const previousPrice = stockPrices[symbol];
      const change = previousPrice * (Math.random() - 0.5) * 0.02; // 2% max change
      stockPrices[symbol] = previousPrice + change;
    });
  
    return STOCK_SYMBOLS.map(symbol => ({
      symbol,
      name: mockStockData[symbol],
      price: stockPrices[symbol],
      change: ((stockPrices[symbol] - stockPrices[symbol] * 0.99) / stockPrices[symbol]) * 100,
      volume: Math.floor(Math.random() * 1000000),
      high: stockPrices[symbol] * 1.05,
      low: stockPrices[symbol] * 0.95,
      marketCap: stockPrices[symbol] * 1000000,
      previousClose: stockPrices[symbol] * 0.99,
      openPrice: stockPrices[symbol] * 0.995
    }));
  };
  
  export interface HistoricalData {
    time: string;
    price: number;
  }
  
  export const fetchHistoricalData = async (
    symbol: string, 
    timeFrame: string
  ): Promise<HistoricalData[]> => {
    // In a real app, this would fetch from your backend
    const currentPrice = stockPrices[symbol];
    const points = getTimeFramePoints(timeFrame);
    const data: HistoricalData[] = [];
  
    for (let i = points; i >= 0; i--) {
      const time = getTimeForPoint(i, timeFrame);
      const randomVariation = (Math.random() - 0.5) * 2;
      const price = currentPrice * (1 + randomVariation / 100);
  
      data.push({
        time: time.toISOString(),
        price: Number(price.toFixed(2))
      });
    }
  
    return data;
  };
  
  const getTimeFramePoints = (timeFrame: string): number => {
    switch (timeFrame) {
      case '1D': return 24;
      case '1W': return 7;
      case '1M': return 30;
      case '3M': return 90;
      case '1Y': return 365;
      case 'ALL': return 1095;
      default: return 24;
    }
  };
  
  const getTimeForPoint = (point: number, timeFrame: string): Date => {
    const date = new Date();
    switch (timeFrame) {
      case '1D':
        date.setHours(date.getHours() - point);
        break;
      case '1W':
      case '1M':
      case '3M':
      case '1Y':
      case 'ALL':
        date.setDate(date.getDate() - point);
        break;
    }
    return date;
  };