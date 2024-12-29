import axios from 'axios';

const API_URL = 'http://localhost:2000/auth';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  email: string;
  name: string;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:2000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Enable sending cookies
});

// Add interceptor to add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state on unauthorized
      authService.logout();
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async register(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/api/auth/register', credentials);
      if (response.data.token) {
        this.setAuthUser(response.data);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/api/auth/login', credentials);
      if (response.data.token) {
        this.setAuthUser(response.data);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  loginWithGoogle(): void {
    window.location.href = 'http://localhost:2000/oauth2/authorization/google';
  },

  loginWithGithub(): void {
    window.location.href = 'http://localhost:2000/oauth2/authorization/github';
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  },

  getCurrentUser(): AuthResponse | null {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!user || !token) return null;
    return JSON.parse(user);
  },

  setAuthUser(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response));
    api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
  }
};