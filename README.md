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
