import React from 'react';
import { motion } from 'framer-motion';
import MarketStats from './MarketStats';
import WorldMapInsights from '../Markets/WorldMapInsights';
import StockTicker from '../Hero/StockTicker';
import MarketVisuals from '../Hero/MarketVisuals';

const MarketLayout = () => {
  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      {/* Left Column - Market Stats & World Map */}
      <div className="col-span-8 space-y-6">
        <MarketStats />
        <WorldMapInsights />
        <MarketVisuals />
      </div>

      {/* Right Column - Live Ticker & Detailed Stats */}
      <div className="col-span-4 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-6"
        >
          <StockTicker />
          <div className="mt-6">
            {/* Additional market insights can go here */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketLayout;