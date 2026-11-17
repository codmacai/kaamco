import type { ReactNode } from "react";
import { fontVars } from "@/app/fonts";
import Attribution from "./Attribution";
import "@/app/globals.css";

/** Shared <html>/<body> for the English and Hindi root layouts; only `lang` differs. */
export default function RootShell({ lang, skip, children }: { lang: "en-IN" | "hi-IN"; skip: string; children: ReactNode }) {
  return (
    <html lang={lang} data-theme="light" className={`${fontVars} antialiased`} suppressHydrationWarning>
      <body className="min-h-dvh bg-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-amber focus:px-4 focus:py-2 focus:text-night"
        >
          {skip}
        </a>
        <Attribution />
        {children}
      </body>
    </html>
  );
}
