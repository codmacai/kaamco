"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";
import { CompanyForm, SupplierForm, WorkerForm } from "../forms/LeadForms";
import { dict, type Lang } from "@/content/i18n";
import type { RegisterPath } from "./paths";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** Step 02 — the chosen path's form, with the card photo carried over. */
export default function FormView({ lang, path, onBack }: { lang: Lang; path: RegisterPath; onBack: () => void }) {
  const t = dict[lang].formView;
  const [nonce, setNonce] = useState(0);
  const reset = () => setNonce((n) => n + 1);

  return (
    <main
      id="main"
      className="grid lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    >
      {/* ── visual column ───────────────────────── */}
      <aside className="relative h-80 overflow-hidden bg-night sm:h-96 lg:sticky lg:top-20 lg:h-[calc(100svh-5rem)]">
        <span className="absolute inset-0" style={{ viewTransitionName: `kc-photo-${path.key}` }}>
          <Image
            src={path.image}
            alt={path.alt}
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
            style={{ objectPosition: path.position }}
          />
        </span>
        <span className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/20" />

        <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-8 lg:p-10">
          <button
            type="button"
            onClick={onBack}
            className="fv inline-flex items-center gap-2 self-start border border-white/25 bg-night/40 px-4 py-2.5 text-sm font-medium text-snow backdrop-blur-md transition-colors hover:border-amber"
            style={delay(0.1)}
          >
            <ArrowLeft aria-hidden className="size-4" /> {t.change}
          </button>

          <div>
            <p className="fv eyebrow text-snow/70" style={delay(0.2)}>
              <span className="text-amber">{path.n}</span>
              <span className="mx-2 text-snow/40">/</span>
              {path.audience}
            </p>
            <h1
              className="fv display mt-4 text-[clamp(2.25rem,4.2vw,4.25rem)] leading-[0.95] text-snow"
              style={delay(0.28)}
            >
              {path.title}
            </h1>
            {path.sub && (
              <p lang="hi" className="fv mt-2 text-xl text-amber" style={delay(0.34)}>
                {path.sub}
              </p>
            )}

            <div className="fv mt-10 hidden lg:block" style={delay(0.42)}>
              <p className="eyebrow text-snow/60">{t.whatNext}</p>
              <ol className="mt-4 grid gap-px bg-white/10">
                {path.next.map((step, i) => (
                  <li key={step} className="flex gap-4 bg-night/70 px-5 py-4 text-sm text-snow/85 backdrop-blur-sm">
                    <span className="eyebrow pt-0.5 text-amber">{String(i + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </aside>

      {/* ── form column ─────────────────────────── */}
      <section aria-labelledby="form-title" className="relative px-5 py-10 sm:px-8 lg:px-14 lg:py-14 xl:px-20">
        <ol className="fv flex items-center gap-3 text-xs" aria-label={t.progress} style={delay(0.15)}>
          <li className="flex items-center gap-2 text-fg-3">
            <span className="grid size-6 place-items-center bg-amber text-night">
              <Check aria-hidden className="size-3.5" strokeWidth={3} />
            </span>
            {t.choosePath}
          </li>
          <li aria-hidden className="h-px w-10 bg-line-strong" />
          <li aria-current="step" className="flex items-center gap-2 font-semibold text-fg">
            <span className="grid size-6 place-items-center border border-amber text-accent">2</span>
            {t.yourDetails}
          </li>
        </ol>

        <p className="fv eyebrow mt-12 text-accent" style={delay(0.22)}>
          {path.formEyebrow}
        </p>
        <h2
          id="form-title"
          className="fv display mt-4 text-[clamp(2rem,3.4vw,3.25rem)] leading-[0.98] text-fg"
          style={delay(0.28)}
        >
          {path.formTitle}
        </h2>
        {path.formSub && (
          <p lang="hi" className="fv mt-2 text-lg text-sky" style={delay(0.32)}>
            {path.formSub}
          </p>
        )}

        <div className="fv mt-10 border border-line bg-ink-2 p-5 sm:p-8 lg:p-10" style={delay(0.38)}>
          {path.key === "company" && <CompanyForm key={`c${nonce}`} lang={lang} onReset={reset} />}
          {path.key === "worker" && <WorkerForm key={`w${nonce}`} lang={lang} onReset={reset} />}
          {path.key === "supplier" && <SupplierForm key={`s${nonce}`} lang={lang} onReset={reset} />}
        </div>

        <ol className="mt-8 grid gap-px bg-line lg:hidden">
          {path.next.map((step, i) => (
            <li key={step} className="flex gap-4 bg-ink px-1 py-3 text-sm text-fg-2">
              <span className="eyebrow pt-0.5 text-accent">{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>

        <p className="fv mt-8 max-w-xl text-xs leading-relaxed text-fg-3" style={delay(0.44)}>
          {t.privacy}
        </p>
      </section>
    </main>
  );
}
