export interface SearchResult {
    symbol: string;
    name: string;
    stockExchange: string;
    exchangeShortName: string;
  }
  
  export interface User {
    name: string;
    email: string;
    avatar?: string;
  }

  export { default as StockDashboard } from '../Stock/StockDashboard';
export { default as StockRecommendation } from '../Stock/StockRecommendation';