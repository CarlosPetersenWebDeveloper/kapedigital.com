# Kape Digital — Contact / Mail sender

Breve guía para configurar y probar el endpoint de contacto que envía un email con un adjunto `.ics` (invitación de calendario).

**Archivos clave**
- [src/pages/api/contact.ts](src/pages/api/contact.ts#L1-L200) : endpoint que procesa el formulario, envía email vía Resend y adjunta `.ics`.
- [src/components/CTA.astro](src/components/CTA.astro#L1-L200) : formulario de contacto (incluye campos opcionales `date` y `time`).

**Qué hace**
- Recibe `name`, `email`, `message` (obligatorios) y `company`, `service`, `budget`, `date`, `time` (opcionales).
- Envía un email al destinatario configurado con los datos del lead y adjunta un `kapedigital-invite.ics` que el receptor puede agregar a su calendario.
- Si no se proporcionan `date`+`time`, el `.ics` propone una reunión para el día siguiente durante 30 minutos.

Prerequisitos (gratis / sin Google Cloud)
- Cuenta en Resend y una API key.

Variables de entorno (ejemplo `.env`)
```
RESEND_API_KEY=re_xxx_your_new_key_here
RESEND_FROM_EMAIL=no-reply@kapedigital.com
QUOTE_TO_EMAIL=hola@kapedigital.com
# Opcional: personalizar timezone/ics behavior (no obligatorio)
```

Importante: si compartiste una API key por accidente, revócala inmediatamente en el dashboard de Resend y crea una nueva. No publiques claves en chats.

Instalación y ejecución local
```bash
npm install
npm run dev
```

Probar envío (curl)
```bash
curl -X POST http://localhost:3000/api/contact \
  -F name="Ana Perez" -F email="ana@ejemplo.com" -F message="Hola, quiero info" \
  -F date="2026-05-13" -F time="15:30"
```

Respuesta esperada: `{ "ok": true }`. Revisa el buzón configurado en `QUOTE_TO_EMAIL` para ver el email y el adjunto `kapedigital-invite.ics`.

Alternativa SMTP (sin Resend)
- Si preferís no usar Resend, puedo adaptar el endpoint para usar SMTP con `nodemailer` (permitiría usar cuentas gratuitas de proveedores, pero requiere configurar credenciales SMTP en `.env`). Decime si querés que haga ese cambio.

Notas de despliegue
- En plataformas serverless (Vercel) guarda `RESEND_API_KEY` y `RESEND_FROM_EMAIL` como Environment Variables / Secrets.
- El endpoint tolera la ausencia de campos `date`/`time` y sigue enviando el `.ics` con fecha por defecto.

Limpieza realizada
- Se removió la integración experimental con Google Calendar y los endpoints OAuth (si los habías visto), para evitar costes y complejidad.

Si querés, agrego un ejemplo de `.env.example` o convierto el endpoint a SMTP ahora. ¿Qué preferís?
