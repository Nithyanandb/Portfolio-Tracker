import { useState, useEffect } from 'react';
import { MAJOR_INDICES } from '../constants/marketIndices';
import { fetchMarketIndex } from '../service/marketService';
import { API_CONFIG } from '../config/api.config';
import type { MarketIndex as OriginalMarketIndex } from '../types/market';

interface MarketIndex extends OriginalMarketIndex {
  name: "S&P 500" | "Dow Jones" | "NASDAQ" | "FTSE 100" | "DAX" | "CAC 40" | "Nikkei 225" | "Hang Seng" | "ASX 200";
  region: "Americas" | "Europe" | "Asia-Pacific";
}



export interface LocalMarketIndex {

    symbol: string;
  
    name: string;
  
    region: "Americas" | "Europe" | "Asia-Pacific";
  
    last: number;
  
    change: number;
  
    changePercent: number;
  
    timestamp: number;
  
  }

  
export const useWorldIndices = () => {
  const [indices, setIndices] = useState<LocalMarketIndex[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchIndices = async () => {
      try {
        setIsLoading(true);
        const promises = MAJOR_INDICES.map(index => 
          fetchMarketIndex(index.symbol)
            .then(data => ({
              ...data,
              name: index.name,
              region: index.region
            }))
        );

        const results = await Promise.allSettled(promises);
        
        if (!mounted) return;

        const successfulResults = results
          .filter((result): result is PromiseFulfilledResult<MarketIndex> => 
            result.status === 'fulfilled'
          )
          .map(result => result.value);

        setIndices(successfulResults.map(index => ({
          ...index,
          last: 0, // or any default value
          change: 0, // or any default value
          changePercent: 0, // or any default value
          timestamp: Date.now() // or any default value
        })));

        const failures = results.filter(result => result.status === 'rejected');
        if (failures.length > 0) {
          console.warn(`Failed to fetch ${failures.length} indices`);
        }
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err : new Error('Failed to fetch indices'));
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchIndices();
    const interval = setInterval(fetchIndices, API_CONFIG.REFRESH_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { indices, isLoading, error };
};