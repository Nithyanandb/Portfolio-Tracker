import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const logout = async () => {
    try {
      const authData = localStorage.getItem('auth');
      if (!authData) return;

      const { token } = JSON.parse(authData);
      
      // Call backend logout endpoint with token
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

    } catch (error) {
      console.error('Logout error:', error);
      throw error; // Propagate error to component
    } finally {
      // Clear local storage
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
      
      // Redirect to home page
      window.location.href = '/';
    }
  };

  return {
    ...context,
    logout
  };
}; 