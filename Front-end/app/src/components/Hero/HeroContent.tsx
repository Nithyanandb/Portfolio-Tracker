import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AuthModal from "../Auth/AuthModal";

// Debounce Hook
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const HeroContent: React.FC = React.memo(() => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [companyProfiles, setCompanyProfiles] = useState([
    { name: "AWS", price: 1254.3 },
    { name: "NVIDIA", price: 517.89 },
    { name: "Microsoft", price: 336.45 },
    { name: "Bitcoin", price: 26789.34 },
    { name: "Tesla", price: 735.22 },
    { name: "Apple", price: 172.34 },
  ]);
  const [previousPrices, setPreviousPrices] = useState<number[]>([]); // Track previous prices
  const [flyingCash, setFlyingCash] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Debouncing the scroll event to avoid multiple updates
  const debouncedScrollY = useDebounce(scrollY, 200); // Adjust the debounce delay as needed

  useEffect(() => {
    const interval = setInterval(() => {
      setCompanyProfiles((prev) =>
        prev.map((company, index) => {
          const change = Math.random() * 20 - 10; // Random change between -10 and 10
          if (index === flyingCash) setFlyingCash(null); // Reset animation state

          return {
            ...company,
            price: parseFloat((company.price + change).toFixed(2)),
          };
        })
      );
      setFlyingCash(Math.floor(Math.random() * companyProfiles.length)); // Randomly pick a company for cash effect
    }, 2000);

    return () => clearInterval(interval);
  }, [companyProfiles]);

  useEffect(() => {
    // Update previous prices when company profiles change
    setPreviousPrices(companyProfiles.map((company) => company.price));
  }, [companyProfiles]);

  // Function to determine the background color based on price change
  const getBackgroundColor = (price: number, previousPrice: number) => {
    const priceDifference = price - previousPrice;
    const colorIntensity = Math.min(Math.abs(priceDifference) / 100, 1);
    return priceDifference > 0
      ? `rgb(${50 + colorIntensity * 50}, ${50 + colorIntensity * 100}, ${50 + colorIntensity * 150})` // Darker if price is increasing
      : `rgb(50, 50, 50)`; // Default dark background for no increase
  };

  // Function to determine text color based on price change
  const getTextColor = (price: number, previousPrice: number) => {
    return price > previousPrice ? "text-white" : "text-gray-200"; // Light text if price is increasing
  };

  // Sort companies by price in descending order
  const sortedCompanyProfiles = [...companyProfiles].sort((a, b) => b.price - a.price);

  // Scroll event listener
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="relative w-full px-4 sm:px-8 md:px-12 lg:px-20 py-8 -mt-[110px]">
      <main className="mt-12 sm:mt-20 md:mt-28 lg:mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16"
        >
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:justify-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              <span className="block">Trade Global Markets</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Without Borders
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-200 max-w-md lg:max-w-lg">
              Access international markets, trade stocks, ETFs, and more with
              our advanced trading platform. Join millions of traders worldwide.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-6 ml-0 sm:ml-[50px]">

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAuthModalOpen(true)}
                className="glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-md shadow-md w-full sm:w-auto"
              >
                Start Trading
              </motion.button>
              <motion.a
                href="#markets"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-6 py-3 rounded-md shadow-md flex items-center justify-center text-gray-200 bg-gray-700 w-full sm:w-auto"
              >
                View Markets
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Right Content with Sorted Company Profiles */}
          <div className="mt-0 lg:mt-0 hidden lg:block  p-0 rounded-xl shadow-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden p-4"
            >
              {/* Visualization Content */}
              <div className="text-white ">
                <div className="space-y-4 relative">
                  {sortedCompanyProfiles.map((company, index) => (
                    <motion.div
                      key={company.name}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="flex items-center justify-between bg-clip-text p-3 rounded-md"
                      style={{
                        backgroundColor: getBackgroundColor(company.price, previousPrices[index] || 0), // Apply dynamic background color
                      }}
                    >
                      <span className={getTextColor(company.price, previousPrices[index] || 0)}>
                        {company.name}
                      </span>
                      <span className="relative">
                        {flyingCash === index && (
                          <motion.div
                            initial={{ opacity: 500, y: 0 }}
                            animate={{ opacity: 0, y: -50 }}
                            transition={{ duration: 1 }}
                            className="absolute top-0 right-0 text-green-400 text-sm"
                          >
                            💸💸+${Math.abs(Math.random() * 100).toFixed(2)}
                          </motion.div>
                        )}
                        ${company.price.toFixed(2)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Authentication Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
});

export default HeroContent;
