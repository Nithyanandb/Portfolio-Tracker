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

export interface MarketData {
  graphData: number[];
  graphLabels: string[];
  isPositive: boolean;
  symbol: string;
  price: number;
  changePercent: number;
}