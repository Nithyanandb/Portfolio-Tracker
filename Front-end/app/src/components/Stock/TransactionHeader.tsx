import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface TransactionHeaderProps {
  name: string;
  symbol: string;
  price: number;
  trend: 'up' | 'down';
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({ name, symbol, price, trend }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h1 className="text-2xl font-bold">{name} ({symbol})</h1>
      <p className="text-gray-400">NYSE</p>
    </div>
    <div className="text-right">
      <div className="flex items-center gap-2">
        {trend === 'up' ? (
          <ArrowUpCircle className="w-6 h-6 text-green-500" />
        ) : (
          <ArrowDownCircle className="w-6 h-6 text-red-500" />
        )}
        <span className="text-2xl font-semibold">${price.toFixed(2)}</span>
      </div>
      <p className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {trend === 'up' ? '+2.5%' : '-1.8%'} Today
      </p>
    </div>
  </div>
);

export default TransactionHeader;