import { useContext, useState, useCallback, useEffect } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { toast } from 'react-hot-toast';

interface UserProfile {
  email: string;
  name: string;
  provider?: string;
  roles?: string[];
  emailVerified?: boolean;
}

interface AuthData {
  token: string;
  user: UserProfile;
  expiresAt: number;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { setUser, setToken } = context;

  // Check token expiration periodically
  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('auth');
      if (authData) {
        try {
          const { expiresAt } = JSON.parse(authData) as AuthData;
          if (expiresAt && new Date().getTime() > expiresAt) {
            logout();
            toast.error('Session expired. Please sign in again.');
          }
        } catch (error) {
          console.error('Error checking auth:', error);
        }
      }
    };

    const interval = setInterval(checkAuth, 60000); 
    return () => clearInterval(interval);
  }, []);

  const handleOAuthPopup = (url: string) => {
    setIsAuthenticating(true);
    const width = 800;
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
            localStorage.setItem('auth', JSON.stringify({
              token,
              user,
              expiresAt: new Date().getTime() + (3600 * 1000) // 1 hour
            }));
            setIsAuthenticating(false);
            popup.close();
            toast.success(`Welcome back, ${user.name}!`);
          } else if (event.data.type === 'AUTH_ERROR') {
            toast.error(event.data.error);
            setIsAuthenticating(false);
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

  const loginWithGoogle = () => {
    handleOAuthPopup('http://localhost:2000/oauth2/authorization/google');
  };

  const loginWithGithub = () => {
    handleOAuthPopup('http://localhost:2000/oauth2/authorization/github');
  };
  const logout = useCallback(async () => {
    try {
      const authData = localStorage.getItem('auth');
      if (authData) {
        const { token } = JSON.parse(authData);
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
      
      // Clear auth state regardless of API response
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth');
      toast.success('Successfully signed out!');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state on error
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth');
      toast.error('Error during logout');
    }
  }, [setUser, setToken]);

  return {
    ...context,
    isAuthenticating,
    loginWithGoogle,
    loginWithGithub,
    logout
  };
}; 