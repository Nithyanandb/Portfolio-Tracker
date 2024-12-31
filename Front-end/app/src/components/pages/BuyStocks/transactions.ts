import { API_BASE_URL, API_ENDPOINTS } from './config';

export interface TransactionRequest {
  stockSymbol: string;
  stockName: string;
  quantity: number;
  price: number;
  totalAmount: number;
  transactionType: 'BUY' | 'SELL';
}

export async function buyStock(request: TransactionRequest, token: string) {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.transactions.buy}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to process transaction');
  }

  return response.json();
}