/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#0f0f0f',
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
        backgroundTransition: 'bg-transition 12s infinite ease-in-out',
      },
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
        bgTransition: {
          '0%': { 'background-image': `url('https://images.unsplash.com/photo-1639322537228-f710d846310a')` },
          '50%': { 'background-image': `url('https://images.unsplash.com/photo-1622473591622-2c15a05f48e8')` },
          '100%': { 'background-image': `url('https://images.unsplash.com/photo-1639322537228-f710d846310a')` },
        },
      },
      backgroundImage: {
        unsplashImage: "url('https://images.unsplash.com/photo-1639322537228-f710d846310a')",
      },
    },
  },
  plugins: [],
};
