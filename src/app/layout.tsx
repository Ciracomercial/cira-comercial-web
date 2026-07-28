import type { Metadata } from "next";
import { siteUrl } from "../lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Productos de Limpieza para Hogar y Negocio en Nuevo Casas Grandes | Cira Comercial",
  description: "Compra productos de limpieza, desechables, detergentes y soluciones para hogar, negocio e industria en Nuevo Casas Grandes. Cotiza por WhatsApp y solicita entrega local.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "Cira Comercial",
    title: "Productos de Limpieza para Hogar y Negocio en Nuevo Casas Grandes | Cira Comercial",
    description: "Compra productos de limpieza, desechables, detergentes y soluciones para hogar, negocio e industria en Nuevo Casas Grandes. Cotiza por WhatsApp y solicita entrega local.",
    images: [{ url: "/assets/business/interior-tienda.jpg", width: 1200, height: 560, alt: "Interior de Cira Comercial en Nuevo Casas Grandes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Productos de Limpieza para Hogar y Negocio en Nuevo Casas Grandes | Cira Comercial",
    description: "Compra productos de limpieza, desechables, detergentes y soluciones para hogar, negocio e industria en Nuevo Casas Grandes. Cotiza por WhatsApp y solicita entrega local.",
    images: ["/assets/business/interior-tienda.jpg"],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
