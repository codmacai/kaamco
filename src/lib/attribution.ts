/**
 * Lead source attribution (spec §03, QA-13): remembers the first landing page, referrer and UTM values
 * for the browser session, then attaches them to every form submission.
 */
const KEY = "kc-attribution";
export const ATTRIBUTION_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "landing_page",
  "referrer",
] as const;

type Attribution = Partial<Record<(typeof ATTRIBUTION_FIELDS)[number], string>>;

function read(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}

/** Call once per page load. First touch wins, except new UTM values replace old ones. */
export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const current = read();
    const next: Attribution = { ...current };
    if (!current.landing_page) {
      next.landing_page = window.location.pathname + window.location.search;
      const ref = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
      if (ref) next.referrer = ref;
    }
    if (params.has("utm_source")) {
      for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const) {
        const v = params.get(k);
        if (v) next[k] = v.slice(0, 120);
        else delete next[k];
      }
    }
    sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage blocked: attribution is best-effort */
  }
}

export function appendAttribution(fd: FormData) {
  const a = read();
  if (!a.landing_page) a.landing_page = window.location.pathname;
  for (const k of ATTRIBUTION_FIELDS) if (a[k]) fd.set(k, a[k]!);
}
