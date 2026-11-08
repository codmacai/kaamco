"use client";

import type { CSSProperties, PointerEvent } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { dict, type Lang } from "@/content/i18n";
import { getPaths, type PathKey } from "./paths";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function track(e: PointerEvent<HTMLButtonElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

/** Step 01 — "What are you looking for?" with three expanding panels. */
export default function Chooser({
  lang,
  onChoose,
  as: Tag = "main",
}: {
  lang: Lang;
  onChoose: (k: PathKey) => void;
  as?: "main" | "section";
}) {
  const t = dict[lang].chooser;
  const paths = getPaths(lang);
  return (
    <Tag
      id={Tag === "main" ? "main" : "top"}
      className="relative flex flex-col lg:h-[calc(100svh-5rem)] lg:min-h-[46rem]"
    >
      <div aria-hidden className="kc-glow pointer-events-none absolute -top-40 left-[8%] size-[36rem]" />

      <div className="relative flex flex-col gap-6 px-5 pb-8 pt-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pb-10 lg:pt-14">
        <div>
          <p className="rv eyebrow text-accent" style={delay(0)}>
            {t.step} <span className="mx-2 text-fg-3">/</span>
            <span className="text-fg-2">{t.choose}</span>
          </p>
          <h1
            className="rv display mt-5 text-[clamp(2.75rem,6vw,6rem)] leading-[0.92] text-fg"
            style={delay(0.08)}
          >
            {t.title[0]}
            <br />
            {t.title[1]}
          </h1>
          <p lang={t.subLang} className="rv mt-4 text-xl text-sky" style={delay(0.16)}>
            {t.sub}
          </p>
        </div>

        <div className="rv hidden flex-col items-end gap-3 text-right lg:flex" style={delay(0.24)}>
          <p className="text-sm text-fg-2">{t.meta}</p>
          <p className="flex items-center gap-2 text-xs text-fg-3">
            {t.press}
            {["1", "2", "3"].map((k) => (
              <kbd
                key={k}
                className="grid size-6 place-items-center border border-line-strong font-sans text-[0.6875rem] text-fg-2"
              >
                {k}
              </kbd>
            ))}
            {t.toChoose}
          </p>
        </div>
      </div>

      <ul className="group/list flex flex-1 flex-col gap-3 px-5 pb-5 sm:px-8 lg:flex-row lg:px-10 lg:pb-8">
        {paths.map((p, i) => (
          <li
            key={p.key}
            className="rv-panel flex min-h-60 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] sm:min-h-72 lg:min-h-0 lg:flex-1 lg:hover:grow-[1.65] lg:has-[:focus-visible]:grow-[1.65]"
            style={delay(0.25 + i * 0.12)}
          >
            <button
              type="button"
              onClick={() => onChoose(p.key)}
              onPointerMove={track}
              aria-label={`${p.title}${p.sub ? ` (${p.sub})` : ""} — ${p.audience}`}
              className="kc-panel group relative flex w-full overflow-hidden bg-night text-left outline-offset-4"
            >
              {/* photo — named so it morphs into the form page */}
              <span className="absolute inset-0" style={{ viewTransitionName: `kc-photo-${p.key}` }}>
                <Image
                  src={p.image}
                  alt=""
                  fill
                  loading="eager"
                  placeholder="blur"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06]"
                  style={{ objectPosition: p.position }}
                />
              </span>
              <span className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/10" />
              {/* dim the panels you're not pointing at */}
              <span className="absolute inset-0 bg-night/45 opacity-0 transition-opacity duration-500 lg:group-hover/list:opacity-100 lg:group-hover:!opacity-0" />
              <span className="kc-panel__spot absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-amber transition-transform duration-700 group-hover:scale-x-100 group-focus-visible:scale-x-100" />

              <span className="relative z-10 flex w-full flex-col justify-between gap-10 p-6 lg:p-8">
                <span className="flex items-start justify-between gap-4">
                  <span className="eyebrow text-snow/70">
                    <span className="text-amber">{p.n}</span>
                    <span className="mx-2 text-snow/40">/</span>
                    {p.audience}
                  </span>
                  <span className="grid size-11 shrink-0 place-items-center border border-white/25 text-snow transition-all duration-500 group-hover:rotate-45 group-hover:border-amber group-hover:bg-amber group-hover:text-night">
                    <ArrowUpRight aria-hidden className="size-5" />
                  </span>
                </span>

                <span className="block">
                  <span className="display block text-[clamp(2rem,3.2vw,3.4rem)] leading-[0.95] text-snow">
                    {p.title}
                  </span>
                  {p.sub && (
                    <span lang="hi" className="mt-2 block text-xl text-amber">
                      {p.sub}
                    </span>
                  )}
                  <span className="mt-4 block max-w-sm text-sm leading-relaxed text-snow/75 transition-all duration-500 lg:max-h-0 lg:translate-y-2 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-32 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-32 lg:group-focus-visible:opacity-100">
                    {p.text}
                  </span>
                  <span className="mt-6 flex flex-wrap items-center gap-4">
                    <span
                      className="border border-white/20 bg-night/30 px-3 py-1.5 text-xs text-snow/80 backdrop-blur-sm"
                    >
                      {p.tag}
                    </span>
                    <span className="text-sm font-semibold text-snow underline-offset-4 group-hover:underline">
                      {t.continue}
                    </span>
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Tag>
  );
}
