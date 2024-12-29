import React from "react";
import { motion } from "framer-motion";
import { LineChart, TrendingUp, Zap } from 'lucide-react';

const features = [
  {
    title: "Portfolio Tracking",
    subtitle: "Real-time Investment Monitoring",
    description: "Keep a close eye on your investments with institutional-grade portfolio tracking tools.",
    icon: <LineChart className="w-8 h-8 text-blue-500" />,
    stats: [
      { label: "Real-time Updates", value: "< 1s" },
      { label: "Accuracy", value: "99.99%" },
      { label: "Markets Covered", value: "150+" }
    ],
    details: [
      "Live portfolio valuation and P&L tracking",
      "Performance analytics and benchmarking",
      "Customizable watchlists and alerts",
      "Risk metrics and portfolio analysis",
      "Historical performance tracking"
    ],
    image: "/path/to/portfolio-tracking.png",
    gradient: "from-blue-500/10 via-transparent to-purple-500/10"
  },
  {
    title: "Market Analysis",
    subtitle: "AI-Powered Market Insights",
    description: "Make informed decisions with advanced technical analysis and AI-driven insights.",
    icon: <TrendingUp className="w-8 h-8 text-green-500" />,
    stats: [
      { label: "Data Points", value: "1M+" },
      { label: "AI Models", value: "25+" },
      { label: "Success Rate", value: "87%" }
    ],
    details: [
      "Advanced technical indicators and charts",
      "Machine learning price predictions",
      "Market sentiment analysis",
      "Real-time news integration",
      "Pattern recognition algorithms"
    ],
    image: "/path/to/market-analysis.png",
    gradient: "from-green-500/10 via-transparent to-blue-500/10"
  },
  {
    title: "Instant Trading",
    subtitle: "Lightning-Fast Execution",
    description: "Execute trades with unprecedented speed and precision across global markets.",
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    stats: [
      { label: "Execution Speed", value: "0.001s" },
      { label: "Success Rate", value: "99.9%" },
      { label: "Available Markets", value: "24/7" }
    ],
    details: [
      "Sub-millisecond trade execution",
      "Smart order routing system",
      "Direct market access",
      "Multi-exchange support",
      "Advanced order types"
    ],
    image: "/path/to/instant-trading.png",
    gradient: "from-yellow-500/10 via-transparent to-red-500/10"
  }
];

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-6xl font-bold text-white mb-6 tracking-tight">
            Professional Trading
            <span className="text-blue-500">.</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience institutional-grade trading tools and analytics, powered by cutting-edge technology.
          </p>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Feature Card */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20`} />
                <div className="relative z-10 grid lg:grid-cols-2 gap-12 p-12">
                  {/* Content Side */}
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="p-3 w-fit rounded-xl bg-white/5">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-sm text-blue-500 font-medium mb-2">
                          {feature.subtitle}
                        </h3>
                        <h4 className="text-3xl font-bold text-white mb-4">
                          {feature.title}
                        </h4>
                        <p className="text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6">
                      {feature.stats.map((stat, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="text-2xl font-bold text-white">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-400">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Feature List */}
                    <ul className="space-y-3">
                      {feature.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="flex items-center gap-3 text-gray-300"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Image Side */}
                  <div className="relative lg:h-[600px] rounded-xl overflow-hidden bg-black/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/600x800";
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
