import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IndexTable } from './IndexTable/IndexTable';
import { useWorldIndices } from '../../hooks/useWorldIndices';

interface WorldIndicesProps {
  isLoading?: boolean;
}

export const WorldIndices: React.FC<WorldIndicesProps> = ({ isLoading: initialLoading = false }) => {
  const { data: indexData, isLoading } = useWorldIndices();
  const prevData = useRef(indexData);

  useEffect(() => {
    if (indexData) {
      prevData.current = indexData;
    }
  }, [indexData]);

  const loading = isLoading || initialLoading;

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-2xl bg-black/40 rounded-3xl overflow-hidden"
      >
        <div className="px-8 py-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium text-white tracking-tight">
              World Market Indices
            </h2>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                Live Updates
              </span>
              <span className="text-sm text-gray-400">
                Every 5s
              </span>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <div className="divide-y divide-white/10">
              {Object.entries(indexData || {}).map(([region, indices]) => (
                <motion.section
                  key={region}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 py-6"
                >
                  <h3 className="text-lg font-medium text-white/90 mb-6">
                    {region === 'asiaPacific' ? 'Asia-Pacific' : region}
                  </h3>
                  <IndexTable 
                    indices={indices} 
                    showMiniChart={true}
                    prevData={prevData.current?.[region]}
                  />
                </motion.section>
              ))}
            </div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};