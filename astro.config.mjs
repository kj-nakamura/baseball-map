import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
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
    port: 4321,
    host: true
  }
});