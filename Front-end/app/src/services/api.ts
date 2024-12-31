import axios from 'axios';

// Update the base URL to match your backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:2000/';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add error handling for connection issues
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ERR_CONNECTION_REFUSED') {
      console.error('Cannot connect to the server. Please check if the backend is running.');
    }
    return Promise.reject(error);
  }
);

export default api; 