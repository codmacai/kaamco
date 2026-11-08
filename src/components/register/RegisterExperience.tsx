"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "../Logo";
import Chooser from "./Chooser";
import FormView from "./FormView";
import Intro from "./Intro";
import { dict, lp, type Lang } from "@/content/i18n";
import LangSwitch from "../LangSwitch";
import { getPaths, PATHS, type PathKey } from "./paths";

type View = "choose" | PathKey;

const viewFromHash = (): View => PATHS.find((p) => p.hash === window.location.hash)?.key ?? "choose";

/** Cross-fade between views; the chosen card's photo morphs into the form page where supported. */
function withTransition(update: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("startViewTransition" in document) || reduce) {
    update();
    return;
  }
  const vt = document.startViewTransition(() => flushSync(update));
  // An interrupted transition (e.g. a quick back/forward) rejects; the DOM update still applies.
  vt.ready.catch(() => {});
  vt.finished.catch(() => {});
}

export default function RegisterExperience({ lang }: { lang: Lang }) {
  const t = dict[lang].register;
  const [intro, setIntro] = useState(true);
  const [fast, setFast] = useState(false); // true once the intro was skipped or the visitor moved on
  const [view, setView] = useState<View>("choose");
  const pushed = useRef(false);

  const finishIntro = useCallback(() => setIntro(false), []);
  const skipIntro = useCallback(() => {
    setFast(true);
    setIntro(false);
  }, []);

  const show = useCallback((v: View) => {
    withTransition(() => {
      setFast(true);
      setIntro(false);
      setView(v);
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }, []);

  // Deep links (#need-manpower …) open the form directly; browser back/forward move between views.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const v = viewFromHash();
      if (v !== "choose") {
        setFast(true);
        setIntro(false);
        setView(v);
      }
    });
    const onPop = () => show(viewFromHash());
    window.addEventListener("popstate", onPop);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("popstate", onPop);
    };
  }, [show]);

  const choose = useCallback(
    (k: PathKey) => {
      const p = PATHS.find((x) => x.key === k)!;
      history.pushState(null, "", p.hash);
      pushed.current = true;
      show(k);
    },
    [show],
  );

  const back = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      history.back(); // popstate → chooser
    } else {
      history.pushState(null, "", window.location.pathname);
      show("choose");
    }
  }, [show]);

  // Keyboard shortcuts 1 / 2 / 3 on the chooser.
  useEffect(() => {
    if (intro || view !== "choose") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const i = ["1", "2", "3"].indexOf(e.key);
      if (i >= 0) choose(PATHS[i].key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [intro, view, choose]);

  const path = view === "choose" ? null : getPaths(lang).find((p) => p.key === view)!;

  return (
    <div className="kc-stage kc-grain min-h-dvh overflow-x-clip bg-ink" data-intro={fast ? "off" : "on"}>
      {intro && <Intro lang={lang} onDone={finishIntro} onSkip={skipIntro} />}

      <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-4 px-5 sm:px-8 lg:h-20 lg:px-10">
          {view === "choose" ? (
            <span className="flex items-center">
              <Logo className="h-8 lg:h-9" />
            </span>
          ) : (
            <button type="button" onClick={back} aria-label={t.back} className="flex items-center">
              <Logo className="h-8 lg:h-9" />
            </button>
          )}
          <div className="flex items-center gap-3">
            <p className="eyebrow hidden text-fg-3 md:block">{t.label}</p>
            <span aria-hidden className="hidden h-4 w-px bg-line-strong md:block" />
            <Link
              href={lp("/", lang)}
              className="hidden h-10 items-center gap-2 px-2 text-[0.8125rem] font-medium text-fg-2 transition-colors hover:text-fg sm:inline-flex"
            >
              {t.visit} <ArrowUpRight aria-hidden className="size-4" />
            </Link>
            <LangSwitch lang={lang} />
          </div>
        </div>
      </header>

      {path ? <FormView key={path.key} lang={lang} path={path} onBack={back} /> : <Chooser lang={lang} onChoose={choose} />}

      <footer className="flex flex-col gap-2 border-t border-line px-5 py-5 text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>© 2026 KAAM-CO · {t.rights}</p>
        <nav aria-label="Legal" className="flex gap-5">
          <Link href="/legal/privacy" className="hover:text-fg">
            {t.privacy}
          </Link>
          <Link href="/legal/terms" className="hover:text-fg">
            {t.terms}
          </Link>
          <Link href={lp("/#faq", lang)} className="hover:text-fg">
            {t.faq}
          </Link>
        </nav>
      </footer>
    </div>
  );
}
