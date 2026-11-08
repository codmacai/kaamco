import { ArrowUpRight } from "lucide-react";
import { dict, lp, type Lang } from "@/content/i18n";
import LangSwitch from "./LangSwitch";
import Logo from "./Logo";
import MobileNav from "./MobileNav";

export default function Header({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 lg:bg-ink/80 lg:backdrop-blur-md">
      <div className="frame relative grid h-16 grid-cols-[1fr_auto] lg:h-20 lg:grid-cols-[var(--spacing-rail)_1fr_auto]">
        <a href="#top" aria-label={t.header.home} className="flex items-center px-4 sm:px-6 lg:border-r lg:border-line">
          <Logo className="h-8 lg:h-9" preload />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 px-10 lg:flex">
          {t.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-[0.8125rem] font-medium text-fg-2 transition-colors hover:text-fg">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 pr-4 sm:pr-6">
          <LangSwitch lang={lang} />
          <a
            href={lp("/register#need-manpower", lang)}
            className="hidden h-10 items-center gap-2 bg-amber px-4 text-[0.8125rem] font-bold text-night transition-colors hover:bg-amber-deep sm:flex"
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
