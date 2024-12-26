export interface Stock {
  id: number;
  symbol: string;
  name: string;
  price: number;
  quantity: number;
  lastUpdated: string;
}

export interface StockTransaction {
  stockId: number;
  quantity: number;
  price: number;
  type: 'BUY' | 'SELL';
}