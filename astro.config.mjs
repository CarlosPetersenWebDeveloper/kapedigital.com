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
    sitemap({
      // Auto-generates sitemap.xml + sitemap-index.xml at build time
      // and includes hreflang for the bilingual site.
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-CR',
          en: 'en',
        },
      },
      // Exclude API routes and 404 from the sitemap
      filter: (page) => !page.includes('/api/') && !page.endsWith('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
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
