import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";

export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Workforce Coordination in Bengaluru`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Your Requirement. Our Coordination.`,
    description: site.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const baseViewport: Viewport = { themeColor: "#ffffff" };
