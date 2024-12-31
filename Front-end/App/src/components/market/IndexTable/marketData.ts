import type { MarketIndex } from '../types/market';

const DEMO_API_KEY = 'demo'; // Replace with your Alpha Vantage API key

export const fetchIndexData = async (symbol: string): Promise<Partial<MarketIndex>> => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${DEMO_API_KEY}`
    );
    const data = await response.json();
    
    if (data['Time Series (Daily)']) {
      const timeSeriesData = data['Time Series (Daily)'];
      const dates = Object.keys(timeSeriesData);
      const latestDate = dates[0];
      const previousDate = dates[1];
      const latestData = timeSeriesData[latestDate];
      const previousData = timeSeriesData[previousDate];
      
      const currentPrice = parseFloat(latestData['4. close']);
      const previousPrice = parseFloat(previousData['4. close']);
      const change = currentPrice - previousPrice;
      const changePercent = (change / previousPrice) * 100;

      // Create historical data for the chart
      const historicalData = dates.slice(0, 30).map(date => ({
        timestamp: new Date(date).getTime(),
        price: parseFloat(timeSeriesData[date]['4. close'])
      })).reverse();

      return {
        price: currentPrice,
        change,
        changePercent,
        high: parseFloat(latestData['2. high']),
        low: parseFloat(latestData['3. low']),
        volume: parseInt(latestData['5. volume']),
        timestamp: new Date(latestDate).getTime(),
        historicalData
      };
    }
    
    throw new Error('No data available');
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return {
      price: 0,
      change: 0,
      changePercent: 0,
      high: 0,
      low: 0,
      volume: 0,
      timestamp: Date.now(),
      historicalData: []
    };
  }
};