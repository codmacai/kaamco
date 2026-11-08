import type { ReactNode } from "react";

type Props = {
  id: string;
  index: string;
  label: string;
  title: ReactNode | string[];
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Shared section skeleton: label sits directly above the heading, content runs full width. */
export default function Section({ id, index, label, title, intro, children, className = "" }: Props) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={`border-b border-line ${className}`}>
      <div className="frame">
        <div className="grid gap-6 px-5 pb-10 pt-14 sm:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16 lg:px-12 lg:pb-14 lg:pt-20">
          <div>
            <p className="eyebrow text-fg-2">
              <span className="text-accent">{index}</span>
              <span className="mx-2 text-fg-3">/</span>
              {label}
            </p>
            <h2 id={headingId} className="display mt-5 text-[clamp(2.25rem,4.4vw,4.25rem)] text-fg">
              {Array.isArray(title)
                ? title.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))
                : title}
            </h2>
          </div>
          {intro && <div className="max-w-md text-[0.9375rem] leading-relaxed text-fg-2">{intro}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
