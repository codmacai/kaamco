import { useId } from "react";
import type { Opt } from "@/content/i18n";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type Base = { label: string; hi?: string; error?: string; className?: string };

function Label({ id, label, hi, required }: { id: string; label: string; hi?: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="mb-2 flex flex-wrap items-baseline gap-x-2 text-[0.8125rem] font-medium text-fg-2">
      <span>
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {hi && (
        <span lang="hi" className="text-[0.8125rem] text-fg-3">
          {hi}
        </span>
      )}
    </label>
  );
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-1.5 text-xs text-accent">
      {error}
    </p>
  );
}

export function Input({
  label,
  hi,
  error,
  className = "",
  ...props
}: Base & InputHTMLAttributes<HTMLInputElement> & { name: string }) {
  const auto = useId();
  const id = props.id ?? `${auto}${props.name}`;
  return (
    <div className={className}>
      <Label id={id} label={label} hi={hi} required={props.required} />
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
        {...props}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function Select({
  label,
  hi,
  error,
  options,
  placeholder = "Select",
  className = "",
  ...props
}: Base &
  SelectHTMLAttributes<HTMLSelectElement> & {
    name: string;
    options: readonly Opt[];
    placeholder?: string;
  }) {
  const auto = useId();
  const id = props.id ?? `${auto}${props.name}`;
  return (
    <div className={className}>
      <Label id={id} label={label} hi={hi} required={props.required} />
      <select
        id={id}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function Textarea({
  label,
  hi,
  error,
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
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field resize-y"
        {...props}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

/** Mobile input preset shared by every form. */
export const mobileProps = (t: { mobilePh: string; mobileTitle: string }) =>
  ({
    name: "mobile",
    type: "tel",
    inputMode: "numeric",
    autoComplete: "tel",
    placeholder: t.mobilePh,
    pattern: "(\\+?91[\\s\\-]?)?[6-9][0-9]{9}",
    title: t.mobileTitle,
    required: true,
  }) as const;

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
