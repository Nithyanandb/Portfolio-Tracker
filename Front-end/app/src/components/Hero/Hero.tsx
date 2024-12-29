import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarketWatch from './MarketWatch';
import TrendingStocks from './TrendingStocks';
import WorldIndices from './WorldIndices';
import WatchlistManager from './WatchlistManager';
import HeroContent from './HeroContent';
import MarketMetrics from './MarketMetrics';
import MarketDashboard from './MarketDashboard';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Enhanced Grid Background with Parallax */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Dynamic Gradient Overlays */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[180px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[180px]" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8 py-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8">
            <HeroContent />
            <MarketMetrics />
            <WorldIndices indices={[]} isLoading={false} />
          </div>

          {/* Right Column - Dashboard */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <MarketDashboard />
              <WatchlistManager 
                watchlist={[]}
                onRemove={() => {}}
                onUpdate={() => {}}
                onAdd={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
