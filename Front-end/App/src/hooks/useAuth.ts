export const useAuth = () => {
  // ... other auth state ...

  const loginWithGoogle = async () => {
    try {
      setIsAuthenticating(true);
      // Redirect to your backend's Google OAuth endpoint
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  };

  const loginWithGithub = async () => {
    try {
      setIsAuthenticating(true);
      // Redirect to your backend's GitHub OAuth endpoint
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
    } catch (error) {
      console.error('GitHub login failed:', error);
      throw error;
    }
  };

  // ... rest of the hook ...
}; 