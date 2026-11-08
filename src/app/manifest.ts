import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070e17",
    theme_color: "#070e17",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
