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

## Publicación en Hostinger

El sitio debe desplegarse como aplicación Next.js con Node.js. Consulta [DEPLOYMENT.md](DEPLOYMENT.md) para el flujo completo de Hostinger, SSL y dominio.

## Datos del negocio y categorías

Edita `src/lib/site.ts` para actualizar los datos públicos del negocio. Las categorías visibles se definen en `src/lib/product-categories.ts` y sus recursos en `public/assets/`.

Las carpetas originales `Logo/`, `Negocio/` y `Referencias/` se conservan como fuente de referencia y no se exponen públicamente.
