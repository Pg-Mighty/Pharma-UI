import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: './',
  build: {
    // Vite will output the build to a 'dist' folder.
    outDir: 'dist',
    // And copy the public assets to the dist folder.
    assetsDir: '',
  },
});
