import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  srcDir: './astro-src',
  output: 'static',
  adapter: node({
    mode: 'standalone'
  }),
  build: {
    assets: 'assets'
  },
  vite: {
    envDir: '.',
  },
  server: {
    port: 3002,
    host: true
  }
});