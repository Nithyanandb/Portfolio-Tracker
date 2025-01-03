import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, LineChart, Sparkles } from "lucide-react";

const features = [
  {
    title: "Portfolio",
    gradient: "Tracking",
    description: "real-time monitoring of your investments. precise. powerful. personalized.",
    image: "https://media.assettype.com/bloombergquint%2Fimport%2F6c20i81g_stocks-generic_625x300_21_February_23.jpg?w=732",
    stats: [
      { label: "LATENCY", value: "< 1s" },
      { label: "DATA POINTS", value: "1M+" },
      { label: "ACCURACY", value: "99.9%" }
    ]
  },
  {
    title: "Market",
    gradient: "Intelligence",
    description: "AI-driven insights. predictive analytics. real-time decisions.",
    image: "https://researchworld.com/uploads/attachments/cm2d73ps00qab69tdc9pnizbd-gettyimages-1448152453.max.jpg",
    stats: [
      { label: "AI MODELS", value: "15+" },
      { label: "ACCURACY", value: "92%" },
      { label: "SOURCES", value: "50+" }
    ]
  },
  {
    title: "Lightning",
    gradient: "Execution",
    description: "instant trades. zero latency. maximum efficiency.",
    image: "https://miro.medium.com/v2/resize:fit:1400/0*DXFfpfxSOxeHdm_M",
    stats: [
      { label: "SPEED", value: "0.01s" },
      { label: "SUCCESS", value: "99.99%" },
      { label: "VOLUME", value: "1M+" }
    ]
  }
];

const Features = () => {
  return (
    <section className="py-32 bg-black">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="relative min-h-screen flex items-center justify-center py-32"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
            {/* Grok-style glow effect */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse" />
            </div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col lg:flex-row items-center gap-24 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1 max-w-xl"
              >
                <h2 className="text-6xl sm:text-7xl font-medium tracking-tight mb-4">
                  <span className="text-white">{feature.title}</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                    {feature.gradient}
                  </span>
                </h2>
                <p className="text-xl text-white/60 mb-16 font-light">
                  {feature.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-12 mb-16">
                  {feature.stats.map((stat, statIndex) => (
                    <div key={statIndex}>
                      <div className="text-3xl font-medium text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/40 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-white rounded-full text-black text-lg 
                    font-medium tracking-wide flex items-center gap-2 overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10">Explore feature</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 
                    opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </motion.button>
              </motion.div>

              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1 relative"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="object-cover w-full h-full"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 
                    to-purple-500/20 mix-blend-overlay" />
                  
                  {/* Glass card overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 
                      backdrop-blur-xl rounded-2xl border border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <Sparkles className="w-8 h-8 text-blue-400" />
                      <div>
                        <h4 className="text-white font-medium mb-1 text-lg">
                          {`featured ${index === 0 ? 'analytics' : index === 1 ? 'AI' : 'trading'}`}
                        </h4>
                        <p className="text-white/60">
                          {`powered by advanced ${index === 0 ? 'algorithms' : 
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
