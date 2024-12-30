export const generateMockPrice = (basePrice: number, volatility = 0.02) => {
  const change = basePrice * volatility * (Math.random() - 0.5);
  return Number((basePrice + change).toFixed(2));
};

export const MOCK_INDICES = {
  americas: [
    { symbol: 'SPX', name: 'S&P 500', basePrice: 4500 },
    { symbol: 'DJI', name: 'Dow Jones', basePrice: 35000 },
    { symbol: 'IXIC', name: 'NASDAQ', basePrice: 14000 },
    { symbol: 'TSX', name: 'Toronto SE', basePrice: 20000 },
    { symbol: 'BOVESPA', name: 'Brazil BOVESPA', basePrice: 118000 }
  ],
  europe: [
    { symbol: 'FTSE', name: 'FTSE 100', basePrice: 7500 },
    { symbol: 'DAX', name: 'German DAX', basePrice: 15800 },
    { symbol: 'CAC', name: 'French CAC 40', basePrice: 7300 },
    { symbol: 'STOXX50E', name: 'Euro STOXX 50', basePrice: 4300 },
    { symbol: 'FTSEMIB', name: 'Italy FTSE MIB', basePrice: 28000 }
  ],
  asiaPacific: [
    { symbol: 'N225', name: 'Nikkei 225', basePrice: 32000 },
    { symbol: 'HSI', name: 'Hang Seng', basePrice: 18000 },
    { symbol: 'AXJO', name: 'ASX 200', basePrice: 7200 },
    { symbol: 'SENSEX', name: 'BSE SENSEX', basePrice: 65000 },
    { symbol: 'KOSPI', name: 'KOSPI', basePrice: 2500 }
  ]
};

const generateHistoricalData = (basePrice: number, points = 20) => {
  const data = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < points; i++) {
    currentPrice = generateMockPrice(currentPrice, 0.01);
    data.push(currentPrice);
  }
  
  return data;
};

export const generateMockMarketData = () => {
  const results: Record<string, any[]> = {};
  
  Object.entries(MOCK_INDICES).forEach(([region, indices]) => {
    results[region] = indices.map(index => {
      const historicalData = generateHistoricalData(index.basePrice);
      const currentPrice = historicalData[historicalData.length - 1];
      const previousPrice = historicalData[historicalData.length - 2];
      const change = currentPrice - previousPrice;
      const changePercent = (change / previousPrice) * 100;
      
      return {
        symbol: index.symbol,
        name: index.name,
        price: currentPrice,
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
        high: Math.max(...historicalData),
        low: Math.min(...historicalData),
        volume: Math.floor(Math.random() * 1000000) + 500000,
        previousClose: previousPrice,
        timestamp: Date.now(),
        region,
        historicalData
      };
    });
  });
  
  return results;
}; 