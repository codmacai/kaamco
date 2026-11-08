"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { dict, lp, type Lang } from "@/content/i18n";

export default function MobileNav({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t.header.closeMenu : t.header.openMenu}
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center border border-line-strong text-fg"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto border-t border-line bg-ink"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {t.nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line px-6 py-5"
              >
                <span className="eyebrow text-fg-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-3xl">{item.label}</span>
              </a>
            ))}
          </nav>
          <div className="mt-auto grid gap-2 p-6">
            <a
              href={lp("/register#need-manpower", lang)}
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-between bg-amber px-5 font-bold text-night"
            >
              {t.header.cta} <ArrowUpRight className="size-5" />
            </a>
            <a
              href={lp("/register#find-work", lang)}
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-between bg-ink-3 px-5 font-semibold"
            >
              {t.header.findWork}
              {t.header.findWorkSub && (
                <span lang="hi" className="text-sm font-normal text-sky">
                  {t.header.findWorkSub}
                </span>
              )}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
