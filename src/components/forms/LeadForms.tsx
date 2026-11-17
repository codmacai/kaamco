"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import { submitLead, type LeadState, type LeadType } from "@/app/actions";
import { dict, type Lang } from "@/content/i18n";
import { site } from "@/content/site";
import { appendAttribution } from "@/lib/attribution";
import { track } from "@/lib/track";
import { Chips, Consent, FieldGrid, FormLang, Honeypot, Input, Select, Textarea, mobileProps } from "./fields";

const initial: LeadState = { status: "idle" };

/* ───────────────────────── submission plumbing ───────────────────────── */

/**
 * Submits without React's automatic form reset, so inputs survive any error (QA-05),
 * attaches attribution + timing, and turns network failures into a visible error, never a false success.
 */
export function useLeadSubmit(type: LeadType, lang: Lang) {
  const t = dict[lang].errors;
  const [state, action, pending] = useActionState(async (prev: LeadState, fd: FormData): Promise<LeadState> => {
    try {
      return await submitLead(prev, fd);
    } catch {
      return { status: "error", message: t.network };
    }
  }, initial);
  const started = useRef(0);
  const startedTracked = useRef(false);

  useEffect(() => {
    started.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "success") track("form_submit_success", { lead_type: type });
    if (state.status === "error") track("form_submit_error", { lead_type: type });
  }, [state, type]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return; // one lead per submission
    const fd = new FormData(e.currentTarget);
    fd.set("type", type);
    fd.set("lang", lang);
    fd.set("elapsed", String(Date.now() - started.current));
    appendAttribution(fd);
    startTransition(() => action(fd));
  };

  const onFirstInput = () => {
    if (startedTracked.current) return;
    startedTracked.current = true;
    track("form_start", { lead_type: type });
  };

  return { state, pending, onSubmit, onFirstInput };
}

function Submit({ pending, label, children }: { pending: boolean; label: string; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="inline-flex min-h-12 items-center justify-center gap-3 bg-amber px-6 text-[0.9375rem] font-bold text-night transition-colors hover:bg-amber-deep disabled:cursor-wait disabled:opacity-60 max-sm:w-full"
    >
      {pending ? label : children}
      {!pending && <ArrowRight aria-hidden className="size-4" />}
    </button>
  );
}

function FormMessage({ state }: { state: LeadState }) {
  if (state.status !== "error" || !state.message) return null;
  return (
    <p role="alert" className="border-l-2 border-[#b42318] bg-[#b42318]/8 px-4 py-3 text-[0.9375rem] text-fg">
      {state.message}
    </p>
  );
}

export function Success({
  state,
  onReset,
  lang,
  type,
}: {
  state: LeadState;
  onReset: () => void;
  lang: Lang;
  type: LeadType;
}) {
  const t = dict[lang].success;
  const copy = t[type];
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []);
  return (
    <div role="status" className="flex flex-col items-start gap-6 py-2">
      <span className="grid size-12 place-items-center bg-amber text-night">
        <Check aria-hidden className="size-6" strokeWidth={2.5} />
      </span>
      <div>
        <h3 ref={heading} tabIndex={-1} className="font-display text-2xl font-semibold leading-snug text-fg outline-none">
          {copy.title}
        </h3>
        <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-fg-2">{copy.body}</p>
      </div>

      <div className="w-full bg-ink p-4">
        <p className="eyebrow text-fg-3">{t.ref}</p>
        <p className="mt-1 font-display text-2xl font-semibold tracking-wider text-accent">{state.ref}</p>
      </div>

      <div className="w-full">
        <p className="text-[0.875rem] text-fg-2">{t.reach}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
            className="inline-flex min-h-11 items-center gap-2 border border-line-strong px-4 text-[0.9375rem] font-semibold text-fg hover:border-amber"
          >
            <Phone aria-hidden className="size-4" /> {t.call} {site.contact.phone}
          </a>
          <a
            href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(`Reference ${state.ref}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 border border-line-strong px-4 text-[0.9375rem] font-semibold text-fg hover:border-amber"
          >
            <MessageCircle aria-hidden className="size-4" /> {t.whatsapp}
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="min-h-11 border-b border-fg text-[0.9375rem] font-semibold text-fg hover:border-amber hover:text-accent"
      >
        {t.another}
      </button>
    </div>
  );
}

/* ───────────────────────── two-step shell ───────────────────────── */

type Step = { title: string; fields: string[]; content: ReactNode; validate?: () => boolean };

/** Shared 2-step layout: progress, per-step validation, jump back to the step holding a server error. */
function TwoStep({
  lang,
  steps,
  state,
  pending,
  submitLabel,
  onSubmit,
  onFirstInput,
  footer,
}: {
  lang: Lang;
  steps: [Step, Step];
  state: LeadState;
  pending: boolean;
  submitLabel: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onFirstInput: () => void;
  footer?: ReactNode;
}) {
  const d = dict[lang].form;
  const [step, setStep] = useState(0);
  const sets = useRef<(HTMLFieldSetElement | null)[]>([]);

  // A server error on a step-1 field sends the user back to step 1.
  const [seen, setSeen] = useState(state);
  if (seen !== state) {
    setSeen(state);
    const errs = Object.keys(state.errors ?? {});
    const target = steps.findIndex((s) => s.fields.some((f) => errs.includes(f)));
    if (target >= 0 && target !== step) setStep(target);
  }

  const next = () => {
    const fields = sets.current[0]?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      "input, select, textarea",
    );
    for (const f of fields ?? []) {
      if (!f.checkValidity()) {
        f.reportValidity();
        return;
      }
    }
    if (steps[0].validate && !steps[0].validate()) return;
    setStep(1);
    requestAnimationFrame(() => sets.current[1]?.querySelector<HTMLElement>("input, select, textarea")?.focus());
  };

  return (
    <FormLang.Provider value={lang}>
      <form onSubmit={onSubmit} onInput={onFirstInput} className="relative grid gap-6" noValidate={false}>
        <Honeypot />
        <ol className="grid grid-cols-2 gap-2" aria-label={dict[lang].formView.progress}>
          {steps.map((s, i) => (
            <li key={s.title} aria-current={step === i ? "step" : undefined}>
              <span className={`block h-1 ${step >= i ? "bg-amber" : "bg-line-strong"}`} />
              <span className={`mt-2 block text-[0.8125rem] ${step === i ? "font-semibold text-fg" : "text-fg-3"}`}>
                {d.stepOf(i + 1)} · {s.title}
              </span>
            </li>
          ))}
        </ol>

        {steps.map((s, i) => (
          <fieldset
            key={s.title}
            ref={(el) => {
              sets.current[i] = el;
            }}
            hidden={step !== i}
            onKeyDown={
              i === 0
                ? (ev) => {
                    // Enter on step 1 moves to step 2 instead of trying to submit.
                    if (ev.key === "Enter" && (ev.target as HTMLElement).tagName !== "TEXTAREA") {
                      ev.preventDefault();
                      next();
                    }
                  }
                : undefined
            }
            className="grid gap-5"
          >
            <legend className="sr-only">{s.title}</legend>
            {s.content}
          </fieldset>
        ))}

        <FormMessage state={state} />

        {step === 0 ? (
          <div>
            <button
              type="button"
              onClick={next}
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-amber px-6 text-[0.9375rem] font-bold text-night transition-colors hover:bg-amber-deep max-sm:w-full"
            >
              {d.next}
              <ArrowRight aria-hidden className="size-4" />
            </button>
          </div>
        ) : (
          <div className="grid gap-5">
            {footer}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="inline-flex min-h-12 items-center justify-center gap-2 text-[0.9375rem] font-semibold text-fg-2 hover:text-fg"
              >
                <ArrowLeft aria-hidden className="size-4" /> {d.back}
              </button>
              <Submit pending={pending} label={d.submitting}>
                {submitLabel}
              </Submit>
            </div>
          </div>
        )}
      </form>
    </FormLang.Provider>
  );
}

type FormProps = { lang: Lang; onReset: () => void };

/* ───────────────────────── 1. Businesses: corporate enquiry ───────────────────────── */

export function CompanyForm({ lang, onReset }: FormProps) {
  const d = dict[lang].form;
  const c = d.company;
  const { state, pending, onSubmit, onFirstInput } = useLeadSubmit("company", lang);
  const e = state.errors ?? {};
  // Pre-select the category when arriving from a service page (?category=…).
  const [category, setCategory] = useState(() => {
    const q = typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("category");
    return d.options.categories.some((o) => o.value === q) ? q! : "";
  });
  const [city, setCity] = useState("");
  const [flexible, setFlexible] = useState(false);
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

  if (state.status === "success") return <Success state={state} onReset={onReset} lang={lang} type="company" />;

  return (
    <TwoStep
      lang={lang}
      state={state}
      pending={pending}
      onSubmit={onSubmit}
      onFirstInput={onFirstInput}
      submitLabel={c.submit}
      footer={<Consent error={e.consent} />}
      steps={[
        {
          title: c.steps[0],
          fields: ["company", "contact", "mobile", "email"],
          content: (
            <FieldGrid>
              <Input name="company" label={c.company} autoComplete="organization" maxLength={120} required error={e.company} className="sm:col-span-2" />
              <Input name="contact" label={c.contact} autoComplete="name" maxLength={80} required error={e.contact} className="sm:col-span-2" />
              <Input {...mobileProps(d)} label={d.mobile} error={e.mobile} />
              <Input name="email" type="email" inputMode="email" label={c.email} autoComplete="email" maxLength={120} error={e.email} />
            </FieldGrid>
          ),
        },
        {
          title: c.steps[1],
          fields: [],
          content: (
            <FieldGrid>
              <Select
                name="city"
                label={c.city}
                options={d.options.companyCities}
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
                required
                error={e.city}
              />
              {city === "Other city" ? (
                <Input name="otherCity" label={c.otherCity} maxLength={60} required error={e.otherCity} />
              ) : (
                <span className="max-sm:hidden" />
              )}
              <Input name="locality" label={c.locality} placeholder={c.localityPh} maxLength={120} required error={e.locality} className="sm:col-span-2" />
              <Select
                name="category"
                label={c.category}
                options={d.options.categories}
                value={category}
                onChange={(ev) => setCategory(ev.target.value)}
                required
                error={e.category}
                className="sm:col-span-2"
              />
              {category === "Other" && (
                <Input name="categoryOther" label={c.categoryOther} maxLength={120} required error={e.categoryOther} className="sm:col-span-2" />
              )}
              <Input name="headcount" type="number" min={1} max={5000} step={1} inputMode="numeric" label={c.headcount} required error={e.headcount} />
              <Select name="duration" label={c.duration} options={d.options.duration} required error={e.duration} />
              <div className="sm:col-span-2">
                <Input
                  name="deploymentDate"
                  type="date"
                  min={today}
                  label={c.date}
                  required={!flexible}
                  disabled={flexible}
                  error={e.deploymentDate}
                />
                <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-3 text-[0.9375rem] text-fg-2">
                  <input
                    type="checkbox"
                    name="flexibleDate"
                    value="yes"
                    checked={flexible}
                    onChange={(ev) => setFlexible(ev.target.checked)}
                    className="size-5 accent-[var(--color-amber)]"
                  />
                  {c.flexible}
                </label>
              </div>
              <Input name="budget" type="number" min={1} step={1} inputMode="numeric" label={c.budget} required error={e.budget} />
              <Select name="budgetUnit" label={c.budgetUnit} options={d.options.budgetUnit} required error={e.budgetUnit} />
              <p className="-mt-2 text-[0.8125rem] leading-relaxed text-fg-3 sm:col-span-2">🔒 {c.budgetHelp}</p>
              <Textarea name="shift" label={c.shift} placeholder={c.shiftPh} className="sm:col-span-2" />
              <Textarea name="notes" label={c.notes} className="sm:col-span-2" />
            </FieldGrid>
          ),
        },
      ]}
    />
  );
}

/* ───────────────────────── 2. Workers ───────────────────────── */

export function WorkerForm({ lang, onReset }: FormProps) {
  const d = dict[lang].form;
  const w = d.worker;
  // English worker journey shows Hindi hints under each label (spec §08).
  const h = lang === "en" ? dict.hi.form.worker : null;
  const { state, pending, onSubmit, onFirstInput } = useLeadSubmit("worker", lang);
  const e = state.errors ?? {};
  const [homeState, setHomeState] = useState("");
  const [workCity, setWorkCity] = useState("Bengaluru");
  const [availability, setAvailability] = useState("");
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  // Relocation matters when the person lives outside the state of the city they want to work in.
  const askRelocate = homeState !== "" && !(homeState === "Karnataka" && workCity === "Bengaluru");

  if (state.status === "success") return <Success state={state} onReset={onReset} lang={lang} type="worker" />;

  return (
    <TwoStep
      lang={lang}
      state={state}
      pending={pending}
      onSubmit={onSubmit}
      onFirstInput={onFirstInput}
      submitLabel={
        <>
          {w.submit}
          {h && <span lang="hi">· {h.submit}</span>}
        </>
      }
      footer={<Consent error={e.consent} />}
      steps={[
        {
          title: w.steps[0],
          fields: ["name", "mobile", "homeState", "location"],
          content: (
            <FieldGrid>
              <Input name="name" label={w.name} hi={h?.name} autoComplete="name" maxLength={80} required error={e.name} className="sm:col-span-2" />
              <Input {...mobileProps(d)} label={d.mobile} hi={h ? dict.hi.form.mobile : undefined} error={e.mobile} />
              <Select
                name="homeState"
                label={w.state}
                hi={h?.state}
                options={d.options.states}
                value={homeState}
                onChange={(ev) => setHomeState(ev.target.value)}
                required
                error={e.homeState}
              />
              <Input
                name="location"
                label={w.location}
                hi={h?.location}
                placeholder={w.locationPh}
                maxLength={120}
                required
                error={e.location}
                className="sm:col-span-2"
              />
            </FieldGrid>
          ),
        },
        {
          title: w.steps[1],
          fields: [],
          content: (
            <FieldGrid>
              <Select name="work" label={w.work} hi={h?.work} options={d.options.work} required error={e.work} className="sm:col-span-2" />
              <Select
                name="workCity"
                label={w.workCity}
                hi={h?.workCity}
                options={d.options.workCity}
                value={workCity}
                onChange={(ev) => setWorkCity(ev.target.value)}
                required
                error={e.workCity}
              />
              <Select
                name="availability"
                label={w.availability}
                hi={h?.availability}
                options={d.options.availability}
                value={availability}
                onChange={(ev) => setAvailability(ev.target.value)}
                required
                error={e.availability}
              />
              {availability === "Specific date" && (
                <Input name="availableDate" type="date" min={today} label={w.availableDate} hi={h?.availableDate} required error={e.availableDate} />
              )}
              {askRelocate && (
                <Select name="relocate" label={w.relocate} hi={h?.relocate} options={d.options.relocate} required error={e.relocate} />
              )}
              <Select name="language" label={w.language} hi={h?.language} options={d.options.languages} />
              <Select name="experience" label={w.experience} hi={h?.experience} options={d.options.experience} />
            </FieldGrid>
          ),
        },
      ]}
    />
  );
}

/* ───────────────────────── 3. Contractors / agencies ───────────────────────── */

export function SupplierForm({ lang, onReset }: FormProps) {
  const d = dict[lang].form;
  const s = d.supplier;
  const { state, pending, onSubmit, onFirstInput } = useLeadSubmit("supplier", lang);
  const [chipError, setChipError] = useState<string>();
  const e: Record<string, string | undefined> = { ...state.errors, ...(chipError ? { supply: chipError } : {}) };

  if (state.status === "success") return <Success state={state} onReset={onReset} lang={lang} type="supplier" />;

  const guardedSubmit = (ev: FormEvent<HTMLFormElement>) => {
    if (!ev.currentTarget.querySelector('input[name="supply"]:checked')) {
      ev.preventDefault();
      setChipError(dict[lang].errors.required);
      ev.currentTarget.querySelector<HTMLInputElement>('input[name="supply"]')?.focus();
      return;
    }
    setChipError(undefined);
    onSubmit(ev);
  };

  return (
    <div>
      <TwoStep
        lang={lang}
        state={state}
        pending={pending}
        onSubmit={guardedSubmit}
        onFirstInput={onFirstInput}
        submitLabel={s.submit}
        footer={<Consent error={e.consent} />}
        steps={[
          {
            title: s.steps[0],
            fields: ["business", "contact", "mobile", "sourceState", "district"],
            content: (
              <FieldGrid>
                <Input name="business" label={s.business} autoComplete="organization" maxLength={120} required error={e.business} className="sm:col-span-2" />
                <Input name="contact" label={s.contact} autoComplete="name" maxLength={80} required error={e.contact} />
                <Input {...mobileProps(d)} label={d.mobile} error={e.mobile} />
                <Select name="sourceState" label={s.state} options={d.options.states} required error={e.sourceState} />
                <Input name="district" label={s.district} maxLength={80} required error={e.district} />
              </FieldGrid>
            ),
          },
          {
            title: s.steps[1],
            fields: [],
            content: (
              <FieldGrid>
                <Chips name="supply" label={s.categories} options={d.options.supply} error={e.supply} className="sm:col-span-2" />
                <Input name="capacity" type="number" min={1} max={5000} step={1} inputMode="numeric" label={s.capacity} required error={e.capacity} />
                <Select name="capacityType" label={s.capacityType} options={d.options.capacityType} required error={e.capacityType} />
                <Input name="coverage" label={s.coverage} placeholder={s.coveragePh} maxLength={160} required error={e.coverage} className="sm:col-span-2" />
                <Select name="leadTime" label={s.leadTime} options={d.options.leadTime} required error={e.leadTime} className="sm:col-span-2" />
                <p className="text-[0.8125rem] leading-relaxed text-fg-3 sm:col-span-2">{s.docsNote}</p>
              </FieldGrid>
            ),
          },
        ]}
      />
    </div>
  );
}
