import { useQuery } from '@tanstack/react-query';
import { generateMockMarketData } from '../components/Hero/utils/mockDataGenerator';

export const useWorldIndices = () => {
  return useQuery({
    queryKey: ['worldIndices'],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return generateMockMarketData();
    },
    refetchInterval: 5000, // Refresh every 5 seconds for real-time feel
    staleTime: 2000, // Consider data stale after 2 seconds
  });
};