export interface MarketData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    marketCap: number;
  }
  export interface StockRecommendation {
    symbol: string;
    name: string;
    price: number;
    change: number;
    recommendation: 'buy' | 'sell' | 'hold';
    reason: string;
    targetPrice: number;
    riskLevel: 'low' | 'medium' | 'high';
  }