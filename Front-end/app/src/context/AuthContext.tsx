import React, { createContext, useState, useEffect } from 'react';

// Match backend AuthProvider enum
type AuthProvider = 'LOCAL' | 'GOOGLE' | 'GITHUB';

// Match backend AuthResponse DTO
interface AuthResponse {
  token: string;
  type: string;
  email: string;
  name: string;
  roles: string[];
  provider: AuthProvider;
}

interface User {
  email: string;
  name: string;
  roles: string[];
  provider: AuthProvider;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticating: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  loginWithGithub: () => void;
  logout: () => Promise<void>;
  handleAuthCallback: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuthSuccess = (data: AuthResponse) => {
    const userData: User = {
      email: data.email,
      name: data.name,
      roles: data.roles,
      provider: data.provider
    };

    setUser(userData);
    setToken(data.token);
    
    localStorage.setItem('auth', JSON.stringify({
      user: userData,
      token: data.token,
      expiresAt: new Date().getTime() + (3600 * 1000) // 1 hour
    }));
    
    setIsLoading(false);
    setIsAuthenticating(false);
    setError(null);
  };

  const handleAuthError = (error: any) => {
    console.error('Auth Error:', error);
    setError(error.message || 'Authentication failed');
    setIsLoading(false);
    setIsAuthenticating(false);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setIsAuthenticating(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:2000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data: AuthResponse = await response.json();
      handleAuthSuccess(data);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    setIsAuthenticating(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:2000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data: AuthResponse = await response.json();
      handleAuthSuccess(data);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleAuthCallback = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      try {
        // Decode JWT payload
        const payload = JSON.parse(atob(token.split('.')[1]));
        const authResponse: AuthResponse = {
          token,
          type: 'Bearer',
          email: payload.email,
          name: payload.name,
          roles: payload.roles,
          provider: payload.provider
        };
        handleAuthSuccess(authResponse);
        window.location.href = '/dashboard';
      } catch (error) {
        handleAuthError(new Error('Invalid token received'));
      }
    } else if (error) {
      handleAuthError(new Error(decodeURIComponent(error)));
      window.location.href = '/login';
    }
  };

  const loginWithOAuth = (provider: 'google' | 'github') => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      `http://localhost:2000/oauth2/authorization/${provider}`,
      `${provider}Auth`,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (popup) {
      const messageHandler = (event: MessageEvent) => {
        if (event.origin === window.location.origin) {
          if (event.data.type === 'AUTH_SUCCESS') {
            handleAuthSuccess(event.data.data);
            popup.close();
          } else if (event.data.type === 'AUTH_ERROR') {
            handleAuthError(new Error(event.data.error));
            popup.close();
          }
        }
      };

      window.addEventListener('message', messageHandler);
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageHandler);
        }
      }, 1000);
    }
  };

  const loginWithGoogle = () => loginWithOAuth('google');
  const loginWithGithub = () => loginWithOAuth('github');

  const logout = async () => {
    try {
      const storedAuth = localStorage.getItem('auth');
      if (storedAuth) {
        const { token } = JSON.parse(storedAuth);
        
        const response = await fetch('http://localhost:2000/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Logout failed');
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all auth state
      setUser(null);
      setToken(null);
      setError(null);
      setIsAuthenticating(false);
      setIsLoading(false);
      
      // Clear storage
      localStorage.removeItem('auth');
      sessionStorage.removeItem('auth');
      
      // Clear cookies
      document.cookie.split(";").forEach(cookie => {
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
      
      // Redirect to home
      window.location.href = '/';
    }
  };

  useEffect(() => {
    // Check for stored auth data and validate token expiration
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const { user, token, expiresAt } = JSON.parse(storedAuth);
        
        // Check if token is expired
        if (expiresAt && new Date().getTime() > expiresAt) {
          localStorage.removeItem('auth');
          return;
        }

        setUser(user);
        setToken(token);
      } catch (error) {
        console.error('Error parsing stored auth:', error);
        localStorage.removeItem('auth');
      }
    }

    // Handle OAuth callback
    if (window.location.pathname === '/auth/callback') {
      handleAuthCallback();
    }

    // Handle OAuth popup messages
    const handleAuthMessage = (event: MessageEvent) => {
      if (event.origin === 'http://localhost:2000') {
        if (event.data.type === 'AUTH_SUCCESS') {
          handleAuthSuccess(event.data);
        } else if (event.data.type === 'AUTH_ERROR') {
          handleAuthError(new Error(event.data.message));
        }
      }
    };

    window.addEventListener('message', handleAuthMessage);
    return () => window.removeEventListener('message', handleAuthMessage);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      isAuthenticating,
      error,
      setError,
      login,
      register,
      loginWithGoogle,
      loginWithGithub,
      logout,
      handleAuthCallback
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 