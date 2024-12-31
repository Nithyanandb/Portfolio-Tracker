import { addDays, format } from 'date-fns';
import type { StockData, PortfolioStock, MarketInsight } from '../types/market';


export const generateMarketData = (days: number): StockData[] => {
  const baseValue = 100;
  const volatility = 0.02;
  
  return Array.from({ length: days }, (_, i) => {
    const date = format(addDays(new Date(), -days + i), 'yyyy-MM-dd');
    const randomChange = (Math.random() - 0.5) * volatility;
    const value = baseValue * (1 + randomChange);
    
    return {
      date,
      value: Number(value.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
      marketCap: Math.floor(Math.random() * 1000000000) + 500000000,
      change24h: Number((randomChange * 100).toFixed(2))
    };
  });
};

export const portfolioStocks: PortfolioStock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 10,
    averagePrice: 175.23,
    currentPrice: 182.45,
    change24h: 1.2
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft',
    quantity: 5,
    averagePrice: 325.45,
    currentPrice: 328.79,
    change24h: -0.8
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet',
    quantity: 8,
    averagePrice: 138.90,
    currentPrice: 142.56,
    change24h: 2.1
  },
  {
    symbol: 'AMZN',
    name: 'Amazon',
    quantity: 12,
    averagePrice: 145.67,
    currentPrice: 148.23,
    change24h: 0.9
  }
];

export const marketInsights: MarketInsight[] = [
  {
    title: 'Total Market Cap',
    value: '$2.85T',
    change: 2.4,
    trend: 'up'
  },
  {
    title: '24h Volume',
    value: '$124.5B',
    change: -1.2,
    trend: 'down'
  },
  {
    title: 'Avg. Transaction',
    value: '$1,234',
    change: 0.8,
    trend: 'up'
  },
  {
    title: 'Active Addresses',
    value: '1.2M',
    change: 5.6,
    trend: 'up'
  }
];