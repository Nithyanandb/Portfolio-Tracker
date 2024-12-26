/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AuthModal from "../Auth/AuthModal";
import { fetchMarketData } from "../Service/marketApi";
import type { MarketData } from "../types/market";
import { defaultCompanies } from "./marketData";
import MarketWatch from "./MarketWatch";

const HeroContent: React.FC = React.memo(() => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Timeout")), 2000)
      );
      const data = await Promise.race([fetchMarketData(), timeout]);
      setMarketData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch market data');
      setMarketData(defaultCompanies);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative lg:px-0 sm:px-8 xs:p-0 md:px-0 lg:px-20 lg:py-8 -mt-[110px]">
      <main className="mt-12 sm:mt-20 md:mt-28 lg:mt-32 xs:p-0 xs:w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:grid lg:grid-cols-1 lg:items-center lg:gap-12 xs:p-0 xl:gap-16"
        >
          {/* Hero Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:justify-center xs:py-20 space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              <span className="block ">Trade Global Markets</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-200  xs:py-1">
                Without Borders
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-200 max-w-md lg:max-w-lg xs:py-1">
              Access international markets, trade stocks, ETFs, and more with
              our advanced trading platform. Join millions of traders worldwide.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-6 ml-0 sm:ml-[100px]">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAuthModalOpen(true)}
                className="glass-button bg-gradient-to-r border-none from-blue-600 to-purple-600 text-white px-6 py-3 rounded-md shadow-md w-full sm:w-auto"
              >
                Start Trading
              </motion.button>
              <motion.a
                href="#markets"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-6 py-3 rounded-md shadow-md flex items-center justify-center text-gray-200 border-none bg-gray-700 w-full sm:w-auto"
              >
                View Markets
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
            </div>
          </div>
<div className="xs:p-0 ">


          {/* Market Watch Component */}
  
            {/* <MarketWatch /> */}
  
  
          </div>
        </motion.div>
      </main>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
});

export default HeroContent;