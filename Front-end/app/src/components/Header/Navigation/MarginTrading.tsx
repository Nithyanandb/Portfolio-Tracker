import React, { useState } from 'react';
import { Briefcase, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import Header from '../../Header/Header';

const MarginTrading = () => {
  const [leverage, setLeverage] = useState(5);
  const [collateral, setCollateral] = useState('');

  const positions = [
    {
      pair: 'BTC/USDT',
      size: '0.5 BTC',
      entry: '64,235.50',
      current: '64,535.25',
      pnl: '+2.45%',
      leverage: '5x'
    },
    {
      pair: 'ETH/USDT',
      size: '5 ETH',
      entry: '3,245.75',
      current: '3,225.50',
      pnl: '-0.65%',
      leverage: '10x'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-6 pt-24">
        {/* Risk Warning */}
        <div className="bg-yellow-500/20 border border-yellow-500/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-yellow-500">
            <AlertTriangle size={20} />
            <span className="font-medium">Margin Trading Risk Warning</span>
          </div>
          <p className="text-white/60 mt-2">
            Margin trading involves substantial risks. Market volatility can lead to significant losses exceeding your initial investment.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Margin Calculator */}
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-white/90 font-medium mb-4">Margin Calculator</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60">Leverage (x)</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={leverage}
                  onChange={(e) => setLeverage(parseInt(e.target.value))}
                  className="w-full mt-2"
                />
                <div className="flex justify-between text-sm text-white/60 mt-1">
                  <span>1x</span>
                  <span>{leverage}x</span>
                  <span>20x</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-white/60">Collateral Amount (USDT)</label>
                <input
                  type="number"
                  value={collateral}
                  onChange={(e) => setCollateral(e.target.value)}
                  className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg p-2 text-white"
                  placeholder="0.00"
                />
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Position Size</span>
                  <span className="text-white/90">
                    {collateral ? (parseFloat(collateral) * leverage).toFixed(2) : '0.00'} USDT
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Required Margin</span>
                  <span className="text-white/90">
                    {collateral ? parseFloat(collateral).toFixed(2) : '0.00'} USDT
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Liquidation Buffer</span>
                  <span className="text-white/90">
                    {collateral ? (parseFloat(collateral) * 0.1).toFixed(2) : '0.00'} USDT
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div className="col-span-2 bg-white/5 rounded-lg p-6">
            <h2 className="text-white/90 font-medium mb-4">Open Positions</h2>
            
            <div className="space-y-4">
              {positions.map((position, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white/90">{position.pair}</span>
                      <span className="px-2 py-1 text-xs bg-white/10 rounded-full">
                        {position.leverage}
                      </span>
                    </div>
                    <span className={position.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                      {position.pnl}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Size</span>
                      <div className="text-white/90 mt-1">{position.size}</div>
                    </div>
                    <div>
                      <span className="text-white/60">Entry Price</span>
                      <div className="text-white/90 mt-1">${position.entry}</div>
                    </div>
                    <div>
                      <span className="text-white/60">Current Price</span>
                      <div className="text-white/90 mt-1">${position.current}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg transition-colors duration-200">
                      Close Position
                    </button>
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-colors duration-200">
                      Add Margin
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarginTrading;