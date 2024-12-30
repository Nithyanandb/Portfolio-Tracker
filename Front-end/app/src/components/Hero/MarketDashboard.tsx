import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, RefreshCw, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchMarketData } from '../Service/marketApi';
import { MarketData } from '../types/markets';

const MarketDashboard: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const { isRefetching, refetch } = useQuery({
    queryKey: ['marketData'],
    queryFn: fetchMarketData,
    onSuccess: (data: React.SetStateAction<MarketData[]>) => setMarketData(data),
    onError: (error: any) => console.error('Error fetching market data:', error),
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://demo-source.imgix.net/snowboard.jpg'
  });

  interface StockDashboardProps {
    recommendations: MarketData[];
  }

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
      <div className=" -mt-[1000px] min-screen">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Premium Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/50 to-black/80 backdrop-blur-2xl" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative">
        {/* Refined Header */}
        <div className="flex items-center justify-between p-8">
          <div className="flex items-center space-x-4">
            <LineChart className="w-5 h-5 text-blue-400" />
            <h2 className="text-white text-lg tracking-[0.25em] font-light">
              MARKET OVERVIEW
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => refetch()}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <RefreshCw className={`w-4 h-4 text-white ${isRefetching ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        {/* Enhanced Market Data Display */}
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'S&P 500', value: '4,587.64', change: '+0.63%' },
              { label: 'NASDAQ', value: '14,346.02', change: '+0.82%' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-lg bg-white/5 p-6"
              >
                <div className="space-y-2">
                  <div className="text-sm text-gray-400 tracking-[0.2em]">
                    {item.label}
                  </div>
                  <div className="text-2xl text-white font-light tracking-wider">
                    {item.value}
                  </div>
                  <div className="text-green-400 text-sm tracking-wider">
                    {item.change}
                  </div>
                </div>
                {/* Subtle Gradient Accent */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full" />
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="space-y-3 pt-4">
            {['VIEW MARKETS', 'TRADE NOW'].map((action, index) => (
              <motion.button
                key={action}
                whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="w-full flex items-center justify-between p-4 bg-white/5 backdrop-blur-xl transition-all duration-300 group"
              >
                <span className="text-sm text-white tracking-[0.2em]">{action}</span>
                <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;
