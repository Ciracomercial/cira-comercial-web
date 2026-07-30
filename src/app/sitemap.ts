import type { MetadataRoute } from "next";
import { siteLastModified, siteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: siteLastModified,
    },
    {
      url: `${siteUrl}/productos`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: siteLastModified,
    },
    {
      url: `${siteUrl}/contacto`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: siteLastModified,
    },
    {
      url: `${siteUrl}/nosotros`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: siteLastModified,
    },
    {
      url: `${siteUrl}/aviso-de-privacidad`,
      changeFrequency: "yearly",
      priority: 0.3,
      lastModified: siteLastModified,
    },
  ];
}
