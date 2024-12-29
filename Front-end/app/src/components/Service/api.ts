import axios from 'axios';
import { Stock, StockTransaction } from '../types/Stock';

const API_BASE_URL = 'http://localhost:2000/';

export const stockApi = {
  getAllStocks: () => axios.get<Stock[]>(`${API_BASE_URL}/stocks`),
  getStock: (id: number) => axios.get<Stock>(`${API_BASE_URL}/stocks/${id}`),
  buyStock: (transaction: StockTransaction) => 
    axios.post(`${API_BASE_URL}/stocks/buy`, transaction),
  sellStock: (transaction: StockTransaction) => 
    axios.post(`${API_BASE_URL}/stocks/sell`, transaction),
};