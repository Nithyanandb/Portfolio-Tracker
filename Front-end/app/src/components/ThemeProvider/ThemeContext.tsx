import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the context value
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

// Create a ThemeContext with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark', // Default theme
  toggleTheme: () => {}, // Default function (no-op)
});

// ThemeProvider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('dark'); // Default theme is dark

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => useContext(ThemeContext);