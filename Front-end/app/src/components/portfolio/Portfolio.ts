import { ReactNode } from "react";

export interface Portfolio {
  id: number;
  symbol: string;
  name: string;
  shares: number;
  averagePrice: number;
  currentPrice: number;
  marketValue: number;
  totalReturn: number;
  change: number;
}


export interface Transaction {
  id: number;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  totalAmount: number;
  date: string;
  status: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface PortfolioHolding {
  name: ReactNode;

  symbol: string;

  quantity: number;

  averagePrice: number;

  currentPrice: number;

  marketValue?: number;

  totalReturn?: number;

}





export interface PortfolioStats {
  totalValue: number;
  todayChange: number;
  totalReturn: number;
  totalPositions: number;
}

export const formatMoney = (value: number): string => {

  return new Intl.NumberFormat('en-US', {

    style: 'currency',

    currency: 'USD'

  }).format(value);

};



export const formatPercent = (value: number): string => {

  return new Intl.NumberFormat('en-US', {

    style: 'percent',

    minimumFractionDigits: 2,

    maximumFractionDigits: 2

  }).format(value / 100);

};