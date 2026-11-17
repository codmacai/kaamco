"use client";

import { createContext, useContext, useId } from "react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import Link from "next/link";
import { dict, type Lang, type Opt } from "@/content/i18n";

/** Forms read their language from here (required/optional markers, placeholders, consent text). */
export const FormLang = createContext<Lang>("en");
const useT = () => {
  const lang = useContext(FormLang);
  return { lang, t: dict[lang].form };
};

type Base = { label: string; hi?: string; error?: string; className?: string; help?: string };

function Label({ id, label, hi, required }: { id: string; label: string; hi?: string; required?: boolean }) {
  const { t } = useT();
  return (
    <label htmlFor={id} className="mb-2 flex flex-wrap items-baseline gap-x-2 text-[0.9375rem] font-medium text-fg">
      <span>
        {label}
        {required ? (
          <span className="text-accent" aria-hidden>
            {" "}
            *
          </span>
        ) : (
          <span className="text-[0.8125rem] font-normal text-fg-3"> ({t.optional})</span>
        )}
        {required && <span className="sr-only"> ({t.required})</span>}
      </span>
      {hi && (
        <span lang="hi" className="text-[0.8125rem] font-normal text-fg-3">
          {hi}
        </span>
      )}
    </label>
  );
}

function Below({ id, error, help }: { id: string; error?: string; help?: string }) {
  return (
    <>
      {help && (
        <p id={`${id}-help`} className="mt-1.5 text-[0.8125rem] leading-relaxed text-fg-3">
          {help}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.8125rem] font-medium text-[#b42318]">
          {error}
        </p>
      )}
    </>
  );
}

const describedBy = (id: string, error?: string, help?: string) =>
  [error && `${id}-error`, help && `${id}-help`].filter(Boolean).join(" ") || undefined;

export function Input({
  label,
  hi,
  error,
  help,
  className = "",
  prefix,
  ...props
}: Base & InputHTMLAttributes<HTMLInputElement> & { name: string; prefix?: string }) {
  const auto = useId();
  const id = props.id ?? `${auto}${props.name}`;
  const field = (
    <input
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, error, help)}
      className={`field ${prefix ? "pl-14" : ""}`}
      {...props}
    />
  );
  return (
    <div className={className}>
      <Label id={id} label={label} hi={hi} required={props.required} />
      {prefix ? (
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 grid w-12 place-items-center border-r border-line-strong text-[0.9375rem] font-semibold text-fg-2"
          >
            {prefix}
          </span>
          {field}
        </div>
      ) : (
        field
      )}
      <Below id={id} error={error} help={help} />
    </div>
  );
}

export function Select({
  label,
  hi,
  error,
  help,
  options,
  className = "",
  defaultValue,
  ...props
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { name: string; options: readonly Opt[] }) {
  const { t } = useT();
  const auto = useId();
  const id = props.id ?? `${auto}${props.name}`;
  const controlled = props.value !== undefined;
  return (
    <div className={className}>
      <Label id={id} label={label} hi={hi} required={props.required} />
      <select
        id={id}
        {...(controlled ? {} : { defaultValue: defaultValue ?? "" })}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, help)}
        className="field"
        {...props}
      >
        <option value="" disabled={props.required}>
          {t.select}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Below id={id} error={error} help={help} />
    </div>
  );
}

export function Textarea({
  label,
  hi,
  error,
  help,
  className = "",
  ...props
}: Base & TextareaHTMLAttributes<HTMLTextAreaElement> & { name: string }) {
  const auto = useId();
  const id = props.id ?? `${auto}${props.name}`;
  return (
    <div className={className}>
      <Label id={id} label={label} hi={hi} required={props.required} />
      <textarea
        id={id}
        rows={3}
        maxLength={1000}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, help)}
        className="field resize-y"
        {...props}
      />
      <Below id={id} error={error} help={help} />
    </div>
  );
}

/** Multi-select chips (checkboxes) with a fieldset legend. */
export function Chips({
  name,
  label,
  hi,
  options,
  error,
  className = "",
}: {
  name: string;
  label: string;
  hi?: string;
  options: readonly Opt[];
  error?: string;
  className?: string;
}) {
  const { t } = useT();
  const auto = useId();
  return (
    <fieldset className={className} aria-describedby={error ? `${auto}-error` : undefined}>
      <legend className="mb-3 text-[0.9375rem] font-medium text-fg">
        {label}
        <span className="text-accent" aria-hidden>
          {" "}
          *
        </span>
        <span className="sr-only"> ({t.required})</span>
        {hi && (
          <span lang="hi" className="ml-2 text-[0.8125rem] font-normal text-fg-3">
            {hi}
          </span>
        )}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input type="checkbox" name={name} value={o.value} className="peer sr-only" />
            <span className="inline-flex min-h-11 items-center border border-line-strong px-4 text-[0.9375rem] text-fg-2 transition-colors peer-checked:border-amber peer-checked:bg-amber peer-checked:text-night peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-amber">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      <Below id={auto} error={error} />
    </fieldset>
  );
}

/** Required consent checkbox linking to the privacy notice. */
export function Consent({ error }: { error?: string }) {
  const { t } = useT();
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[0.875rem] leading-relaxed text-fg-2">
        <input
          id={id}
          type="checkbox"
          name="consent"
          value="yes"
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 accent-[var(--color-amber)]"
        />
        <span>
          {t.consentPre}
          <Link href="/legal/privacy" target="_blank" className="font-semibold text-fg underline underline-offset-2">
            {t.privacyLink}
          </Link>
          {t.consentPost}
        </span>
      </label>
      <Below id={id} error={error} />
    </div>
  );
}

/** Mobile input preset shared by every form: visible +91, numeric keyboard; the server normalises. */
export function mobileProps(t: { mobilePh: string; mobileTitle: string }) {
  return {
    name: "mobile",
    type: "tel",
    inputMode: "numeric",
    autoComplete: "tel-national",
    prefix: "+91",
    placeholder: t.mobilePh,
    pattern: "[\\s\\-]*(\\+?91[\\s\\-]*|0)?[6-9]([\\s\\-]*[0-9]){9}[\\s\\-]*",
    title: t.mobileTitle,
    maxLength: 16,
    required: true,
  } as const;
}

/** Invisible honeypot field for bots. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FieldGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}
