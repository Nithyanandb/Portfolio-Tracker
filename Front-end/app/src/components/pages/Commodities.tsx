import React, { useEffect, useState } from 'react';
import { BarChart2 } from 'lucide-react';

interface Commodity {
  id: number;
  name: string;
  price: number;
  unit: string;
  change: number;
  lastUpdated: string;
}

function Commodities() {
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommodities();
  }, []);

  const fetchCommodities = async () => {
    try {
      const response = await fetch('/api/commodities');
      const data = await response.json();
      setCommodities(data);
    } catch (error) {
      console.error('Error fetching commodities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Commodities Market</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commodities.map((commodity) => (
          <div key={commodity.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{commodity.name}</h2>
              <BarChart2 className="text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold">${commodity.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">per {commodity.unit}</p>
              <p className={`text-sm ${commodity.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {commodity.change > 0 ? '+' : ''}{commodity.change.toFixed(2)}%
              </p>
              <p className="text-xs text-gray-400">
                Last updated: {new Date(commodity.lastUpdated).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Commodities;