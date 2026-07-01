# Recall legal / compliance pages

Static pages required for the Google Play listing and in-app links:

- `privacy.html` — Privacy Policy (Data Safety + listing requirement)
- `terms.html` — Terms of Service (linked from Signup)
- `delete-account.html` — Account & data deletion (Play requires a **web** deletion path in
  addition to the in-app one)

## Hosting (pick any static host)

Zero build step — plain HTML. Options:

- **GitHub Pages:** push this `website/` folder to a repo, enable Pages → served at
  `https://<user>.github.io/<repo>/privacy.html` (etc).
- **Netlify / Vercel / Cloudflare Pages:** drag-drop this folder → get a `*.pages.dev` /
  `*.netlify.app` URL, or attach a custom domain (e.g. `recall.app`).

Verify all three URLs load publicly before submitting.

## After hosting — do these

1. **Code:** set the real Terms URL in
   `src/features/auth/constants/signup-content.ts` →
   `termsUrl: "https://<your-host>/terms.html"` (replaces the `https://recall.app/terms`
   placeholder). Rebuild.
2. **Play Console → Store listing / App content:**
   - **Privacy Policy URL** → `https://<your-host>/privacy.html`
   - **Data Safety** form → declare: account info (name, email) + photos (image picker);
     encrypted in transit; user can request deletion → enter the deletion URL
     `https://<your-host>/delete-account.html`.
3. Confirm `support@recall.app` is a monitored inbox (or change the address in all three
   HTML files + `privacy-content.ts` + `delete-account` copy).

> The email/domain in these pages (`support@recall.app`, `recall.app`) are placeholders —
> replace with your real monitored address / domain before publishing.
