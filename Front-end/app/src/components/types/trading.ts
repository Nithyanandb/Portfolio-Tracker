export interface TradeRequest {
    symbol: string;
    quantity: number;
    action: 'buy' | 'sell';
    price?: number;
  }
  
  export interface TradeResponse {
    id: string;
    status: 'completed' | 'pending' | 'failed';
    timestamp: string;
    details: {
      symbol: string;
      quantity: number;
      action: 'buy' | 'sell';
      price: number;
      total: number;
    };
  }