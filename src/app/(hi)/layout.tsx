import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { baseMetadata, baseViewport } from "../metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, locale: "hi_IN" },
};
export const viewport = baseViewport;

export default function HindiLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootShell lang="hi-IN" skip="मुख्य सामग्री पर जाएँ">
      {children}
    </RootShell>
  );
}
