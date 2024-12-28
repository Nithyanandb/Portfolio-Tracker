import api from './api';
import { toast } from 'react-hot-toast';

export interface AuthResponse {
  token: string;
  email: string;
  name: string;
  roles: string[];
  provider: string;
}

const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      this.setAuthUser(response.data);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  },

  async register(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', { email, password });
      this.setAuthUser(response.data);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  },

  loginWithGoogle() {
    window.location.href = 'http://localhost:2000/oauth2/authorization/google';
  },

  loginWithGithub() {
    window.location.href = 'http://localhost:2000/oauth2/authorization/github';
  },

  setAuthUser(data: AuthResponse) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
  },

  logout() {
    const token = localStorage.getItem('token');
    if (token) {
      api.post('/auth/logout', { token }).finally(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      });
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
};

export default authService; 