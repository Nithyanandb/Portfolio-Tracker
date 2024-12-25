import axios from 'axios';

// Set the base URL for the API
const API_URL = 'http://localhost:2000';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}
export interface RegisterRequest {
  email: string;
  password: string;
}

// Login function to send credentials to the backend
export const login = async (credentials: LoginRequest) => {
  try {
    // Send a POST request to login endpoint
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      withCredentials: true, // Allows sending cookies with the request
    });
    return response.data;
  } catch (error: any) {
    // Handle errors and provide a default message if one is not available
    const errorMessage = error?.response?.data?.message || 'An error occurred. Please try again later.';
    throw new Error(errorMessage);
  }
};

// Register function to send user data to the backend
export const register = async (email: string, password: string, name: string, userData: RegisterRequest) => {
  try {
    // Send a POST request to the register endpoint
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    // Handle errors and provide a default message if one is not available
    const errorMessage = error?.response?.data?.message || 'An error occurred. Please try again later.';
    throw new Error(errorMessage);
  }
};

// Redirect function for Google OAuth2 login
export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/oauth2/authorization/google`;
};

// Redirect function for GitHub OAuth2 login
export const loginWithGithub = () => {
  window.location.href = `${API_URL}/oauth2/authorization/github`;
};
