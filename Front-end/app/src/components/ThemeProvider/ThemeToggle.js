import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
};

export default ThemeToggle;