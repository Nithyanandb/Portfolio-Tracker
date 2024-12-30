import { useQuery } from 'react-query';
import { fetchIndexData } from './api';

const WorldIndices = () => {
  const { data: indexData, isLoading } = useQuery({
    queryKey: ['worldIndices'],
    queryFn: async () => {
      const results = {};
      for (const [region, regionIndices] of Object.entries(indices)) {
        results[region] = await Promise.all(
          regionIndices.map(async (index) => {
            try {
              const data = await fetchIndexData(index.symbol);
              return {
                ...index,
                price: data?.price ?? 0,
                change: data?.change ?? 0,
                changePercent: data?.changePercent ?? 0,
                high: data?.high ?? 0,
                low: data?.low ?? 0,
                volume: data?.volume ?? 0,
                previousClose: data?.previousClose ?? 0,
                timestamp: data?.timestamp ?? Date.now(),
                region: region === 'asiaPacific' ? 'Asia-Pacific' : 
                       region.charAt(0).toUpperCase() + region.slice(1)
              };
            } catch (error) {
              console.error(`Error fetching data for ${index.symbol}:`, error);
              return {
                ...index,
                price: 0,
                change: 0,
                changePercent: 0,
                high: 0,
                low: 0,
                volume: 0,
                previousClose: 0,
                timestamp: Date.now(),
                region: region === 'asiaPacific' ? 'Asia-Pacific' : 
                       region.charAt(0).toUpperCase() + region.slice(1)
              };
            }
          })
        );
      }
      return results;
    },
    refetchInterval: 60000
  });

  // ... rest of the component
};

export default WorldIndices;