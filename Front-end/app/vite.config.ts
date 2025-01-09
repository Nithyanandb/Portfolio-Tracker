import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  base: '/', // Ensure this is set correctly
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Compress files larger than 10 KB
      deleteOriginFile: false, // Keep the original files
    }),
  ],
  server: {
    port: 3000,
    host: true, // Allow access from other devices on the same network
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Enable source maps for debugging
    minify: 'terser', // Minify JavaScript using terser
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit (default is 500 KB)
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          react: ['react', 'react-dom'],
          vendor: ['axios', 'chart.js', 'd3'],
        },
        // Ensure consistent chunk naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for src directory
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
    devSourcemap: true, // Enable source maps for CSS in development
  },
});