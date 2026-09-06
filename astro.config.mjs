import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://shubhammookim.com',
  output: 'static',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  // the dev port is assigned by the harness; fall back to Astro's default
  server: { port: Number(process.env.PORT) || 4321 },
});
