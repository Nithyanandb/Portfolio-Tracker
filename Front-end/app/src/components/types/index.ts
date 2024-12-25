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