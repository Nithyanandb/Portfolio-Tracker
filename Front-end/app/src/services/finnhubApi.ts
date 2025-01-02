const FINNHUB_API_KEY = "ctksb2pr01qn6d7jeekgctksb2pr01qn6d7jeel0";
const BASE_URL = "https://finnhub.io/api/v1";

export interface FinnhubQuote {
  c: number;  // Current price
  d: number;  // Change
  dp: number; // Percent change
  h: number;  // High price of the day
  l: number;  // Low price of the day
  o: number;  // Open price of the day
  pc: number; // Previous close price
  t: number;  // Timestamp
}

export const finnhubClient = {
  async getQuote(symbol: string): Promise<FinnhubQuote> {
    const response = await fetch(
      `${BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    return response.json();
  },

  async getStockDetails(symbol: string): Promise<any> {
    const response = await fetch(
      `${BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch stock details');
    }
    return response.json();
  }
};
