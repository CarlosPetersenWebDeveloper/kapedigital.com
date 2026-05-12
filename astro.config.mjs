import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Site domain for SEO
  site: 'https://kapedigital.com',
  
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

  // Output configuration
  output: 'static',
  
  // Trailing slash for consistent URLs (better for SEO)
  trailingSlash: 'ignore',

  // Prerender all pages for maximum performance
  prerender: {
    crawlLinks: true,
  },
});
