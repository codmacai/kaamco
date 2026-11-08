import { dict, type Lang } from "@/content/i18n";
import { cities, site } from "@/content/site";
import About from "./About";
import Contact from "./Contact";
import Faq from "./Faq";
import Footer from "./Footer";
import Header from "./Header";
import HomeHero from "./HomeHero";
import MobileCta from "./MobileCta";
import Process from "./Process";
import Services from "./Services";

export default function HomePage({ lang }: { lang: Lang }) {
  const t = dict[lang];
  // Structured data for rich results (organization, services, FAQ).
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#org`,
        name: site.name,
        slogan: site.tagline,
        url: site.url,
        logo: `${site.url}/icon.png`,
        description: site.description,
        areaServed: cities.map((c) => ({ "@type": "City", name: c.name })),
        contactPoint: [site.contact.clients, site.contact.workers].map((c) => ({
          "@type": "ContactPoint",
          telephone: c.phone.replace(/\s/g, ""),
          contactType: c.label,
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        })),
      },
      {
        "@type": "Service",
        serviceType: "Manpower supply",
        provider: { "@id": `${site.url}/#org` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Manpower services",
          itemListElement: t.services.items.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.text },
          })),
        },
      },
      {
        "@type": "FAQPage",
        inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
        mainEntity: t.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div lang={lang === "hi" ? "hi" : undefined}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header lang={lang} />
      <main id="main">
        <HomeHero lang={lang} />
        <Services lang={lang} />
        <Process lang={lang} />
        <About lang={lang} />
        <Faq lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
      <MobileCta lang={lang} />
    </div>
  );
}
