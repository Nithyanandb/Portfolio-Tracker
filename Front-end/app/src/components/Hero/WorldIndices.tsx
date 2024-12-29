import React from 'react';
import { motion } from 'framer-motion';
import { useWorldIndices } from '../Hero/types/useWorldIndices';
import { Loader } from '../Hero/ui/Loader';
import { IndexTable } from './IndexTable';
import IndexChart from './IndexChart';

export const WorldIndices: React.FC = () => {
  const { indices, isLoading, error } = useWorldIndices();

  const regions = {
    americas: indices.filter(index => index.region === 'Americas'),
    europe: indices.filter(index => index.region === 'Europe'),
    asiaPacific: indices.filter(index => index.region === 'Asia-Pacific')
  };

  if (error) {
    return (
      <div className="text-red-400 p-4">
        Error loading market data: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/80 backdrop-blur-xl rounded-2xl p-6"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          World Market Indices
        </h2>
        
        {isLoading ? (
          <Loader />
        ) : (
          <div className="space-y-8">
            {Object.entries(regions).map(([region, indices]) => (
              <section key={region} className="space-y-4">
                <h3 className="text-lg font-semibold text-white capitalize">
                  {region.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="grid lg:grid-cols-2 gap-6">
                  <IndexTable indices={indices} />
                  <IndexChart indices={indices} />
                </div>
              </section>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WorldIndices;