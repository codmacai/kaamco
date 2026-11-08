"use server";

import { dict, type Lang } from "@/content/i18n";

/**
 * Lead capture for all four forms.
 * 1. Validates the submission.
 * 2. Saves it to Google Sheets (one tab per form) via the Apps Script web app in
 *    /google-apps-script/Code.gs — set SHEETS_WEBHOOK_URL and SHEETS_SECRET.
 * 3. The Apps Script emails every lead instantly to the address set in Code.gs (NOTIFY_EMAIL).
 */

export type LeadType = "worker" | "supplier" | "company" | "contact";

export type LeadState = {
  status: "idle" | "success" | "error";
  ref?: string;
  message?: string;
  errors?: Record<string, string>;
};

const REQUIRED: Record<LeadType, string[]> = {
  worker: ["name", "mobile", "city", "workType"],
  supplier: ["business", "contact", "mobile", "cities"],
  company: ["company", "contact", "mobile", "city", "workType", "headcount"],
  contact: ["name", "mobile", "message"],
};

const PREFIX: Record<LeadType, string> = { worker: "KW", supplier: "KS", company: "KC", contact: "KQ" };

/** Google Sheets tab for each form. */
const SHEET: Record<LeadType, string> = {
  company: "Manpower",
  worker: "Work",
  supplier: "Supply",
  contact: "Enquiries",
};

/** Column headings in the sheet, in order. */
const LABELS: Record<string, string> = {
  company: "Company",
  business: "Business / agency",
  name: "Name",
  contact: "Contact person",
  mobile: "Mobile",
  email: "Email",
  city: "City",
  cities: "Cities served",
  workType: "Work type",
  headcount: "Workers needed",
  duration: "Duration",
  experience: "Experience",
  availability: "Available from",
  language: "Preferred language",
  size: "Workforce available",
  categories: "Categories",
  gstin: "GSTIN",
  details: "Requirement details",
  message: "Message",
};

const INDIAN_MOBILE = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;

function makeRef(type: LeadType) {
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
  return `${PREFIX[type]}-${id}`;
}

const istNow = () =>
  new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

const asText = (v: string | string[] | undefined) => (Array.isArray(v) ? v.join(", ") : (v ?? ""));

function orderedFields(data: Record<string, string | string[]>) {
  return Object.keys(LABELS)
    .filter((k) => asText(data[k]))
    .map((k) => [LABELS[k], asText(data[k])] as const);
}

async function saveToSheet(type: LeadType, ref: string, lang: Lang, data: Record<string, string | string[]>) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    console.warn(`[lead] SHEETS_WEBHOOK_URL not set — ${ref} was not saved to Google Sheets.`);
    return;
  }
  const row: Record<string, string> = { "Reference ID": ref, "Submitted (IST)": istNow() };
  for (const [label, value] of orderedFields(data)) row[label] = value;
  row.Language = lang === "hi" ? "Hindi" : "English";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids a CORS preflight on Apps Script
      body: JSON.stringify({ secret: process.env.SHEETS_SECRET ?? "", sheet: SHEET[type], row }),
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    const out = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !out?.ok) console.error(`[lead] Sheets rejected ${ref}:`, res.status, out?.error);
  } catch (err) {
    console.error(`[lead] Could not reach Google Sheets for ${ref}:`, err);
  }
}

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const lang: Lang = formData.get("lang") === "hi" ? "hi" : "en";
  const t = dict[lang].errors;
  const type = formData.get("type") as LeadType;
  if (!(type in REQUIRED)) return { status: "error", message: t.unknown };

  // honeypot: real users never fill this
  if (String(formData.get("website") ?? "").trim()) return { status: "success", ref: makeRef(type) };

  const data: Record<string, string | string[]> = {};
  for (const key of new Set(formData.keys())) {
    if (key === "type" || key === "website" || key === "lang" || key.startsWith("$")) continue;
    const all = formData
      .getAll(key)
      .map((v) => String(v).trim().slice(0, 2000))
      .filter(Boolean);
    data[key] = all.length > 1 ? all : (all[0] ?? "");
  }

  const errors: Record<string, string> = {};
  for (const key of REQUIRED[type]) {
    const v = data[key];
    if (!v || (Array.isArray(v) && v.length === 0)) errors[key] = t.required;
  }
  const mobile = asText(data.mobile).replace(/\s+/g, "");
  if (mobile && !INDIAN_MOBILE.test(mobile)) errors.mobile = t.mobile;
  if (data.email && !/^\S+@\S+\.\S+$/.test(asText(data.email))) errors.email = t.email;

  if (Object.keys(errors).length) return { status: "error", message: t.check, errors };

  const ref = makeRef(type);
  await saveToSheet(type, ref, lang, data);

  return {
    status: "success",
    ref,
  };
}
