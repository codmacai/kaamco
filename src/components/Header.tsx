import { ArrowUpRight } from "lucide-react";
import { dict, lp, type Lang } from "@/content/i18n";
import LangSwitch from "./LangSwitch";
import Logo from "./Logo";
import MobileNav from "./MobileNav";

export default function Header({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 xl:bg-ink/80 xl:backdrop-blur-md">
      <div className="frame relative flex h-16 items-center justify-between gap-4 lg:h-20">
        <a href={lp("/", lang)} aria-label={t.header.home} className="flex h-full shrink-0 items-center px-4 sm:px-6">
          <Logo className="h-8 lg:h-9" preload />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
          {t.nav.map((item) => (
            <a
              key={item.href}
              href={lp(item.href, lang)}
              className="whitespace-nowrap py-2 text-[0.875rem] font-medium text-fg-2 transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 pr-4 sm:pr-6">
          <LangSwitch lang={lang} />
          <a
            href={lp("/register#need-manpower", lang)}
            className="hidden h-11 items-center gap-2 bg-amber px-4 text-[0.875rem] font-bold text-night transition-colors hover:bg-amber-deep sm:flex"
          >
            {t.header.cta}
            <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
          </a>
          <MobileNav lang={lang} />
        </div>
      </div>
    </header>
  );
}
