import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "Portfolio",
    gradient: "Tracking",
    description: "Real-time monitoring of your investments. Precise. Powerful. Personalized.",
    image: "https://infraon.io/blog/wp-content/uploads/2023/07/marketing-data-analysis-datadriven-marketing-concepts-competitor-analysis-min.jpg",
    stats: [
      { label: "LATENCY", value: "< 1s" },
      { label: "DATA POINTS", value: "1M+" },
      { label: "ACCURACY", value: "99.9%" }
    ]
  },
  {
    title: "Market",
    gradient: "Intelligence",
    description: "AI-driven insights. Predictive analytics. Real-time decisions.",
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
    description: "Instant trades. Zero Latency. Maximum Efficiency.",
    image: "https://miro.medium.com/v2/resize:fit:1400/0*DXFfpfxSOxeHdm_M",
    stats: [
      { label: "SPEED", value: "0.01s" },
      { label: "SUCCESS", value: "99.99%" },
      { label: "VOLUME", value: "1M+" }
    ]
  }
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerChildren: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Features = () => {
  return (
    <section className="py-12 md:py-24 bg-black">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="relative flex items-center justify-center py-12 md:py-24"
        >
          {/* Background Gradient and Glow Effect */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90" />
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-500/5 rounded-full blur-[60px] md:blur-[120px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-500/5 rounded-full blur-[60px] md:blur-[120px] animate-pulse" />
            </div>
          </div>
          
          {/* Content Container */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col lg:flex-row items-center gap-8 md:gap-16 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              {/* Content Side */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
                className="flex-1 max-w-xl"
              >
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4"
                >
                  <span className="text-white">{feature.title}</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                    {feature.gradient}
                  </span>
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-base md:text-lg text-white/60 mb-6 md:mb-12 font-light"
                >
                  {feature.description}
                </motion.p>

                {/* Stats Grid */}
                <motion.div
                  variants={staggerChildren}
                  className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-12"
                >
                  {feature.stats.map((stat, statIndex) => (
                    <motion.div
                      key={statIndex}
                      variants={fadeInUp}
                    >
                      <div className="text-xl md:text-2xl font-medium text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-4 py-2 bg-white rounded-full text-black text-base 
                    font-medium tracking-wide flex items-center gap-2 overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10">Explore Feature</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 
                    opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </motion.button>
              </motion.div>

              {/* Image Side */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex-1 relative"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 
                    to-purple-500/20 mix-blend-overlay" />
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