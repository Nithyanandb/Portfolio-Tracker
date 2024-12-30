import { useQuery } from '@tanstack/react-query';
import { fetchIndexData } from '../services/marketData';
import { MARKET_INDICES } from '../constants/marketIndices';
import type { MarketIndex } from '../components/Hero/types/market';

export const useWorldIndices = () => {
  return useQuery({
    queryKey: ['worldIndices'],
    queryFn: async () => {
      const results: Record<string, MarketIndex[]> = {};
      
      for (const [region, indices] of Object.entries(MARKET_INDICES)) {
        results[region] = await Promise.all(
          indices.map(async (index) => {
            const data = await fetchIndexData(index.symbol);
            return {
              ...index,
              ...data,
              region
            } as MarketIndex;
          })
        );
      }
      
      return results;
    },
    refetchInterval: 60000 // Refresh every minute
  });
};