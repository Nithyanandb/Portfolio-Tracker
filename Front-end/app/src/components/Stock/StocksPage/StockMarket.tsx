import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { MarketOverview } from './MarketOverview';
import { SearchBar } from './SearchBar';
import { SegmentSelector } from './SegmentSelector';
import { HoldingsTable } from './HoldingsTable';
import { symbols } from './symbols'; // Import the symbols
import Header from '@/components/Header/Header';
const segments = ['ALL', 'TECHNOLOGY', 'FINANCE', 'HEALTHCARE', 'ENERGY', 'CONSUMER'];

const StockMarket: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('ALL');

  // Mock data for holdings (symbols to fetch data for)


  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-black">
      <Header />

        <div className="container mx-auto px-4 py-32">
          {/* Header */}
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold text-white">Market Holdings</h1>
              <div className="flex items-center gap-4">
                <Clock size={16} className="text-gray-400" />
                <span className="text-sm text-gray-400">
                  Market {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
            
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          <SegmentSelector
            segments={segments}
            selectedSegment={selectedSegment}
            onSegmentChange={setSelectedSegment}
          />

          {/* Holdings */}
          {symbols && <HoldingsTable holdings={symbols} />}
        </div>
      </div>
    </div>
  );
};

export default StockMarket;