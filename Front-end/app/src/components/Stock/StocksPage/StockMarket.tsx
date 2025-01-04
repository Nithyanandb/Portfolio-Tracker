import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { SegmentSelector } from './SegmentSelector';
import { HoldingsTable } from './HoldingsTable';
import { symbols } from './symbols'; // Import the symbols
import Header from '@/components/Header/Header';
import { motion, AnimatePresence } from 'framer-motion';

const segments = ['ALL', 'TECHNOLOGY', 'FINANCE', 'HEALTHCARE', 'ENERGY', 'CONSUMER'];
const API_KEY = "ctre6q9r01qhb16mmh70ctre6q9r01qhb16mmh7g"; // Replace with your API key

const StockMarket: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('ALL');
  const [selectedStock, setSelectedStock] = useState<typeof symbols[0] | null>(null);
  const [financials, setFinancials] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch basic financials for all symbols on component mount
  useEffect(() => {
    const fetchAllFinancials = async () => {
      setLoading(true);
      try {
        const financialData: Record<string, any> = {};
        for (const stock of symbols) {
          const response = await fetch(
            `https://finnhub.io/api/v1/stock/metric?symbol=${stock.symbol}&metric=all&token=${API_KEY}`
          );
          const data = await response.json();
          financialData[stock.symbol] = data;
        }
        setFinancials(financialData);
      } catch (error) {
        console.error('Failed to fetch financials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllFinancials();
  }, []);

  // Get financials for the selected stock
  const selectedFinancials = selectedStock ? financials[selectedStock.symbol] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white">
      <Header />

      <div className="flex h-screen pt-20">
        {/* Sidebar for Basic Financials */}
        <div className=" p-8 space-y-4 overflow-y-auto w-[400px] h-[calc(100vh-200px)]">
          <h2 className="text-xl font-semibold text-white mb-4">Basic Financials</h2>
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <span className="text-white/60">Loading financials...</span>
            </div>
          ) : selectedFinancials ? (
            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Key Metrics</h3>
                <div className="space-y-2">
                  <p className="text-sm text-white/60">52-Week High: <span className="text-white">{selectedFinancials.metric['52WeekHigh']}</span></p>
                  <p className="text-sm text-white/60">52-Week Low: <span className="text-white">{selectedFinancials.metric['52WeekLow']}</span></p>
                  <p className="text-sm text-white/60">Beta: <span className="text-white">{selectedFinancials.metric.beta}</span></p>
                  <p className="text-sm text-white/60">PE Ratio: <span className="text-white">{selectedFinancials.metric.peAnnual}</span></p>
                  <p className="text-sm text-white/60">Net Margin: <span className="text-white">{selectedFinancials.metric.netMarginAnnual}</span></p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Annual Ratios</h3>
                <div className="space-y-2">
                  {selectedFinancials.series.annual.currentRatio.map((ratio: any, index: number) => (
                    <p key={index} className="text-sm text-white/60">
                      Current Ratio ({ratio.period}): <span className="text-white">{ratio.v}</span>
                    </p>
                  ))}
                  {selectedFinancials.series.annual.salesPerShare.map((ratio: any, index: number) => (
                    <p key={index} className="text-sm text-white/60">
                      Sales Per Share ({ratio.period}): <span className="text-white">{ratio.v}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center py-4">
              <span className="text-white/60">Select a stock to view financials.</span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
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
            </div>

            {/* Segment Selector */}
            <SegmentSelector
              segments={segments}
              selectedSegment={selectedSegment}
              onSegmentChange={setSelectedSegment}
            />

            {/* Holdings Table */}
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {symbols && (
                  <HoldingsTable
                    holdings={symbols}
                    onStockSelect={setSelectedStock}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockMarket;