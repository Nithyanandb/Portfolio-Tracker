import { ReactNode } from "react";

// Update the Portfolio interface to match PortfolioResponse
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
  purchaseDate: string;
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
  dailyPerformance: Array<{
    date: string;
    value: number;
  }>;
  totalInvestment: number;
}

export interface DailyPerformance {
  date: string;
  value: number;
  change: number;
}

export interface PortfolioAction {
  id: string;
  type: 'BUY' | 'SELL';
  symbol: string;
  quantity: number;
  price: number;
  timestamp: string;
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