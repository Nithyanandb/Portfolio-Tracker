// This would typically interact with your backend
// Using localStorage for demo purposes

export interface PortfolioStock {
    id: string;
    symbol: string;
    name: string;
    quantity: number;
    buyPrice: number;
    currentPrice?: number;
  }
  
  export const getPortfolio = (): PortfolioStock[] => {
    const portfolio = localStorage.getItem('portfolio');
    return portfolio ? JSON.parse(portfolio) : [];
  };
  
  export const addStock = (stock: Omit<PortfolioStock, 'id'>): PortfolioStock => {
    const portfolio = getPortfolio();
    const newStock = { ...stock, id: Date.now().toString() };
    localStorage.setItem('portfolio', JSON.stringify([...portfolio, newStock]));
    return newStock;
  };
  
  export const updateStock = (stock: PortfolioStock): void => {
    const portfolio = getPortfolio();
    const updatedPortfolio = portfolio.map(item => 
      item.id === stock.id ? stock : item
    );
    localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
  };
  
  export const deleteStock = (id: string): void => {
    const portfolio = getPortfolio();
    const updatedPortfolio = portfolio.filter(item => item.id !== id);
    localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
  };