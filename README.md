# Cira Comercial

Sitio web de Cira Comercial creado con Next.js, TypeScript y Tailwind CSS.

## Requisitos

- Node.js 20 o posterior
- pnpm 9 o posterior

## Desarrollo local

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000). Si el puerto está ocupado, Next.js elegirá otro y lo mostrará en la terminal.

## Validación y producción

```bash
pnpm lint
pnpm build
pnpm start
```

`pnpm start` sirve la compilación de producción creada por `pnpm build`.

## Publicación en Vercel

1. Sube este proyecto a un repositorio Git.
2. En Vercel, selecciona **Add New → Project** e importa el repositorio.
3. Vercel detectará Next.js automáticamente.
4. Mantén los comandos predeterminados: `pnpm build` para compilar y `pnpm start` para ejecución local de producción.
5. Revisa la vista previa y publica el proyecto.

No conectes un dominio hasta confirmar la publicación. Cuando llegue el momento, configura el dominio desde el panel de Vercel; la URL pública actual está centralizada en `src/lib/site.ts`.

## Datos del negocio

Edita [src/lib/site.ts](src/lib/site.ts) para cambiar el nombre, URL, teléfono, WhatsApp, correo, dirección u horarios. Las rutas SEO, enlaces de contacto y datos estructurados reutilizan esa configuración.

## Catálogo

Las categorías y productos visibles están definidos en [src/components/catalog.tsx](src/components/catalog.tsx). Agrega futuras categorías o productos a ese arreglo, con una imagen optimizada en `public/assets/products/`.

Los recursos públicos usados por el sitio se encuentran en `public/assets/`. Las carpetas originales `Logo/`, `Negocio/` y `Referencias/` se conservan como fuente de referencia y no se exponen como recursos públicos del sitio.
