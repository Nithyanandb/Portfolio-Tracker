import React, { useState, useEffect } from 'react';
import { TrendingDown } from 'lucide-react';

interface UserStock {
  id: number;
  symbol: string;
  quantity: number;
  averagePrice: number;
}

function SellStocks() {
  const [userStocks, setUserStocks] = useState<UserStock[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserStocks();
  }, []);

  const fetchUserStocks = async () => {
    try {
      const response = await fetch('/api/stocks/user');
      const data = await response.json();
      setUserStocks(data);
    } catch (error) {
      console.error('Error fetching user stocks:', error);
    }
  };

  const handleSell = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/stocks/sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: selectedStock,
          quantity,
        }),
      });
      const data = await response.json();
      setMessage(data.message);
      if (response.ok) {
        fetchUserStocks();
      }
    } catch (error) {
      setMessage('Error processing sale');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sell Stocks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Portfolio</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symbol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userStocks.map((stock) => (
                  <tr key={stock.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${stock.averagePrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Sell Order</h2>
          <form onSubmit={handleSell}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                Select Stock
              </label>
              <select
                id="stock"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                required
              >
                <option value="">Select a stock</option>
                {userStocks.map((stock) => (
                  <option key={stock.id} value={stock.symbol}>
                    {stock.symbol} ({stock.quantity} shares)
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                Quantity to Sell
              </label>
              <input
                type="number"
                id="quantity"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                required
                min="1"
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Sell Stocks'}
            </button>
          </form>
          {message && (
            <div className="mt-4 p-4 rounded bg-gray-100">
              <p className="text-sm text-gray-700">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellStocks;