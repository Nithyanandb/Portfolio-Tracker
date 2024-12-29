export interface StockQuote {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: number;
  recommendation: Recommendation;
  analysis: string;
  metrics: StockMetrics;
}

export type Recommendation = 'BUY' | 'SELL' | 'HOLD';

export interface StockMetrics {
  open: string;
  high: string;
  low: string;
  volume: string;
  peRatio: string;
  marketCap: string;
  sector: string;
}

export interface AlphaVantageQuote {
  'Global Quote': {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '07. latest trading day': string;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
  };
}

export interface AlphaVantageOverview {
  Symbol: string;
  Name: string;
  Description: string;
  Sector: string;
  Industry: string;
  PERatio: string;
  MarketCapitalization: string;
  EBITDA: string;
  PEGRatio: string;
  Beta: string;
  DividendYield: string;
} 