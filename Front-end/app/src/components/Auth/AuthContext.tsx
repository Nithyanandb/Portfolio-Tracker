import React, { createContext, useState, useCallback, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface UserProfile {
  email: string;
  name: string;
  provider?: string;
  roles?: string[];
}

interface AuthData {
  token: string;
  user: UserProfile;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  setUser: (user: UserProfile | null) => void;
  setToken: (token: string | null) => void;
  loginWithGoogle: () => void;
  loginWithGithub: () => void;
  logout: () => Promise<void>;
  error: string | null;
  handleOAuthCallback: (authData: AuthData) => void;
  setIsAuthenticating: (value: boolean) => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { email: string; password: string; name: string }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Initialize from localStorage
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const { user } = JSON.parse(authData);
        return user;
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    // Initialize from localStorage
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const { token } = JSON.parse(authData);
        return token;
      } catch (error) {
        console.error('Error parsing stored auth data:', error);
      }
    }
    return null;
  });

  const [error, setError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleOAuthPopup = (url: string) => {
    setIsAuthenticating(true);
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      url,
      'OAuth2',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (popup) {
      const checkPopup = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(checkPopup);
          setIsAuthenticating(false);
        }
      }, 1000);

      const handleMessage = (event: MessageEvent) => {
        if (event.origin === window.location.origin) {
          if (event.data.type === 'AUTH_SUCCESS') {
            const { token, user } = event.data.data;
            setUser(user);
            setToken(token);
            localStorage.setItem('auth', JSON.stringify({ token, user }));
            setIsAuthenticating(false);
            popup.close();
          }
        }
      };

      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
        clearInterval(checkPopup);
      };
    }
  };

  const handleOAuthCallback = useCallback((authData: AuthData) => {
    const { token, user } = authData;
    
    // Update state
    setUser(user);
    setToken(token);
    
    // Store in localStorage
    localStorage.setItem('auth', JSON.stringify({ token, user }));
    
    // Show success message
    toast.success(`Welcome ${user.name}!`);
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('http://localhost:2000/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Clear auth data
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth');
      toast.success('Successfully signed out!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to sign out');
    }
  }, [token]);

  const login = async (credentials) => {
    // Implement login logic
  };

  const register = async (userData) => {
    // Implement register logic
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAuthenticating,
        setUser,
        setToken,
        loginWithGoogle: () => handleOAuthPopup('http://localhost:2000/oauth2/authorization/google'),
        loginWithGithub: () => handleOAuthPopup('http://localhost:2000/oauth2/authorization/github'),
        logout,
        error,
        handleOAuthCallback,
        setIsAuthenticating,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
