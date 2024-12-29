import type { Recommendation } from '../types/stock';

export const analyzeStock = (metrics: {
  changePercent: number;
  peRatio: number;
  beta?: number;
  pegRatio?: number;
}): Recommendation => {
  const { changePercent, peRatio, beta = 1, pegRatio = 1 } = metrics;

  // Enhanced analysis logic
  if (changePercent > 2 && peRatio < 20 && pegRatio < 1.5) return 'BUY';
  if (changePercent < -2 || peRatio > 30 || pegRatio > 2) return 'SELL';
  if (beta > 1.5 && peRatio > 25) return 'SELL';
  if (beta < 1 && peRatio < 15) return 'BUY';
  return 'HOLD';
};

export const generateAnalysis = (metrics: {
  changePercent: number;
  peRatio: number;
  sector: string;
  beta?: number;
  pegRatio?: number;
}): string => {
  const { changePercent, peRatio, sector, beta = 1, pegRatio = 1 } = metrics;
  
  const momentum = changePercent > 2 ? 'strong' : changePercent < -2 ? 'weak' : 'stable';
  const valuation = peRatio < 15 ? 'undervalued' : peRatio > 25 ? 'overvalued' : 'fairly valued';
  const risk = beta > 1.5 ? 'high volatility' : beta < 0.8 ? 'low volatility' : 'moderate volatility';

  return `${sector} sector showing ${momentum} momentum. Stock appears ${valuation} with ${risk}. PEG ratio of ${pegRatio} indicates ${pegRatio < 1 ? 'potential growth opportunity' : 'premium pricing'}.`;
}; 