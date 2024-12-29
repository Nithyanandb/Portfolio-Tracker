import { API_CONFIG } from '../config/API_CONFIG';
import { fetchWithCache } from '../types/apiUtils';
import type { TechnicalIndicators } from '../types/stockTypes';

export const fetchTechnicalIndicators = async (
  symbol: string
): Promise<TechnicalIndicators | null> => {
  try {
    // Fetch RSI
    const rsiData = await fetchWithCache(API_CONFIG.BASE_URL, {
      function: 'RSI',
      symbol,
      interval: 'daily',
      time_period: 14,
      series_type: 'close',
      apikey: API_CONFIG.API_KEY
    });

    // Fetch MACD
    const macdData = await fetchWithCache(API_CONFIG.BASE_URL, {
      function: 'MACD',
      symbol,
      interval: 'daily',
      series_type: 'close',
      apikey: API_CONFIG.API_KEY
    });

    // Fetch SMA
    const smaData = await fetchWithCache(API_CONFIG.BASE_URL, {
      function: 'SMA',
      symbol,
      interval: 'daily',
      time_period: 20,
      series_type: 'close',
      apikey: API_CONFIG.API_KEY
    });

    // Get latest values
    const latestDate = Object.keys(rsiData['Technical Analysis: RSI'])[0];

    return {
      rsi: parseFloat(rsiData['Technical Analysis: RSI'][latestDate].RSI),
      macd: {
        macdLine: parseFloat(macdData['Technical Analysis: MACD'][latestDate].MACD),
        signalLine: parseFloat(macdData['Technical Analysis: MACD'][latestDate].MACD_Signal),
        histogram: parseFloat(macdData['Technical Analysis: MACD'][latestDate].MACD_Hist)
      },
      sma: {
        sma20: parseFloat(smaData['Technical Analysis: SMA'][latestDate].SMA),
        sma50: 0, // Would need separate API call
        sma200: 0 // Would need separate API call
      },
      bollingerBands: {
        upper: 0, // Would need separate API call
        middle: 0, // Would need separate API call
        lower: 0 // Would need separate API call
      }
    };
  } catch (error) {
    console.error('Error fetching technical indicators:', error);
    return null;
  }
};