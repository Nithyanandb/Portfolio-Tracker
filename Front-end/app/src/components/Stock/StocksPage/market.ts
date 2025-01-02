export interface MarketData {
  c: number; // Current price
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
}

export interface StockHolding {
  symbol: string;
  companyName: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  change: number;
  changePercent: number;
  marketValue: number;
  dayGain: number;
  totalGain: number;
  totalGainPercent: number;
}

export interface StockChart {
  c: number[]; // List of close prices
  t: number[]; // List of timestamps
}

export interface Stock {
  currency: string; // Currency of the stock
  description: string; // Description of the stock
  displaySymbol: string; // Display symbol of the stock
  figi: string; // FIGI identifier
  isin: string | null; // ISIN identifier
  mic: string; // Market Identifier Code
  shareClassFIGI: string; // Share class FIGI
  symbol: string; // Stock symbol
  symbol2: string; // Secondary symbol
  type: string; // Type of the stock (e.g., Common Stock, ETF, etc.)
  price?: number; // Current price (optional, fetched from /quote endpoint)
  change?: number; // Change in price (optional, fetched from /quote endpoint)
  changePercent?: number; // Change percentage (optional, fetched from /quote endpoint)
  volume?: number; // Volume (optional, fetched from /quote endpoint)
}