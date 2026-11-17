"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { dict, type Lang } from "@/content/i18n";
import { Consent, FormLang, Honeypot, Input, Textarea, mobileProps } from "./fields";
import { Success, useLeadSubmit } from "./LeadForms";

function Form({ lang, onReset }: { lang: Lang; onReset: () => void }) {
  const d = dict[lang].form;
  const t = d.contact;
  const { state, pending, onSubmit, onFirstInput } = useLeadSubmit("contact", lang);
  const e = state.errors ?? {};

  if (state.status === "success") return <Success state={state} onReset={onReset} lang={lang} type="contact" />;

  return (
    <FormLang.Provider value={lang}>
      <form onSubmit={onSubmit} onInput={onFirstInput} className="relative grid gap-5 sm:grid-cols-2">
        <Honeypot />
        <Input name="name" label={t.name} autoComplete="name" maxLength={80} required error={e.name} />
        <Input {...mobileProps(d)} label={d.mobile} error={e.mobile} />
        <Textarea name="message" label={t.message} required error={e.message} className="sm:col-span-2" />
        <div className="sm:col-span-2">
          <Consent error={e.consent} />
        </div>
        {state.status === "error" && state.message && (
          <p role="alert" className="border-l-2 border-[#b42318] bg-[#b42318]/8 px-4 py-3 text-[0.9375rem] text-fg sm:col-span-2">
            {state.message}
          </p>
        )}
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={pending}
            aria-busy={pending}
            className="inline-flex min-h-12 items-center justify-center gap-3 bg-fg px-6 text-[0.9375rem] font-bold text-ink transition-colors hover:bg-amber hover:text-night disabled:opacity-60 max-sm:w-full"
          >
            {pending ? d.submitting : t.submit}
            {!pending && <ArrowRight aria-hidden className="size-4" />}
          </button>
        </div>
      </form>
    </FormLang.Provider>
  );
}

export default function ContactForm({ lang }: { lang: Lang }) {
  const [nonce, setNonce] = useState(0);
  return <Form key={nonce} lang={lang} onReset={() => setNonce((n) => n + 1)} />;
}
