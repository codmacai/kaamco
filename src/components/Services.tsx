import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import cleaning from "@/assets/images/services/cleaning.jpg";
import shifting from "@/assets/images/services/shifting.jpg";
import warehouse from "@/assets/images/services/warehouse.jpg";
import facility from "@/assets/images/services/facility.jpg";
import { dict, lp, type Lang } from "@/content/i18n";
import { servicePages } from "@/content/site";
import Section from "./Section";

// Same order as dict.services.items and servicePages
export const servicePhotos = [cleaning, shifting, warehouse, facility];
const alts = [
  "Housekeeping staff cleaning an office window",
  "Cartons stacked for an office move",
  "Warehouse aisle with workers in hi-vis vests",
  "Technician carrying out facility support work",
];

export default function Services({ lang }: { lang: Lang }) {
  const t = dict[lang].services;
  return (
    <Section id="services" index="02" label={t.label} title={t.title} intro={t.intro}>
      <ul className="grid gap-px border-t border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
        {t.items.map((s, i) => {
          const page = servicePages[i];
          // Service pages are English; Hindi visitors go straight to the request form.
          const href = lang === "en" ? `/services/${page.slug}` : lp(`/register?category=${encodeURIComponent(page.category)}#need-manpower`, lang);
          return (
            <li key={s.title} className="group flex flex-col bg-ink">
              <Link href={href} className="flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
                  <Image
                    src={servicePhotos[i]}
                    alt={alts[i]}
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
                  <h3 className="font-display text-lg font-semibold leading-snug text-fg">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-2">{s.text}</p>
                  <span className="mt-auto flex min-h-11 items-center gap-2 pt-6 text-[0.9375rem] font-semibold text-accent">
                    {lang === "en" ? t.details : t.request}
                    <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col gap-2 border-t border-line px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:px-12">
        <p className="eyebrow shrink-0 text-fg-2">{t.general}</p>
        <p className="text-[0.9375rem] leading-relaxed text-fg-2">
          {t.generalText}{" "}
          <Link href={lp("/register#need-manpower", lang)} className="font-semibold text-fg underline underline-offset-2">
            {dict[lang].header.cta}
          </Link>
        </p>
      </div>
    </Section>
  );
}
