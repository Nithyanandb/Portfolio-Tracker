export interface StockData {
    symbol: string;
    price: string;
    change: string;
    changePercent: string;
    volume: string;
    previousClose: string;
    open: string;
    high: string;
    low: string;
  }
  
  export interface MarketOverview {
    marketStatus: string;
    totalVolume: string;
    totalTrades: string;
    marketCap: string;
  }
  
  export interface CompanyMetrics {
    name: string;
    symbol: string;
    price: string;
    change: string;
    volume: string;
    marketCap: string;
    dayRange: string;
    yearRange: string;
  }