import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EarningsData {
  actual: number;
  estimate: number;
  period: string;
  quarter: number;
  surprise: number;
  surprisePercent: number;
  symbol: string;
  year: number;
}

interface EarningsSurpriseProps {
  symbol: string;
  limit?: number;
}

const EarningsSurprise: React.FC<EarningsSurpriseProps> = ({ symbol, limit = 4 }) => {
  const [earningsData, setEarningsData] = useState<EarningsData[]>([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = 'ctre6q9r01qhb16mmh70ctre6q9r01qhb16mmh7g'; // Replace with your Finnhub API key

  useEffect(() => {
    const fetchEarningsData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/stock/earnings?symbol=${symbol}&limit=${limit}&token=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch earnings data');
        }
        const data = await response.json();
        setEarningsData(data);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, [symbol, limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        <span className="ml-4 text-white">Loading...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="backdrop-blur-2xl bg-black/40 rounded-3xl overflow-hidden transition-all duration-500 p-6"
    >
      <h2 className="text-xl font-bold text-white mb-4">Earnings Surprise for {symbol}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actual</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estimate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Surprise</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Surprise %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {earningsData.map((earning, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{earning.period}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{earning.actual}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{earning.estimate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{earning.surprise}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{earning.surprisePercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default EarningsSurprise;