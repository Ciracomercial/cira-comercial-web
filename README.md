# Cira Comercial

Sitio web de Cira Comercial creado con Next.js, TypeScript y Tailwind CSS.

## Requisitos

- Node.js 22 LTS (también compatible con Node.js 20.9 a 24)
- pnpm 11.17.0

## Desarrollo local

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Validación y producción

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

`pnpm start` sirve la compilación de producción y usa el puerto proporcionado por el entorno mediante `PORT` cuando exista.

## Google Analytics 4

La integración oficial de Next.js carga Analytics únicamente si existe `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

Para producción en Vercel, agrega esta variable de entorno en **Project Settings → Environment Variables** y selecciónala para Production:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-V93E3H0KG7
```

No subas archivos `.env` o `.env.local` al repositorio.

## Publicación en Hostinger

El sitio debe desplegarse como aplicación Next.js con Node.js. Consulta [DEPLOYMENT.md](DEPLOYMENT.md) para el flujo completo de Hostinger, SSL y dominio.

## Datos del negocio y categorías

Edita `src/lib/site.ts` para actualizar los datos públicos del negocio. Las categorías visibles se definen en `src/lib/product-categories.ts` y sus recursos en `public/assets/`.

Las carpetas originales `Logo/`, `Negocio/` y `Referencias/` se conservan como fuente de referencia y no se exponen públicamente.
