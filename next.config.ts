import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; img-src 'self' data: blob: https:; frame-src https://www.google.com; script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https:`,
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/productos/categoria/:slug",
        destination: "/productos",
        permanent: true,
      },
      {
        source: "/productos/:slug",
        destination: "/productos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
