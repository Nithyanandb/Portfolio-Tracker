import { useState } from 'react';
import type { TradeRequest } from '../types/trading';

export const useTradingActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeTrade = async (trade: TradeRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/trades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trade),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to execute trade');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    executeTrade,
    loading,
    error,
  };
};