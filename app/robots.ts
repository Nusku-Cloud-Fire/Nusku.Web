import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/recursos/calculadora"],
    },
    sitemap: "https://www.nusku.cloud/sitemap.xml",
  };
}
