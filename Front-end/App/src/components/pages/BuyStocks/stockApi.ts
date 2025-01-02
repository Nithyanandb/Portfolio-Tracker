
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  high: number;
  low: number;
  openPrice: number;
  previousClose: number;
  timestamp: number;
}

const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM'];

export const mockStockData: Record<string, string> = {
  'AAPL': 'Apple Inc.',
  'MSFT': 'Microsoft Corporation',
  'GOOGL': 'Alphabet Inc.',
  'AMZN': 'Amazon.com Inc.',
  'META': 'Meta Platforms Inc.',
  'TSLA': 'Tesla Inc.',
  'NVDA': 'NVIDIA Corporation',
  'JPM': 'JPMorgan Chase & Co.'
};

export const stockPrices: Record<string, number> = {
  'AAPL': 180.95,
  'MSFT': 370.95,
  'GOOGL': 142.65,
  'AMZN': 155.34,
  'META': 378.53,
  'TSLA': 203.93,
  'NVDA': 547.10,
  'JPM': 172.28
};

export const fetchStocks = async (): Promise<Stock[]> => {
  try {
    const stocks = await Promise.all(
      STOCK_SYMBOLS.map(async (symbol) => {
        const quote = await finnhubApi.getQuote(symbol);
        return {
          symbol,
          name: mockStockData[symbol],
          price: quote.c,
          change: quote.d,
          percentChange: quote.dp,
          high: quote.h,
          low: quote.l,
          openPrice: quote.o,
          previousClose: quote.pc,
          timestamp: quote.t
        };
      })
    );
    return stocks;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
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

// src/services/finnhubApi.ts
const FINNHUB_API_KEY = "ctksb2pr01qn6d7jeekgctksb2pr01qn6d7jeel0";
const BASE_URL = "https://finnhub.io/api/v1";

export interface FinnhubQuote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price of the day
  pc: number; // Previous close price
  t: number;  // Timestamp
}

export const finnhubApi = {
  async getQuote(symbol: string): Promise<FinnhubQuote> {
    const response = await fetch(
      `${BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    return response.json();
  }
};
