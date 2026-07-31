# Despliegue en Hostinger

## Modalidad recomendada

Despliega este proyecto como una aplicación **Next.js con Node.js**. No requiere base de datos, rutas API ni variables secretas, pero este modo conserva las redirecciones y la optimización de imágenes de Next.js.

Hostinger ofrece aplicaciones Node.js administradas para planes Business Web Hosting y Cloud. En hPanel, confirma que tu plan incluya **Node.js Web Apps** antes de continuar. Si el plan no lo incluye, actualízalo o usa un VPS; no conviertas el proyecto a exportación estática sin una revisión específica.

## Requisitos

- Node.js 22 LTS (el proyecto permite Node.js 20.9 a 24).
- pnpm 11.17.0.
- Un repositorio Git o un archivo ZIP del proyecto, sin `node_modules`, `.next` ni archivos `.env`.

## Configuración de la aplicación

En hPanel crea una **Node.js Web App** y selecciona el framework Next.js si Hostinger lo detecta.

- Directorio de trabajo: la raíz del proyecto.
- Instalación: `pnpm install --frozen-lockfile`
- Build: `pnpm build`
- Inicio: `pnpm start`
- Puerto: no fijes un puerto. Hostinger proporciona `PORT` y `next start` lo respeta.

Mantén `.env.example` como referencia y nunca subas `.env`, `.env.local` o credenciales.

## Google Analytics 4 en Vercel

En Vercel, abre **Project Settings → Environment Variables** y agrega la siguiente variable para el entorno **Production**:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-V93E3H0KG7
```

La integración usa el componente oficial `GoogleAnalytics` de Next.js y solo se carga cuando la variable existe. Vuelve a desplegar después de guardarla.

## Dominio y HTTPS

1. Despliega y revisa la URL temporal de Hostinger.
2. Añade `ciracomercial.com` en la sección Domains de la aplicación y asigna ese dominio como principal.
3. Activa el certificado SSL administrado y su renovación automática.
4. Activa la redirección forzada a HTTPS en hPanel.
5. Configura la redirección permanente de `www.ciracomercial.com` a `ciracomercial.com` desde hPanel. No crees una segunda redirección equivalente en Next.js.
6. Cuando HTTPS ya esté activo para ambos hostnames, activa HSTS desde hPanel o la configuración del proxy, si está disponible.

La versión canónica ya está centralizada como `https://www.ciracomercial.com` en `src/lib/site.ts`.

## Validación después de publicar

- Abre Inicio, Productos, Nosotros, Contacto y Aviso de privacidad.
- Prueba una ruta inexistente y confirma la página 404.
- Prueba `/productos/categoria/albercas` y `/productos/ejemplo`; ambas deben redirigir a `/productos`.
- Confirma `https://www.ciracomercial.com/robots.txt` y `https://www.ciracomercial.com/sitemap.xml`.
- Comprueba WhatsApp, teléfono, correo y el enlace de Google Maps desde móvil y escritorio.
- Verifica que el mapa cargue y que el formulario abra WhatsApp sin almacenar información.
- Vacía la caché/CDN de Hostinger después de cada actualización relevante.

## Actualizaciones futuras

1. Ejecuta `pnpm lint`, `pnpm typecheck` y `pnpm build` localmente.
2. Sube los cambios al repositorio o carga un ZIP actualizado.
3. Ejecuta el nuevo despliegue desde hPanel.
4. Comprueba las rutas y limpia la caché/CDN si aplica.
