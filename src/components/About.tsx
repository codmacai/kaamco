import { MapPin, Plus } from "lucide-react";
import { dict, type Lang } from "@/content/i18n";
import Section from "./Section";

export default function About({ lang }: { lang: Lang }) {
  const t = dict[lang].about;
  return (
    <Section id="about" index="04" label={t.label} title={t.title}>
      <div className="grid gap-10 border-t border-line px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-16">
        <p className="font-display text-xl font-light leading-relaxed text-fg lg:text-2xl">{t.p1}</p>
        <p className="text-base leading-relaxed text-fg-2 lg:pt-2">{t.p2}</p>
      </div>

      <div className="border-t border-line">
        <p className="eyebrow px-5 pt-8 text-fg-2 sm:px-8 lg:px-12">{t.locations}</p>
        <ul className="mt-6 grid gap-px border-t border-line bg-line sm:grid-cols-2">
          <li className="bg-ink p-5 lg:p-8">
            <div className="flex items-center justify-between">
              <MapPin aria-hidden className="size-5 text-accent" strokeWidth={1.5} />
              <span className="eyebrow text-accent">{t.cityStatus}</span>
            </div>
            <p className="display mt-10 text-3xl text-fg lg:text-4xl">{t.city}</p>
            <p className="mt-2 font-mono text-[0.75rem] tracking-wide text-fg-3">12.97° N · 77.59° E</p>
          </li>
          <li className="bg-ink-3 p-5 lg:p-8">
            <Plus aria-hidden className="size-5 text-fg-3" strokeWidth={1.5} />
            <p className="display mt-10 text-3xl text-fg-2 lg:text-4xl">{t.other}</p>
            <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-fg-2">{t.otherText}</p>
          </li>
        </ul>
      </div>
    </Section>
  );
}
