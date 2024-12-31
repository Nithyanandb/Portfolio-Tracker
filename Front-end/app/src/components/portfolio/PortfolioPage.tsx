import React from 'react';
import { Briefcase, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PortfolioPage = () => {
  const portfolioStats = [
    {
      label: "Total Value",
      value: "$124,329.49",
      change: "+2.4%",
      isPositive: true
    },
    {
      label: "Today's Change",
      value: "+$2,849.21",
      change: "+1.2%",
      isPositive: true
    },
    {
      label: "Total Return",
      value: "$24,329.49",
      change: "+19.4%",
      isPositive: true
    }
  ];

  const holdings = [
    { symbol: "AAPL", name: "Apple Inc.", shares: 150, value: "$25,420", change: "+2.4%" },
    { symbol: "TSLA", name: "Tesla Inc.", shares: 50, value: "$15,230", change: "-1.2%" },
    { symbol: "MSFT", name: "Microsoft", shares: 100, value: "$35,670", change: "+3.1%" },
    // Add more holdings as needed
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />

        {/* Content */}
        <div className="relative container mx-auto px-4 pt-24 pb-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white space-y-4 mb-8"
          >
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Briefcase className="text-purple-400" />
              My Portfolio
            </h1>
            <p className="text-gray-400 text-lg">
              Track your investments and performance
            </p>
          </motion.div>

          {/* Portfolio Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {portfolioStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
              >
                <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className={`flex items-center ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Holdings Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Holdings</h2>
              <PieChart className="text-purple-400 w-5 h-5" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="text-left pb-4">Symbol</th>
                    <th className="text-left pb-4">Name</th>
                    <th className="text-right pb-4">Shares</th>
                    <th className="text-right pb-4">Value</th>
                    <th className="text-right pb-4">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding) => (
                    <tr key={holding.symbol} className="border-t border-gray-800">
                      <td className="py-4 text-white font-medium">{holding.symbol}</td>
                      <td className="py-4 text-gray-400">{holding.name}</td>
                      <td className="py-4 text-right text-white">{holding.shares}</td>
                      <td className="py-4 text-right text-white">{holding.value}</td>
                      <td className={`py-4 text-right ${
                        holding.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {holding.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage; 