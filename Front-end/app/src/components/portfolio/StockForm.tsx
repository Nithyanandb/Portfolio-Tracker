import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addStock, updateStock, deleteStock, getPortfolio, PortfolioStock } from './portfolioApi';

const StockForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    quantity: 0,
    buyPrice: 0
  });

  useEffect(() => {
    if (id) {
      const portfolio = getPortfolio();
      const stock = portfolio.find(item => item.id === id);
      if (stock) {
        setFormData({
          symbol: stock.symbol,
          name: stock.name,
          quantity: stock.quantity,
          buyPrice: stock.buyPrice
        });
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (id) {
      updateStock({ ...formData, id });
    } else {
      addStock(formData);
    }
    
    navigate('/portfolio');
  };

  const handleDelete = () => {
    if (id && window.confirm('Are you sure you want to delete this stock?')) {
      deleteStock(id);
      navigate('/portfolio');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">
          {id ? 'Edit Stock' : 'Add New Stock'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Stock Symbol
              </label>
              <input
                type="text"
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
                step="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Buy Price
              </label>
              <input
                type="number"
                value={formData.buyPrice}
                onChange={(e) => setFormData({ ...formData, buyPrice: Number(e.target.value) })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {id ? 'Update Stock' : 'Add Stock'}
              </button>

              {id && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete Stock
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockForm;