import React, { useState } from 'react';
import { TrendingDown, DollarSign, BarChart2, AlertCircle } from 'lucide-react';
import Header from '../Header/Header';

interface StockFormData {
  symbol: string;
  quantity: string;
  price: string;
}

export const SellStocks: React.FC = () => {
  const [formData, setFormData] = useState<StockFormData>({
    symbol: '',
    quantity: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:2000/transaction/sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to process sell order');
      
      setMessage({ type: 'success', text: 'Stock sold successfully!' });
      setFormData({ symbol: '', quantity: '', price: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to process sell order. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Header/>
      <div className="max-w-4xl pt-28 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <TrendingDown className="text-red-400" />
            Sell Stock
          </h1>
          <p className="text-gray-400 text-lg">Execute your exit strategy with precision</p>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <DollarSign className="text-red-400 mb-2" />
            <h3 className="text-lg font-semibold">Portfolio Value</h3>
            <p className="text-2xl font-bold text-red-400">$1.2M</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <BarChart2 className="text-blue-400 mb-2" />
            <h3 className="text-lg font-semibold">Holdings</h3>
            <p className="text-2xl font-bold text-blue-400">15</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <AlertCircle className="text-purple-400 mb-2" />
            <h3 className="text-lg font-semibold">Market Status</h3>
            <p className="text-2xl font-bold text-purple-400">Open</p>
          </div>
        </div>

        {/* Sell Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stock Symbol
              </label>
              <input
                type="text"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="e.g., TSLA"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter quantity"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price per Share
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter price"
                  required
                />
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
              }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Processing...' : 'Place Sell Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellStocks;