import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

// Define the Transaction type
interface Transaction {
  id: string;
  type: 'Buy' | 'Sell';
  stockSymbol: string;
  stockName: '';
  quantity: string;
  price: string;
  timestamp: string;
}

export const AllStocks: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:2000/transaction/all');
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <Activity className="w-8 h-8 text-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-400 text-center">
          <p className="text-xl font-semibold">Error loading transactions</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 z-10 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Activity className="text-blue-500" />
            Transaction History
          </h1>
          <p className="text-gray-400 mt-2">
            View all your stock trading activities
          </p>
        </header>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <h3 className="text-gray-400 text-sm">Total Transactions</h3>
              <p className="text-2xl font-bold mt-1">{transactions.length}</p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <h3 className="text-gray-400 text-sm">Buy Orders</h3>
              <p className="text-2xl font-bold mt-1 text-green-400">
                {transactions.filter(t => t.type === 'Buy').length}
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <h3 className="text-gray-400 text-sm">Sell Orders</h3>
              <p className="text-2xl font-bold mt-1 text-red-400">
                {transactions.filter(t => t.type === 'Sell').length}
              </p>
            </div>
          </div>

          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <div className="overflow-x-auto bg-gray-800/50 rounded-xl p-4">
      <table className="min-w-full">
        <thead>
          <tr className="text-sm text-gray-400">
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Action</th>
            <th className="px-6 py-3 text-left">Symbol</th>
            <th className="px-6 py-3 text-left">Company Name</th>
            <th className="px-6 py-3 text-left">Quantity</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="text-sm text-gray-300">
              <td className="px-6 py-3">{transaction.id}</td>
              <td className="px-6 py-3">{transaction.type}</td>
              <td className="px-6 py-3">{transaction.stockSymbol}</td>
              <td className="px-6 py-3">{transaction.stockName}</td>
              <td className="px-6 py-3">{transaction.quantity}</td>
              <td className="px-6 py-3">{transaction.price}</td>
              <td className="px-6 py-3">{transaction.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStocks;




