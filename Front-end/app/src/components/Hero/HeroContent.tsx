import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AuthModal from '../Auth/AuthModal';

const HeroContent: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="relative" style={{width:'75%', padding:'20px 20px 0px 20px'}}>
      <main className="mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8"
        >
          {/* Left Content */}
          <div className="flex flex-col justify-start lg:justify-center mb-0 lg:mb-0" style={{width:'800px', marginBottom:'0px'}}>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Trade Global Markets</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Without Borders
              </span>
            </h1>
            <p className="mt-4 text-base text-gray-300 sm:text-lg md:text-xl">
              Access international markets, trade stocks, ETFs, and more with our advanced trading platform. Join millions of traders worldwide.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAuthModalOpen(true)}
                className="glass-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-md shadow-md"
              >
                Start Trading
              </motion.button>
              <motion.a
                href="#markets"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-6 py-3 rounded-md shadow-md flex items-center justify-center text-gray-200 bg-gray-700"
              >
                View Markets
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
            </div>
          </div>

       
        </motion.div>
      </main>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default HeroContent;
