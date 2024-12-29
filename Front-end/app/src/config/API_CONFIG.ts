export const API_CONFIG = {
  BASE_URL: 'https://www.alphavantage.co/query',
  API_KEY: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo',
  CACHE_DURATION: 30000, // 30 seconds
  ENDPOINTS: {
    GLOBAL_QUOTE: 'GLOBAL_QUOTE',
    OVERVIEW: 'OVERVIEW',
    TOP_GAINERS_LOSERS: 'TOP_GAINERS_LOSERS',
    INTRADAY: 'TIME_SERIES_INTRADAY',
    DAILY: 'TIME_SERIES_DAILY',
    NEWS: 'NEWS_SENTIMENT'
  },

  getEndpointUrl(endpoint: string, params: Record<string, string> = {}): string {
    const queryParams = new URLSearchParams({
      function: endpoint,
      apikey: this.API_KEY,
      ...params
    });
    return `${this.BASE_URL}?${queryParams.toString()}`;
  },

  getStockQuoteUrl(symbol: string): string {
    return this.getEndpointUrl(this.ENDPOINTS.GLOBAL_QUOTE, { symbol });
  },

  getCompanyOverviewUrl(symbol: string): string {
    return this.getEndpointUrl(this.ENDPOINTS.OVERVIEW, { symbol });
  },

  getTopGainersLosersUrl(): string {
    return this.getEndpointUrl(this.ENDPOINTS.TOP_GAINERS_LOSERS);
  },

  getIntradayUrl(symbol: string, interval: string = '5min'): string {
    return this.getEndpointUrl(this.ENDPOINTS.INTRADAY, { 
      symbol, 
      interval,
      outputsize: 'compact'
    });
  },

  getDailyUrl(symbol: string): string {
    return this.getEndpointUrl(this.ENDPOINTS.DAILY, { 
      symbol,
      outputsize: 'compact'
    });
  },

  getNewsUrl(symbols: string[], topics: string[] = []): string {
    return this.getEndpointUrl(this.ENDPOINTS.NEWS, {
      tickers: symbols.join(','),
      topics: topics.join(',')
    });
  }
}; 