# 🔧 Fix: Error "nodejs18.x" vs "nodejs20.x" en Vercel

## 📋 El Problema

**Error en Vercel:** `invalid runtime nodejs18.x`

**Root Cause:**
1. Tu `astro.config.mjs` especifica: `runtime: 'nodejs20.x'`
2. Tu Node.js **local** es v25.5.0 (incompatible con Vercel)
3. El adaptador `@astrojs/vercel` detecta la incompatibilidad local y **downgrade a nodejs18.x**
4. Tu `.vercel/output` contiene `nodejs18.x` pero Vercel rechaza 18.x
5. `.vercel/` estaba siendo commiteado a Git (ahora en `.gitignore`)

## ✅ Soluciones Aplicadas

### 1. ✅ Agregado `.vercel/` a `.gitignore`
```diff
+ .vercel/
```
**Por qué:** `.vercel/output/` es generado, NO debe estar en Git. Se regenera en cada deploy.

### 2. ✅ Creado `.nvmrc`
```
20
```
**Por qué:** Especifica que el proyecto usa Node.js 20 (compatible con Vercel).

### 3. ✅ Verificado `astro.config.mjs`
```javascript
adapter: vercel({
  runtime: 'nodejs20.x',  // ✅ Correcto
}),
output: 'hybrid',  // ✅ Correcto
```

### 4. ✅ Verificado `vercel.json`
```json
"functions": {
  "api/**": {
    "runtime": "nodejs20.x"  // ✅ Correcto para APIs
  }
}
```

## 🚀 Próximos Pasos

### Opción A: Cambiar tu Node.js local a v20 (Recomendado)
```bash
# Si usas nvm (Node Version Manager)
nvm install 20
nvm use 20

# Verifica
node --version  # Debería mostrar v20.x.x
```

### Opción B: Forzar Vercel a usar nodejs20.x (SIN cambiar local)
En Vercel Dashboard > Project Settings > Environment Variables:
```
NODE_VERSION=20
```

## 📝 Cambios en Git

**Archivos modificados:**
- ✅ `.gitignore` - Agregado `.vercel/`

**Nuevos archivos:**
- ✅ `.nvmrc` - Especifica Node 20 como versión de proyecto

**Próximo: Regenerar build limpio**
```bash
npm run build  # Genera nuevo .vercel/output/ con nodejs20.x
```

## ⚠️ IMPORTANTE: No Commitear `.vercel/`

El directorio `.vercel/` contiene:
- ❌ Archivos de build compilados
- ❌ Archivos temporales de Vercel
- ❌ Configuraciones generadas

**Estos NO deben estar en Git.** Se generan automáticamente en cada deploy.

## ✅ Validación

Después de cambiar a Node 20:

```bash
node --version  # v20.x.x
npm run build   # Verifica que genera nodejs20.x en .vc-config.json
```

El archivo `.vercel/output/functions/_render.func/.vc-config.json` debe tener:
```json
{
  "runtime": "nodejs20.x",  // ✅ No nodejs18.x
  "handler": "...",
  "launcherType": "Nodejs",
  "supportsResponseStreaming": true
}
```

## 📚 Referencias

- [Astro Vercel Adapter Docs](https://docs.astro.build/en/guides/integrations-guide/vercel/)
- [Vercel Node.js Runtimes](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [NVM Installation](https://github.com/nvm-sh/nvm)
