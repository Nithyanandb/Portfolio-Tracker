import React, { useState, useEffect } from 'react';
import { Binary, Calendar, DollarSign } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Header from '../../Header';
import TradingChart from './TradingChart';
import RiskWarning from './RiskWarning';
import { tradingApi } from '../../../../services/tradingApi';

const OptionsTrading = () => {
  const [selectedExpiry, setSelectedExpiry] = useState('2024-03-29');
  const [optionType, setOptionType] = useState<'CALL' | 'PUT'>('CALL');
  const [quantity, setQuantity] = useState(1);
  const [selectedStrike, setSelectedStrike] = useState<number | null>(null);

  // Fetch option chain
  const { data: optionChain } = useQuery({
    queryKey: ['optionChain', selectedExpiry],
    queryFn: () => tradingApi.getOptionChain('BTC/USD', selectedExpiry)
  });

  // Place option order mutation
  const placeOrderMutation = useMutation({
    mutationFn: tradingApi.placeOptionOrder,
    onSuccess: () => {
      // Handle success (e.g., show notification, reset form)
    }
  });

  const handlePlaceOrder = async () => {
    if (!selectedStrike) return;

    await placeOrderMutation.mutateAsync({
      symbol: 'BTC/USD',
      type: optionType,
      strike: selectedStrike,
      expiry: selectedExpiry,
      quantity
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />
      
      <main className="container mx-auto px-6 py-24">
        <RiskWarning message="Options trading involves substantial risk. Please ensure you understand the mechanics before trading." />
        
        <div className="grid grid-cols-12 gap-8">
          {/* Chart Section */}
          <div className="col-span-8">
            <TradingChart 
              symbol="BTC/USD" 
              className="h-[500px] rounded-2xl backdrop-blur-xl" 
            />
          </div>

          {/* Trading Panel */}
          <div className="col-span-4 space-y-6">
            {/* Option Type Selector */}
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6">
              <h3 className="text-lg font-medium text-white mb-4">Option Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {['CALL', 'PUT'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOptionType(type as 'CALL' | 'PUT')}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300
                      ${optionType === type 
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-white/[0.03] text-gray-400 hover:bg-white/[0.06]'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Form */}
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 space-y-6">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-400">Strike Price</span>
                  <select 
                    value={selectedStrike || ''}
                    onChange={(e) => setSelectedStrike(Number(e.target.value))}
                    className="mt-1 block w-full rounded-xl bg-white/[0.03] border-0 
                      text-white py-3 px-4 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Strike</option>
                    {optionChain?.strikes.map((strike) => (
                      <option key={strike} value={strike}>${strike}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-400">Quantity</span>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="mt-1 block w-full rounded-xl bg-white/[0.03] border-0 
                      text-white py-3 px-4 focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </label>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!selectedStrike || placeOrderMutation.isPending}
                className="w-full py-4 px-6 rounded-xl text-sm font-medium tracking-wide
                  bg-gradient-to-r from-blue-500 to-blue-600 text-white
                  hover:from-blue-600 hover:to-blue-700
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-300 shadow-lg shadow-blue-500/25"
              >
                {placeOrderMutation.isPending ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OptionsTrading;