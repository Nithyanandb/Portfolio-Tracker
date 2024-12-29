import React from 'react';
import { motion } from 'framer-motion';
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
      {/* Premium Dynamic Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.08]" 
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to right, rgba(255,255,255,0.02), transparent)
            `,
            backgroundSize: '24px 24px, 100% 100%'
          }} 
        />
        
        {/* Premium Gradient Orbs */}
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" 
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-12 gap-8 py-20">
          {/* Left Column - Hero Content */}
          <div className="col-span-12 lg:col-span-8 space-y-12">
            <HeroContent />
            <MarketMetrics />
            <MarketWatch />
            <WorldIndices indices={[]} isLoading={false} />
          </div>

          {/* Right Column - Market Dashboard */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <MarketDashboard />
            <TrendingStocks />
            <WatchlistManager 
              watchlist={[]}
              onRemove={async () => {}}
              onUpdate={async () => {}}
              onAdd={async () => {}}
            />
          </div>
        </div>
      </div>

      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
      </div>
    </div>
  );
};

export default Hero;
