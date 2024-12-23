import React from 'react';
import { motion } from 'framer-motion';
import { Search, User, ChevronRight } from 'lucide-react';

interface MobileNavProps {
  onClose: () => void;
}

const menuItems = [
  { name: 'Markets', href: '#markets' },
  { name: 'Trading', href: '#trading' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Analytics', href: '#analytics' },
  { name: 'Learn', href: '#learn' },
];

const MobileMenu: React.FC<MobileNavProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col space-y-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search markets, stocks..."
              className="w-full bg-white/10 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="flex items-center justify-between py-4 text-gray-300 hover:text-white border-b border-gray-800"
                whileHover={{ x: 10 }}
                onClick={onClose}
              >
                <span className="text-lg">{item.name}</span>
                <ChevronRight className="h-5 w-5" />
              </motion.a>
            ))}
          </nav>

          {/* Account Section */}
          <div className="pt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 text-white"
            >
              <User className="h-6 w-6" />
              <span>Sign In</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;