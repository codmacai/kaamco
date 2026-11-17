# KAAM-CO — website

Next.js 16 (App Router) + Tailwind CSS v4. Light theme, English + Hindi.

| Page | English | Hindi |
| --- | --- | --- |
| Website | `/` | `/hi` |
| Registration (logo intro → choose → form) | `/register` | `/hi/register` |

Deep links open a form directly: `/register#need-manpower`, `#find-work`, `#supply-manpower` (same on `/hi/register`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## What happens when someone submits a form

Both of these happen at the same moment:

1. **Google Sheets:** one tab per form, holding the reference ID, time (IST), all details and the language used.
   - **Manpower** ← I Need Manpower
   - **Work** ← I Am Looking for Work
   - **Supply** ← I Want to Supply Manpower
   - **Enquiries** ← contact form
2. **Email:** the same details are emailed instantly to `NOTIFY_EMAIL` in Code.gs, with one-tap Call and WhatsApp buttons for the applicant's number.

## Google Sheets — setup (done)

The script in `google-apps-script/Code.gs` is deployed and connected through `SHEETS_WEBHOOK_URL` and `SHEETS_SECRET`.
At launch, add the same two values in the hosting settings.

**After any change to Code.gs:** paste it into Apps Script, save, then go to **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**.
This keeps the same URL. Using "New deployment" instead creates a new URL, which would then have to be updated on the website.

## Where to edit

| What | File |
| --- | --- |
| All visible text, English and Hindi | `src/content/i18n.ts` |
| Phone / WhatsApp numbers, email, cities | `src/content/site.ts` |
| Lead handling (validation, Google Sheets) | `src/app/actions.ts` |
| Service photos | `src/assets/images/services/` (keep the file names) |
| Registration photos | `src/assets/images/` |
| Colours, fonts | `src/app/globals.css` |

## Production notes

- Every page is prerendered as static HTML. Forms use a Server Action, and there are no client API keys.
- Bot honeypot on every form, plus server-side validation of Indian mobile numbers and email.
- Fonts are self-hosted with `next/font`. Mukta (Devanagari) loads only when Hindi text renders.
- Photos are optimised by `next/image` (AVIF/WebP, responsive sizes, blur placeholders).
- `sitemap.xml` (both languages), `robots.txt`, `hreflang` alternates, Open Graph and JSON-LD are included.

## Before launch

- Finish the Google Sheets setup above.
- Replace the stock photos with real KAAM-CO photos when available.
- Legal pages under `/legal/*` are placeholders. Have them reviewed.

## Spec status (KAAM-CO Developer Specification, 10 Nov 2026)

**Done on the website**
- Positioning: four core services (Corporate Housekeeping, Office Shifting, Warehouse Support, Facility Support); "Your Requirement. Our Coordination." hero; business CTA first.
- Navigation: Services · For Businesses · Find Work · Become a Partner · How It Works · About · Contact · EN/हिंदी.
- Honest claims: Bengaluru as the only operational city, no response-time promise, no public rates, no job/approval guarantees. One public number (+91 81290 53828); the client line is held back until approved.
- Three 2-step forms to the spec fields, including a mandatory confidential budget and unit, deployment date or a flexible option, worker state/location/relocation, and contractor capacity/coverage/lead time. No documents, resume or email are required. Consent checkbox on every form. Full Hindi.
- Server: validation of every field, mobile normalised to +91, a row is saved only when the Sheet confirms it, and errors keep the user's inputs. Honeypot, timing check and rate limit.
- Lead record: reference, lead type, stage=new, verification=pending, owner, source, landing page, referrer, UTM values. Duplicate flag by mobile in the Sheet.
- SEO: `<html lang>` en-IN / hi-IN, reciprocal hreflang plus x-default, a unique title and description per page, 4 service landing pages under `/services/*`, sitemap of live URLs only, legal placeholders set to noindex.
- Analytics events pushed to `window.dataLayer` (cta_click, form_start, form_submit_success/error) with no personal data. Ready for GTM/GA4.
- Security headers (HSTS, nosniff, frame-deny, referrer policy).

**Needs KAAM-CO / counsel before public launch (P0)**
- Final Privacy Notice and Terms text (currently placeholders, noindex).
- Verified legal entity name for the footer and About section.
- Approval of the client phone line, if it should be published.
- Production domain: set `NEXT_PUBLIC_SITE_URL` once kaam-co.com points to Vercel.
- Lead owners: set `LEAD_OWNER_CLIENT`, `LEAD_OWNER_WORKER`, `LEAD_OWNER_CONTRACTOR` (default "Manager").
- Restrict Google Sheet access, because the Manpower tab holds confidential budgets.
- Real KAAM-CO photos to replace the stock images.

**Next phase (spec §05–§06, P1)**
Internal lead dashboard: a secure database, staff logins with roles, own-queue and manager views, a call/WhatsApp contact log, follow-up reminders, stage history, and outcome records (client agreement / worker placement / contractor activation).
