import { ReactNode } from 'react';

export interface MarketData {
    name: ReactNode;
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    high24h?: number;
    low24h?: number;
  }
  
  export interface MarketIndex {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    high: number;
    low: number;
    volume: number;
    timestamp: number;
    region: 'Americas' | 'Europe' | 'Asia-Pacific';
  }
  
  export interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string | string[];
      backgroundColor: string | string[];
    }[];
  }
  
  export interface MarketResponse {
    data: MarketData[];
    timestamp: number;
  }
  
  
  
  
  export interface WatchlistItem {
    id: string;
    userId: string;
    symbol: string;
    alertPrice?: number;
    notes?: string;
    createdAt: Date;
  }

  export interface MarketData1 {
    symbol: string;
    price: number;
    changePercent: number;
  };