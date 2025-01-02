import React from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 
            text-white placeholder-gray-400 focus:outline-none focus:border-white/20"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl 
          flex items-center gap-2 hover:bg-white/10"
      >
        <Filter size={20} />
        <span>Filters</span>
      </motion.button>
    </div>
  );
};