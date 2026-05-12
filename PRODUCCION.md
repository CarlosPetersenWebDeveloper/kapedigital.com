# 🚀 INSTRUCCIONES FINALES PARA PRODUCCIÓN — Kape Digital

## ⚠️ ANTES DE PUBLICAR - Checklist Final

```
[ ] Verificar que robots.txt existe en /public/robots.txt
[ ] Verificar que sitemap.xml existe en /public/sitemap.xml
[ ] Revisar que 404.astro está en /src/pages/404.astro
[ ] Revisar astro.config.mjs con configuraciones SEO
[ ] Revisar Layout.astro con meta tags y JSON-LD
[ ] Revisar que .env.example tiene todas las variables
[ ] Revisar que vercel.json está configurado
[ ] Revisar que tsconfig.json está presente
[ ] Revisar que package.json tiene todas las dependencias correctas
```

---

## 📋 CHECKLIST DE CONTENIDO

### Imágenes que falta agregar:
1. `public/og-image.png` (1200x630px para Open Graph)
   - Logo de Kape Digital
   - Fondo profesional (café)
   - Texto: "Kape Digital - Digitalizamos tu negocio"

### Información que falta completar:

```javascript
// En src/utils/seo.ts - LocalBusiness Schema
telephone: '+506-XXXX-XXXX',  // ← COMPLETAR CON TU TELÉFONO
```

### Revisar todas las páginas:
- [ ] `/` - Página principal (✅ hecha)
- [ ] `/servicios` - Servicios (✅ hecha)
- [ ] `/portafolio` - Portafolio (⚠️ revisar contenido)
- [ ] `/blog` - Blog (⚠️ revisar contenido)
- [ ] `/sobre` - Sobre mí (⚠️ revisar contenido)

---

## 🔗 CONFIGURACIÓN DE DOMINIO

### En Vercel:
1. Ir a Project Settings > Domains
2. Agregar `kapedigital.com`
3. Configurar DNS según instrucciones

### En tu DNS provider (ej: Cloudflare, Route 53):
```
CNAME: kapedigital.com → cname.vercel-dns.com
```

---

## 🔑 VARIABLES DE ENTORNO

En Vercel > Settings > Environment Variables:

```
VITE_CONTACT_EMAIL = hola@kapedigital.com
VITE_CALENDLY_URL = https://calendly.com/carlos-petersen-calderon29
VITE_API_BASE_URL = https://kapedigital.com
VITE_GA4_ID = G-XXXXXXXXXX (Google Analytics)
```

---

## 📊 GOOGLE SEARCH CONSOLE (GSC)

Post-deploy inmediato:

1. **Conectar sitio**
   - Ir a: https://search.google.com/search-console
   - Agregar propiedad: https://kapedigital.com

2. **Verificación de dominio**
   - Opción DNS TXT record
   - Copiar valor en tu DNS provider

3. **Enviar sitemap**
   - GSC > Sitemaps
   - Agregar: https://kapedigital.com/sitemap.xml

4. **Coverage Report**
   - Esperar 24-48h para que Google crawlee
   - Revisar que todas las páginas están indexadas

---

## 📈 GOOGLE ANALYTICS 4

1. **Crear propiedad en GA4**
   - Ir a: https://analytics.google.com
   - Crear propiedad "Kape Digital"
   - Copiar Measurement ID

2. **Configurar en Vercel**
   - VITE_GA4_ID = G-XXXXXXXXXX

3. **Verificar en sitio**
   - Ir a kapedigital.com
   - Aceptar cookies
   - Revisar GA4 real-time (debe mostrar visita)

---

## 🌐 GOOGLE BUSINESS PROFILE

Para aparecer en Google Maps:

1. Ir a: https://business.google.com
2. Crear perfil de negocio
3. Completar:
   - Nombre: Kape Digital
   - Categoría: Web Designer
   - Teléfono
   - Dirección (si es local) o virtual
   - Horarios
   - Foto principal
   - Descripción

---

## ✅ VERIFICACIONES POST-DEPLOY

### 1. Verificar indexación
```bash
# En Google
site:kapedigital.com

# Debería mostrar:
- https://kapedigital.com/
- https://kapedigital.com/servicios
- https://kapedigital.com/blog
- https://kapedigital.com/portafolio
- https://kapedigital.com/sobre
```

### 2. Verificar meta tags
```bash
# Abre DevTools (F12) en el sitio
# Ir a Elements/Inspector
# Buscar <head> y verificar:
- <title> con keyword principal
- <meta name="description">
- <meta property="og:image">
- <script type="application/ld+json"> (debe haber al menos 1)
```

### 3. Verificar Core Web Vitals
```bash
# Google PageSpeed Insights
https://pagespeed.web.dev/

# Ingresa: https://kapedigital.com
# Objetivo: Score > 90 en Desktop y Mobile
```

### 4. Verificar accesibilidad
```bash
# Lighthouse Audit (DevTools > Lighthouse)
# Correr audit de Accessibility
# Objetivo: Score 90+
```

---

## 🎯 PRIMEROS 30 DÍAS - STRATEGY

**Semana 1:**
- ✅ Deploy en producción
- ✅ Verificar en GSC
- ✅ Configurar GA4
- ✅ Enviar sitemap a Google

**Semana 2-3:**
- Google va a comenzar a crawlear el sitio
- Revisar coverage report en GSC
- Notar cambios en indexación

**Semana 4:**
- Revisar primeras búsquedas en GSC
- Ver qué queries generan impresiones
- Comenzar a monitorear rankings

**Mes 2-3:**
- Posiciones estables (esperar 4-6 semanas para ranking estable)
- Publicar blog posts regularmente
- Construir backlinks

---

## 🚨 TROUBLESHOOTING

### Página no aparece en Google después de 48h
```bash
# 1. Revisar robots.txt
curl https://kapedigital.com/robots.txt

# 2. Revisar que el sitio carga
curl https://kapedigital.com

# 3. En GSC > Coverage > Excluded
# Si dice "Excluded by noindex tag" = revisar robots meta

# 4. Reenviar sitemap en GSC
```

### 404 errors en GSC
```bash
# Significa que Google encontró links rotos
# Revisar que todas las URLs en sitemap.xml existan
# Revalidar en GSC después de arreglar
```

### Core Web Vitals lentos
```bash
# 1. Ir a PageSpeed Insights
# 2. Revisar "Opportunities" section
# 3. Optimizar imágenes
# 4. Revisar cache headers
# 5. Considerar agregar @astrojs/image
```

---

## 📚 RECURSOS ÚTILES

### SEO:
- Google Search Central: https://developers.google.com/search
- GSC Academy: https://support.google.com/webmasters

### Analytics:
- GA4 Setup Guide: https://support.google.com/analytics/

### Performance:
- Core Web Vitals: https://web.dev/vitals/
- PageSpeed Insights: https://pagespeed.web.dev/

### Accessibility:
- WCAG 2.1 Checklist: https://www.w3.org/WAI/WCAG21/quickref/
- Axe DevTools: https://www.deque.com/axe/devtools/

---

## 💬 SUPPORT

Si necesitas ayuda post-deploy:

1. **Errores de build**
   - Revisar Vercel logs
   - Revisar terminal: `npm run build`

2. **SEO issues**
   - Revisar Google Search Console
   - Revisar SEO_CHECKLIST.md

3. **Performance issues**
   - Revisar PageSpeed Insights
   - Revisar Vercel Analytics

4. **Security**
   - Revisar securityheaders.com
   - Revisar SECURITY_HEADERS.md

---

## ✨ ¡FELICIDADES!

Tu sitio está optimizado para producción y listo para escalar en Google Search.

Espera 4-6 semanas para ver resultados en rankings.
Publica contenido regularmente para mantener el momentum.

¡Mucho éxito! 🎉
