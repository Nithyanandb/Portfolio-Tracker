import { useQuery } from "react-query";
import { StockHolding } from "./market";

const MOCK_HOLDINGS = [
  { symbol: 'AAPL', quantity: 10, averagePrice: 150.0 },
  { symbol: 'MSFT', quantity: 5, averagePrice: 280.0 },
  { symbol: 'GOOGL', quantity: 3, averagePrice: 2800.0 }
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getStockQuote = async (symbol: string) => {
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=ctrcluhr01qhb16mj1r0ctrcluhr01qhb16mj1rg`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch quote data for ${symbol}`);
  }
  return response.json();
};

const getCompanyProfile = async (symbol: string) => {
  const response = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=ctrcluhr01qhb16mj1r0ctrcluhr01qhb16mj1rg`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch company profile for ${symbol}`);
  }
  return response.json();
};

export const useStockData = () => {
  const { data, isLoading, error } = useQuery(
    'holdings',
    async () => {
      const holdingsData = await Promise.all(
        MOCK_HOLDINGS.map(async (holding, index) => {
          await delay(index * 1000); // Add a 1-second delay between each call
          try {
            const [quote, profile] = await Promise.all([
              getStockQuote(holding.symbol),
              getCompanyProfile(holding.symbol)
            ]);

            const currentPrice = quote.c;
            const marketValue = holding.quantity * currentPrice;
            const totalCost = holding.quantity * holding.averagePrice;
            const totalGain = marketValue - totalCost;
            const totalGainPercent = (totalGain / totalCost) * 100;
            const dayGain = holding.quantity * quote.d;

            return {
              symbol: holding.symbol,
              companyName: profile.name,
              quantity: holding.quantity,
              averagePrice: holding.averagePrice,
              currentPrice,
              change: quote.d,
              changePercent: quote.dp,
              marketValue,
              dayGain,
              totalGain,
              totalGainPercent
            } as StockHolding;
          } catch (error) {
            console.error(`Error fetching data for ${holding.symbol}:`, error);
            return null;
          }
        })
      );

      return holdingsData.filter(Boolean); // Filter out null values
    },
    {
      refetchInterval: 5000 // Refresh every 5 seconds
    }
  );

  const totalValue = data?.reduce((sum, holding) => sum + holding!.marketValue, 0) || 0;
  const todayGain = data?.reduce((sum, holding) => sum + holding!.dayGain, 0) || 0;

  // Mock chart data - in a real app, this would come from your API
  const chartData = {
    timestamps: Array.from({ length: 24 }, (_, i) => Math.floor(Date.now() / 1000) - i * 3600),
    prices: Array.from({ length: 24 }, () => totalValue + (Math.random() - 0.5) * 10000)
  };

  return {
    holdings: data,
    chartData,
    totalValue,
    todayGain,
    isLoading,
    error
  };
};