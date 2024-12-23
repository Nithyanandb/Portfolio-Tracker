import { StockData, MarketOverview } from '../types/market';

const API_KEY = 'PK64B7TK3WKUBWBR'; 

export async function fetchStockData(symbol: string): Promise<StockData> {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
  );
  const data = await response.json();
  return data['Global Quote'];
}

export async function fetchMarketOverview(): Promise<MarketOverview> {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=${API_KEY}`
  );
  return await response.json();
}