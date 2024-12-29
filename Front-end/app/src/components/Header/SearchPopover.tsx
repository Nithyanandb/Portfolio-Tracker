import React, { useState } from 'react';
import { Search, TrendingUp, Clock, X } from 'lucide-react';
import { Popover, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '../hooks/useDebounce';
import { SearchResult } from '../types/index';

export const SearchPopover: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'TSLA', name: 'Tesla, Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  ]);

  const fetchSearchResults = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=84a4mSK1lse6tnzPzaZvW1Zqh8sy4rIQ`
      );
      const data = await response.json();
      setSearchResults(data || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  useDebounce(() => fetchSearchResults(searchQuery), 300, [searchQuery]);

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200
              ${open ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
          >
            <Search className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:block">Search</span>
          </Popover.Button>

          <Transition
            show={open}
            as={React.Fragment}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel className="absolute right-0 z-50 mt-2 w-screen max-w-md">
              <motion.div 
                className="overflow-hidden rounded-xl border border-white/10 shadow-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative bg-black/90 backdrop-blur-xl">
                  {/* Search Input */}
                  <div className="relative p-4 pb-0">
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Search markets, stocks, crypto..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 pl-10 text-white placeholder-white/40
                          focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 
                          transition-all duration-200"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    {loading ? (
                      <div className="flex justify-center items-center py-8">
                        <motion.div 
                          className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    ) : searchQuery ? (
                      <div className="space-y-2">
                        {searchResults.map((result) => (
                          <motion.a
                            key={result.symbol}
                            href={`/stock/${result.symbol}`}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                            whileHover={{ x: 4 }}
                          >
                            <div className="p-2 rounded-lg bg-white/5">
                              <TrendingUp className="w-4 h-4 text-white/60" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-white">{result.symbol}</span>
                                <span className="text-sm text-white/60">{result.name}</span>
                              </div>
                              <span className="text-xs text-white/40">
                                {result.stockExchange}
                              </span>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                            Recent Searches
                          </h3>
                          <div className="space-y-1">
                            {recentSearches.map((item) => (
                              <motion.button
                                key={item.symbol}
                                className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors"
                                whileHover={{ x: 4 }}
                                onClick={() => setSearchQuery(item.symbol)}
                              >
                                <Clock className="w-4 h-4 text-white/40" />
                                <span className="text-sm text-white/80">{item.symbol}</span>
                                <span className="text-sm text-white/40">{item.name}</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};