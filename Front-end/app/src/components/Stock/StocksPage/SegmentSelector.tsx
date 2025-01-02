import React from 'react';
import { motion } from 'framer-motion';

interface SegmentSelectorProps {
  segments: string[];
  selectedSegment: string;
  onSegmentChange: (segment: string) => void;
}

export const SegmentSelector: React.FC<SegmentSelectorProps> = ({
  segments,
  selectedSegment,
  onSegmentChange,
}) => {
  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide">
      {segments.map((segment) => (
        <motion.button
          key={segment}
          onClick={() => onSegmentChange(segment)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all 
            ${selectedSegment === segment 
              ? 'bg-white text-black' 
              : 'text-gray-400 hover:text-white'}`}
        >
          {segment}
        </motion.button>
      ))}
    </div>
  );
};