import React from 'react';
import { Portfolio } from './Portfolio';
import { formatMoney, formatPercent } from './Portfolio';
import { motion } from 'framer-motion';

interface Props {
  data: Portfolio[];
  onBuyClick: (symbol: string) => void;
  onSellClick: (symbol: string) => void;
}

export const PortfolioTable: React.FC<Props> = ({ data, onBuyClick, onSellClick }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Stock
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Shares
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Avg Price
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Current Price
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Market Value
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Return
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hover:bg-gray-50"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {item.symbol}
                    </div>
                    <div className="text-sm text-gray-500">{item.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                {item.shares}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                {formatMoney(item.averagePrice)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                {formatMoney(item.currentPrice)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                {formatMoney(item.marketValue)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                <span className={`${item.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercent(item.totalReturn)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                <button
                  onClick={() => onBuyClick(item.symbol)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Buy
                </button>
                <button
                  onClick={() => onSellClick(item.symbol)}
                  className="text-red-600 hover:text-red-900"
                >
                  Sell
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};