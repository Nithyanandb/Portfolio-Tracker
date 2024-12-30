import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const HeroContent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Enhanced parallax effects
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Refined mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Stats data
  const stats = [
    { label: 'Active Traders', value: '2M+' },
    { label: 'Daily Volume', value: '$8.2B' },
    { label: 'Markets', value: '150+' },
    { label: 'Success Rate', value: '94%' }
  ];

  return (
    <div ref={containerRef} className="relative min-h-[80vh] overflow-hidden">
      {/* Enhanced Background Effects */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, transparent 70%)',
          scale,
          opacity
        }}
      />

      {/* Animated Grid Pattern */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px),
            radial-gradient(circle at center, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 96px 96px',
          backgroundPosition: '0 0, 0 0',
          y: backgroundY
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 pt-32 pb-16 container mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Hero Title */}
          <h1 className="text-6xl md:text-7xl font-light text-white tracking-tight leading-tight">
            Trade Smarter with
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}AI-Powered{" "}
            </span>
            Analytics
          </h1>

          {/* Hero Description */}
          <p className="mt-6 text-xl text-white/70 leading-relaxed max-w-2xl">
            Experience the future of trading with real-time market insights, 
            predictive analytics, and AI-driven recommendations.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-[280px] h-[60px] bg-white text-black rounded-lg overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 text-sm tracking-[0.2em] uppercase font-medium group-hover:text-white transition-colors duration-300">
                Start Trading <ChevronRight className="inline-block ml-2" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full sm:w-[280px] h-[60px] bg-transparent border border-white/20 text-white rounded-lg hover:border-white/40 transition-all duration-300"
            >
              <span className="relative z-10 text-sm tracking-[0.2em] uppercase font-medium">
                Learn More
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-light text-white mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-400 tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Gradient Overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default HeroContent;