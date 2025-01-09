import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MarketWatch from './MarketWatch';
import WatchlistManager from './WatchlistManager';
import HeroContent from './HeroContent';
import MarketMetrics from './MarketMetrics';
import MarketDashboard from './MarketDashboard';
import { WorldIndices } from '../market/WorldIndices';
import MarketGraph from './MarketGraph';
import { symbols } from '../Stock/StocksPage/symbols'; // Import the symbols array
import EarningsSurprise from './EarningsSurprise'; // Import the new component
import SectorPerformance from './SectorPerformance'; // Import the new component

const Hero: React.FC = () => {
  const [currentSymbol, setCurrentSymbol] = useState(symbols[0].symbol);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true);

      setTimeout(() => {
        setCurrentSymbol((prevSymbol) => {
          const currentIndex = symbols.findIndex((s) => s.symbol === prevSymbol);
          const nextIndex = (currentIndex + 1) % symbols.length;
          return symbols[nextIndex].symbol;
        });

        setLoading(false);
      }, 6000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
     

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        <div className="container px-0 lg:px-0">
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-full">
              <HeroContent />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 mt-8">
            
            <div className="lg:col-span-8 space-y-4 lg:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:p-6  overflow-hidden transition-all duration-500"
              >
                <MarketWatch />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:p-6 overflow-hidden transition-all duration-500"
              >
                <MarketMetrics />
                <motion.div
                  key={currentSymbol}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
                      <span className="ml-4 text-white">Loading...</span>
                    </div>
                  ) : (
                    <div className="lg:p-6">
                    <MarketGraph symbol={currentSymbol} />
                    </div>
                  )}
                </motion.div>
              </motion.div>

              {/* EarningsSurprise Component */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="lg:p-6 overflow-hidden transition-all duration-500"
              >
                <EarningsSurprise symbol={currentSymbol} limit={50} />
              </motion.div>

              {/* SectorPerformance Component */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="lg:p-6 overflow-hidden transition-all duration-500"
              >
                <SectorPerformance />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="lg:p-6  overflow-hidden transition-all duration-500 hidden sm:block"
              >
                <WorldIndices isLoading={false} />
              </motion.div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-4 lg:space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className=" overflow-hidden transition-all duration-500"
                >
                  <MarketDashboard />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="overflow-hidden transition-all duration-500"
                >
                  <WatchlistManager
                    watchlist={[]}
                    onRemove={async () => {}}
                    onUpdate={async () => {}}
                    onAdd={async () => {}}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

     
    </div>
  );
};

export default Hero;