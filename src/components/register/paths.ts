import type { StaticImageData } from "next/image";
import aisle from "@/assets/images/warehouse-aisle.jpg";
import worker from "@/assets/images/worker-concrete.jpg";
import team from "@/assets/images/site-team.jpg";
import { dict, type Dict, type Lang } from "@/content/i18n";

export type PathKey = "company" | "worker" | "supplier";

export type RegisterPath = Dict["paths"][PathKey] & {
  key: PathKey;
  hash: string;
  n: string;
  image: StaticImageData;
  position: string;
};

const BASE = [
  { key: "company", hash: "#need-manpower", n: "01", image: aisle, position: "50% 50%" },
  { key: "worker", hash: "#find-work", n: "02", image: worker, position: "50% 20%" },
  { key: "supplier", hash: "#supply-manpower", n: "03", image: team, position: "62% 50%" },
] as const;

/** The three journeys, in order, with copy for the given language. */
export function getPaths(lang: Lang): RegisterPath[] {
  return BASE.map((b) => ({ ...dict[lang].paths[b.key], ...b }));
}

export const PATHS = getPaths("en");
