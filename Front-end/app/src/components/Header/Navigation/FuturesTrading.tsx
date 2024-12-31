import React, { useState } from 'react';
import { LineChart, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import Header from '../Header';

const FuturesTrading = () => {
  const [selectedContract, setSelectedContract] = useState('BTCUSDT-PERP');
  
  const contracts = [
    {
      symbol: 'BTCUSDT-PERP',
      price: '64,235.50',
      fundingRate: '+0.01%',
      volume: '1.2B',
      change: '+2.45%'
    },
    {
      symbol: 'ETHUSDT-PERP',
      price: '3,245.75',
      fundingRate: '-0.02%',
      volume: '450M',
      change: '+1.82%'
    },
    {
      symbol: 'BNBUSDT-PERP',
      price: '415.30',
      fundingRate: '+0.01%',
      volume: '125M',
      change: '-0.65%'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-6 pt-24">
        {/* Funding Rate Timer */}
        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-white/60" />
              <span className="text-white/90">Next Funding in</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <span className="text-2xl font-light text-white/90">04</span>
                <span className="text-sm text-white/60 ml-1">h</span>
              </div>
              <div className="text-center">
                <span className="text-2xl font-light text-white/90">23</span>
                <span className="text-sm text-white/60 ml-1">m</span>
              </div>
              <div className="text-center">
                <span className="text-2xl font-light text-white/90">45</span>
                <span className="text-sm text-white/60 ml-1">s</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Contracts List */}
          <div className="col-span-3 bg-white/5 rounded-lg p-4">
            <h2 className="text-white/90 font-medium mb-4">Perpetual Contracts</h2>
            
            <div className="space-y-2">
              {contracts.map((contract) => (
                <button
                  key={contract.symbol}
                  onClick={() => setSelectedContract(contract.symbol)}
                  className={`w-full p-3 rounded-lg ${
                    selectedContract === contract.symbol
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'hover:bg-white/5'
                  } transition-all duration-200`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{contract.symbol}</span>
                    <span className={contract.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                      {contract.change}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-white/60">Price</span>
                      <div className="text-white/90">${contract.price}</div>
                    </div>
                    <div>
                      <span className="text-white/60">Volume</span>
                      <div className="text-white/90">{contract.volume}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trading Interface */}
          <div className="col-span-6 space-y-6">
            {/* Chart */}
            <div className="bg-white/5 rounded-lg p-4">
              <div className="aspect-video bg-white/10 rounded-lg" />
            </div>

            {/* Trading Form */}
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex gap-4 mb-4">
                <button className="flex-1 bg-green-500/20 text-green-400 py-2 rounded-lg">Long</button>
                <button className="flex-1 bg-white/10 text-white/60 py-2 rounded-lg">Short</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60">Quantity (USD)</label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg p-2 text-white"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60">Leverage</label>
                  <select className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg p-2 text-white">
                    <option>1x</option>
                    <option>5x</option>
                    <option>10x</option>
                    <option>20x</option>
                  </select>
                </div>
              </div>

              <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors duration-200">
                Place Long Order
              </button>
            </div>
          </div>

          {/* Position Info */}
          <div className="col-span-3 space-y-6">
            {/* Contract Info */}
            <div className="bg-white/5 rounded-lg p-4">
              <h2 className="text-white/90 font-medium mb-4">Contract Info</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Mark Price</span>
                  <span className="text-white/90">$64,235.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Index Price</span>
                  <span className="text-white/90">$64,232.25</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Funding Rate</span>
                  <span className="text-green-400">+0.01%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">24h Volume</span>
                  <span className="text-white/90">1.2B USDT</span>
                </div>
              </div>
            </div>

            {/* Recent Trades */}
            <div className="bg-white/5 rounded-lg p-4">
              <h2 className="text-white/90 font-medium mb-4">Recent Trades</h2>
              
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className={i % 2 === 0 ? 'text-green-400' : 'text-red-400'}>
                      ${(64235.50 + (Math.random() * 10 - 5)).toFixed(2)}
                    </span>
                    <span className="text-white/60">
                      {(Math.random() * 2).toFixed(4)} BTC
                    </span>
                    <span className="text-white/40">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FuturesTrading;