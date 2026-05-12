# Security Headers Configuration for Kape Digital

Este archivo contiene las headers de seguridad recomendadas para producción.
Impleméntalas en tu servicio de hosting (Vercel, Netlify, etc).

## Vercel - vercel.json

Ya está configurado en vercel.json con sitemap y robots.txt.
Para agregar más headers de seguridad, usa:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        }
      ]
    }
  ]
}
```

## Content Security Policy (CSP)

Para agregar CSP (recomendado si usas scripts externos):

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://www.google-analytics.com;
```

## HTTPS

✅ Vercel proporciona HTTPS gratis con Let's Encrypt
✅ Certificado auto-renovable
✅ Redirect HTTP → HTTPS automático

## DNS Security

Si usas dominio custom:
- Configura DNSSEC
- Usa DNS provider de confianza (Cloudflare, Route 53, etc)
- Monitorea records de DNS

## Monitoreo

Herramientas para verificar headers:

1. **Security Header Scanner**: https://securityheaders.com/
2. **SSL Labs**: https://www.ssllabs.com/
3. **Mozilla Observatory**: https://observatory.mozilla.org/
4. **Qualys BrowserCheck**: https://browsercheck.qualys.com/

Objetivo: Grado A en segurityheaders.com ✅
