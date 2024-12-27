import React from 'react';
import StockRecommendations from './StockRecommendation';
import { StockRecommendation } from '../types/index';

interface StockDashboardProps {
  recommendations: StockRecommendation[];
}

const StockDashboard: React.FC<StockDashboardProps> = ({ recommendations }) => {
  return (
    <div className="min-screen p-0  ml-0 mt-10 bg-none">
      <div className="bg-none p-0">
        <h2 className="text-xl ml-0 p-0 font-bold mb-0 text-white">Market Recommendations</h2>
        <StockRecommendations recommendations={recommendations} />
      </div>
    </div>
  );
};

export default StockDashboard;