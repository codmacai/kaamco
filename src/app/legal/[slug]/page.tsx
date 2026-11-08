import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import { legalPages, type LegalSlug } from "@/content/site";

export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const title = legalPages[slug as LegalSlug];
  return title ? { title, alternates: { canonical: `/legal/${slug}` } } : {};
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const title = legalPages[slug as LegalSlug];
  if (!title) notFound();

  return (
    <>
      <header className="border-b border-line">
        <div className="frame flex h-16 items-center justify-between px-5 sm:px-8 lg:h-20">
          <Link href="/" aria-label="KAAM-CO home">
            <Logo className="h-8" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-fg-2 hover:text-fg">
              <ArrowLeft aria-hidden className="size-4" /> Back to home
            </Link>
          </div>
        </div>
      </header>
      <main id="main" className="frame min-h-[60vh] border-b border-line px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <p className="eyebrow text-accent">Legal</p>
        <h1 className="display mt-4 text-[clamp(2.5rem,5vw,4.5rem)]">{title}</h1>
        <p className="mt-8 max-w-xl text-fg-2">
          KAAM-CO will publish the full {title.toLowerCase()} before launch. For questions in the
          meantime, please reach us through the contact form on the home page.
        </p>
      </main>
      <Footer lang="en" />
    </>
  );
}
