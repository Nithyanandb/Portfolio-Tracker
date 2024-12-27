import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const logout = async () => {
    try {
      const authData = localStorage.getItem('auth');
      if (!authData) {
        console.warn('No auth data found for logout');
        return;
      }

      const { token } = JSON.parse(authData);
      if (!token) {
        console.warn('No token found for logout');
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading('Logging out...', {
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        }
      });

      const response = await fetch('http://localhost:2000/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Check if response is ok, don't try to parse empty response
      if (!response.ok) {
        // Only try to parse JSON if there's content
        const errorMessage = response.status === 204 
          ? 'Logout failed' 
          : (await response.text() || 'Logout failed');
          
        throw new Error(errorMessage);
      }

      // Show success toast
      toast.success('Successfully logged out!', {
        duration: 3000,
        position: 'top-right',
        icon: '👋',
        style: {
          background: '#333',
          color: '#fff',
        },
      });

      // Clear all auth data
      localStorage.removeItem('auth');
      sessionStorage.removeItem('auth');
      
      // Clear cookies
      document.cookie.split(";").forEach(cookie => {
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
      
      // Clear auth context
      context.logout();
      
      // Delay redirect to show the success message
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    } catch (error) {
      console.error('Logout error:', error);
      
      // Show error toast
      toast.error('Logout failed: ' + (error instanceof Error ? error.message : 'Unknown error'), {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      
      throw error;
    }
  };

  return {
    ...context,
    logout
  };
}; 