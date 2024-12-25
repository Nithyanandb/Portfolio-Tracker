import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProfileHeader } from '../Header/ProfileHeader';
import { StockRecommendations } from './StockRecommendation';
import { fetchMarketData } from '../Service/marketApi';

const MarketDashboard: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  // Mock recommendations data
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
      recommendation: 'sell',
      reason: 'Increasing competition and margin pressure',
      targetPrice: 180.00,
      riskLevel: 'high'
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
    <div className="min-screen bg-gray-1000 py-5" >
   
      
      <main className="container lg:mx-auto px-0 py-8">
        <div className="grid gap-0">
         
          {/* Market Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/80 backdrop-blur-xl rounded-1xl p-0"
          >
 
 <div className="grid xs:grid-cols-2 xs:w-72 lg:w-full md:grid-cols-3 xl:grid-cols-3 gap-2">

              {marketData.map((item) => (
                <div key={item.symbol} className="bg-white/5 rounded-xl xs:p-5 lg:p-2">
                  <div className="flex justify-between items-start">
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
            className="bg-black/80 backdrop-blur-xl rounded-2xl py-4 px-0"
          >
            <StockRecommendations recommendations={recommendations}  />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MarketDashboard;