import axios from 'axios';

const API_URL = 'http://localhost:8080';

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export const login = async (credentials: LoginRequest) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData: RegisterRequest) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/oauth2/authorization/google`;
};

export const loginWithGithub = () => {
  window.location.href = `${API_URL}/oauth2/authorization/github`;
};