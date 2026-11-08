"use client";

import { useActionState, useState } from "react";
import { ArrowRight } from "lucide-react";
import { submitLead, type LeadState } from "@/app/actions";
import { dict, type Lang } from "@/content/i18n";
import { Honeypot, Input, Textarea, mobileProps } from "./fields";
import { Success } from "./LeadForms";

const initial: LeadState = { status: "idle" };

function Form({ lang, onReset }: { lang: Lang; onReset: () => void }) {
  const d = dict[lang].form;
  const t = d.contact;
  const [state, action, pending] = useActionState(submitLead, initial);
  const e = state.errors ?? {};

  if (state.status === "success") return <Success state={state} onReset={onReset} lang={lang} />;

  return (
    <form action={action} className="relative grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="type" value="contact" />
      <input type="hidden" name="lang" value={lang} />
      <Honeypot />
      <Input name="name" label={t.name} autoComplete="name" required error={e.name} />
      <Input {...mobileProps(d)} label={d.mobile} error={e.mobile} />
      <Textarea name="message" label={t.message} required error={e.message} className="sm:col-span-2" />
      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-accent sm:col-span-2">
          {state.message}
        </p>
      )}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center gap-3 bg-fg px-6 text-sm font-bold text-ink transition-colors hover:bg-amber hover:text-night disabled:opacity-60"
        >
          {pending ? t.sending : t.submit}
          {!pending && <ArrowRight aria-hidden className="size-4" />}
        </button>
      </div>
    </form>
  );
}

export default function ContactForm({ lang }: { lang: Lang }) {
  const [nonce, setNonce] = useState(0);
  return <Form key={nonce} lang={lang} onReset={() => setNonce((n) => n + 1)} />;
}
