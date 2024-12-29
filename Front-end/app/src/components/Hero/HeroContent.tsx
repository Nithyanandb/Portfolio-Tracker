import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { cn } from '../../utils/cn';
import DynamicBackground from '../background/DynamicBackground';

export const HeroContent = () => {
  return (
    <div className="relative w-full min-h-[600px] flex items-center">
      {/* SpaceX-style minimal background */}
      <DynamicBackground />
      
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle star-like dots */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Minimal gradient accent */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[180px]" />
      </div>

      {/* Content with SpaceX-style typography */}
      <div className="relative z-10 w-full py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-normal text-white tracking-tight">
              NEXT GENERATION
              <br />
              <span className="text-4xl md:text-6xl text-gray-400">
                TRADING PLATFORM
              </span>
            </h1>
            <p className="text-lg text-gray-500 font-200 tracking-wide max-w-2xl">
              Real-time market data and advanced analytics for informed investment decisions.
            </p>
          </motion.div>

          {/* SpaceX-style buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 pt-12"
          >
            <button className="group relative w-full sm:w-[280px] h-[60px] bg-white text-black rounded-none hover:bg-white/90 transition-all duration-300">
              <span className="relative z-10 text-sm tracking-[0.2em] uppercase font-medium">
                GET STARTED
              </span>
            </button>

            <button className="group relative w-full sm:w-[280px] h-[60px] bg-transparent border-2 border-white/20 text-white rounded-none hover:border-white/40 transition-all duration-300">
              <span className="relative z-10 text-sm tracking-[0.2em] uppercase font-medium">
                LEARN MORE
              </span>
            </button>
          </motion.div>
        </div>

        {/* Stats with SpaceX styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-12"
        >
          {[
            { label: "ACTIVE USERS", value: "2M+" },
            { label: "DAILY TRADES", value: "5M+" },
            { label: "MARKETS", value: "50+" },
            { label: "UPTIME", value: "99.9%" }
          ].map((stat, index) => (
            <div key={index} className="text-left">
              <div className="text-3xl font-light text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500 tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroContent;