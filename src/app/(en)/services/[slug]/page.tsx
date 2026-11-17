import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Minus, Plus } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileCta from "@/components/MobileCta";
import { servicePhotos } from "@/components/Services";
import { servicePages, site } from "@/content/site";

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => servicePages.find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const page = find((await params).slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: { url: `/services/${page.slug}`, title: `${page.metaTitle} | ${site.name}`, description: page.metaDescription },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const page = find((await params).slug);
  if (!page) notFound();
  const i = servicePages.indexOf(page);
  const requestHref = `/register?category=${encodeURIComponent(page.category)}#need-manpower`;
  const others = servicePages.filter((p) => p.slug !== page.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    serviceType: page.title,
    description: page.summary,
    areaServed: { "@type": "City", name: site.city },
    provider: { "@type": "Organization", name: site.name, url: site.url, telephone: site.contact.phone.replace(/\s/g, "") },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Header lang="en" />
      <main id="main">
        <section className="border-b border-line">
          <div className="frame grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
              <nav aria-label="Breadcrumb" className="text-[0.875rem] text-fg-3">
                <Link href="/" className="hover:text-fg">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <Link href="/#services" className="hover:text-fg">
                  Services
                </Link>
                <span className="mx-2">/</span>
                <span className="text-fg-2">{page.title}</span>
              </nav>
              <h1 className="display mt-6 text-[clamp(2.25rem,4.4vw,4rem)] leading-[1] text-fg">{page.h1}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-2">{page.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={requestHref}
                  className="inline-flex min-h-12 items-center gap-3 bg-amber px-6 text-[0.9375rem] font-bold text-night hover:bg-amber-deep"
                >
                  Request {page.title} staff <ArrowRight aria-hidden className="size-4" />
                </Link>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-12 items-center border border-line-strong px-6 text-[0.9375rem] font-semibold text-fg hover:border-amber"
                >
                  Call {site.contact.phone}
                </a>
              </div>
              <p className="mt-6 text-[0.875rem] text-fg-3">No public rates — share a confidential budget in the form.</p>
            </div>
            <div className="relative min-h-72 bg-ink-3 lg:min-h-full">
              <Image
                src={servicePhotos[i]}
                alt={`${page.title} — illustrative photo`}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="scope-title" className="border-b border-line">
          <div className="frame grid gap-px bg-line lg:grid-cols-3">
            <div className="bg-ink p-6 sm:p-8 lg:p-12">
              <h2 id="scope-title" className="eyebrow text-accent">
                Service scope
              </h2>
              <ul className="mt-6 grid gap-3">
                {page.scope.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-fg">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-accent" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex gap-3 text-[0.9375rem] text-fg-2">
                <Minus aria-hidden className="mt-1 size-4 shrink-0 text-fg-3" />
                {page.notIncluded}
              </p>
            </div>
            <div className="bg-ink p-6 sm:p-8 lg:p-12">
              <h2 className="eyebrow text-accent">Example use case</h2>
              <p className="mt-6 text-lg leading-relaxed text-fg">{page.useCase}</p>
            </div>
            <div className="bg-ink p-6 sm:p-8 lg:p-12">
              <h2 className="eyebrow text-accent">Location coverage</h2>
              <p className="mt-6 flex items-center gap-2 font-display text-2xl font-semibold text-fg">
                <MapPin aria-hidden className="size-5 text-accent" /> {site.city}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-2">
                We currently operate in Bengaluru. For other locations, tell us in the form and we&rsquo;ll confirm honestly
                whether we can support it.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="how-title" className="border-b border-line">
          <div className="frame px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
            <h2 id="how-title" className="display text-[clamp(1.75rem,3vw,2.75rem)] text-fg">
              How a request works
            </h2>
            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Share category, location, headcount, deployment date and a confidential budget.",
                "Our team reviews it during business hours and calls you.",
                "We confirm scope, shifts, availability and terms in writing.",
                "Deployment is coordinated and followed up with you.",
              ].map((step, n) => (
                <li key={step} className="border-t-2 border-amber pt-4">
                  <span className="eyebrow text-fg-3">Step {n + 1}</span>
                  <p className="mt-2 text-base leading-relaxed text-fg">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="faq-title" className="border-b border-line">
          <div className="frame px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
            <h2 id="faq-title" className="display text-[clamp(1.75rem,3vw,2.75rem)] text-fg">
              Questions
            </h2>
            <div className="mt-8 border-t border-line">
              {page.faqs.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center gap-4 py-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="flex-1 font-display text-lg font-medium text-fg">{f.q}</h3>
                    <Plus aria-hidden className="size-5 shrink-0 text-fg-2 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="max-w-2xl pb-6 text-base leading-relaxed text-fg-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="cta-title" className="border-b border-line bg-ink-2">
          <div className="frame flex flex-col gap-6 px-5 py-12 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-16">
            <div>
              <h2 id="cta-title" className="display text-[clamp(1.75rem,3vw,2.75rem)] text-fg">
                Your requirement. Our coordination.
              </h2>
              <p className="mt-3 max-w-xl text-base text-fg-2">Takes about two minutes. You get a reference ID straight away.</p>
            </div>
            <Link
              href={requestHref}
              className="inline-flex min-h-12 shrink-0 items-center gap-3 bg-amber px-6 text-[0.9375rem] font-bold text-night hover:bg-amber-deep"
            >
              Send Workforce Requirement <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <div className="frame border-t border-line px-5 py-8 sm:px-8 lg:px-12">
            <p className="eyebrow text-fg-3">Other services</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/services/${o.slug}`}
                    className="inline-flex min-h-11 items-center border border-line-strong px-4 text-[0.9375rem] text-fg-2 hover:border-amber hover:text-fg"
                  >
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer lang="en" />
      <MobileCta lang="en" />
    </>
  );
}
