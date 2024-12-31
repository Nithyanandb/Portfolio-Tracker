// Stock Data Types
export interface StockData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adjustedClose: number;
    dividendAmount: number;
    splitCoefficient: number;
  }
  
  export interface StockQuote {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    avgVolume: number;
    marketCap: number;
    peRatio: number;
    week52High: number;
    week52Low: number;
    dividendYield: number;
    beta: number;
  }
  
  export interface CompanyInfo {
    symbol: string;
    name: string;
    description: string;
    sector: string;
    industry: string;
    country: string;
    employees: number;
    ceo: string;
    website: string;
    exchange: string;
  }
  
  export interface TechnicalIndicators {
    rsi: number;
    macd: {
      macdLine: number;
      signalLine: number;
      histogram: number;
    };
    sma: {
      sma20: number;
      sma50: number;
      sma200: number;
    };
    bollingerBands: {
      upper: number;
      middle: number;
      lower: number;
    };
  }