import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { siteUrl } from "../lib/site";
import "./globals.css";

const siteDescription = "Productos de limpieza para hogar, negocio e industria en Nuevo Casas Grandes. Cira Comercial ofrece jarciería, desechables y atención personalizada.";
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cira Comercial | Productos de limpieza en Nuevo Casas Grandes",
    template: "%s | Cira Comercial",
  },
  description: siteDescription,
  applicationName: "Cira Comercial",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "Cira Comercial",
    title: "Productos de limpieza en Nuevo Casas Grandes | Cira Comercial",
    description: siteDescription,
    images: [{ url: "/images/og-cira-comercial.jpg", width: 1200, height: 630, alt: "Cira Comercial, productos de limpieza en Nuevo Casas Grandes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Productos de limpieza en Nuevo Casas Grandes | Cira Comercial",
    description: siteDescription,
    images: ["/images/og-cira-comercial.jpg"],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" data-scroll-behavior="smooth">
      <body>
        {children}
        {googleAnalyticsId ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
      </body>
    </html>
  );
}
