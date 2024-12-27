import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { cn } from '../../utils/cn';

export const HeroContent = () => {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        
        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
              initial={{ left: '-100%', top: `${20 + i * 15}%` }}
              animate={{ left: '100%' }}
              transition={{
                duration: 7,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(59,130,246,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
  
        {/* Main Hero Content */}
        <div className="container mx-auto px-0">
          <div className="min-h-[90vh] flex flex-col justify-center items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl space-y-8"
            >
              <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Track Your Portfolio
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {" "}Like Never Before
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Real-time market data, advanced analytics, and powerful tools to help you make informed investment decisions.
          </p>
        </motion.div>
              
       
              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
              >
                <button className=" group relative w-full sm:w-[260px] h-[56px] bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-[4px] transition-all duration-300 overflow-hidden">
                  <span className="relative  z-10 text-sm font-medium tracking-wider uppercase">
                    Get Started
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </button>

                <button className="group relative w-full sm:w-[260px] h-[56px] bg-white hover:bg-white/90 text-black rounded-[4px] transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 text-sm font-medium tracking-wider uppercase">
                    View Demo
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/5 to-black/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-gray-800/50"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Stat label="Active Users" value="2M+" />
              <Stat label="Daily Trades" value="5M+" />
              <Stat label="Market Coverage" value="50+" />
              <Stat label="Success Rate" value="99.9%" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const MarketStat = ({ label, value, change }: { label: string; value: string; change: string }) => {
  const isPositive = change.startsWith('+');
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{value}</span>
      <span className={cn(
        "flex items-center gap-1",
        isPositive ? "text-green-400" : "text-red-400"
      )}>
        <TrendingUp className={cn("w-3 h-3", !isPositive && "rotate-180")} />
        {change}
      </span>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="text-center">
    <div className="text-2xl font-medium text-white">{value}</div>
    <div className="text-sm text-gray-400 mt-1">{label}</div>
  </div>
);

export default HeroContent;