import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Brain, Shield, BarChart2 } from 'lucide-react';

const HeroContent: React.FC = () => {
  const features = [
    {
      icon: <BarChart2 className="w-5 h-5 text-blue-400" />,
      title: "Real-Time Analytics",
      description: "Advanced market analysis and tracking"
    },
    {
      icon: <Brain className="w-5 h-5 text-purple-400" />,
      title: "AI-Powered Insights",
      description: "Predictive analysis and smart recommendations"
    },
    {
      icon: <Shield className="w-5 h-5 text-green-400" />,
      title: "Secure Trading",
      description: "Enterprise-grade security protocols"
    }
  ];

  return (
    <div className="relative mt-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-[1200px] mx-auto px-8"
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-8"
          >
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-light">Smart Trading Platform</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-7xl font-medium tracking-tight text-white mb-8"
          >
            Trade Smarter with{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI-Powered Insights
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/70 mb-12 font-light leading-relaxed"
          >
            Experience next-generation trading with real-time market analysis, 
            AI-driven predictions, and advanced portfolio management tools.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-white/[0.03] mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-white text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white rounded-full text-black font-medium tracking-wide flex items-center gap-2 hover:bg-white/90 transition-all duration-300"
            >
              Start Trading
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/[0.03] rounded-full text-white font-medium tracking-wide hover:bg-white/[0.08] transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroContent;