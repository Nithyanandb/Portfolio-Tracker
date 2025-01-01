import { API_BASE_URL } from '../BuyStocks/contants/config';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Stock } from './stockApi';

interface StockChartProps {
  stock: Stock;
  timeFrame: string;
}

export const StockChart: React.FC<StockChartProps> = ({ stock, timeFrame }) => {
  // Chart implementation
  return (
    <div className="w-full h-full">
      {/* Chart implementation */}
    </div>
  );
};

export const getPortfolioHoldings = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolio`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch portfolio');
  }

  const data = await response.json();
  return data.data;
};

export const getPortfolioStats = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolio/stats`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch portfolio stats');
  }

  const data = await response.json();
  return data.data;
};