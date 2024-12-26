import React, { useState } from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';

interface StockOrder {
  symbol: string;
  quantity: number;
  price: number;
}

function BuyStocks() {
  const [order, setOrder] = useState<StockOrder>({
    symbol: '',
    quantity: 0,
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/stocks/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error processing order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Buy Stocks</h1>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="symbol">
              Stock Symbol
            </label>
            <input
              type="text"
              id="symbol"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={order.symbol}
              onChange={(e) => setOrder({ ...order, symbol: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={order.quantity}
              onChange={(e) => setOrder({ ...order, quantity: parseInt(e.target.value) })}
              required
              min="1"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price per Share ($)
            </label>
            <input
              type="number"
              id="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={order.price}
              onChange={(e) => setOrder({ ...order, price: parseFloat(e.target.value) })}
              required
              step="0.01"
              min="0.01"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
        {message && (
          <div className="mt-4 p-4 rounded bg-gray-100">
            <p className="text-sm text-gray-700">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuyStocks;