import { MapPin } from "lucide-react";
import { dict, type Lang } from "@/content/i18n";
import { cities } from "@/content/site";
import Section from "./Section";

export default function About({ lang }: { lang: Lang }) {
  const t = dict[lang].about;
  return (
    <Section
      id="about"
      index="04"
      label={t.label}
      title={t.title}
    >
      <div className="grid gap-10 border-t border-line px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-16">
        <p className="font-display text-xl font-light leading-relaxed text-fg lg:text-2xl">{t.p1}</p>
        <p className="text-[0.9375rem] leading-relaxed text-fg-2 lg:pt-2">{t.p2}</p>
      </div>

      <div className="border-t border-line">
        <p className="eyebrow px-5 pt-8 text-fg-2 sm:px-8 lg:px-12">{t.locations}</p>
        <ul className="mt-6 grid grid-cols-2 gap-px border-t border-line bg-line lg:grid-cols-5">
          {cities.map((c, i) => (
            <li key={c.name} className="group bg-ink p-5 transition-colors hover:bg-ink-2 lg:p-6">
              <div className="flex items-center justify-between">
                <MapPin aria-hidden className="size-4 text-accent" strokeWidth={1.5} />
                <span className="eyebrow text-fg-3">{t.live}</span>
              </div>
              <p className="display mt-10 text-2xl text-fg lg:text-[1.75rem]">{t.cities[i]}</p>
              <p className="mt-2 font-mono text-[0.6875rem] tracking-wide text-fg-3">
                {c.lat} · {c.lng}
              </p>
            </li>
          ))}
          <li className="col-span-2 flex flex-col justify-between bg-ink-3 p-5 lg:col-span-1 lg:p-6">
            <span aria-hidden className="size-2 bg-amber" />
            <p className="display mt-10 text-2xl text-fg-2 lg:text-[1.75rem]">{t.more}</p>
          </li>
        </ul>
      </div>
    </Section>
  );
}
