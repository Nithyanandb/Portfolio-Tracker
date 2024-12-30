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

  const aboutContent = {
    title: "About Our Platform",
    description: "We are a cutting-edge trading platform that combines advanced technology with user-friendly design. Our mission is to empower traders with AI-driven insights and real-time market analysis.",
    stats: [
      { label: "Active Users", value: "50K+" },
      { label: "Daily Trades", value: "1M+" },
      { label: "Success Rate", value: "92%" },
      { label: "Market Coverage", value: "Global" }
    ],
    technologies: [
      "AI-Powered Analysis",
      "Real-Time Data",
      "Secure Infrastructure",
      "Advanced Charting"
    ]
  };

  return (
    <div className="relative mt-20">
      {/* Enhanced Glow Effect */}
      <div className="absolute -inset-[1px] rounded-2xl">
        <div className="w-full h-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 lg:p-12 border border-white/5"
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
          >
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-light">Smart Trading Platform</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl lg:text-6xl font-light tracking-tight text-white mb-6"
          >
            Trade Smarter with{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent font-normal">
              AI-Powered Insights
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-300 mb-8 font-light leading-relaxed"
          >
            Experience next-generation trading with real-time market analysis, 
            AI-driven predictions, and advanced portfolio management tools.
            Stay ahead of the market with our cutting-edge platform.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-white/5 mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-light tracking-wide flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              Start Trading
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-white font-light tracking-wide transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-16 pt-16 border-t border-white/10"
      >
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-light text-white mb-6">{aboutContent.title}</h2>
            <p className="text-gray-300 leading-relaxed mb-8">{aboutContent.description}</p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {aboutContent.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="text-2xl text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-light text-white mb-6">Our Technology Stack</h3>
            <div className="grid grid-cols-2 gap-4">
              {aboutContent.technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="p-2 rounded-lg bg-white/5">
                    <Brain className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm text-gray-300">{tech}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroContent;