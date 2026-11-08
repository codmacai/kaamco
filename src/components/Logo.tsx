import Image from "next/image";
import logoLight from "@/assets/kaamco-logo-light.png";
import logoDark from "@/assets/kaamco-logo-dark.png";

/** White-text logo on the dark theme, original navy/slate logo on the bright theme. */
export default function Logo({ className = "h-9", preload = false }: { className?: string; preload?: boolean }) {
  return (
    <>
      <Image
        src={logoLight}
        alt="KAAM-CO — The Force Behind Success"
        sizes="220px"
        preload={preload}
        className={`w-auto light:hidden ${className}`}
      />
      <Image
        src={logoDark}
        alt="KAAM-CO — The Force Behind Success"
        sizes="220px"
        className={`hidden w-auto light:block ${className}`}
      />
    </>
  );
}
