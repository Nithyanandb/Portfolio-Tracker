import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

const HeroContent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse parallax effect
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

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Dynamic Gradient Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
          transition: 'transform 0.1s ease-out'
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

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/20 rounded-full"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Gradient Sphere */}
      <motion.div
        className="absolute right-[-20%] top-[-20%] w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, transparent 70%)',
          filter: 'blur(60px)',
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
      />

      {/* Content */}
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
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-tight">
            The Future of
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}Trading{" "}
            </span>
            is Here
          </h1>
          <p className="mt-6 text-xl text-white/70 leading-relaxed">
            Experience the next generation of trading with our advanced AI-powered platform.
            Real-time analytics, predictive insights, and seamless execution.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
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
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-12"
        >
          {/* ... existing stats content ... */}
        </motion.div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default HeroContent;