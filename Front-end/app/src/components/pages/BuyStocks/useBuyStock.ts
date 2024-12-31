import { useState } from 'react';
import { buyStock, TransactionRequest } from './transactions';
import { useAuth } from '../../hooks/useAuth';

interface UseBuyStockProps {
  onSuccess: () => void;
}

export function useBuyStock({ onSuccess }: UseBuyStockProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, user, isAuthenticated } = useAuth();

  const handlePurchase = async (stock: { symbol: string; name: string; price: number }, quantity: number) => {
    if (!isAuthenticated || !token) {
      setError('Please login to continue');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:2000/transaction/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          stockSymbol: stock.symbol,
          stockName: stock.name,
          quantity,
          price: stock.price,
          userId: user?.email
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Transaction failed');
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    error,
    handlePurchase
  };
}
