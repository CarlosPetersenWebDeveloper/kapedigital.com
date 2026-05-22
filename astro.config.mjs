import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  // Site domain for SEO
  site: 'https://kapedigital.com',

  adapter: vercel({
    runtime: 'nodejs20.x',
  }),

  integrations: [
    tailwind(),
    // Sitemap auto-generado con todas las rutas (ES + EN).
    // El hreflang se inyecta desde el <head> de cada página (Layout.astro),
    // que es la forma recomendada por Google y más robusta.
    sitemap({
      filter: (page) => {
        if (!page) return false;
        if (page.includes('/api/')) return false;
        if (page.endsWith('/404') || page.endsWith('/404/')) return false;
        return true;
      },
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],

  // Optimization for better Lighthouse scores
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  },

  output: 'hybrid',
  trailingSlash: 'ignore',

  prerender: {
    crawlLinks: true,
  },
});
