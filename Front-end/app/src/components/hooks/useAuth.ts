import { useState } from 'react';

const AUTH_WINDOW_FEATURES = 'width=400,height=400,left=590,top=200';

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
            window.location.href = 'http://localhost:3000/success'; // Navigate to the success page
          }
        } catch (e) {
          // Cross-origin errors are expected and can be ignored
        }
      }, 500);
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
