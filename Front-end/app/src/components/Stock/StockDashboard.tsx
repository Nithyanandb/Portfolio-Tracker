import React from 'react';
import StockRecommendations from './StockRecommendation';
import { StockRecommendation } from '../types/index';

interface StockDashboardProps {
  recommendations: StockRecommendation[];
}

const StockDashboard: React.FC<StockDashboardProps> = ({ recommendations }) => {
  return (
    <div className="min-screen p-0 bg-gray-1000 container ml-0 py-4">
      <div className="bg-gray-1000 backdrop-blur-md rounded-xl">
        <h2 className="text-xl ml-0 p-0 font-bold mb-0 text-white">Market Recommendations</h2>
        <StockRecommendations recommendations={recommendations} />
      </div>
    </div>
  );
};

export default StockDashboard;