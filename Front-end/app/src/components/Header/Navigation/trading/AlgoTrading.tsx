import React, { useState } from 'react';
import { Laptop, Play, Pause, Settings, Code } from 'lucide-react';
import Header from '../../Header';
import RiskWarning from '../trading/RiskWarning';

const AlgoTrading = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('ma_crossover');
  
  const strategies = [
    {
      id: 'ma_crossover',
      name: 'MA Crossover',
      status: 'running',
      pnl: '+3.45%',
      trades: 24,
      winRate: '68%'
    },
    {
      id: 'rsi_divergence',
      name: 'RSI Divergence',
      status: 'stopped',
      pnl: '-1.20%',
      trades: 12,
      winRate: '42%'
    },
    {
      id: 'grid_trading',
      name: 'Grid Trading',
      status: 'running',
      pnl: '+5.80%',
      trades: 156,
      winRate: '72%'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-6 pt-24">
        <RiskWarning message="Algorithmic trading can result in rapid losses. Ensure thorough testing before deploying strategies." />
        
        <div className="grid grid-cols-12 gap-6">
          {/* Strategy List */}
          <div className="col-span-3 bg-white/5 rounded-lg p-4">
            <h2 className="text-white/90 font-medium mb-4">Trading Strategies</h2>
            
            <div className="space-y-2">
              {strategies.map((strategy) => (
                <button
                  key={strategy.id}
                  onClick={() => setSelectedStrategy(strategy.id)}
                  className={`w-full p-3 rounded-lg ${
                    selectedStrategy === strategy.id
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'hover:bg-white/5'
                  } transition-all duration-200`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{strategy.name}</span>
                    <span className={strategy.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                      {strategy.pnl}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      strategy.status === 'running' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {strategy.status}
                    </span>
                    <span className="text-white/60">Win Rate: {strategy.winRate}</span>
                  </div>
                </button>
              ))}
            </div>

            <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200">
              Create New Strategy
            </button>
          </div>

          {/* Strategy Editor */}
          <div className="col-span-6 space-y-6">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white/90 font-medium">Strategy Editor</h2>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white">
                    <Settings size={20} />
                  </button>
                  <button className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400">
                    <Play size={20} />
                  </button>
                </div>
              </div>
              
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm text-white/80">
                <pre>{`
def ma_crossover_strategy(data):
    # Calculate moving averages
    data['SMA20'] = data['close'].rolling(20).mean()
    data['SMA50'] = data['close'].rolling(50).mean()
    
    # Generate signals
    data['signal'] = 0
    data.loc[data['SMA20'] > data['SMA50'], 'signal'] = 1
    data.loc[data['SMA20'] < data['SMA50'], 'signal'] = -1
    
    return data
                `.trim()}</pre>
              </div>
            </div>

            {/* Backtest Results */}
            <div className="bg-white/5 rounded-lg p-4">
              <h2 className="text-white/90 font-medium mb-4">Backtest Results</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <span className="text-white/60 text-sm">Total Return</span>
                  <div className="text-green-400 text-xl">+24.5%</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <span className="text-white/60 text-sm">Sharpe Ratio</span>
                  <div className="text-white/90 text-xl">1.85</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <span className="text-white/60 text-sm">Max Drawdown</span>
                  <div className="text-red-400 text-xl">-12.3%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="col-span-3 space-y-6">
            <div className="bg-white/5 rounded-lg p-4">
              <h2 className="text-white/90 font-medium mb-4">Live Performance</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Running Time</span>
                  <span className="text-white/90">5d 12h 34m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Total Trades</span>
                  <span className="text-white/90">24</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Win Rate</span>
                  <span className="text-green-400">68%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Profit Factor</span>
                  <span className="text-white/90">1.85</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h2 className="text-white/90 font-medium mb-4">Recent Trades</h2>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className={i % 2 === 0 ? 'text-green-400' : 'text-red-400'}>
                      {i % 2 === 0 ? '+' : '-'}${(Math.random() * 100).toFixed(2)}
                    </span>
                    <span className="text-white/40">
                      {new Date(Date.now() - i * 3600000).toLocaleTimeString()}
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

export default AlgoTrading;