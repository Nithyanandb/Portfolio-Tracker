import { API_CONFIG } from '../config/API_CONFIG';
import { fetchWithCache } from '../types/apiUtils';
import type { CompanyInfo } from '../types/stockTypes';

export const fetchCompanyInfo = async (symbol: string): Promise<CompanyInfo | null> => {
  try {
    const data = await fetchWithCache(API_CONFIG.BASE_URL, {
      function: API_CONFIG.ENDPOINTS.COMPANY_INFO,
      symbol,
      apikey: API_CONFIG.API_KEY
    });

    return {
      symbol: data.Symbol,
      name: data.Name,
      description: data.Description,
      sector: data.Sector,
      industry: data.Industry,
      country: data.Country,
      employees: parseInt(data.FullTimeEmployees),
      ceo: data.CEO,
      website: data.Website,
      exchange: data.Exchange
    };
  } catch (error) {
    console.error('Error fetching company info:', error);
    return null;
  }
};