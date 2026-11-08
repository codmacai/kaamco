import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import cleaning from "@/assets/images/services/cleaning.jpg";
import shifting from "@/assets/images/services/shifting.jpg";
import warehouse from "@/assets/images/services/warehouse.jpg";
import industrial from "@/assets/images/services/industrial.jpg";
import hospital from "@/assets/images/services/hospital.jpg";
import hospitality from "@/assets/images/services/hospitality.jpg";
import construction from "@/assets/images/services/construction.jpg";
import facility from "@/assets/images/services/facility.jpg";
import { dict, lp, type Lang } from "@/content/i18n";
import Section from "./Section";

// Same order as dict.services.items
const photos = [cleaning, shifting, warehouse, industrial, hospital, hospitality, construction, facility];

export default function Services({ lang }: { lang: Lang }) {
  const t = dict[lang].services;
  return (
    <Section id="services" index="02" label={t.label} title={t.title} intro={t.intro}>
      <ul className="grid gap-px border-t border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
        {t.items.map((s, i) => (
          <li key={s.title} className="group flex flex-col bg-ink">
            <a href={lp("/register#need-manpower", lang)} className="flex h-full flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
                <Image
                  src={photos[i]}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute left-0 top-0 bg-ink px-3 py-2 font-display text-xs font-semibold tracking-widest text-fg">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <h3 className="font-display text-[1.0625rem] font-semibold uppercase leading-snug tracking-wide text-fg">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.text}</p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-[0.8125rem] font-semibold text-accent">
                  {t.request}
                  <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 border-t border-line px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:px-12">
        <p className="eyebrow shrink-0 text-fg-2">{t.also}</p>
        <ul className="flex flex-wrap gap-2">
          {t.alsoItems.map((a) => (
            <li key={a} className="border border-line-strong px-3 py-1.5 text-[0.8125rem] text-fg-2">
              {a}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
