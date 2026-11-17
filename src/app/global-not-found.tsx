import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { fontVars } from "./fonts";
import "./globals.css";

export const metadata: Metadata = { metadataBase: new URL(site.url), title: "Page not found | KAAM-CO", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en-IN" data-theme="light" className={`${fontVars} antialiased`}>
      <body className="grid min-h-dvh place-items-center bg-ink px-5">
        <main className="max-w-md text-center">
          <p className="eyebrow text-accent">404</p>
          <h1 className="display mt-4 text-5xl text-fg">Page not found</h1>
          <p className="mt-4 text-base text-fg-2">The page you are looking for does not exist.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex min-h-12 items-center bg-amber px-6 font-bold text-night">
              Go to home
            </Link>
            <Link href="/hi" lang="hi" className="inline-flex min-h-12 items-center border border-line-strong px-6 font-semibold text-fg">
              हिंदी
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
