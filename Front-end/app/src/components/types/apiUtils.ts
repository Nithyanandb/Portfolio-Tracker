import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';

// Cache implementation
const cache = new Map<string, { data: any; timestamp: number }>();

export const fetchWithCache = async (url: string, params: any) => {
  const cacheKey = JSON.stringify({ url, params });
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
    return cached.data;
  }

  const response = await axios.get(url, { params });
  cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
  
  return response.data;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    notation: 'compact',
    compactDisplay: 'short'
  }).format(num);
};

export const calculatePercentChange = (current: number, previous: number): number => {
  return ((current - previous) / previous) * 100;
};