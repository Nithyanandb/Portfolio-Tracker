import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, RefreshCw, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_CONFIG } from '../config/API_CONFIG';
import StockDashboard from '../Stock/StockDashboard';
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
    <div className="relative bg-black/40 border-0 backdrop-blur-xl ">
      {/* SpaceX-style grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0"/>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center glass-button  border-1  rounded-0 shadow-md justify-between p-6 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <LineChart className="w-5 h-5 text-white" />
            <h2 className="text-white tracking-[0.2em] font-light">
              MARKET OVERVIEW
            </h2>
          </div>


        
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <RefreshCw className={`w-4 h-4 text-white ${isRefetching ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Market Summary */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-400 tracking-[0.2em]">S&P 500</div>
                <div className="text-xl text-white font-light">4,587.64</div>
                <div className="text-sm text-green-400">+0.63%</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-400 tracking-[0.2em]">NASDAQ</div>
                <div className="text-xl text-white font-light">14,346.02</div>
                <div className="text-sm text-green-400">+0.82%</div>
              </div>
            </div>
          </div>

           
          {/* Quick Actions */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ x: 4 }}
              className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-sm text-white tracking-[0.2em]">VIEW MARKETS</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ x: 4 }}
              className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-sm text-white tracking-[0.2em]">TRADE NOW</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;
