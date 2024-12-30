import React, { useState } from 'react';
import { Binary, Calendar, DollarSign } from 'lucide-react';
import Header from '../../Header';
import TradingChart from '../trading/TradingChart';
import RiskWarning from '../trading/RiskWarning';

const OptionsTrading = () => {
  const [selectedExpiry, setSelectedExpiry] = useState('2024-03-29');
  const [optionType, setOptionType] = useState('call');

  const options = [
    { strike: 65000, callPrice: '2,450', putPrice: '1,850', iv: '45%' },
    { strike: 67500, callPrice: '1,850', putPrice: '2,250', iv: '42%' },
    { strike: 70000, callPrice: '1,250', putPrice: '2,650', iv: '40%' },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-6 pt-24">
        <RiskWarning message="Options trading involves substantial risk of loss and is not suitable for all investors." />
        
        <div className="grid grid-cols-12 gap-6">
          {/* Options Chain */}
          <div className="col-span-3 bg-white/5 rounded-lg p-4">
            <h2 className="text-white/90 font-medium mb-4">BTC Options Chain</h2>
            
            <div className="mb-4">
              <label className="text-sm text-white/60">Expiry Date</label>
              <select 
                value={selectedExpiry}
                onChange={(e) => setSelectedExpiry(e.target.value)}
                className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg p-2 text-white"
              >
                <option value="2024-03-29">March 29, 2024</option>
                <option value="2024-04-26">April 26, 2024</option>
                <option value="2024-05-31">May 31, 2024</option>
              </select>
            </div>

            <div className="space-y-2">
              {options.map((option) => (
                <div key={option.strike} className="bg-white/5 rounded-lg p-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-white/90">Strike ${option.strike}</span>
                    <span className="text-white/60">IV {option.iv}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <button className="p-2 rounded bg-green-500/20 text-green-400">
                      Call ${option.callPrice}
                    </button>
                    <button className="p-2 rounded bg-red-500/20 text-red-400">
                      Put ${option.putPrice}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Interface */}
          <div className="col-span-6">
            <TradingChart className="mb-6" />
            
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex gap-4 mb-4">
                <button 
                  onClick={() => setOptionType('call')}
                  className={`flex-1 py-2 rounded-lg ${
                    optionType === 'call' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  Call Option
                </button>
                <button 
                  onClick={() => setOptionType('put')}
                  className={`flex-1 py-2 rounded-lg ${
                    optionType === 'put' 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  Put Option
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60">Quantity</label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg p-2 text-white"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60">Premium</label>
                  <input
                    type="number"
                    className="w-full mt-1 bg-white/10 border border-white/10 rounded-lg p-2 text-white"
                    placeholder="0.00"
                    readOnly
                  />
                </div>
              </div>

              <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200">
                Buy {optionType === 'call' ? 'Call' : 'Put'} Option
              </button>
            </div>
          </div>

          {/* Greeks & Analytics */}
          <div className="col-span-3 space-y-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h2 className="text-white/90 font-medium mb-4">Option Greeks</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Delta</span>
                  <span className="text-white/90">0.65</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Gamma</span>
                  <span className="text-white/90">0.02</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Theta</span>
                  <span className="text-red-400">-0.15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Vega</span>
                  <span className="text-white/90">0.35</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h2 className="text-white/90 font-medium mb-4">Position Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Max Profit</span>
                  <span className="text-green-400">Unlimited</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Max Loss</span>
                  <span className="text-red-400">$2,450</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Break Even</span>
                  <span className="text-white/90">$67,450</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OptionsTrading;