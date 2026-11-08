/**
 * All site copy lives here so content edits never touch components.
 * Contact details marked `null` render as "to be added" until KAAM-CO supplies them.
 */

export const site = {
  name: "KAAM-CO",
  tagline: "The Force Behind Success",
  url: "https://www.kaam-co.com",
  domain: "www.kaam-co.com",
  description:
    "KAAM-CO is a technology-enabled manpower platform. Reliable workforce for businesses, flexible work for job seekers and growth for manpower suppliers — across Bengaluru, Hyderabad, Chennai and Kochi.",
  contact: {
    workers: { label: "Workers & contractors", phone: "+91 81290 53828", whatsapp: "918129053828" },
    clients: { label: "Clients", phone: "+91 99702 79355", whatsapp: "919970279355" },
    email: null as string | null,
  },
};

export const cities = [
  { name: "Bengaluru", lat: "12.97° N", lng: "77.59° E", status: "Live" },
  { name: "Hyderabad", lat: "17.39° N", lng: "78.49° E", status: "Live" },
  { name: "Chennai", lat: "13.08° N", lng: "80.27° E", status: "Live" },
  { name: "Kochi", lat: "9.93° N", lng: "76.27° E", status: "Live" },
];

export const legalPages = {
  privacy: "Privacy Policy",
  terms: "Website Terms",
  "worker-terms": "Worker Terms",
  "partner-terms": "Contractor Partner Terms",
} as const;

export type LegalSlug = keyof typeof legalPages;
