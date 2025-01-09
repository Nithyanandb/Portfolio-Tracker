/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure all relevant files are included
  ],
  theme: {
    extend: {
      // Custom screen sizes
      screens: {
        xs: '300px', // For 300px and up
        sm2: '500px', // For 500px and up
      },
      // Custom colors
      colors: {
        black: '#0f0f0f',
        primary: '#3B82F6', // Primary color
        secondary: '#10B981', // Secondary color
        background: '#0f0f0f', // Background color
        surface: '#1f1f1f', // Surface color for cards, modals, etc.
        text: '#ffffff', // Default text color
        'text-secondary': '#9ca3af', // Secondary text color
      },
      // Custom font families
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      // Custom animations
      animation: {
        gradient: 'gradient 8s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // Keyframes for animations
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      // Custom background images
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Custom backdrop blur
      backdropBlur: {
        '3xl': '64px',
      },
      // Custom box shadows
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
        neumorphic: '20px 20px 60px #0a0a0a, -20px -20px 60px #141414',
      },
      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // For form styling
    require('@tailwindcss/typography'), // For typography utilities
  ],
};