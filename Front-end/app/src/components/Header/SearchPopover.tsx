import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Popover, Transition } from '@headlessui/react';
import { useDebounce } from '../hooks/useDebounce';
import { SearchResult } from '../types/index';
import { motion } from 'framer-motion';

export const SearchPopover: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

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

  useDebounce(() => fetchSearchResults(searchQuery), 500, [searchQuery]);

  return (
    <Popover className="hidden lg:block relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center text-gray-500 hover:text-blue-500 transition-all duration-300">
            <Search className="w-5 h-5" />
          </Popover.Button>
          <Transition
            show={open}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-md transform px-2">
              <div className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/5">
                <div className="relative bg-black/95 backdrop-blur-2xl p-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search markets..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        hover:bg-white/10 transition-all duration-300 pr-12 font-light tracking-wide"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-blue-500 transition-colors duration-300">
                      <Search className="h-5 w-5" />
                    </button>
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center mt-6">
                      <div className="w-6 h-6 border-2 border-t-blue-500 border-white/20 rounded-full animate-spin" />
                    </div>
                  ) : (
                    searchResults.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {searchResults.map((result) => (
                          <motion.div
                            key={result.symbol}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-all duration-300 border border-white/5 hover:border-white/10"
                          >
                            <p className="text-white font-light tracking-wide">
                              {result.symbol}
                              <span className="text-white/60 ml-2">{result.name}</span>
                            </p>
                            <p className="text-sm text-white/40 mt-1">
                              {result.stockExchange}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};