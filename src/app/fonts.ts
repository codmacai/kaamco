import { Inter, Montserrat, Mukta } from "next/font/google";

// Self-hosted at build time by next/font: no external requests, no layout shift.
export const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
export const mukta = Mukta({
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mukta",
  display: "swap",
  preload: false, // fetched when Devanagari text renders
});
export const fontVars = `${montserrat.variable} ${inter.variable} ${mukta.variable}`;
