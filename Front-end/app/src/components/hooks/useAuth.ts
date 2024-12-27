import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const width = 500;
const height = 500;
const left = (window.innerWidth / 2) - (width / 2);
const top = (window.innerHeight / 2) - (height / 2);

const AUTH_WINDOW_FEATURES = `width=${width},height=${height},left=${left},top=${top}`;

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name?: string;
}

export const useAuth = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuthResponse = async (response: Response) => {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Authentication failed');
    }

    return data;
  };

  const handleOAuthPopup = (url: string) => {
    const authWindow = window.open(url, 'Auth', AUTH_WINDOW_FEATURES);

    if (authWindow) {
      setIsAuthenticating(true);
      const checkWindow = setInterval(() => {
        try {
          if (authWindow.closed) {
            clearInterval(checkWindow);
            setIsAuthenticating(false);
          } else if (authWindow.location.href.includes('success')) {
            authWindow.close();
            setIsAuthenticating(false);
          }
        } catch (e) {
          // Cross-origin errors are expected
        }
      }, 500);
    }
  };

  const login = async ({ email, password }: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:2000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await handleAuthResponse(response);
      setIsAuthenticating(true);

      // Store authentication data
      localStorage.setItem('auth', JSON.stringify({
        token: data.token,
        user: data.user
      }));

      // Update auth context
      auth?.login(data);

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async ({ email, password, name }: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:2000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
        credentials: 'include'
      });

      const data = await handleAuthResponse(response);
      setIsAuthenticating(true);

      // Store authentication data
      localStorage.setItem('auth', JSON.stringify({
        token: data.token,
        user: data.user
      }));

      // Update auth context
      auth?.login(data);

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => {
    setIsAuthenticating(true);
    setError(null);
    handleOAuthPopup('http://localhost:2000/oauth2/authorization/google');
  };

  const loginWithGithub = () => {
    setIsAuthenticating(true);
    setError(null);
    handleOAuthPopup('http://localhost:2000/oauth2/authorization/github');
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:2000/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('auth');
      auth?.logout();
    }
  };

  return {
    login,
    register,
    loginWithGoogle,
    loginWithGithub,
    logout,
    isLoading,
    isAuthenticating,
    error,
    user: auth?.user,
    isAuthenticated: !!auth?.user,
    clearError: () => setError(null)
  };
};

export default useAuth; 