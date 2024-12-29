/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_CONFIG } from '../config/API_CONFIG';
import { fetchWithCache } from '../types/apiUtils';
import type { StockData } from '../types/stockTypes';

export const fetchHistoricalData = async (
  symbol: string,
  interval: '1d' | '1w' | '1m' = '1d',
  limit: number = 30
): Promise<StockData[]> => {
  try {
    const data = await fetchWithCache(API_CONFIG.BASE_URL, {
      function: API_CONFIG.ENDPOINTS.TIME_SERIES_DAILY,
      symbol,
      apikey: API_CONFIG.API_KEY,
      outputsize: 'full'
    });

    const timeSeriesData = data['Time Series (Daily)'];
    return Object.entries(timeSeriesData)
      .map(([date, values]: [string, unknown]) => ({
        date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseFloat(values['5. volume']),
        adjustedClose: parseFloat(values['5. adjusted close']),
        dividendAmount: parseFloat(values['7. dividend amount']),
        splitCoefficient: parseFloat(values['8. split coefficient'])
      }))
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return [];
  }
};