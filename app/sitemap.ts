import type { MetadataRoute } from "next";

const routes = [
  "",
  "/instaladores-y-mantenedores",
  "/receptoras",
  "/propietarios",
  "/contacta",
  "/terminos-y-condiciones",
  "/politica-de-privacidad",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://www.nusku.cloud${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
