import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatProps {
  endValue: number;
  label: string;
  suffix?: string;
  duration?: number;
}

const CountingStat: React.FC<StatProps> = ({ endValue, label, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(endValue * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [inView, endValue, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-left"
    >
      <div className="text-3xl font-light text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-500 tracking-[0.2em]">{label}</div>
    </motion.div>
  );
};

export const HeroContent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full min-h-[600px] flex items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-[0.15]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.5 }}
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
        
        <motion.div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[180px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-8"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-normal text-white tracking-tight"
              variants={itemVariants}
            >
              NEXT GENERATION
              <br />
              <motion.span 
                className="text-4xl md:text-6xl text-gray-400"
                variants={itemVariants}
              >
                TRADING PLATFORM
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-500 font-200 tracking-wide max-w-2xl"
              variants={itemVariants}
            >
              Real-time market data and advanced analytics for informed investment decisions.
            </motion.p>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 pt-12"
            variants={itemVariants}
          >
            <motion.button 
              className="group relative w-full sm:w-[280px] h-[60px] bg-white text-black rounded-none hover:bg-white/90 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 text-sm tracking-[0.2em] uppercase font-medium">
                GET STARTED
              </span>
            </motion.button>

            <motion.button 
              className="group relative w-full sm:w-[280px] h-[60px] bg-transparent border-2 border-white/20 text-white rounded-none hover:border-white/40 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 text-sm tracking-[0.2em] uppercase font-medium">
                LEARN MORE
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="max-w-4xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-12"
          variants={containerVariants}
        >
          {[
            { label: "ACTIVE USERS", value: "2M+" },
            { label: "DAILY TRADES", value: "5M+" },
            { label: "MARKETS", value: "50+" },
            { label: "UPTIME", value: "99.9%" }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-left"
              variants={itemVariants}
              custom={index}
            >
              <motion.div 
                className="text-3xl font-light text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {stat.value}
              </motion.div>
              <motion.div 
                className="text-sm text-gray-500 tracking-[0.2em]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 * index }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroContent;