import React, { useEffect, useState } from 'react';
import { Area } from '@ant-design/plots';
import { Stock } from './stockApi';

interface StockChartProps {
  stock: Stock;
  timeFrame: string;
}

interface ChartData {
  time: string;
  price: number;
}

export const StockChart: React.FC<StockChartProps> = ({ stock, timeFrame }) => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    generateChartData();
  }, [stock, timeFrame]);

  const generateChartData = () => {
    const currentPrice = stock.price;
    const points = getTimeFramePoints(timeFrame);
    const historicalData: ChartData[] = [];
    
    for (let i = points; i >= 0; i--) {
      const time = getTimeForPoint(i, timeFrame);
      const randomVariation = (Math.random() - 0.5) * 2;
      const price = currentPrice * (1 + randomVariation / 100);
      
      historicalData.push({
        time: time.toLocaleString(),
        price: Number(price.toFixed(2))
      });
    }
    
    setData(historicalData);
  };

  const getTimeFramePoints = (tf: string): number => {
    switch (tf) {
      case '1D': return 24;
      case '1W': return 7;
      case '1M': return 30;
      case '3M': return 90;
      case '1Y': return 365;
      case 'ALL': return 1095;
      default: return 24;
    }
  };

  const getTimeForPoint = (point: number, tf: string): Date => {
    const date = new Date();
    switch (tf) {
      case '1D':
        date.setHours(date.getHours() - point);
        break;
      case '1W':
        date.setDate(date.getDate() - point);
        break;
      case '1M':
        date.setDate(date.getDate() - point);
        break;
      case '3M':
        date.setDate(date.getDate() - point);
        break;
      case '1Y':
        date.setDate(date.getDate() - point);
        break;
      case 'ALL':
        date.setDate(date.getDate() - point);
        break;
    }
    return date;
  };

  const config = {
    data,
    xField: 'time',
    yField: 'price',
    smooth: true,
    animation: true,
    xAxis: {
      type: 'time',
      tickCount: 5,
      label: {
        style: {
          fill: '#ffffff80',
          fontSize: 12,
        },
      },
      grid: {
        line: {
          style: {
            stroke: '#ffffff10',
          },
        },
      },
    },
    yAxis: {
      label: {
        formatter: (v: string) => `₹${Number(v).toLocaleString()}`,
        style: {
          fill: '#ffffff80',
          fontSize: 12,
        },
      },
      grid: {
        line: {
          style: {
            stroke: '#ffffff10',
          },
        },
      },
    },
    tooltip: {
      customContent: (title: string, items: any[]) => {
        if (!items?.length) return '';
        const data = items[0];
        return `
          <div style="padding: 8px 12px;">
            <div style="color: white;">${title}</div>
            <div style="color: #1677ff;">₹${Number(data?.value).toLocaleString()}</div>
          </div>
        `;
      },
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#1677ff00 0.5:#1677ff40 1:#1677ff',
      };
    },
  };

  return (
    <div className="w-full h-full min-h-[400px]">
      <Area {...config} />
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