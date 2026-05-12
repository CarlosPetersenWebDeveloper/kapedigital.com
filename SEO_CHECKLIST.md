# SEO Checklist & Production Guide — Kape Digital

## ✅ Pre-Deployment Checklist

### Meta Tags & Open Graph
- [x] Meta description en todas las páginas
- [x] Open Graph tags (og:title, og:description, og:image, og:url)
- [x] Twitter Card tags (twitter:card, twitter:title, twitter:description)
- [x] Canonical URLs
- [x] Robots meta tag (index, follow)
- [x] Viewport meta tag

### Structured Data (Schema.org)
- [x] Organization schema
- [x] LocalBusiness schema (con contacto)
- [x] BreadcrumbList schema
- [x] Service schemas para cada paquete
- [ ] FAQSchema (recomendado agregar en futuro)

### Site Configuration
- [x] robots.txt (/public/robots.txt)
- [x] sitemap.xml (/public/sitemap.xml)
- [x] 404 page (/src/pages/404.astro)
- [x] vercel.json (configuración Vercel)
- [x] .env.example

### Performance SEO
- [x] Fonts con display=swap para mejor Core Web Vitals
- [x] Preconnect a Google Fonts
- [x] Minificación de CSS/JS en producción
- [x] Lazy loading de imágenes (implementar si hay imágenes)
- [ ] Image optimization (agregar en futuro con @astrojs/image)

### Accessibility (WCAG 2.1 AA)
- [x] aria-labels en botones
- [x] aria-hidden en elementos decorativos
- [x] aria-controls en menú mobile
- [x] Semantic HTML
- [ ] Alt text en imágenes (cuando agregues imágenes)
- [ ] Color contrast validation (verificar manualmente)

### Content
- [x] Página principal (/)
- [x] Página de servicios (/servicios)
- [x] Página de portafolio (/portafolio)
- [x] Página blog (/blog)
- [x] Página sobre (/sobre)
- [x] Footer con enlaces internos
- [x] CTA clara en Home y todas las páginas

### Technical
- [x] TypeScript support (tsconfig.json)
- [x] Form validation utilities
- [x] SEO utilities
- [x] Astro 4 configurado
- [x] Tailwind CSS 3
- [ ] HTTPS (activar en Vercel)
- [ ] Security headers (implementar en vercel.json)

---

## 🚀 Deployment en Vercel

### Pasos:
1. **Conectar repositorio a Vercel**
   ```bash
   # En Vercel dashboard, conectar el repo de GitHub
   ```

2. **Variables de entorno**
   - Copiar .env.example a .env.local
   - Configurar en Vercel > Settings > Environment Variables

3. **Build settings (auto-detectados)**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **DNS (si usas dominio custom)**
   - Apuntar dominio a Vercel nameservers
   - O usar CNAME records

### Post-Deploy:
```bash
# Verificar build
npm run build

# Preview local del build
npm run preview

# Verificar en browser
https://kapedigital.com
```

---

## 🔍 Verificación de SEO Post-Deploy

### Herramientas recomendadas:
1. **Google Search Console** (GSC)
   - Conectar sitio
   - Enviar sitemap.xml
   - Verificar indexación
   - URL con problemas

2. **Google PageSpeed Insights**
   - Core Web Vitals
   - Performance
   - Accessibility
   - Best Practices

3. **SEO Audit Tools**
   - Screaming Frog
   - Semrush
   - Moz
   - Ahrefs

4. **Accessibility Checker**
   - WAVE
   - Axe DevTools
   - Lighthouse (Chrome DevTools)

### Métricas a monitorear:
- Core Web Vitals (LCP, FID, CLS)
- Lighthouse Score (>90)
- Indexación de páginas
- Ranking en Google (3-4 semanas)
- CTR y impressiones en GSC

---

## 📝 SEO Tips & Best Practices

### Mejoras futuras recomendadas:
1. **Blog/Content Strategy**
   - Publicar posts sobre desarrollo web
   - Casos de estudio
   - Tutoriales Costa Rica

2. **Link Building**
   - Directorios CR (Yellow Pages, Google My Business)
   - Menciones en medios
   - Guest posts en blogs relacionados

3. **Local SEO**
   - Google My Business setup
   - Reseñas locales
   - Schema LocalBusiness completo

4. **Performance**
   - Agregar @astrojs/image
   - Implementar ISR (Incremental Static Regeneration)
   - Cache headers en Vercel

5. **Analytics**
   - Google Analytics 4
   - Hotjar (heatmaps)
   - Plausible Analytics (privacy-friendly)

---

## 🔗 Recursos

- [Astro SEO Best Practices](https://docs.astro.build/en/guides/seo/)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Reference](https://schema.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals](https://web.dev/vitals/)

---

## 📞 Support

Si necesitas ayuda con:
- Deployment: Ver vercel.json y astro.config.mjs
- SEO: Revisar sitemap.xml y robots.txt
- A11y: Revisar componentes con aria-labels
- Errores: Revisar console del navegador y Vercel logs

¡Listo para producción! 🎉
