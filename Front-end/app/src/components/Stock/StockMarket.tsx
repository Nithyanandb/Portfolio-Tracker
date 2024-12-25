import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface StockData {
  symbol: string;
  price: number;
  companyName: string;
}

const StockMarket: React.FC = () => {
  const [symbol, setSymbol] = useState<string>('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [error, setError] = useState<string>('');


  useEffect(() => {
    if (symbol) {
      const token = localStorage.getItem('authToken'); // Getting the token from localStorage
      if (token) {
        axios
          .get(`/market/stock?symbol=${symbol}`, {
            headers: { Authorization: `Bearer ${token}` }, // Passing the token in the header
          })
          .then((response) => {
            setStockData({
              symbol: symbol,
              price: parseFloat(response.data.price),
              companyName: response.data.companyName,
            });
          })
          .catch((err) => {
            setError('Error fetching stock data');
            console.error(err);
          });
      } else {
        setError('Please log in to view stock data');
      }
    }
  }, [symbol]);

  const handleBuy = () => {
    if (quantity <= 0) {
      setError('Please enter a valid quantity to buy');
      return;
    }
    alert(`Buying ${quantity} shares of ${stockData?.companyName}`);
  };

  const handleSell = () => {
    if (quantity <= 0) {
      setError('Please enter a valid quantity to sell');
      return;
    }
    alert(`Selling ${quantity} shares of ${stockData?.companyName}`);
  };

  return (
    <div>
      <h1>Stock Market</h1>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol (e.g., AAPL)"
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {stockData && (
        <div>
          <h2>{stockData.companyName} ({stockData.symbol})</h2>
          <p>Price: ${stockData.price}</p>

          <div>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              placeholder="Enter quantity"
            />
          </div>

          <button onClick={handleBuy}>Buy</button>
          <button onClick={handleSell}>Sell</button>
        </div>
      )}
    </div>
  );
};

export default StockMarket;
