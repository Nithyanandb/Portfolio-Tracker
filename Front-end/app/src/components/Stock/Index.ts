export interface IndexData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  previousClose: number;
  timestamp: number;
  region: string;
}

export interface IndexDataResponse {
  [region: string]: IndexData[];
}
