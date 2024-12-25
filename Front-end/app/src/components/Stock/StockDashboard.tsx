import React from 'react';
import StockRecommendations from '../Stock/StockRecommendation';

const StockDashboard: React.FC = () => {
  const recommendations = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 173.50,
      change: 1.2,
      recommendation: 'buy',
      reason: 'Strong earnings growth and upcoming product launches',
      targetPrice: 190.00,
      riskLevel: 'low'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 202.64,
      change: -1.2,
      recommendation: 'sell',
      reason: 'Increasing competition and margin pressure',
      targetPrice: 180.00,
      riskLevel: 'high'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft',
      price: 378.85,
      change: 3.02,
      recommendation: 'hold',
      reason: 'Solid financials, but limited upside in the short term',
      targetPrice: 385.00,
      riskLevel: 'medium'
    }
  ];

  return (
    <div className="min-screen p-0 bg-gray-1000  container ml-4 py-4">
      <div className="bg-gray-1000 backdrop-blur-md rounded-xl ">
        <h2 className="text-xl ml-0 p-0 font-bold mb-0 text-white">Market Recommendations</h2>
        <StockRecommendations recommendations={recommendations} />
      </div>
    </div>
  );
}

export default StockDashboard;