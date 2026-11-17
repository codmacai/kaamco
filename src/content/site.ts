/**
 * Business facts. Only publish what KAAM-CO can substantiate (spec §09):
 * one approved public number, Bengaluru as the only operational city.
 */

/** Production URL: set NEXT_PUBLIC_SITE_URL once the domain is live; falls back to the Vercel production URL. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const site = {
  name: "KAAM-CO",
  tagline: "The Force Behind Success",
  url: siteUrl.replace(/\/$/, ""),
  domain: siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, ""),
  description:
    "KAAM-CO coordinates workforce for businesses in Bengaluru: corporate housekeeping, office shifting, warehouse support and facility support. Workers and manpower contractors can register free.",
  contact: {
    // Approved public number (spec §09). A separate client line needs internal approval before it is published.
    phone: "+91 81290 53828",
    whatsapp: "918129053828",
    email: null as string | null,
  },
  city: "Bengaluru",
  region: "Karnataka",
};

export type ServiceSlug =
  | "corporate-housekeeping-bengaluru"
  | "office-shifting-manpower-bengaluru"
  | "warehouse-support-bengaluru"
  | "facility-support-bengaluru";

/** Four core services. `category` matches the company form option value. English landing pages. */
export const servicePages: {
  slug: ServiceSlug;
  category: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  useCase: string;
  scope: string[];
  notIncluded: string;
  faqs: { q: string; a: string }[];
}[] = [
  {
    slug: "corporate-housekeeping-bengaluru",
    category: "Corporate Housekeeping",
    title: "Corporate Housekeeping",
    h1: "Corporate housekeeping manpower in Bengaluru",
    metaTitle: "Corporate Housekeeping Staff in Bengaluru",
    metaDescription:
      "Office and commercial housekeeping personnel for corporate locations in Bengaluru. Share headcount, shifts and start date; KAAM-CO reviews and confirms availability.",
    summary: "Office and commercial housekeeping personnel for corporate locations.",
    useCase:
      "An office campus needs a day-shift housekeeping team for workstations, washrooms, meeting rooms and common areas, with cover for weekly offs.",
    scope: [
      "Workstation, cabin and meeting-room cleaning",
      "Washroom and pantry upkeep on a set schedule",
      "Common-area, lobby and corridor housekeeping",
      "Shift-based teams sized to your floor area and hours",
    ],
    notIncluded: "Specialised cleaning that needs certified equipment or chemicals is scoped separately.",
    faqs: [
      {
        q: "Can you provide staff for night or weekend shifts?",
        a: "Share your shift timings in the form. We confirm availability for those hours before agreeing terms.",
      },
      {
        q: "Who supplies cleaning materials?",
        a: "This is agreed per site. Tell us in the site details whether you need personnel only or personnel with materials.",
      },
      {
        q: "What does it cost?",
        a: "Rates depend on headcount, shift, duration and site. Share a confidential budget in the form and we discuss terms directly.",
      },
    ],
  },
  {
    slug: "office-shifting-manpower-bengaluru",
    category: "Office Shifting",
    title: "Office Shifting",
    h1: "Office shifting and relocation manpower in Bengaluru",
    metaTitle: "Office Shifting Manpower in Bengaluru",
    metaDescription:
      "Manpower for loading, furniture moving, packing support and material handling during office moves in Bengaluru, scoped to your relocation plan.",
    summary: "Manpower for loading, furniture moving, packing support and material handling as scoped.",
    useCase:
      "A company moving floors over a weekend needs a crew to pack, move workstations and furniture, and load and unload material.",
    scope: [
      "Packing support and labelling",
      "Furniture and workstation moving",
      "Loading and unloading",
      "Material handling within and between sites",
    ],
    notIncluded: "Transport vehicles, IT disconnection/reconnection and insurance are not included unless separately agreed.",
    faqs: [
      {
        q: "Can the crew work on a weekend or overnight?",
        a: "Yes, if we can confirm availability for that date. Choose the deployment date and add timings in the site details.",
      },
      {
        q: "Do you provide trucks?",
        a: "Our scope is manpower. Mention any transport needs in the notes and we will tell you honestly what we can arrange.",
      },
      {
        q: "How many people will I need?",
        a: "Give your best estimate. We review the move scope on a call and suggest a crew size before confirming.",
      },
    ],
  },
  {
    slug: "warehouse-support-bengaluru",
    category: "Warehouse Support",
    title: "Warehouse Support",
    h1: "Warehouse helpers, loaders and packing workforce in Bengaluru",
    metaTitle: "Warehouse Helpers & Loaders in Bengaluru",
    metaDescription:
      "Helpers for picking, packing, loading, dispatch and related warehouse support activities in Bengaluru. Short-term and ongoing requirements.",
    summary: "Helpers for picking, packing, loading, dispatch and related support activities.",
    useCase:
      "A fulfilment warehouse needs extra pickers and packers for a seasonal peak, plus loaders for the evening dispatch window.",
    scope: [
      "Picking and packing",
      "Loading and unloading",
      "Dispatch and staging support",
      "Inventory and stacking helpers",
    ],
    notIncluded: "Forklift or equipment operators who need licences are confirmed case by case.",
    faqs: [
      {
        q: "Can you support short peak periods?",
        a: "Yes. Choose “Short-term” as the duration and give your start date and headcount. We confirm availability before deployment.",
      },
      {
        q: "Can the team work in shifts?",
        a: "Share shift timings in the site details. Working hours, breaks and weekly rest are agreed for the specific assignment.",
      },
      {
        q: "What does it cost?",
        a: "Rates depend on headcount, shift and duration. Share a confidential budget and we discuss terms directly.",
      },
    ],
  },
  {
    slug: "facility-support-bengaluru",
    category: "Facility Support",
    title: "Facility Support",
    h1: "Facility support manpower for businesses in Bengaluru",
    metaTitle: "Facility Support Staff in Bengaluru",
    metaDescription:
      "Support workforce for common areas, pantry, cleaning and other agreed site needs at offices and commercial facilities in Bengaluru.",
    summary: "Support workforce for common areas, pantry, cleaning and other agreed site needs.",
    useCase:
      "A commercial building needs pantry staff and common-area support across two shifts, with a clear list of duties agreed up front.",
    scope: [
      "Pantry and refreshment support",
      "Common-area upkeep",
      "Cleaning and general site support",
      "Other duties agreed for your site",
    ],
    notIncluded: "Technical maintenance (electrical, plumbing, HVAC) needs separate qualified staff and is not part of this service.",
    faqs: [
      {
        q: "Can duties be customised for our site?",
        a: "Yes. List the duties in the site details. We confirm what we can cover before agreeing terms.",
      },
      {
        q: "Is this a long-term arrangement?",
        a: "It can be one-day, short-term, recurring or ongoing. Choose the duration that fits your site.",
      },
      {
        q: "What does it cost?",
        a: "Rates depend on duties, headcount, shift and duration. Share a confidential budget and we discuss terms directly.",
      },
    ],
  },
];

export const legalPages = {
  privacy: "Privacy Notice",
  terms: "Website Terms",
  "worker-terms": "Worker Terms",
  "partner-terms": "Contractor Partner Terms",
} as const;

export type LegalSlug = keyof typeof legalPages;
