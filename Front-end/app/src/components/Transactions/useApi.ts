export interface Portfolio {
    id: number;
    symbol: string;
    name: string;
    shares: number;
    value: number;
    change: number;
    averagePrice: number;
    currentPrice: number;
    totalReturn: number;
  }
  
  export interface PortfolioStats {
    totalValue: number;
    todayChange: number;
    totalReturn: number;
    totalPositions: number;
  }
  
  export interface Transaction {
    id: number;
    symbol: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    price: number;
    totalAmount: number;
    status: string;
    date: string;
  }