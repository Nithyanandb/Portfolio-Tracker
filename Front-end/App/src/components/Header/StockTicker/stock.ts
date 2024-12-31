export interface Stock {
    symbol: string;
    price: string;
    change: string;
    trending: boolean;
  }
  
  export interface StockTickerProps {
    stocks: Stock[];
  }