/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchMarketData } from '../Service/marketApi';
import StockDashboard from '../Stock/StockDashboard';
import { MarketData } from '../types/markets';

const MarketDashboardtx: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://demo-source.imgix.net/snowboard.jpg'
  });

  // Mock recommendations data with buy/sell information
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
    },
    // Add more recommendations as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchMarketData();
        setMarketData(data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...');
  };

  if (loading) {
    return (
      <div className="min-screen ">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-screen  bg-gray-1000 lg:mt-20" style={{width:'480px'}}>
    <main className="container px-0 py-8">
      <div className="grid gap-0">
        {/* Market Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/10 backdrop-blur-xl ml-0 rounded-xl"
        >
          <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-2">
            {marketData.map((item) => (
              <div key={item.symbol} className="bg-white/5 rounded-2 glass-card border-none p-2">
                <div className="flex justify-between items-start ">
                  <div>
                    <p className="text-sm text-gray-400">{item.symbol}</p>
                    <p className="text-lg font-medium text-white">${item.price.toFixed(2)}</p>
                  </div>
                  <div className={`text-sm ${item.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {item.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
  
        {/* Trading Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-1000 backdrop-blur-xl rounded-xl py-4"
        >
          <StockDashboard recommendations={recommendations} />
        </motion.div>
      </div>
    </main>
  </div>
  
  );
};

export default MarketDashboardtx;

