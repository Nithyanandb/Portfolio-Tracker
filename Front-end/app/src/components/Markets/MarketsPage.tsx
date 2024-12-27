import React, { useState } from 'react';
import { TrendingUp, Globe, Bitcoin, DollarSign, Oil, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MarketDashboard from '../Hero/MarketDashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { BuyStocks } from '../BuyStocks/BuyStocks';
import { AllStocks } from '../pages/AllStocks';
import TransactionPage from '../pages/TransactionPage';

const MarketsPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const marketNavItems = [
    { 
      id: 'allstocks', 
      label: 'All Stocks',
      path: '/stocks/all',
      description: 'View all available stocks'
    },
    { 
      id: 'buy', 
      label: 'Buy Stocks',
      path: '/stocks/buy',
      description: 'Purchase new stocks'
    },
    { 
      id: 'sell', 
      label: 'Sell Stocks',
      path: '/stocks/sell',
      description: 'Sell your holdings'
    },
    { 
      id: 'transactions', 
      label: 'Transactions',
      path: '/transactions',
      description: 'View your trading history'
    }
  ];

  const marketSections = [
    { id: 'overview', label: 'Market Overview' },
    { id: 'buy', label: 'Buy Stocks' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'history', label: 'History' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'buy':
        return <BuyStocks />;
      case 'transactions':
        return <TransactionPage />;
      case 'history':
        return <AllStocks />;
      default:
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {marketCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:bg-gray-800/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  {category.icon}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {category.metrics.value}
                    </div>
                    <div className="text-green-400">
                      {category.metrics.change}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-400">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        );
    }
  };

  const marketCategories = [
    {
      title: "Global Stocks",
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      metrics: { value: "$93.2T", change: "+1.2%" },
      description: "Track major indices and global equities"
    },
    {
      title: "Cryptocurrency",
      icon: <Bitcoin className="w-6 h-6 text-yellow-400" />,
      metrics: { value: "$2.1T", change: "+3.8%" },
      description: "Real-time crypto market data"
    },
    {
      title: "Forex",
      icon: <DollarSign className="w-6 h-6 text-green-400" />,
      metrics: { value: "$6.6T", change: "+0.5%" },
      description: "Foreign exchange markets"
    },
    {
      title: "Commodities",
      icon: <Oil className="w-6 h-6 text-purple-400" />,
      metrics: { value: "$127B", change: "+2.1%" },
      description: "Raw materials and energy futures"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black" />

        {/* Content */}
        <div className="relative container mx-auto px-4 pt-24 pb-12">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Enhanced Header with Hover Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white space-y-4"
              >
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                    className="flex items-center gap-3 group"
                  >
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                      <TrendingUp className="text-blue-400" />
                      Global Markets
                      <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </h1>

                    {/* Hover Dropdown */}
                    <AnimatePresence>
                      {showDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-xl shadow-xl z-50"
                        >
                          <div className="p-2">
                            {marketNavItems.map((item) => (
                              <motion.button
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                className="w-full text-left p-3 rounded-lg hover:bg-gray-800/50 transition-colors group/item"
                                whileHover={{ x: 4 }}
                              >
                                <div className="font-medium text-gray-200 group-hover/item:text-white">
                                  {item.label}
                                </div>
                                <div className="text-sm text-gray-400 group-hover/item:text-gray-300">
                                  {item.description}
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
                <p className="text-gray-400 text-lg">
                  Real-time data across all major financial markets
                </p>
              </motion.div>

              {/* Section Navigation */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {marketSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Content */}
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="min-h-[500px]"
              >
                {renderContent()}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                  <MarketDashboard />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketsPage; 