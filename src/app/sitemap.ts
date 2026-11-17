import type { MetadataRoute } from "next";
import { servicePages, site } from "@/content/site";

/** Only live, indexable URLs. Legal pages join once their approved text is published. */
export default function sitemap(): MetadataRoute.Sitemap {
  const alt = (en: string, hi: string) => ({ languages: { "en-IN": `${site.url}${en}`, "hi-IN": `${site.url}${hi}` } });
  return [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1, alternates: alt("/", "/hi") },
    { url: `${site.url}/hi`, changeFrequency: "weekly", priority: 0.9, alternates: alt("/", "/hi") },
    { url: `${site.url}/register`, changeFrequency: "monthly", priority: 0.9, alternates: alt("/register", "/hi/register") },
    { url: `${site.url}/hi/register`, changeFrequency: "monthly", priority: 0.8, alternates: alt("/register", "/hi/register") },
    ...servicePages.map((p) => ({
      url: `${site.url}/services/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
