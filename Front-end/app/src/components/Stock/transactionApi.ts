import axios from 'axios';

const BASE_API_URL = 'http://localhost:2000/transaction';

// Helper function to handle API requests
const handleTransactionRequest = async (url: string, transaction: {
  stockSymbol: string;
  stockName: string;
  quantity: number;
  price: number;
}) => {
  try {
    const response = await axios.post(url, transaction);
    // Check if the response is valid and contains the expected data
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error('Unexpected response from the server');
    }
  } catch (error) {
    // Handle specific error cases
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response from server:', error.response.data);
        throw new Error(`Server Error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
        throw new Error('Network error: No response from the server');
      } else {
        // Something went wrong while setting up the request
        console.error('Error setting up request:', error.message);
        throw new Error(`Request Error: ${error.message}`);
      }
    } else {
      // Non-Axios error (e.g., validation, programming error)
      console.error('Unexpected error:', error);
      throw new Error(`Unexpected Error: ${error.message}`);
    }
  }
};

// Function to handle buying stocks
export const buyStock = async (transaction: {
  stockSymbol: string;
  stockName: string;
  quantity: number;
  price: number;
}) => {
  const url = `${BASE_API_URL}/buy`;
  return handleTransactionRequest(url, transaction);
};

// Function to handle selling stocks
export const sellStock = async (transaction: {
  stockSymbol: string;
  stockName: string;
  quantity: number;
  totalprice: number;
}) => {
  const url = `${BASE_API_URL}/sell`;
  return handleTransactionRequest(url, transaction);
};
