"use server";

import { headers } from "next/headers";
import { dict, OPTION_VALUES as V, type Lang } from "@/content/i18n";

/**
 * Lead capture for all four forms (spec §03–§05, QA-02…QA-06).
 * 1. Validates every field server-side (mobile normalised to +91, dates, headcount, option lists, consent).
 * 2. Saves exactly one row to Google Sheets (tab per form) with the common lead fields:
 *    reference, type, stage, verification, owner, source, landing page, UTM values.
 * 3. Returns success ONLY after the Sheet confirms the save; otherwise the user sees an error
 *    and keeps their inputs.
 * Budget values go only to the private Sheet — never into page HTML, URLs or analytics.
 */

export type LeadType = "worker" | "supplier" | "company" | "contact";

export type LeadState = {
  status: "idle" | "success" | "error";
  ref?: string;
  message?: string;
  errors?: Record<string, string>;
};

type Data = Record<string, string | string[]>;
type Kind = "text" | "name" | "mobile" | "email" | "int" | "date" | "option" | "multi" | "amount" | "long" | "flag";
type Field = {
  key: string;
  label: string;
  kind: Kind;
  required?: boolean | ((d: Data) => boolean);
  options?: string[];
  max?: number;
};

const s = (v: string | string[] | undefined) => (Array.isArray(v) ? v.join(", ") : (v ?? ""));

const FIELDS: Record<LeadType, Field[]> = {
  company: [
    { key: "company", label: "Company", kind: "text", required: true, max: 120 },
    { key: "contact", label: "Contact person", kind: "name", required: true },
    { key: "mobile", label: "Mobile", kind: "mobile", required: true },
    { key: "email", label: "Email", kind: "email" },
    { key: "city", label: "Deployment city", kind: "option", required: true, options: V.companyCities },
    { key: "otherCity", label: "Other city", kind: "text", required: (d) => d.city === "Other city", max: 60 },
    { key: "locality", label: "Locality / site area", kind: "text", required: true, max: 120 },
    { key: "category", label: "Category", kind: "option", required: true, options: V.categories },
    { key: "categoryOther", label: "Category (other)", kind: "text", required: (d) => d.category === "Other", max: 120 },
    { key: "headcount", label: "Headcount", kind: "int", required: true, max: 5000 },
    { key: "deploymentDate", label: "Deployment date", kind: "date", required: (d) => d.flexibleDate !== "yes" },
    { key: "flexibleDate", label: "Immediate / flexible", kind: "flag" },
    { key: "duration", label: "Duration", kind: "option", required: true, options: V.duration },
    { key: "budget", label: "Budget ₹ (confidential)", kind: "amount", required: true },
    { key: "budgetUnit", label: "Budget unit", kind: "option", required: true, options: V.budgetUnit },
    { key: "shift", label: "Site / shift details", kind: "long" },
    { key: "notes", label: "Notes from client", kind: "long" },
  ],
  worker: [
    { key: "name", label: "Name", kind: "name", required: true },
    { key: "mobile", label: "Mobile", kind: "mobile", required: true },
    { key: "homeState", label: "Current state", kind: "option", required: true, options: V.states },
    { key: "location", label: "Current location", kind: "text", required: true, max: 120 },
    { key: "work", label: "Preferred work", kind: "option", required: true, options: V.work },
    { key: "workCity", label: "Preferred work city", kind: "option", required: true, options: V.workCity },
    { key: "availability", label: "Availability", kind: "option", required: true, options: V.availability },
    { key: "availableDate", label: "Available from date", kind: "date", required: (d) => d.availability === "Specific date" },
    {
      key: "relocate",
      label: "Can relocate",
      kind: "option",
      options: V.relocate,
      required: (d) => !!d.homeState && !(d.homeState === "Karnataka" && d.workCity === "Bengaluru"),
    },
    { key: "language", label: "Preferred language", kind: "option", options: V.languages },
    { key: "experience", label: "Experience", kind: "option", options: V.experience },
  ],
  supplier: [
    { key: "business", label: "Business / agency", kind: "text", required: true, max: 120 },
    { key: "contact", label: "Contact person", kind: "name", required: true },
    { key: "mobile", label: "Mobile", kind: "mobile", required: true },
    { key: "sourceState", label: "Sourcing state", kind: "option", required: true, options: V.states },
    { key: "district", label: "District / city", kind: "text", required: true, max: 80 },
    { key: "supply", label: "Supply categories", kind: "multi", required: true, options: V.supply },
    { key: "capacity", label: "Workforce capacity", kind: "int", required: true, max: 5000 },
    { key: "capacityType", label: "Capacity is", kind: "option", required: true, options: V.capacityType },
    { key: "coverage", label: "Deployment coverage", kind: "text", required: true, max: 160 },
    { key: "leadTime", label: "Mobilisation lead time", kind: "option", required: true, options: V.leadTime },
  ],
  contact: [
    { key: "name", label: "Name", kind: "name", required: true },
    { key: "mobile", label: "Mobile", kind: "mobile", required: true },
    { key: "message", label: "Message", kind: "long", required: true },
  ],
};

const META: Record<LeadType, { sheet: string; leadType: string; prefix: string; ownerEnv: string }> = {
  company: { sheet: "Manpower", leadType: "client", prefix: "KC", ownerEnv: "LEAD_OWNER_CLIENT" },
  worker: { sheet: "Work", leadType: "worker", prefix: "KW", ownerEnv: "LEAD_OWNER_WORKER" },
  supplier: { sheet: "Supply", leadType: "contractor", prefix: "KS", ownerEnv: "LEAD_OWNER_CONTRACTOR" },
  contact: { sheet: "Enquiries", leadType: "enquiry", prefix: "KQ", ownerEnv: "LEAD_OWNER_CLIENT" },
};

const ATTRIBUTION: [string, string][] = [
  ["landing_page", "Landing page"],
  ["referrer", "Referrer"],
  ["utm_source", "UTM source"],
  ["utm_medium", "UTM medium"],
  ["utm_campaign", "UTM campaign"],
  ["utm_term", "UTM term"],
  ["utm_content", "UTM content"],
];

const NAME = /^[\p{L}\p{M}][\p{L}\p{M} .'-]{1,79}$/u;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts "98765 43210", "+91-98765-43210", "098765…"; returns "+91 98765 43210" or null. */
function normaliseMobile(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? `+91 ${d.slice(0, 5)} ${d.slice(5)}` : null;
}

const todayIST = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
const nowIST = () =>
  new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

function makeRef(type: LeadType) {
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
  return `${META[type].prefix}-${id}`;
}

/* Basic per-IP rate limit (per server instance): 6 submissions / 10 minutes. */
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 6;
}

function validate(type: LeadType, data: Data, lang: Lang) {
  const t = dict[lang].errors;
  const errors: Record<string, string> = {};
  const clean: Data = {};
  for (const f of FIELDS[type]) {
    const raw = data[f.key];
    const v = s(raw).trim();
    const required = typeof f.required === "function" ? f.required(data) : !!f.required;
    if (!v) {
      if (required) errors[f.key] = t.required;
      continue;
    }
    switch (f.kind) {
      case "name":
        if (!NAME.test(v)) errors[f.key] = t.name;
        else clean[f.key] = v.replace(/\s+/g, " ");
        break;
      case "mobile": {
        const m = normaliseMobile(v);
        if (!m) errors[f.key] = t.mobile;
        else clean[f.key] = m;
        break;
      }
      case "email":
        if (!EMAIL.test(v) || v.length > 120) errors[f.key] = t.email;
        else clean[f.key] = v.toLowerCase();
        break;
      case "int": {
        const n = Number(v);
        if (!Number.isInteger(n) || n < 1 || n > (f.max ?? 5000)) errors[f.key] = t.headcount;
        else clean[f.key] = String(n);
        break;
      }
      case "amount": {
        const n = Number(v.replace(/,/g, ""));
        if (!Number.isFinite(n) || n <= 0 || n > 1e10) errors[f.key] = t.budget;
        else clean[f.key] = String(Math.round(n));
        break;
      }
      case "date": {
        const ok = /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
        const maxDate = new Date(Date.now() + 366 * 864e5).toISOString().slice(0, 10);
        if (!ok || v < todayIST() || v > maxDate) errors[f.key] = t.date;
        else clean[f.key] = v;
        break;
      }
      case "option":
        if (!f.options?.includes(v)) errors[f.key] = t.invalid;
        else clean[f.key] = v;
        break;
      case "multi": {
        const list = (Array.isArray(raw) ? raw : [raw ?? ""]).map((x) => x.trim()).filter(Boolean);
        if (!list.length) {
          if (required) errors[f.key] = t.required;
        } else if (!list.every((x) => f.options?.includes(x))) errors[f.key] = t.invalid;
        else clean[f.key] = [...new Set(list)];
        break;
      }
      case "flag":
        if (v === "yes") clean[f.key] = "Yes";
        break;
      case "long":
        clean[f.key] = v.slice(0, 1000);
        break;
      default:
        clean[f.key] = v.replace(/\s+/g, " ").slice(0, f.max ?? 120);
    }
  }
  if (data.consent !== "yes") errors.consent = t.consent;
  return { errors, clean };
}

/** Returns true only when the Sheet confirms the row was written. */
async function saveToSheet(sheet: string, row: Record<string, string>) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[lead] SHEETS_WEBHOOK_URL not set — ${row["Reference ID"]} was not saved (dev only).`);
      return true;
    }
    console.error("[lead] SHEETS_WEBHOOK_URL is not configured in production.");
    return false;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids a CORS preflight on Apps Script
      body: JSON.stringify({ secret: process.env.SHEETS_SECRET ?? "", sheet, row }),
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });
    const out = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (res.ok && out?.ok) return true;
    console.error(`[lead] Sheets rejected ${row["Reference ID"]}:`, res.status, out?.error);
  } catch (err) {
    console.error(`[lead] Could not reach Google Sheets for ${row["Reference ID"]}:`, err);
  }
  return false;
}

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const lang: Lang = formData.get("lang") === "hi" ? "hi" : "en";
  const t = dict[lang].errors;
  const type = formData.get("type") as LeadType;
  if (!(type in FIELDS)) return { status: "error", message: t.unknown };

  // Bots: honeypot filled, or the form was completed impossibly fast.
  const elapsed = Number(formData.get("elapsed") ?? 0);
  if (String(formData.get("website") ?? "").trim() || (elapsed > 0 && elapsed < 1500)) {
    return { status: "success", ref: makeRef(type) };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "local").split(",")[0].trim();
  if (rateLimited(ip)) return { status: "error", message: t.rate };

  const data: Data = {};
  for (const key of new Set(formData.keys())) {
    if (key.startsWith("$")) continue;
    const all = formData
      .getAll(key)
      .map((v) => String(v).slice(0, 2000))
      .filter((v) => v.trim());
    data[key] = all.length > 1 ? all : (all[0] ?? "");
  }

  const { errors, clean } = validate(type, data, lang);
  if (Object.keys(errors).length) return { status: "error", message: t.check, errors };

  const meta = META[type];
  const ref = makeRef(type);
  const row: Record<string, string> = {
    "Reference ID": ref,
    "Submitted (IST)": nowIST(),
    "Lead type": meta.leadType,
    Stage: "new",
    Verification: "pending",
    Owner: process.env[meta.ownerEnv] || process.env.LEAD_OWNER_DEFAULT || "Manager",
    "Next follow-up": "",
    Outcome: "",
    "Team notes": "",
  };
  for (const f of FIELDS[type]) if (clean[f.key]) row[f.label] = s(clean[f.key]);
  row.Source = "website";
  for (const [key, label] of ATTRIBUTION) row[label] = s(data[key]).slice(0, 300);
  row["Form language"] = lang === "hi" ? "Hindi" : "English";

  const saved = await saveToSheet(meta.sheet, row);
  if (!saved) return { status: "error", message: t.save };

  return { status: "success", ref };
}
