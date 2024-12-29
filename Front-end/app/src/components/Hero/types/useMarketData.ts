import { useState, useEffect } from 'react';
import { MarketData1 } from '../types/market';

export const useMarketData1 = () => {
  const [marketData1, setMarketData1] = useState<MarketData1[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchData = async () => {
    try {
      setIsRefetching(true);
      setLoading(true);
      // Replace with your actual API call
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();
      setMarketData1(data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setLoading(false);
      setIsRefetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    marketData1,
    loading,
    isRefetching,
    refetch: fetchData
  };
};