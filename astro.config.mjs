import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

// Lista explícita de URLs para el sitemap. Mantener sincronizada con el repo
// cada vez que se agregue una página o un post de blog.
// (Bypassa el bug de @astrojs/sitemap con output:'hybrid' + crawlLinks.)
const BASE = 'https://kapedigital.com';
const BLOG_SLUGS = [
  'por-que-tu-negocio-no-aparece-en-google',
  'whatsapp-business-lo-basico',
  'landing-page-vs-sitio-web',
  'cuanto-cuesta-un-sitio-web-costa-rica',
  'instagram-no-es-un-sitio-web',
];

const customPages = [
  // ES
  `${BASE}/`,
  `${BASE}/servicios/`,
  `${BASE}/portafolio/`,
  `${BASE}/sobre/`,
  `${BASE}/contacto/`,
  `${BASE}/blog/`,
  `${BASE}/privacidad/`,
  ...BLOG_SLUGS.map(s => `${BASE}/blog/${s}/`),
  // EN
  `${BASE}/en/`,
  `${BASE}/en/servicios/`,
  `${BASE}/en/portafolio/`,
  `${BASE}/en/sobre/`,
  `${BASE}/en/contacto/`,
  `${BASE}/en/blog/`,
  `${BASE}/en/privacidad/`,
  ...BLOG_SLUGS.map(s => `${BASE}/en/blog/${s}/`),
];

export default defineConfig({
  site: BASE,

  adapter: vercel({
    runtime: 'nodejs20.x',
  }),

  integrations: [
    tailwind(),
    sitemap({
      customPages,
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],

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
