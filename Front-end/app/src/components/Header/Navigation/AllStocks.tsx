import React, { useState } from 'react';
import { Search, ArrowUpDown, ChevronDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AllStocksPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const stocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 1.2, volume: '2.5M', mcap: '15.2T' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3567.90, change: -0.8, volume: '1.8M', mcap: '12.8T' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', price: 1642.35, change: 2.4, volume: '3.2M', mcap: '9.1T' },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1324.60, change: -1.8, volume: '2.1M', mcap: '5.4T' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', price: 876.45, change: 0.5, volume: '1.5M', mcap: '4.8T' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-4">All Stocks</h1>
          <p className="text-gray-400">Track and analyze all listed stocks in real-time</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search stocks by name or symbol"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/20"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All Sectors</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="energy">Energy</option>
            </select>
          </div>
        </div>

        {/* Stocks Table */}
        <div className="bg-white/5 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-medium text-gray-400">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-white">
                    Symbol
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Name</th>
                <th className="text-right p-4 text-sm font-medium text-gray-400">
                  <div className="flex items-center justify-end gap-2 cursor-pointer hover:text-white">
                    Price
                    <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="text-right p-4 text-sm font-medium text-gray-400">24h Change</th>
                <th className="text-right p-4 text-sm font-medium text-gray-400">Volume</th>
                <th className="text-right p-4 text-sm font-medium text-gray-400">Market Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {stocks.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-white/[0.02] cursor-pointer">
                  <td className="p-4 font-medium">{stock.symbol}</td>
                  <td className="p-4 text-gray-400">{stock.name}</td>
                  <td className="p-4 text-right">₹{stock.price.toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <span className={`flex items-center justify-end gap-1 ${stock.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stock.change > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      {Math.abs(stock.change)}%
                    </span>
                  </td>
                  <td className="p-4 text-right text-gray-400">{stock.volume}</td>
                  <td className="p-4 text-right text-gray-400">₹{stock.mcap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">100</span> results
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStocksPage;