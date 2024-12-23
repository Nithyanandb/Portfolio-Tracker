import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import d from 'C:\Users\nithy\Documents\Github\Portfolio-Tracker\Front-end\app\public\amazon.svg'
// Dummy data for fallback in case API fails to load
const defaultCompanies = [
  { name: 'Apple', symbol: 'AAPL', price: '173.50', change: '+1.2%', volume: '52.3M', marketCap: '2.8T' },
  { name: 'Microsoft', symbol: 'MSFT', price: '378.85', change: '+0.8%', volume: '23.1M', marketCap: '2.7T' },
  { name: 'NVIDIA', symbol: 'NVDA', price: '726.13', change: '+2.5%', volume: '45.2M', marketCap: '1.8T' },
  { name: 'Tesla', symbol: 'TSLA', price: '202.64', change: '-1.2%', volume: '108.5M', marketCap: '642.8B' },
  { name: 'Amazon', symbol: 'AMZN', price: '174.42', change: '+0.9%', volume: '35.6M', marketCap: '1.8T' },
  { name: 'Google', symbol: 'GOOGL', price: '137.89', change: '+0.5%', volume: '22.8M', marketCap: '1.9T' },
  { name: 'Meta', symbol: 'META', price: '301.21', change: '-0.4%', volume: '15.3M', marketCap: '798.7B' },
  { name: 'Netflix', symbol: 'NFLX', price: '345.78', change: '+1.1%', volume: '5.9M', marketCap: '151.9B' }
];

// Predefined logo URLs
const logoUrls = {
  AAPL: 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png',
  MSFT: 'https://logos-world.net/wp-content/uploads/2020/04/Microsoft-Logo.png',
  NVDA: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Nvidia_logo.svg',
  TSLA: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Tesla_Logo.png',
  // AMZN: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png',
  GOOGL: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_logo.svg',
  META: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Meta_Platforms_logo.svg',
  NFLX: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Netflix_logo.svg',
};

const getLogoUrl = (symbol) => {
  return logoUrls[symbol] || '/default-logo.png';  // Fallback logo if not found
};

const MarketDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logoError, setLogoError] = useState({});  // Track logos that failed to load

  const fetchMarketData = async () => {
    const symbols = ['AAPL', 'MSFT', 'NVDA', 'TSLA', 'AMZN', 'GOOGL', 'META', 'NFLX']; // More stock symbols

    try {
      
      const fetchedData = await Promise.all(
        symbols.map(async (symbol) => {
          const response = await axios.get('https://www.alphavantage.co/query', {
            params: {
              function: 'GLOBAL_QUOTE',
              symbol: symbol,
              apikey: 'PK64B7TK3WKUBWBR',  // Replace with your actual Alpha Vantage API key
            },
          });

          return {
            name: response.data['Global Quote']['01. symbol'],
            symbol: symbol,
            price: response.data['Global Quote']['05. price'],
            change: response.data['Global Quote']['10. change percent'],
            volume: response.data['Global Quote']['06. volume'],
            marketCap: 'TBD', // Market Cap is not provided in the API's GLOBAL_QUOTE function
          };
        })
      );

      setCompanies(fetchedData);
    } catch (error) {
      console.error('Error fetching market data:', error);
      setCompanies(defaultCompanies); // Fallback to default data if the API fails
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData(); // Initial data fetch

    // Set interval to fetch data every 1 second
    const intervalId = setInterval(() => {
      fetchMarketData();
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleLogoError = (symbol) => {
    setLogoError((prevState) => ({ ...prevState, [symbol]: true }));  // Mark the logo as failed for the specific company
  };

  if (loading) {
    return <div className="px-40 py-60 transition-all duration-300">Loading...</div>;
  }

  return (
    <div className="bg-black/80 backdrop-blur-xl rounded-2xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6 text-white">Market Overview</h2>

        {/* Market Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-xl p-4"
          >
            <h3 className="text-sm text-gray-400 mb-2">Global Market Cap</h3>
            <p className="text-2xl font-bold text-white">$11.1T</p>
            <span className="text-green-500 text-sm">+2.3%</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 rounded-xl p-4"
          >
            <h3 className="text-sm text-gray-400 mb-2">24h Volume</h3>
            <p className="text-2xl font-bold text-white">$284.5B</p>
            <span className="text-green-500 text-sm">+5.8%</span>
          </motion.div>
        </div>

        {/* Companies List */}
        <div className="space-y-4">
          {companies.map((company, index) => (
            <motion.div
              key={company.symbol}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  {/* Conditionally render logo or name based on if it failed to load */}
                  {!logoError[company.symbol] ? (
                    <img
                      src={getLogoUrl(company.symbol)}
                      alt={`${company.name} logo`}
                      className="w-8 h-8 object-cover rounded-full "
                      onError={() => handleLogoError(company.symbol)}  // Handle error and hide logo
                    />
                  ) : (
                    <span className="text-white text-xl font-semibold">{company.name}</span>
                  )}
                  {!logoError[company.symbol] && (
                    <div>
                      <h3 className="font-semibold text-white">{company.name}</h3>
                      <span className="text-sm text-gray-400">{company.symbol}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">${company.price}</p>
                  <span className={company.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                    {company.change}
                  </span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-400">
                  Vol: <span className="text-white">{company.volume}</span>
                </div>
                <div className="text-gray-400 text-right">
                  MCap: <span className="text-white">{company.marketCap}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;
