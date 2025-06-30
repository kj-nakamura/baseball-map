import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  envDir: '../',
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        // パリーグ観戦ガイド
        fightersGuide: resolve(__dirname, 'src/fighters-guide.html'),
        hawksGuide: resolve(__dirname, 'src/hawks-guide.html'),
        marinesGuide: resolve(__dirname, 'src/marines-guide.html'),
        eaglesGuide: resolve(__dirname, 'src/eagles-guide.html'),
        buffaloesGuide: resolve(__dirname, 'src/buffaloes-guide.html'),
        lionsGuide: resolve(__dirname, 'src/lions-guide.html'),
        // セリーグ観戦ガイド
        giantsGuide: resolve(__dirname, 'src/giants-guide.html'),
        tigersGuide: resolve(__dirname, 'src/tigers-guide.html'),
        baystarsGuide: resolve(__dirname, 'src/baystars-guide.html'),
        carpGuide: resolve(__dirname, 'src/carp-guide.html'),
        swallowsGuide: resolve(__dirname, 'src/swallows-guide.html'),
        dragonsGuide: resolve(__dirname, 'src/dragons-guide.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      port: 3001
    }
  }
});
