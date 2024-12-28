import React, { createContext, useState, useContext } from 'react';

interface UserProfile {
  email: string;
  name: string;
  roles: string[];
  provider?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  setUser: (user: UserProfile | null) => void;
  setToken: (token: string | null) => void;
  login: (data: any) => void;
  register: (data: any) => Promise<void>;
  loginWithGoogle: () => void;
  loginWithGithub: () => void;
  logout: () => Promise<void>;
  error: string | null;
  handleOAuthCallback: (data: any) => void;
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

  const handleLogin = (userData: any) => {
    setUser(userData.user);
    setToken(userData.token);
    setIsAuthenticating(false);
    localStorage.setItem('auth', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('auth');
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleOAuthPopup = (url: string) => {
    const width = 500;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const popup = window.open(
      url,
      'OAuth2',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (popup) {
      const checkPopup = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopup);
          setIsAuthenticating(false);
        }
      }, 1000);

      window.addEventListener('message', (event) => {
        if (event.origin === window.location.origin) {
          if (event.data.type === 'AUTH_SUCCESS') {
            handleLogin(event.data.data);
            popup.close();
          } else if (event.data.type === 'AUTH_ERROR') {
            setError(event.data.error);
            setIsAuthenticating(false);
            popup.close();
          }
        }
      });
    }
  };

  const handleOAuthCallback = (data: any) => {
    if (data.type === 'AUTH_SUCCESS') {
      handleLogin(data.data);
    } else if (data.type === 'AUTH_ERROR') {
      setError(data.error);
      setIsAuthenticating(false);
    }
  };

  const handleRegister = async (data: any) => {
    // Your register logic here
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

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      isAuthenticating,
      setUser,
      setToken,
      login: handleLogin,
      register: handleRegister,
      loginWithGoogle,
      loginWithGithub,
      logout: handleLogout,
      error,
      handleOAuthCallback
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
