# Mr. Fix It

Home Depot meets YouTube: a DIY home repair and maintenance hub designed to help homeowners and renters tackle common projects with confidence.

## Getting Started

```bash
# install dependencies
npm install

# run the dev server
npm run dev

# build for production
npm run build

# export static site (for GoDaddy or any static host)
npm run export
```

The project uses the Next.js App Router, Tailwind CSS for styling, and TypeScript. Environment variables can be placed in `.env.local` as needed (for example, API keys for analytics or CMS connections).

## Project Structure

- `src/app` – App Router pages and shared layout
  - `page.tsx` – Home page with hero, featured projects, and content highlights
  - `project-library` – Step-by-step DIY guide categories
  - `toolbox` – Tool glossary with recommendations and checklist
  - `blog` – Content marketing articles
  - `videos` – Embedded tutorial library
  - `shop` – Affiliate storefront
  - `community` – Phase 2 forum teaser
  - `about` – Brand story, partnerships, and contact form
- `src/components` – Reusable UI building blocks (header, hero, cards)
- `src/data` – Placeholder content for categories, tools, posts, and products

## Branding & UI

- Colors: `navy (#1E2A38)`, `orange (#FF7A00)`, `light-gray (#F5F5F5)`, `white (#FFFFFF)`
- Typography: Montserrat for headings, Open Sans for body copy (loaded via `next/font`)
- Tailwind is configured in `tailwind.config.ts` with custom tokens for fonts and colors.

## Deployment (GoDaddy static hosting)

1. Run `npm run export` – Next.js will build the site and create a static bundle in the `out/` directory.
2. Compress the `out/` folder (e.g., `zip -r mr-fix-it-static.zip out`).
3. Log into GoDaddy and open your Hosting control panel (cPanel or Managed WordPress file manager).
4. Delete/backup any existing site files in the document root, then upload the zipped bundle and extract it, or transfer the contents of `out/` via SFTP.
5. Ensure `index.html` lives in the root, and that the `/diy-mr-fix-it-classic.svg` logo and other assets are preserved.
6. If you use a CDN or HTTPS via GoDaddy, make sure caching is cleared so the new bundle appears immediately.

For dynamic features (Stripe billing, user logins, forums) you'll need a server or serverless backend. GoDaddy shared hosting is static, so connect those features to external services (Stripe Checkout, Firebase, Supabase, etc.) or deploy the Next.js app to a Node-friendly host and point the domain there.

## Next Steps

1. Connect to a CMS (e.g., Sanity or WordPress) to manage project guides, posts, and tools.
2. Enable the interactive “Build Your Toolbox” feature with user accounts (Firebase or MongoDB).
3. Integrate email marketing (Mailchimp or ConvertKit) for the “Weekly Fix Tips” form.
4. Wire up affiliate links with tracking parameters and add Google Analytics & Hotjar scripts.
5. Build the community forum (Phase 2) and Stripe-powered premium toolkits (Phase 3).
