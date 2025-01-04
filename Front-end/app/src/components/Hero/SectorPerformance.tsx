import React from 'react';
import { motion } from 'framer-motion';

const SectorPerformance: React.FC = () => {
  const sectors = [
    { name: 'Dow Jones', performance: '+0.82%', status: 'Top Performing' },
    { name: 'Nasdaq', performance: '+1.75%', status: 'Top Performing' },
    { name: 'S&P 500', performance: '+1.26%', status: 'Top Performing' },
    { name: 'Energy', performance: '-0.45%', status: 'Under Performing' },
    { name: 'Technology', performance: '+2.10%', status: 'Top Performing' },
    { name: 'Healthcare', performance: '-0.30%', status: 'Under Performing' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="backdrop-blur-2xl bg-black/40 rounded-3xl overflow-hidden transition-all duration-500 p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Sector Performance</h2>
      <div className="space-y-3">
        {sectors.map((sector, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-white/[0.02] rounded-lg">
            <span className="text-sm text-white">{sector.name}</span>
            <span className={`text-sm ${
              sector.performance.startsWith('+') ? 'text-green-400' : 'text-rose-400'
            }`}>
              {sector.performance}
            </span>
            <span className={`text-sm ${
              sector.status === 'Top Performing' ? 'text-green-400' : 'text-rose-400'
            }`}>
              {sector.status}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SectorPerformance;