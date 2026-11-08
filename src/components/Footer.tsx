import Link from "next/link";
import { dict, lp, type Lang } from "@/content/i18n";
import { legalPages, site } from "@/content/site";
import Logo from "./Logo";

export default function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <footer className="relative overflow-hidden pb-20 lg:pb-0">
      <div className="frame grid gap-10 border-b border-line px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] lg:px-12 lg:py-16">
        <div>
          <Logo className="h-10" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-2">
            {t.footer.blurb}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow text-fg-3">{t.footer.explore}</p>
          <ul className="mt-4 grid gap-2.5">
            {t.nav.map((n) => (
              <li key={n.href}>
                <Link href={lp(`/${n.href}`, lang)} className="text-sm text-fg-2 hover:text-fg">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow text-fg-3">{t.footer.legal}</p>
          <ul className="mt-4 grid gap-2.5">
            {Object.entries(legalPages).map(([slug, title]) => (
              <li key={slug}>
                <Link href={`/legal/${slug}`} className="text-sm text-fg-2 hover:text-fg">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* oversized outlined wordmark */}
      <div className="frame overflow-hidden border-b border-line">
        <p
          aria-hidden
          className="select-none whitespace-nowrap px-4 pt-6 text-center font-display text-[17vw] font-extrabold uppercase leading-[0.8] tracking-tight text-transparent [-webkit-text-stroke:1.5px_var(--color-outline)] 2xl:text-[15.5rem]"
        >
          KAAM-CO
        </p>
      </div>

      <div className="frame flex flex-col gap-2 px-5 py-6 text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 {site.name}. {t.footer.rights}</p>
        <p className="eyebrow text-fg-3">{site.tagline}</p>
      </div>
    </footer>
  );
}
