"use client";

import { useRouter } from "next/navigation";
import { lp, type Lang } from "@/content/i18n";
import Chooser from "./register/Chooser";
import { PATHS, type PathKey } from "./register/paths";

/** Homepage hero: the registration chooser. Each panel opens its form on /register. */
export default function HomeHero({ lang }: { lang: Lang }) {
  const router = useRouter();
  const go = (k: PathKey) => router.push(lp(`/register${PATHS.find((p) => p.key === k)!.hash}`, lang));
  return (
    <div className="kc-stage relative overflow-x-clip" data-intro="off">
      <Chooser as="section" lang={lang} onChoose={go} />
    </div>
  );
}
