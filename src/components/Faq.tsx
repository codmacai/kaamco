import { Plus } from "lucide-react";
import { dict, type Lang } from "@/content/i18n";
import Section from "./Section";

/** Native <details> accordion — accessible and zero JavaScript. */
export default function Faq({ lang }: { lang: Lang }) {
  const t = dict[lang].faq;
  return (
    <Section id="faq" index="05" label={t.label} title={t.title}>
      <div className="border-t border-line">
        {t.items.map((f, i) => (
          <details key={f.q} name="faq" className="group border-b border-line last:border-b-0" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center gap-6 px-5 py-6 transition-colors hover:bg-ink-2 sm:px-8 lg:px-12 [&::-webkit-details-marker]:hidden">
              <span className="eyebrow text-fg-3 group-open:text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-display text-lg font-medium text-fg lg:text-xl">{f.q}</span>
              <Plus
                aria-hidden
                className="size-5 shrink-0 text-fg-2 transition-transform duration-300 group-open:rotate-45 group-open:text-accent"
              />
            </summary>
            <p className="max-w-2xl px-5 pb-7 pl-[4.25rem] text-[0.9375rem] leading-relaxed text-fg-2 sm:px-8 sm:pl-[5.25rem] lg:pl-[6.25rem]">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
