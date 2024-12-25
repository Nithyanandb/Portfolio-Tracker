import { useState } from 'react';

const width = 500;
const height = 500;
const left = (window.innerWidth / 2) - (width / 2);
const top = (window.innerHeight / 2) - (height / 2);

const AUTH_WINDOW_FEATURES = `width=${width},height=${height},left=${left},top=${top}`;


export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleOAuthPopup = (url: string) => {
    const authWindow = window.open(url, 'Auth', AUTH_WINDOW_FEATURES);

    if (authWindow) {
      const checkWindow = setInterval(() => {
        try {
          if (authWindow.closed) {
            clearInterval(checkWindow);
            setIsAuthenticating(false);
          } else if (authWindow.location.href.includes('success')) {
            authWindow.close(); // Close the authentication window
           
          }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          // Cross-origin errors are expected and can be ignored
        }
      }, 10);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:2000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setIsAuthenticating(true);

      // Simulate a 2-second delay for authentication before redirecting
      setTimeout(() => {
        window.location.href = 'http://localhost:3000/home'; // Redirect after 2 seconds
      }, 2000);

    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:2000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setIsAuthenticating(true);

      // Simulate a 2-second delay for authentication before redirecting
      setTimeout(() => {
        window.location.href = 'http://localhost:3000/home'; // Redirect after 2 seconds
      }, 2000);

    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => {
    setIsAuthenticating(true);
    handleOAuthPopup('http://localhost:2000/oauth2/authorization/google');
  };

  const loginWithGithub = () => {
    setIsAuthenticating(true);
    handleOAuthPopup('http://localhost:2000/oauth2/authorization/github');
  };

  return {
    login,
    register,
    loginWithGoogle,
    loginWithGithub,
    isLoading,
    isAuthenticating,
  };
};
