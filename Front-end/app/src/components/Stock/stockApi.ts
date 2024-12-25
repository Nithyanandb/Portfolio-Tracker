import axios from 'axios';

const API_KEY = 'demo'; // Replace with your Alpha Vantage API key
const BASE_URL = 'https://www.alphavantage.co/query';

export interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const fetchStockData = async (symbol: string): Promise<StockData[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        apikey: API_KEY,
      },
    });

    const timeSeriesData = response.data['Time Series (Daily)'];
    return Object.entries(timeSeriesData).map(([date, values]: [string, unknown]) => ({
      date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      volume: parseFloat(values['5. volume']),
    })).slice(0, 30); // Get last 30 days of data
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
};

export const fetchMarketData = async () => {
  // For demo purposes, returning mock data
  // In production, replace with actual API calls
  return [
    { symbol: 'AAPL', price: 173.50, changePercent: 1.2 },
    { symbol: 'TSLA', price: 202.64, changePercent: -1.2 },
    { symbol: 'MSFT', price: 378.85, changePercent: 3.02 },
    { symbol: 'GOOGL', price: 141.80, changePercent: 0.5 },
    { symbol: 'AMZN', price: 175.35, changePercent: -0.8 },
    { symbol: 'META', price: 484.10, changePercent: 2.1 }
  ];
};