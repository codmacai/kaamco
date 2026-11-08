import {
  Building2,
  Clock,
  Factory,
  HardHat,
  Hospital,
  Languages,
  Network,
  Package,
  ShieldCheck,
  SprayCan,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export const iconMap = {
  spray: SprayCan,
  truck: Truck,
  package: Package,
  factory: Factory,
  hospital: Hospital,
  utensils: UtensilsCrossed,
  hardhat: HardHat,
  building: Building2,
  network: Network,
  clock: Clock,
  shield: ShieldCheck,
  languages: Languages,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Cmp = iconMap[name];
  return <Cmp aria-hidden className={className} strokeWidth={1.5} />;
}
