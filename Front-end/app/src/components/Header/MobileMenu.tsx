import React from 'react';
import { motion } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => (
  <div className="md:hidden">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="text-gray-300 hover:text-white p-2"
    >
      <span className="sr-only">Open menu</span>
      {isOpen ? (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>

    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-sm"
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <a href="#portfolio" className="block px-3 py-2 text-gray-300 hover:text-white">
            Portfolio Overview
          </a>
          <a href="#market" className="block px-3 py-2 text-gray-300 hover:text-white">
            Market Watch
          </a>
          <a href="#stocks" className="block px-3 py-2 text-gray-300 hover:text-white">
            Stocks
          </a>
          <a href="#orders" className="block px-3 py-2 text-gray-300 hover:text-white">
            Orders
          </a>
          <a href="#funds" className="block px-3 py-2 text-gray-300 hover:text-white">
            Funds & Deposits
          </a>
          <a href="#settings" className="block px-3 py-2 text-gray-300 hover:text-white">
            Settings
          </a>
        </div>
      </motion.div>
    )}
  </div>
);

export default MobileMenu;
