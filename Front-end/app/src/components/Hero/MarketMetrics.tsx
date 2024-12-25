import React, { useState, useEffect } from 'react';
import { WorldIndices } from './WorldIndices';
import { fetchWorldIndices } from '../Service/marketApi';
import type { MarketIndex } from '../types/market';

const MarketMetrics: React.FC = () => {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchWorldIndices();
        setIndices(data);
      } catch (error) {
        console.error('Error fetching indices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="container mx-auto px-4 py-8">
      {/* Hide on mobile screens, visible on larger devices */}
      <div className="hidden md:block">
        <WorldIndices indices={indices} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default MarketMetrics;