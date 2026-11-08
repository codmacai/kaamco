import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Mukta } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Self-hosted at build time by next/font: no external requests, no layout shift.
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mukta = Mukta({
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mukta",
  display: "swap",
  preload: false, // Devanagari only; fetched on demand when Hindi text renders
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline} — Manpower & Workforce Platform`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "manpower supply",
    "manpower agency Bengaluru",
    "housekeeping staff",
    "warehouse workers",
    "labour contractor",
    "facility management staff",
    "find work",
    "KAAM-CO",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-theme="light"
      className={`${montserrat.variable} ${inter.variable} ${mukta.variable} antialiased`}
    >
      <body className="min-h-dvh bg-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-amber focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
