export const generateMockChartData = (basePrice: number) => {
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      price: basePrice * (1 + Math.sin(i / 3) * 0.1),
    }));
  };
  
  export const generateMockMetrics = () => ({
    marketCap: '$245.6B',
    volume: '12.5M',
    dayRange: '$142.50 - $149.80',
    yearRange: '$120.30 - $165.70',
    peRatio: 25.4,
  });