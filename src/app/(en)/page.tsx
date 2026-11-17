import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import "@/styles/register.css";

export const metadata: Metadata = {
  title: { absolute: "KAAM-CO | Corporate Housekeeping, Office Shifting & Warehouse Manpower in Bengaluru" },
  description:
    "Your requirement, our coordination. Request housekeeping, office shifting, warehouse or facility support manpower in Bengaluru. Workers and contractors register free.",
  alternates: { canonical: "/", languages: { "en-IN": "/", "hi-IN": "/hi", "x-default": "/" } },
  openGraph: { url: "/" },
};

export default function Home() {
  return <HomePage lang="en" />;
}
