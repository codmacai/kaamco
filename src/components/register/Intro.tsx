"use client";

import { useEffect } from "react";
import Image from "next/image";
import markLight from "@/assets/logo/mark-light.png";
import markDark from "@/assets/logo/mark-dark.png";
import wordLight from "@/assets/logo/word-light.png";
import wordDark from "@/assets/logo/word-dark.png";
import tagLight from "@/assets/logo/tag-light.png";
import tagDark from "@/assets/logo/tag-dark.png";
import { dict, type Lang } from "@/content/i18n";

type Piece = { light: typeof markLight; dark: typeof markDark; className: string; sizes: string };

/** Renders one logo piece in both theme colourways; CSS shows the right one. */
function Piece({ light, dark, className, sizes }: Piece) {
  return (
    <span className={className}>
      <Image src={light} alt="" sizes={sizes} preload className="h-auto w-full light:hidden" />
      <Image src={dark} alt="" sizes={sizes} loading="eager" className="hidden h-auto w-full light:block" />
    </span>
  );
}

/**
 * Logo entrance. The whole timeline is CSS (register.css), so it plays even before
 * hydration; JS only lets visitors skip it and unmounts it when finished.
 */
export default function Intro({ lang, onDone, onSkip }: { lang: Lang; onDone: () => void; onSkip: () => void }) {
  const t = dict[lang].intro;
  useEffect(() => {
    const skip = (e: KeyboardEvent) => {
      if (e.key === "Tab" || e.metaKey || e.ctrlKey) return;
      onSkip();
    };
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [onSkip]);

  return (
    <div
      className="kc-intro"
      role="presentation"
      onClick={onSkip}
      onAnimationEnd={(e) => {
        if (e.animationName === "kc-intro-out") onDone();
      }}
    >
      {/* faint grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [background-size:6rem_6rem] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]"
      />
      <div aria-hidden className="kc-glow pointer-events-none absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative flex flex-col items-center">
        <div className="kc-intro__logo" role="img" aria-label="KAAM-CO — The Force Behind Success">
          <span className="kc-intro__ring" />
          <Piece light={markLight} dark={markDark} className="kc-intro__mark" sizes="120px" />
          <Piece light={wordLight} dark={wordDark} className="kc-intro__word" sizes="(min-width: 768px) 430px, 60vw" />
          <Piece light={tagLight} dark={tagDark} className="kc-intro__tag" sizes="(min-width: 768px) 430px, 60vw" />
        </div>
        <div className="kc-intro__bar" aria-hidden />
      </div>

      <div className="kc-intro__meta absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 text-fg-3 sm:p-8">
        <p className="eyebrow hidden sm:block">{t.meta1}</p>
        <p className="eyebrow hidden md:block">{t.meta2}</p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSkip();
          }}
          className="eyebrow ml-auto border border-line-strong px-3 py-2 text-fg-2 transition-colors hover:border-amber hover:text-fg"
        >
          {t.skip}
        </button>
      </div>
    </div>
  );
}
