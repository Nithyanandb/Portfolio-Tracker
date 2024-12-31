const CRYPTO_SYMBOLS = ['BTC', 'ETH', 'BNB', 'SOL', 'DOGE', 'XRP', 'ADA', 'DOT'];
const STOCK_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA'];

export async function fetchMarketData(): Promise<MarketData[]> {
  try {
    // Fetch crypto data
    const cryptoResponse = await fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${CRYPTO_SYMBOLS.join(',')}&tsyms=USD`
    );
    const cryptoData = await cryptoResponse.json();

    // Transform crypto data
    const transformedCryptoData = Object.entries(cryptoData.RAW).map(([symbol, data]: [string, any]) => ({
      symbol,
      price: data.USD.PRICE,
      change: data.USD.CHANGE24HOUR,
      changePercent: data.USD.CHANGEPCT24HOUR,
      volume: data.USD.VOLUME24HOUR,
      high24h: data.USD.HIGH24HOUR,
      low24h: data.USD.LOW24HOUR
    }));

    return transformedCryptoData;
  } catch (error) {
    console.error('Error fetching market data:', error);
    return [];
  }
}


export async function fetchWorldIndices(): Promise<MarketIndex[]> {
  try {
    // This is a mock implementation. In production, you would fetch from a real API
    return [
      {
        symbol: 'SPX',
        name: 'S&P 500',
        price: 4783.45,
        change: 25.32,
        changePercent: 0.53,
        high: 4790.23,
        low: 4755.67,
        timestamp: new Date().getTime(),
        region: 'Americas'
      },
      {
        symbol: 'FTSE',
        name: 'FTSE 100',
        price: 7683.91,
        change: -12.45,
        changePercent: -0.16,
        high: 7695.82,
        low: 7670.23,
        timestamp: new Date().getTime(),
        region: 'Europe'
      },
      {
        symbol: 'N225',
        name: 'Nikkei 225',
        price: 33753.29,
        change: 89.76,
        changePercent: 0.27,
        high: 33800.45,
        low: 33650.82,
        timestamp: new Date().getTime(),
        region: 'Asia-Pacific'
      }
    ];
  } catch (error) {
    console.error('Error fetching world indices:', error);
    return [];
  }
}