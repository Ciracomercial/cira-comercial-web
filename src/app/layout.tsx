import type { Metadata } from "next";
import { siteUrl } from "../lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cira Comercial | Productos de limpieza en Nuevo Casas Grandes",
    template: "%s | Cira Comercial",
  },
  description: "Productos de limpieza, jarciería, desechables, papel institucional y soluciones para hogar y negocio en Nuevo Casas Grandes, Chihuahua.",
  applicationName: "Cira Comercial",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "Cira Comercial",
    title: "Cira Comercial | Productos de limpieza en Nuevo Casas Grandes",
    description: "Productos de limpieza, jarciería, desechables, papel institucional y soluciones para hogar y negocio en Nuevo Casas Grandes, Chihuahua.",
    images: [{ url: "/images/og-cira-comercial.jpg", width: 1200, height: 630, alt: "Cira Comercial, productos de limpieza en Nuevo Casas Grandes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cira Comercial | Productos de limpieza en Nuevo Casas Grandes",
    description: "Productos de limpieza, jarciería, desechables, papel institucional y soluciones para hogar y negocio en Nuevo Casas Grandes, Chihuahua.",
    images: ["/images/og-cira-comercial.jpg"],
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
