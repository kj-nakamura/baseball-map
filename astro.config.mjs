import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
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