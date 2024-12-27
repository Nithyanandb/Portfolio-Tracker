import React, { createContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createRoot } from 'react-dom/client';
import { toast } from 'react-hot-toast';

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

// Auth Status Modal Component
const AuthStatusModal: React.FC<{ 
  status: 'authenticating' | 'success' | 'error';
  message?: string;
  onClose?: () => void;
}> = ({ status, message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-gray-900 rounded-2xl p-8 w-full max-w-md relative overflow-hidden"
      >
        {status === 'authenticating' && (
          <div className="text-center py-6">
            <div className="tesla-loader mx-auto mb-6">
              <div className="tesla-loader-circle"></div>
              <div className="tesla-loader-circle-inner"></div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Authenticating...
            </h3>
            <p className="text-gray-400">
              Please wait while we verify your credentials
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center py-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-4xl">🎉</span>
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Welcome back!
            </h3>
            <p className="text-gray-400 mb-6">
              {message}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center py-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-4xl">😕</span>
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Authentication Failed
            </h3>
            <p className="text-gray-400 mb-6">
              {message || 'Please try again'}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Add this CSS to your globals.css
const styles = `
  .tesla-loader {
    width: 50px;
    height: 50px;
    position: relative;
  }

  .tesla-loader-circle {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: tesla-spin 1s linear infinite;
  }

  .tesla-loader-circle-inner {
    position: absolute;
    width: 70%;
    height: 70%;
    top: 15%;
    left: 15%;
    border: 3px solid transparent;
    border-top-color: #60a5fa;
    border-radius: 50%;
    animation: tesla-spin 0.8s linear infinite reverse;
  }

  @keyframes tesla-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Show Modal Function
const showAuthModal = (status: 'authenticating' | 'success' | 'error', message?: string) => {
  const modalContainer = document.createElement('div');
  modalContainer.id = 'auth-status-modal';
  document.body.appendChild(modalContainer);

  const modalRoot = createRoot(modalContainer);

  const closeModal = () => {
    modalRoot.unmount();
    document.body.removeChild(modalContainer);
  };

  modalRoot.render(
    <AuthStatusModal 
      status={status} 
      message={message} 
      onClose={closeModal}
    />
  );

  return closeModal;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authWindow, setAuthWindow] = useState<Window | null>(null);

  const handleAuthSuccess = (data: AuthResponse) => {
    const userData: User = {
      email: data.email,
      name: data.name,
      roles: data.roles,
      provider: data.provider
    };

    // If this is the popup window, send data to parent and close itself
    if (window.opener) {
      window.opener.postMessage({
        type: 'AUTH_SUCCESS',
        data: {
          user: userData,
          token: data.token
        }
      }, window.location.origin);
      window.close();
      return;
    }

    // Parent window handling
    setIsAuthenticating(true);

    // Close any remaining auth windows immediately
    if (authWindow && !authWindow.closed) {
      authWindow.close();
      setAuthWindow(null);
    }

    // Show single authenticating modal
    const closeAuthModal = showAuthModal('authenticating');

    // After 3 seconds, update state and show success
    setTimeout(() => {
      // Update auth state
      setUser(userData);
      setToken(data.token);
      
      localStorage.setItem('auth', JSON.stringify({
        user: userData,
        token: data.token,
        expiresAt: new Date().getTime() + (3600 * 1000)
      }));

      // Close authenticating modal and show success
      closeAuthModal();
      const closeSuccessModal = showAuthModal('success', userData.name || userData.email);

      // Close success modal after 2 seconds
      setTimeout(() => {
        closeSuccessModal();
        setIsLoading(false);
        setIsAuthenticating(false);
        setError(null);

        // Force close any remaining windows
        if (authWindow && !authWindow.closed) {
          authWindow.close();
          setAuthWindow(null);
        }
      }, 2000);
    }, 3000);
  };

  const handleAuthError = (error: any) => {
    console.error('Auth Error:', error);
    
    // Close any remaining auth windows
    if (authWindow && !authWindow.closed) {
      authWindow.close();
      setAuthWindow(null);
    }

    // Show error modal
    const closeModal = showAuthModal('error', error.message);

    // Cleanup after delay
    setTimeout(() => {
      closeModal();
      setError(error.message || 'Authentication failed');
      setIsLoading(false);
      setIsAuthenticating(false);
    }, 3000);
  };

  const openAuthWindow = (url: string, title: string) => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const newWindow = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (newWindow) {
      setAuthWindow(newWindow);
      setIsAuthenticating(true);

      // Check window status
      const checkWindow = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(checkWindow);
          setIsAuthenticating(false);
          setAuthWindow(null);
        }
      }, 500);
    }

    return newWindow;
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setIsAuthenticating(true);
    setError(null);
    
    const authPopup = openAuthWindow('about:blank', 'Authentication');
    
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
        window.location.href = '/';
      } catch (error) {
        handleAuthError(new Error('Invalid token received'));
      }
    } else if (error) {
      handleAuthError(new Error(decodeURIComponent(error)));
      window.location.href = '/login';
    }
  };

  const loginWithOAuth = (provider: 'google' | 'github') => {
    // Store current path for redirect after auth
    sessionStorage.setItem('auth_redirect', window.location.pathname);

    const popup = openAuthWindow(
      `http://localhost:2000/oauth2/authorization/${provider}`,
      `${provider}Auth`,
      600,
      600
    );

    if (popup) {
      setAuthWindow(popup);
      
      // Check if window is closed manually
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          setIsAuthenticating(false);
          setAuthWindow(null);
        }
      }, 500);
    }
  };

  const loginWithGoogle = () => loginWithOAuth('google');
  const loginWithGithub = () => loginWithOAuth('github');

  const logout = async () => {
    try {
      setIsLoading(true);
      const authData = localStorage.getItem('auth');
      
      if (authData) {
        const { token } = JSON.parse(authData);
        
        if (token) {
          const response = await fetch('http://localhost:2000/auth/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Logout failed');
          }
        }
      }

      // Show success message before clearing data
      toast.success('Successfully logged out. See you soon!', {
        duration: 3000,
        position: 'top-right',
      });

      // Clear all auth data
      setUser(null);
      setToken(null);
      setError(null);
      localStorage.removeItem('auth');
      sessionStorage.removeItem('auth');
      
      // Clear cookies
      document.cookie.split(";").forEach(cookie => {
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });

      // Delay redirect slightly to show the success message
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);

    } catch (error: any) {
      toast.error('Logout failed: ' + (error.message || 'Unknown error'), {
        duration: 4000,
        position: 'top-right',
      });
      throw error;
    } finally {
      setIsLoading(false);
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
      if (event.origin === 'http://localhost:2000' || event.origin === window.location.origin) {
        if (event.data.type === 'AUTH_SUCCESS') {
          // Close the auth window if it exists
          if (authWindow && !authWindow.closed) {
            authWindow.close();
            setAuthWindow(null);
          }
          handleAuthSuccess(event.data.data);
        } else if (event.data.type === 'AUTH_ERROR') {
          handleAuthError(new Error(event.data.message));
        }
      }
    };

    window.addEventListener('message', handleAuthMessage);
    return () => {
      window.removeEventListener('message', handleAuthMessage);
      // Cleanup any open auth windows
      if (authWindow && !authWindow.closed) {
        authWindow.close();
        setAuthWindow(null);
      }
    };
  }, [authWindow]);

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