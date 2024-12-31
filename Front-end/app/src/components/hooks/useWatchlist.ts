import { useState, useEffect, useCallback } from 'react';
import type { WatchlistItem } from '../types/market';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWatchlist = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:2000/api/watchlist');
      if (!response.ok) throw new Error('Failed to fetch watchlist');
      const data = await response.json();
      setWatchlist(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  const addToWatchlist = async (symbol: string) => {
    try {
      const response = await fetch('http://localhost:2000/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol }),
      });
      if (!response.ok) throw new Error('Failed to add to watchlist');
      await fetchWatchlist();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item');
    }
  };

  const removeFromWatchlist = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:2000/api/watchlist/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove from watchlist');
      await fetchWatchlist();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item');
    }
  };

  const updateWatchlistItem = async (id: string, data: Partial<WatchlistItem>) => {
    try {
      const response = await fetch(`http://localhost:2000/api/watchlist/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update watchlist item');
      await fetchWatchlist();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
    }
  };

  return {
    watchlist,
    isLoading,
    error,
    addToWatchlist,
    removeFromWatchlist,
    updateWatchlistItem,
  };
};