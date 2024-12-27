import React from 'react';
import { motion } from 'framer-motion';
import { IndexTable } from './IndexTable';
import type { MarketIndex } from '../types/market';

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
    <div className="space-y-6 xs:max-h-[1100px] xs:max-w-full xs:p-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/80 backdrop-blur-xl rounded-2xl lg:p-4 xs:p-0 md:p-1"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">World Market Indices</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-semibold text-white mb-4">Americas</h3>
              <IndexTable indices={regions.americas} />
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-white mb-4">Europe</h3>
              <IndexTable indices={regions.europe} />
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-4">Asia-Pacific</h3>
              <IndexTable indices={regions.asiaPacific} />
            </section>


            <section>
              <h3 className="text-lg font-semibold text-white mb-4">China</h3>
              <IndexTable indices={regions.china} />
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-4">India</h3>
              <IndexTable indices={regions.india} />
            </section>

            <section>
              <h3 className="text-lg font-semibold text-white mb-4">Japan</h3>
              <IndexTable indices={regions.japan} />
            </section>
          </div>
        )}
      </motion.div>
    </div>
  );
};


export default WorldIndices;