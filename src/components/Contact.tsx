import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { dict, type Lang } from "@/content/i18n";
import { site } from "@/content/site";
import ContactForm from "./forms/ContactForm";
import Section from "./Section";

export default function Contact({ lang }: { lang: Lang }) {
  const t = dict[lang].contact;
  const { phone, whatsapp, email } = site.contact;
  const tel = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <Section id="contact" index="06" label={t.label} title={t.title}>
      <div className="grid border-t border-line lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <ul className="grid content-start gap-px bg-line sm:grid-cols-2 lg:grid-cols-1">
          <li className="flex gap-4 bg-ink p-6 lg:px-12">
            <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.5} />
            <div>
              <p className="eyebrow text-fg-3">{t.phone}</p>
              <a href={tel} className="mt-1.5 block font-display text-xl font-semibold text-fg hover:text-accent">
                {phone}
              </a>
              <p className="mt-2 flex gap-4 text-[0.9375rem]">
                <a href={tel} className="font-semibold text-fg-2 underline underline-offset-2 hover:text-fg">
                  {t.call}
                </a>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-fg-2 underline underline-offset-2 hover:text-fg"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </li>
          {email && (
            <li className="flex gap-4 bg-ink p-6 lg:px-12">
              <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="eyebrow text-fg-3">{t.email}</p>
                <a href={`mailto:${email}`} className="mt-1.5 block text-base text-fg hover:text-accent">
                  {email}
                </a>
              </div>
            </li>
          )}
          <li className="flex gap-4 bg-ink p-6 lg:px-12">
            <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.5} />
            <div>
              <p className="eyebrow text-fg-3">{t.location}</p>
              <p className="mt-1.5 text-base text-fg">{t.locationValue}</p>
            </div>
          </li>
          <li className="flex gap-4 bg-ink p-6 lg:px-12">
            <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.5} />
            <div>
              <p className="eyebrow text-fg-3">{t.response}</p>
              <p className="mt-1.5 text-base text-fg">{t.responseValue}</p>
            </div>
          </li>
        </ul>
        <div className="border-line bg-ink-2 p-5 sm:p-8 lg:border-l lg:p-12">
          <ContactForm lang={lang} />
        </div>
      </div>
    </Section>
  );
}
