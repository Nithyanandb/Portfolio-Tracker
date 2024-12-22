import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AuthModal from '../Auth/AuthModal';

const HeroContent = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="sm:text-center lg:text-left"
        >
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Trade Global Markets</span>
            <span className="block text-blue-500">Without Borders</span>
          </h1>
          <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Access international markets, trade stocks, ETFs, and more with our advanced trading platform. Join millions of traders worldwide.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Start Trading
              </button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#markets"
                className="w-full flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 bg-transparent hover:bg-white/5 md:py-4 md:text-lg md:px-10"
              >
                View Markets <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default HeroContent;