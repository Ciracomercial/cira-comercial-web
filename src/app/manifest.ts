import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cira Comercial",
    short_name: "Cira",
    description: "Productos de limpieza y desechables en Nuevo Casas Grandes.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#384a9f",
    lang: "es-MX",
    icons: [
      { src: "/icon.png", sizes: "250x250", type: "image/png" },
      { src: "/apple-icon.png", sizes: "250x250", type: "image/png" },
    ],
  };
}
