import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const regions = [
  { id: 'na', name: 'North America', value: '$42.3T', change: '+2.1%', active: true },
  { id: 'eu', name: 'Europe', value: '$28.7T', change: '+1.8%', active: true },
  { id: 'asia', name: 'Asia Pacific', value: '$35.2T', change: '+3.2%', active: true },
  { id: 'sa', name: 'South America', value: '$8.4T', change: '+0.9%', active: false },
  { id: 'af', name: 'Africa', value: '$3.2T', change: '+1.2%', active: false }
];

const WorldMapInsights = () => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center mb-4">
        <Globe className="h-6 w-6 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold text-white">Global Market Activity</h3>
      </div>

      {/* World Map SVG with Hotspots */}
      <div className="relative h-64 mb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.2))' }}
          >
            {/* Simplified world map paths with glow effect */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Add simplified continent paths here */}
            <path
              d="M200,120 L450,120 L450,250 L200,250 Z"
              className="fill-blue-500/20 stroke-blue-500"
              strokeWidth="2"
              filter="url(#glow)"
            />
            {/* Add more continent paths */}
            
            {/* Active Trading Hotspots */}
            {regions.map((region, index) => (
              <motion.circle
                key={region.id}
                cx={200 + index * 150}
                cy={200}
                r="5"
                className={`${
                  region.active ? 'fill-blue-500' : 'fill-gray-500'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: index * 0.2
                }}
              />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Regional Stats */}
      <div className="grid grid-cols-2 gap-4">
        {regions.map((region) => (
          <motion.div
            key={region.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg ${
              region.active
                ? 'bg-blue-500/10 border border-blue-500/20'
                : 'bg-gray-800/50'
            }`}
          >
            <h4 className="text-sm font-medium text-gray-400">{region.name}</h4>
            <div className="flex justify-between items-baseline mt-1">
              <span className="text-lg font-semibold text-white">
                {region.value}
              </span>
              <span className={`text-sm ${
                region.change.startsWith('+')
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}>
                {region.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorldMapInsights;