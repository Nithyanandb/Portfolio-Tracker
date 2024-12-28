export const generateMockChartData = (basePrice: number) => {
  const now = Date.now();
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(now - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    price: basePrice * (1 + Math.sin(i / 3) * 0.1 + (Math.random() - 0.5) * 0.02),
  }));
};

export const generateMockMetrics = () => ({
  marketCap: '$245.6B',
  volume: '12.5M',
  dayRange: '$142.50 - $149.80',
  yearRange: '$120.30 - $165.70',
  peRatio: 25.4,
  avgVolume: '8.2M',
  dividend: '0.88%',
  beta: '1.12',
});

export const generateMockRecommendations = () => [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: '182.63',
    change: '+1.25%',
    recommendation: 'BUY',
    analysis: 'Strong momentum'
  },
  // ... more mock recommendations
];