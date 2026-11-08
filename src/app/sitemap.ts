import type { MetadataRoute } from "next";
import { legalPages, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/hi`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/register`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/hi/register`, changeFrequency: "monthly", priority: 0.8 },
    ...Object.keys(legalPages).map((slug) => ({
      url: `${site.url}/legal/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
