import React, { useState } from 'react';
import { TrendingUp, ArrowUpDown, DollarSign, Clock } from 'lucide-react';
import Header from '../Header';

const SpotTrading = () => {
  const [selectedMarket, setSelectedMarket] = useState('BTCUSDT');
  const [orderType, setOrderType] = useState('limit');

  const markets = [
    { symbol: 'BTCUSDT', price: '64,235.50', change: '+2.45%' },
    { symbol: 'ETHUSDT', price: '3,245.75', change: '+1.82%' },
    { symbol: 'BNBUSDT', price: '415.30', change: '-0.65%' },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-6 pt-24">
        <div className="grid grid-cols-4 gap-6">
          {/* Market List */}
          <div className="col-span-1 bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white/90 font-medium">Markets</h2>
              <button className="text-white/60 hover:text-white">
                <ArrowUpDown size={16} />
              </button>
            </div>
            
            <div className="space-y-2">
              {markets.map((market) => (
                <button
                  key={market.symbol}
                  onClick={() => setSelectedMarket(market.symbol)}
                  className={`w-full p-3 rounded-lg \${
                    selectedMarket === market.symbol
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'hover:bg-white/5'
                  } transition-all duration-200`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{market.symbol}</span>
                    <span className={market.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                      {market.change}
                    </span>
                  </div>
                  <div className="text-sm text-white/60 mt-1">
                    ${market.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trading Chart */}
          <div className="col-span-2 bg-white/5 rounded-lg p-4">
            <div className="aspect-video bg-white/10 rounded-lg mb-4" />
            
            {/* Order Form */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60">Order Type</label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                    className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg p-2 text-white"
                  >
                    <option value="limit">Limit</option>
                    <option value="market">Market</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-white/60">Price</label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg p-2 text-white"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60">Amount</label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg p-2 text-white"
                    placeholder="0.00"
                  />
                </div>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors duration-200">
                  Place Buy Order
                </button>
              </div>
            </div>
          </div>

          {/* Order Book */}
          <div className="col-span-1 bg-white/5 rounded-lg p-4">
            <h2 className="text-white/90 font-medium mb-4">Order Book</h2>
            <div className="space-y-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-red-400">64,{235 - i * 5}.50</span>
                  <span className="text-white/60">0.{(Math.random() * 100).toFixed(2)}</span>
                  <div className="w-20 bg-red-500/20 h-1 rounded-full" style={{ width: `${20 + Math.random() * 80}%` }} />
                </div>
              ))}
              <div className="text-center text-white/90 my-2">64,235.50</div>
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-green-400">64,{235 + i * 5}.50</span>
                  <span className="text-white/60">0.{(Math.random() * 100).toFixed(2)}</span>
                  <div className="w-20 bg-green-500/20 h-1 rounded-full" style={{ width: `${20 + Math.random() * 80}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SpotTrading;