export const MARKET_INDICES = {
  americas: [
    { symbol: '^GSPC', name: 'S&P 500', exchange: '' },
    { symbol: '^DJI', name: 'Dow Jones', exchange: '' },
    { symbol: '^IXIC', name: 'NASDAQ', exchange: '' },
    { symbol: '^GSPTSE', name: 'S&P/TSX', exchange: 'TOR' },
    { symbol: '^BVSP', name: 'BOVESPA', exchange: 'SAO' },
  ],
  europe: [
    { symbol: '^FTSE', name: 'FTSE 100', exchange: 'L' },
    { symbol: '^GDAXI', name: 'DAX', exchange: 'DE' },
    { symbol: '^FCHI', name: 'CAC 40', exchange: 'PA' },
    { symbol: '^STOXX50E', name: 'EURO STOXX 50', exchange: '' },
    { symbol: '^IBEX', name: 'IBEX 35', exchange: 'MC' },
  ],
  asiaPacific: [
    { symbol: '^N225', name: 'Nikkei 225', exchange: 'T' },
    { symbol: '^HSI', name: 'Hang Seng', exchange: 'HK' },
    { symbol: '000001.SS', name: 'SSE Composite', exchange: 'SS' },
    { symbol: '^AXJO', name: 'ASX 200', exchange: 'AX' },
    { symbol: '^KS11', name: 'KOSPI', exchange: 'KS' },
  ]
} as const;