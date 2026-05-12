# Kape Digital — Setup del proyecto

## Primera vez (setup inicial)

```bash
# Entrá a la carpeta del proyecto
cd "Pecadev page/page"

# Si node_modules está dañado, eliminalo primero
rm -rf node_modules

# Instalá las dependencias (usa --prefer-offline para que sea más rápido)
npm install --prefer-offline

# Levantá el servidor de desarrollo
npm run dev
```

El sitio va a estar disponible en: **http://localhost:4321**

---

## Comandos del día a día

```bash
npm run dev      # Servidor de desarrollo con hot reload
npm run build    # Build de producción (genera carpeta dist/)
npm run preview  # Preview del build de producción
```

---

## Estructura del proyecto

```
page/
├── src/
│   ├── components/
│   │   ├── Navbar.astro        → Barra de navegación sticky
│   │   ├── Hero.astro          → Sección hero con taza animada
│   │   ├── Services.astro      → Los 4 paquetes (Grano/Tueste/Pergamino/Finca)
│   │   ├── Process.astro       → Proceso de 5 pasos
│   │   ├── Portfolio.astro     → Portafolio de proyectos
│   │   ├── Testimonials.astro  → Testimonios + stats
│   │   ├── BlogPreview.astro   → Vista previa del blog
│   │   ├── CTA.astro           → Llamada a la acción final
│   │   └── Footer.astro        → Footer completo
│   ├── layouts/
│   │   └── Layout.astro        → Layout base (fonts, scroll cup, scripts)
│   ├── pages/
│   │   └── index.astro         → Página principal (une todos los componentes)
│   └── styles/
│       └── global.css          → Animaciones de café + clases reveal
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs         → Paleta Kape Digital + animaciones
└── package.json
```

---

## Paleta de colores (Tailwind)

| Clase             | Hex       | Uso                      |
|-------------------|-----------|--------------------------|
| `bg-kape-white`   | #FAF7F2   | Fondo dominante (50%)    |
| `bg-kape-beige`   | #F5E9DA   | Fondo secundario (10%)   |
| `text-kape-medio` | #6F4E37   | Identidad principal (20%)|
| `text-kape-oscuro`| #4B2E2B   | Identidad profunda (5%)  |
| `bg-kape-azul`    | #EA580C   | CTAs y botones (8%)      |
| `text-kape-verde` | #15803D   | Éxito (3%)               |
| `text-kape-rojo`  | #DC2626   | Alertas (2%)             |
| `text-kape-naranja`| #EA580C  | Chispa de marca — K logo |

---

## Stack

- **Framework:** Astro 4
- **Estilos:** Tailwind CSS 3
- **Animaciones:** CSS keyframes + Intersection Observer (vanilla JS)
- **Fonts:** Plus Jakarta Sans · Inter · Lora (Google Fonts)
- **Deploy:** Vercel (conectar el repo y listo)
