import { dict, type Lang } from "@/content/i18n";
import Section from "./Section";

export default function Process({ lang }: { lang: Lang }) {
  const t = dict[lang].process;
  return (
    <Section
      id="how-it-works"
      index="03"
      label={t.label}
      title={t.title}
      intro={t.intro}
    >
      <ol className="relative grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {t.steps.map((s, i) => (
          <li
            key={s.title}
            className="relative border-line px-6 pb-12 pt-14 max-lg:border-b sm:odd:border-r lg:border-r lg:last:border-r-0 lg:px-8"
          >
            {/* node sitting on the rule */}
            <span aria-hidden className="absolute -top-[5px] left-6 size-2.5 bg-amber lg:left-8" />
            <span className="display block text-[4.5rem] font-extralight leading-none text-line-strong">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-8 font-display text-lg font-semibold uppercase tracking-wide text-fg">
              {s.title}
            </h3>
            <p className="mt-2 max-w-60 text-sm leading-relaxed text-fg-2">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
