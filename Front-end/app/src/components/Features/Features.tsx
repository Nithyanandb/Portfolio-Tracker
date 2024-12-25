import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Track Your Portfolio.",
    description:
      "Keep a close eye on your investments with real-time portfolio tracking. Get detailed insights into your holdings, P&L, and performance over time.",
    image:
      "https://media.assettype.com/bloombergquint%2Fimport%2F6c20i81g_stocks-generic_625x300_21_February_23.jpg?w=732",
  },
  {
    title: "Market Insights & Analysis.",
    description:
      "Make informed decisions with advanced charts, technical analysis tools, and market insights. Stay updated with the latest trends and news in the stock market.",
    image: "https://media.licdn.com/dms/image/v2/D4D12AQEEZONqOZsVpA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1701344749206?e=2147483647&v=beta&t=VGYxE4TvWdrPQWCWCic0GC-RfGlsas6UrXzraJQRwfM",
  },
  {
    title: "Instant Buy & Sell.",
    description:
      "Execute trades with ease and speed. Buy and sell stocks, mutual funds, and ETFs in real-time, ensuring that you're always ahead in the market.",
    image: "https://miro.medium.com/v2/resize:fit:1400/0*DXFfpfxSOxeHdm_M",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            Professional Trading
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-6xl mx-auto">
            Access powerful trading features designed for both beginners and
            professionals.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className=" rounded-1 p-8 backdrop-blur-xl hover:bg-white/5 transition-all duration-0"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-48 object-cover rounded-1 mb-6"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
                />
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
