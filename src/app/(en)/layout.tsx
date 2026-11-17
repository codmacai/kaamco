import RootShell from "@/components/RootShell";
import { baseMetadata, baseViewport } from "../metadata";

export const metadata = baseMetadata;
export const viewport = baseViewport;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootShell lang="en-IN" skip="Skip to content">
      {children}
    </RootShell>
  );
}
