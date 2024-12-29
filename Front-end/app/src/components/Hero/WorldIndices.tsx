import React from 'react';
import { motion } from 'framer-motion';
import { IndexTable } from './IndexTable';
import type { MarketIndex } from '../types/market';
import { Globe } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../../config/API_CONFIG';

interface WorldIndicesProps {
  indices?: MarketIndex[];
}

export const WorldIndices: React.FC<WorldIndicesProps> = () => {
  const { data: indices, isLoading } = useQuery({
    queryKey: ['world-indices'],
    queryFn: () => fetch(API_CONFIG.getEndpointUrl('INDICES')).then(res => res.json()),
    refetchInterval: API_CONFIG.CACHE_DURATION,
  });

  const regions = {
    americas: indices?.filter((index: { region: string; }) => index?.region === 'Americas') || [],
    europe: indices?.filter((index: { region: string; }) => index?.region === 'Europe') || [],
    asiaPacific: indices?.filter((index: { region: string; }) => index?.region === 'Asia-Pacific') || [],
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/10">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-medium text-white">World Markets</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="w-6 h-6 text-white/50" />
            </motion.div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(regions).map(([region, indices]) => (
              <motion.section
                key={region}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-white tracking-[0.2em] font-light uppercase">
                  {region.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="bg-white/5 backdrop-blur-xl rounded-lg overflow-hidden">
                  <IndexTable indices={indices} />
                </div>
              </motion.section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldIndices;