import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        fightersGuide: resolve(__dirname, 'fighters-guide.html'),
        hawksGuide: resolve(__dirname, 'hawks-guide.html'),
        marinesGuide: resolve(__dirname, 'marines-guide.html'),
        eaglesGuide: resolve(__dirname, 'eagles-guide.html'),
        buffaloesGuide: resolve(__dirname, 'buffaloes-guide.html'),
        lionsGuide: resolve(__dirname, 'lions-guide.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});