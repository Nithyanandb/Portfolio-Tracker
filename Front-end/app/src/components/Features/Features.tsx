import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FeatureCard from './FeatureCard';

const features = [
  {
    title: "Track Your Portfolio.",
    description: "Keep a close eye on your investments with real-time portfolio tracking. Get detailed insights into your holdings, P&L, and performance over time.",
    image: "https://media.assettype.com/bloombergquint%2Fimport%2F6c20i81g_stocks-generic_625x300_21_February_23.jpg?w=732" 
  },
  {
    title: "Market Insights & Analysis.",
    description: "Make informed decisions with advanced charts, technical analysis tools, and market insights. Stay updated with the latest trends and news in the stock market.",
    image: "https://clearseasresearch.com/wp-content/uploads/2023/11/Blog_November23-1200.jpg" 
  },
  {
    title: "Instant Buy & Sell.",
    description: "Execute trades with ease and speed. Buy and sell stocks, mutual funds, and ETFs in real-time, ensuring that you're always ahead in the market.",
    image: "https://video.udacity-data.com/topher/2024/October/670987ad_nd320/nd320.jpg"
  }
];

const Features = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="bg-dark-blue text-white py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;