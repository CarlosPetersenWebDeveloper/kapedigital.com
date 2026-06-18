import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://kapedigital.com',

  adapter: vercel({
    runtime: 'nodejs20.x',
  }),

  // Sitemap se genera con un endpoint custom en src/pages/sitemap.xml.ts
  // (evita un bug de @astrojs/sitemap con output:'hybrid' que tira "Cannot read properties of undefined")
  integrations: [tailwind()],

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
