import { useState, useEffect, useCallback } from 'react';
import type { MarketData, StockRecommendation } from '../types/markets';

export const useMarketData = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [recommendations, setRecommendations] = useState<StockRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch market data
      const marketResponse = await fetch('http://localhost:2000/api/market/data');
      if (!marketResponse.ok) throw new Error('Failed to fetch market data');
      const marketData = await marketResponse.json();
      setMarketData(marketData);

      // Fetch recommendations
      const recsResponse = await fetch('http://localhost:2000/api/market/recommendations');
      if (!recsResponse.ok) throw new Error('Failed to fetch recommendations');
      const recommendations = await recsResponse.json();
      setRecommendations(recommendations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    marketData,
    recommendations,
    isLoading,
    error,
    refreshData: fetchData,
  };
};