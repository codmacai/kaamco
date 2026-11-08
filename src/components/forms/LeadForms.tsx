"use client";

import { useActionState, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { submitLead, type LeadState, type LeadType } from "@/app/actions";
import { dict, workTypeOptions, type Lang } from "@/content/i18n";
import { Honeypot, Input, Select, Textarea, mobileProps } from "./fields";

const initial: LeadState = { status: "idle" };

type FormProps = { lang: Lang; onReset: () => void };

/* ───────────────────────── shared bits ───────────────────────── */

function Hidden({ type, lang }: { type: LeadType; lang: Lang }) {
  return (
    <>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="lang" value={lang} />
      <Honeypot />
    </>
  );
}

function Submit({ pending, label, children }: { pending: boolean; label: string; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center gap-3 bg-amber px-6 text-sm font-bold text-night transition-colors hover:bg-amber-deep disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? label : children}
      {!pending && <ArrowRight aria-hidden className="size-4" />}
    </button>
  );
}

function FormMessage({ state }: { state: LeadState }) {
  if (state.status !== "error" || !state.message) return null;
  return (
    <p role="alert" className="border-l-2 border-amber bg-amber/10 px-4 py-3 text-sm text-fg">
      {state.message}
    </p>
  );
}

export function Success({ state, onReset, lang }: { state: LeadState; onReset: () => void; lang: Lang }) {
  const t = dict[lang].success;
  return (
    <div role="status" className="flex flex-col items-start gap-6 py-4">
      <span className="grid size-12 place-items-center bg-amber text-night">
        <Check aria-hidden className="size-6" strokeWidth={2.5} />
      </span>
      <div>
        <p className="display text-3xl text-fg">{t.received}</p>
        {t.thanks && (
          <p lang="hi" className="mt-1 text-sky">
            {t.thanks}
          </p>
        )}
        <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-2">{t.respond}</p>
      </div>

      <div className="w-full bg-ink p-4">
        <p className="eyebrow text-fg-3">{t.ref}</p>
        <p className="mt-1 font-display text-xl font-semibold tracking-wider text-accent">{state.ref}</p>
      </div>


      <button
        type="button"
        onClick={onReset}
        className="border-b border-fg pb-1 text-sm font-semibold text-fg hover:border-amber hover:text-accent"
      >
        {t.another}
      </button>
    </div>
  );
}

/* ───────────────────────── worker (2 steps) ───────────────────────── */

export function WorkerForm({ lang, onReset }: FormProps) {
  const d = dict[lang].form;
  const w = d.worker;
  const h = d.workerHints ?? {};
  const [state, action, pending] = useActionState(submitLead, initial);
  const [step, setStep] = useState<1 | 2>(1);
  const step1 = useRef<HTMLFieldSetElement>(null);
  const e = state.errors ?? {};

  if (state.status === "success") return <Success state={state} onReset={onReset} lang={lang} />;

  const next = () => {
    const fields = step1.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select");
    for (const f of fields ?? []) {
      if (!f.checkValidity()) {
        f.reportValidity();
        return;
      }
    }
    setStep(2);
  };

  const legend = (n: number) => (
    <legend className="eyebrow mb-4 text-fg-3">
      {d.stepOf(n)}
      {h.step && (
        <>
          {" · "}
          <span lang="hi" className="normal-case tracking-normal">
            {h.step} {n}
          </span>
        </>
      )}
    </legend>
  );

  return (
    <form action={action} className="relative grid gap-6">
      <Hidden type="worker" lang={lang} />
      <ol className="flex gap-2" aria-label={dict[lang].formView.progress}>
        {[1, 2].map((n) => (
          <li
            key={n}
            aria-current={step === n ? "step" : undefined}
            className={`h-1 flex-1 transition-colors ${step >= n ? "bg-amber" : "bg-line-strong"}`}
          >
            <span className="sr-only">{d.stepOf(n)}</span>
          </li>
        ))}
      </ol>

      <fieldset ref={step1} hidden={step !== 1} className="grid gap-5 sm:grid-cols-2">
        {legend(1)}
        <Input name="name" label={w.name} hi={h.name} autoComplete="name" required error={e.name} className="sm:col-span-2" />
        <Input {...mobileProps(d)} label={d.mobile} hi={h.mobile} error={e.mobile} />
        <Select name="city" label={w.city} hi={h.city} options={d.options.cities} placeholder={d.select} required error={e.city} />
      </fieldset>

      <fieldset hidden={step !== 2} className="grid gap-5 sm:grid-cols-2">
        {legend(2)}
        <Select
          name="workType"
          label={w.workType}
          hi={h.workType}
          options={workTypeOptions(lang)}
          placeholder={d.select}
          required
          error={e.workType}
          className="sm:col-span-2"
        />
        <Select name="experience" label={w.experience} hi={h.experience} options={d.options.experience} placeholder={d.select} />
        <Select name="availability" label={w.availability} hi={h.availability} options={d.options.availability} placeholder={d.select} />
        <Select
          name="language"
          label={w.language}
          hi={h.language}
          options={d.options.languages}
          placeholder={d.select}
          className="sm:col-span-2"
        />
      </fieldset>

      <FormMessage state={state} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        {step === 1 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex h-12 items-center gap-3 bg-amber px-6 text-sm font-bold text-night transition-colors hover:bg-amber-deep"
          >
            {d.next}
            {h.next && <span lang="hi">· {h.next}</span>}
            <ArrowRight aria-hidden className="size-4" />
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex h-12 items-center gap-2 text-sm font-semibold text-fg-2 hover:text-fg"
            >
              <ArrowLeft aria-hidden className="size-4" /> {d.back}
            </button>
            <Submit pending={pending} label={d.submitting}>
              {w.submit}
              {h.submit && <span lang="hi">· {h.submit}</span>}
            </Submit>
          </>
        )}
      </div>
    </form>
  );
}

/* ───────────────────────── supplier / contractor ───────────────────────── */

export function SupplierForm({ lang, onReset }: FormProps) {
  const d = dict[lang].form;
  const s = d.supplier;
  const [state, action, pending] = useActionState(submitLead, initial);
  const e = state.errors ?? {};
  if (state.status === "success") return <Success state={state} onReset={onReset} lang={lang} />;

  return (
    <form action={action} className="relative grid gap-5 sm:grid-cols-2">
      <Hidden type="supplier" lang={lang} />
      <Input name="business" label={s.business} autoComplete="organization" required error={e.business} className="sm:col-span-2" />
      <Input name="contact" label={d.contactPerson} autoComplete="name" required error={e.contact} />
      <Input {...mobileProps(d)} label={d.mobile} error={e.mobile} />
      <Input name="cities" label={s.cities} placeholder={s.citiesPh} required error={e.cities} />
      <Select name="size" label={s.size} options={d.options.size} placeholder={d.select} />
      <fieldset className="sm:col-span-2">
        <legend className="mb-3 text-[0.8125rem] font-medium text-fg-2">{s.categories}</legend>
        <div className="flex flex-wrap gap-2">
          {workTypeOptions(lang)
            .slice(0, -1)
            .map((o) => (
              <label key={o.value} className="cursor-pointer">
                <input type="checkbox" name="categories" value={o.value} className="peer sr-only" />
                <span className="inline-block border border-line-strong px-3 py-1.5 text-[0.8125rem] text-fg-2 transition-colors peer-checked:border-amber peer-checked:bg-amber peer-checked:text-night peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-amber">
                  {o.label}
                </span>
              </label>
            ))}
        </div>
      </fieldset>
      <Input name="gstin" label={s.gstin} placeholder={s.gstinPh} maxLength={15} className="sm:col-span-2" />
      <div className="sm:col-span-2">
        <FormMessage state={state} />
      </div>
      <div className="sm:col-span-2">
        <Submit pending={pending} label={d.submitting}>
          {s.submit}
        </Submit>
      </div>
    </form>
  );
}

/* ───────────────────────── client / company ───────────────────────── */

export function CompanyForm({ lang, onReset }: FormProps) {
  const d = dict[lang].form;
  const c = d.company;
  const [state, action, pending] = useActionState(submitLead, initial);
  const e = state.errors ?? {};
  if (state.status === "success") return <Success state={state} onReset={onReset} lang={lang} />;

  return (
    <form action={action} className="relative grid gap-5 sm:grid-cols-2">
      <Hidden type="company" lang={lang} />
      <Input name="company" label={c.company} autoComplete="organization" required error={e.company} />
      <Input name="contact" label={d.contactPerson} autoComplete="name" required error={e.contact} />
      <Input {...mobileProps(d)} label={d.mobile} error={e.mobile} />
      <Input name="email" type="email" label={c.email} autoComplete="email" error={e.email} />
      <Select name="workType" label={c.workType} options={workTypeOptions(lang)} placeholder={d.select} required error={e.workType} />
      <Select name="city" label={c.city} options={d.options.cities} placeholder={d.select} required error={e.city} />
      <Input name="headcount" type="number" min={1} inputMode="numeric" label={c.headcount} required error={e.headcount} />
      <Select name="duration" label={c.duration} options={d.options.duration} placeholder={d.select} />
      <Textarea name="details" label={c.details} placeholder={c.detailsPh} className="sm:col-span-2" />
      <div className="sm:col-span-2">
        <FormMessage state={state} />
      </div>
      <div className="sm:col-span-2">
        <Submit pending={pending} label={d.submitting}>
          {c.submit}
        </Submit>
      </div>
    </form>
  );
}
