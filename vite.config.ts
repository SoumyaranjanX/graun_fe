import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      $fonts: path.resolve('./src/assets/fonts'),
    },
  },
  server: {
    host: true,
    port: 10000,
    open: false
  }
});
