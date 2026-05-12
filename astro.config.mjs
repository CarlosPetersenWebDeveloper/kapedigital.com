import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  // Site domain for SEO
  site: 'https://kapedigital.com',
  
  adapter: vercel({
    runtime: 'nodejs20.x',
  }),
  integrations: [tailwind()],
  
  // Optimization for better Lighthouse scores
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs in production
        },
      },
    },
  },

  // Output configuration - use 'hybrid' to allow both static pages and dynamic API routes
  output: 'hybrid',
  
  // Trailing slash for consistent URLs (better for SEO)
  trailingSlash: 'ignore',

  // Prerender all pages for maximum performance
  prerender: {
    crawlLinks: true,
  },
});
