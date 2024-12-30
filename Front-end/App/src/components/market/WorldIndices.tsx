import React from 'react';
import { motion } from 'framer-motion';
import { IndexTable } from './IndexTable/IndexTable';
import { useWorldIndices } from '../../hooks/useWorldIndices';

interface WorldIndicesProps {
  isLoading: boolean;
}

export const WorldIndices: React.FC<WorldIndicesProps> = ({ isLoading: initialLoading }) => {
  const { data: indexData, isLoading } = useWorldIndices();

  const loading = isLoading || initialLoading;

  return (
    <div className="space-y-6 xs:max-h-[1100px] xs:max-w-full xs:p-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/80 backdrop-blur-xl rounded-2xl lg:p-4 xs:p-0 md:p-1"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          World Market Indices
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(indexData || {}).map(([region, indices]) => (
              <section key={region}>
                <h3 className="text-lg font-semibold text-white mb-4 capitalize">
                  {region === 'asiaPacific' ? 'Asia-Pacific' : region}
                </h3>
                <IndexTable indices={indices} showMiniChart={true} />
              </section>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WorldIndices;