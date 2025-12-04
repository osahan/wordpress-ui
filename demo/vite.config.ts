import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/wordpress-ui/', // GitHub Pages base path
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: '../docs', // Output to docs folder for GitHub Pages
  },
  resolve: {
    alias: {
      '@osahan/wordpress-ui': path.resolve(__dirname, '../src'),
    },
  },
  optimizeDeps: {
    include: ['@wordpress/components'],
  },
});

