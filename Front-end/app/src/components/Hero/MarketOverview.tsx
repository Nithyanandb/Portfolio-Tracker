import React, { useState, useEffect } from 'react';


const MarketOverview: React.FC = () => {
  const { marketData } = useMarketContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (marketData) {
      setIsLoading(false);
    }
  }, [marketData]);

  if (isLoading || !marketData) {
    return (
      <div className="p-4">
        <p className="text-gray-400">Loading market data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-white">Market Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {marketData && marketData.map((item) => (
          <div key={item.symbol} className="bg-white/5 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{item.symbol}</span>
              <span className={`text-sm ${
                item.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {item.change >= 0 ? '+' : ''}{item.change}%
              </span>
            </div>
            <div className="text-xl font-medium text-white mt-1">
              ₹{item.price.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketOverview;

function useMarketContext(): { marketData: any; } {
  throw new Error('Function not implemented.');
}
