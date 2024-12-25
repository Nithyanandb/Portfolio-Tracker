import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Popover, Transition } from '@headlessui/react';
import { useDebounce } from '../hooks/useDebounce';
import { SearchResult } from '../types/index';

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
          <Popover.Button className="flex items-center text-gray-500 hover:text-white transition-colors">
            <Search />
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
            <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-xs transform px-2">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white/10 backdrop-blur-xl p-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search markets..."
                      className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-500 transition-all pr-12"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-blue-500">
                      <Search className="h-5 w-5" />
                    </button>
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center mt-4">
                      <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    searchResults.length > 0 && (
                      <div className="mt-2 max-h-100 overflow-y-auto bg-white/10 border border-gray-600 rounded-lg text-white">
                        {searchResults.map((result) => (
                          <div
                            key={result.symbol}
                            className="px-4 py-2 hover:bg-white/20 cursor-pointer"
                          >
                            <p>
                              {result.symbol}: {result.name}
                            </p>
                            <p>
                              {result.stockExchange} ({result.exchangeShortName})
                            </p>
                          </div>
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