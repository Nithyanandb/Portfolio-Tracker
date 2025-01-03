import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, LineChart, Sparkles } from "lucide-react";

const features = [
  {
    title: "Advanced Portfolio Tracking",
    description: "Keep a close eye on your investments with real-time portfolio tracking. Get detailed insights into your holdings, P&L, and performance over time.",
    image: "https://media.assettype.com/bloombergquint%2Fimport%2F6c20i81g_stocks-generic_625x300_21_February_23.jpg?w=732",
    stats: [
      { label: "Real-time Updates", value: "< 1s" },
      { label: "Data Points", value: "1M+" },
      { label: "Accuracy", value: "99.9%" }
    ]
  },
  {
    title: "AI-Powered Market Insights",
    description: "Make informed decisions with advanced charts, technical analysis tools, and market insights. Stay updated with the latest trends and news in the stock market.",
    image: "https://researchworld.com/uploads/attachments/cm2d73ps00qab69tdc9pnizbd-gettyimages-1448152453.max.jpg",
    stats: [
      { label: "AI Models", value: "15+" },
      { label: "Prediction Accuracy", value: "92%" },
      { label: "Data Sources", value: "50+" }
    ]
  },
  {
    title: "Lightning-Fast Trading",
    description: "Execute trades with ease and speed. Buy and sell stocks, mutual funds, and ETFs in real-time, ensuring that you're always ahead in the market.",
    image: "https://miro.medium.com/v2/resize:fit:1400/0*DXFfpfxSOxeHdm_M",
    stats: [
      { label: "Execution Time", value: "0.01s" },
      { label: "Success Rate", value: "99.99%" },
      { label: "Daily Trades", value: "1M+" }
    ]
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-black">
      {features.map((feature, index) => (
        <div 
          key={index}
          className={`relative py-24 ${index % 2 === 0 ? 'bg-black' : 'bg-black/50'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col lg:flex-row items-center gap-16 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1 max-w-xl"
              >
                <h2 className="text-4xl sm:text-5xl  font-medium tracking-tight 
                  bg-gradient-to-r from-white via-white to-white/60 bg-clip-text 
                  text-transparent mb-4"
                >
                  {feature.title}
                </h2>
                <p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
                  {feature.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-8 mb-12">
                  {feature.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div className="text-2xl font-medium text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r 
                    from-blue-500 to-purple-500 rounded-xl text-white font-medium 
                    tracking-wide hover:from-blue-600 hover:to-purple-600 
                    transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>

              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1 relative"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="object-cover w-full h-full"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay" />
                  
                  {/* Glass card overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 
                      backdrop-blur-xl rounded-xl border border-white/20"
                  >
                    <div className="flex items-center gap-4">
                      <Sparkles className="w-8 h-8 text-blue-400" />
                      <div>
                        <h4 className="text-white font-medium mb-1">
                          {`Featured ${index === 0 ? 'Analytics' : index === 1 ? 'AI' : 'Trading'}`}
                        </h4>
                        <p className="text-sm text-gray-300">
                          {`Powered by advanced ${index === 0 ? 'algorithms' : 
                            index === 1 ? 'machine learning' : 'infrastructure'}`}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;
