import React from 'react';
import { Stock } from './stockApi';

interface StockTableProps {
  stocks: Stock[];
  onBuyClick: (stock: Stock) => void;
  loading: boolean;
}

/**
 * StockTable component
 *
 * Displays a table of stocks with their symbol, company name, price, and a buy button.
 *
 * @param {StockTableProps} props - Component props
 * @returns {JSX.Element} - Stock table JSX element
 */
export const StockTable: React.FC<StockTableProps> = ({
    stocks,
    onBuyClick,
    loading,
  }) => {
    if (loading) {
      return (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700/50 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-700/50 rounded"></div>
            ))}
          </div>
        </div>
      );
    }
  
    return (
      <div className="overflow-x-auto bg-gray-800/50 backdrop-blur-sm rounded-xl">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {stocks.map((stock) => (
              <tr key={stock.symbol} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {stock.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {stock.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  ${stock.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onBuyClick(stock)}
                    className="text-green-400 hover:text-green-300 font-semibold"
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };