import { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Move this to AuthContext initialization
  useEffect(() => {
    const loadStoredAuth = () => {
      const authData = localStorage.getItem('auth');
      if (!authData) return;
      
      try {
        const { token, user } = JSON.parse(authData);
        if (token && user) {
          context.setToken(token);
          context.setUser(user);
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    };

    loadStoredAuth();
  }, []); // Empty dependency array

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = context.token;
      
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await fetch('http://localhost:2000/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Server error during logout');
      }

      localStorage.removeItem('auth');
      context.setUser(null);
      context.setToken(null);
      
      toast.success('Successfully logged out!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [context]);

  return {
    ...context,
    logout,
    isLoading
  };
}; 