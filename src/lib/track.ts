/**
 * Analytics events (spec §10). Pushes to window.dataLayer so Google Tag Manager / GA4 can pick them up
 * once installed. Never pass names, phone numbers, emails, budgets or other personal data here.
 */
type EventName = "cta_click" | "form_start" | "form_submit_success" | "form_submit_error";

export function track(event: EventName, props: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...props, page: window.location.pathname });
}
