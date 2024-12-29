import { useState } from 'react';
import axios from 'axios';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const useAuthApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getOAuthUrl = async (provider: 'google' | 'github'): Promise<string> => {
    try {
      const response = await axios.get(`${API_URL}/auth/oauth2/${provider}`);
      return response.data;
    } catch (err) {
      setError(`Failed to get ${provider} auth URL`);
      throw err;
    }
  };

  return {
    login,
    register,
    getOAuthUrl,
    isLoading,
    error
  };
}; 