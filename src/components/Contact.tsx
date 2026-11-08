import { Clock, HardHat, Mail, Briefcase } from "lucide-react";
import { dict, type Lang } from "@/content/i18n";
import { site } from "@/content/site";
import ContactForm from "./forms/ContactForm";
import Section from "./Section";

export default function Contact({ lang }: { lang: Lang }) {
  const t = dict[lang].contact;
  const { workers, clients, email } = site.contact;

  const items = [
    { icon: HardHat, label: t.workers, value: workers.phone, href: `https://wa.me/${workers.whatsapp}`, alt: `tel:${workers.phone.replace(/\s/g, "")}` },
    { icon: Briefcase, label: t.clients, value: clients.phone, href: `https://wa.me/${clients.whatsapp}`, alt: `tel:${clients.phone.replace(/\s/g, "")}` },
    ...(email ? [{ icon: Mail, label: t.email, value: email, href: `mailto:${email}`, alt: undefined }] : []),
    { icon: Clock, label: t.response, value: t.responseValue, href: undefined, alt: undefined },
  ];

  return (
    <Section id="contact" index="06" label={t.label} title={t.title}>
      <div className="grid border-t border-line lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <ul className="grid content-start gap-px bg-line sm:grid-cols-2 lg:grid-cols-1">
          {items.map(({ icon: I, label, value, href, alt }) => (
            <li key={label} className="flex gap-4 bg-ink p-6 lg:px-12">
              <I aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="eyebrow text-fg-3">{label}</p>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="mt-1.5 block font-display text-lg font-semibold text-fg hover:text-accent">
                    {value}
                  </a>
                ) : (
                  <p className="mt-1.5 text-[0.9375rem] text-fg-2">{value}</p>
                )}
                {alt && (
                  <p className="mt-1 flex gap-3 text-xs text-fg-3">
                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                      WhatsApp
                    </a>
                    <span aria-hidden>·</span>
                    <a href={alt} className="hover:text-fg">
                      {lang === "hi" ? "कॉल करें" : "Call"}
                    </a>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="border-line bg-ink-2 p-5 sm:p-8 lg:border-l lg:p-12">
          <ContactForm lang={lang} />
        </div>
      </div>
    </Section>
  );
}
