export interface HistoricalDataPoint {
  timestamp: number;
  price: number;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  timestamp: number;
  historicalData?: HistoricalDataPoint[];
  region?: string;
}