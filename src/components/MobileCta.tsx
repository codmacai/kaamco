import { dict, lp, type Lang } from "@/content/i18n";

/** Thumb-reach CTA bar on phones — the two highest-value actions, always visible. */
export default function MobileCta({ lang }: { lang: Lang }) {
  const t = dict[lang].mobileCta;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-ink/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <a href={lp("/register#find-work", lang)} className="flex h-12 flex-col items-center justify-center bg-ink-3 text-sm font-semibold text-fg">
        {t.work}
        {t.workSub && (
          <span lang="hi" className="text-[0.6875rem] font-normal leading-none text-sky">
            {t.workSub}
          </span>
        )}
      </a>
      <a href={lp("/register#need-manpower", lang)} className="flex h-12 items-center justify-center bg-amber text-sm font-bold text-night">
        {t.need}
      </a>
    </div>
  );
}
