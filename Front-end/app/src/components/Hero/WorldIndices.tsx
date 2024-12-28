import React from 'react';
import { motion } from 'framer-motion';
import { IndexTable } from './IndexTable';
import type { MarketIndex } from '../types/market';
import { Globe } from 'lucide-react';

interface WorldIndicesProps {
  indices: MarketIndex[];
  isLoading: boolean;
}

export const WorldIndices: React.FC<WorldIndicesProps> = ({ indices, isLoading }) => {
  const regions = {
    americas: indices.filter(index => index.region === 'Americas'),
    europe: indices.filter(index => index.region === 'Europe'),
    asiaPacific: indices.filter(index => index.region === 'Asia-Pacific'),
    china: indices.filter(index => index.region === 'China'),
    india: indices.filter(index => index.region === 'India'),
    japan: indices.filter(index => index.region === 'Japan'),
  };

  return (
    <div className="relative bg-black/40 backdrop-blur-xl">
      {/* SpaceX-style grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative p-6 space-y-8">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-white" />
          <h2 className="text-xl text-white tracking-[0.2em] font-light">
            GLOBAL MARKETS
          </h2>
        </div>

        {isLoading ? (
          <div className="h-48 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-white border-t-transparent"
            />
          </div>
        ) : (
          <div className="space-y-8">
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
                <div className="bg-white/5 backdrop-blur-xl">
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