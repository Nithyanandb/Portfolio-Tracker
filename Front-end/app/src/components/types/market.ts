import { ReactNode } from "react";

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
  name: ReactNode;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  timestamp: number;
  region: 'Americas' | 'Europe' | 'Asia-Pacific' | 'China' | 'India' | 'Japan' ;
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
  notes?: ReactNode;
  createdAt: Date;
}