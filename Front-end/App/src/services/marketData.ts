import type { MarketIndex } from '../components/Hero/types/market';

export const fetchIndexData = async (symbol: string): Promise<Partial<MarketIndex>> => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=demo`
  );
  const data = await response.json();
  console.log(data);
  if (data['Time Series (Daily)']) {
    const timeSeriesData = data['Time Series (Daily)'];
    const latestDate = Object.keys(timeSeriesData)[0];
    const previousDate = Object.keys(timeSeriesData)[1];
    const latestData = timeSeriesData[latestDate];
    const previousData = timeSeriesData[previousDate];
    
    const currentPrice = parseFloat(latestData['4. close']);
    const previousPrice = parseFloat(previousData['4. close']);
    const change = currentPrice - previousPrice;
    const changePercent = (change / previousPrice) * 100;

    return {
      price: currentPrice,
      change,
      changePercent,
      high: parseFloat(latestData['2. high']),
      low: parseFloat(latestData['3. low']),
      volume: parseInt(latestData['5. volume']),
      timestamp: new Date(latestDate).getTime()
    };
  }
  
  return {
    price: 0,
    change: 0,
    changePercent: 0,
    high: 0,
    low: 0,
    volume: 0,
    timestamp: Date.now()
  };
};