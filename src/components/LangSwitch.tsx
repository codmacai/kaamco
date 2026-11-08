"use client";

import { usePathname } from "next/navigation";
import type { Lang } from "@/content/i18n";
import { dict } from "@/content/i18n";

/** Switches between /… and /hi/…, keeping the current page and #section. */
export default function LangSwitch({ lang, className = "" }: { lang: Lang; className?: string }) {
  const path = usePathname() || "/";
  const t = dict[lang].langSwitch;
  const target = lang === "en" ? `/hi${path === "/" ? "" : path}` : path.replace(/^\/hi/, "") || "/";
  return (
    <a
      href={target}
      lang={t.lang}
      hrefLang={t.lang}
      aria-label={t.aria}
      onClick={(e) => {
        e.preventDefault();
        window.location.assign(target + window.location.hash);
      }}
      className={`inline-flex h-10 items-center border border-line-strong px-3 text-[0.8125rem] font-semibold text-fg transition-colors hover:border-amber ${className}`}
    >
      {t.label}
    </a>
  );
}
