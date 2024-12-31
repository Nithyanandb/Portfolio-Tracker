import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { tradingApi } from '../../../../services/tradingApi';
import { createChart, IChartApi } from 'lightweight-charts';

interface TradingChartProps {
  className?: string;
  symbol: string;
  interval?: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ 
  className = '', 
  symbol,
  interval = '1h'
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  const { data: marketData } = useQuery({
    queryKey: ['marketData', symbol, interval],
    queryFn: () => tradingApi.getMarketData(symbol),
    refetchInterval: 5000 // Refresh every 5 seconds
  });

  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        layout: {
          background: { color: 'rgba(255, 255, 255, 0.05)' },
          textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
          vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
          horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (chartRef.current && marketData) {
      // Update chart with new market data
      // Implementation depends on your data structure
    }
  }, [marketData]);

  return (
    <div className={`bg-white/5 rounded-lg p-4 ${className}`}>
      <div ref={chartContainerRef} className="aspect-video" />
    </div>
  );
};

export default TradingChart;