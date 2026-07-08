# Solker

Personal site and ventures hub for [solker.ca](https://solker.ca). Built with [Astro](https://astro.build) and Tailwind CSS, deployed on GitHub Pages.

## Routing

| URL | Description |
| --- | ----------- |
| **solker.ca** | Main site (homepage). |
| **solker.ca/league** | League — rules, registration, waivers. |
| **solker.ca/wedding** | Wedding — Shuaib & Hanna, event details, travel, registry, Q&A. |
| **solker.ca/wedding/guest-details** | Wedding guest details form — attendance, meals, hotel rooms. |
| **solker.ca/color-palette** | Color palette (dev reference). |
| **solker.ca/legal** | Privacy Policy and Terms of Service (single page, anchor links). |
| **solker.ca/404** | 404 page (linked when a route is not found). |

**Subdomain redirects** (configured at DNS/hosting; they point at the same static site):

| Subdomain | Redirects to |
| --------- | ------------- |
| **sports.solker.ca** | solker.ca/league |
| **leagues.solker.ca** | solker.ca/league |
| **wedding.solker.ca** | solker.ca/wedding |

When you add a new route (e.g. a new page under `src/pages/`), update this **Routing** section and the table of URLs so the README stays accurate.

## Navigation

- **Header:** Logo (home), optional page-specific nav (e.g. League nav, Wedding nav), theme switcher. No global “Legal” link in the header to keep it simple.
- **Footer:** Shown on every page (home, league, wedding, legal, color-palette, 404). Contains company name, Contact link, **Privacy Policy** and **Terms of Service** (both go to `/legal` with anchors `#privacy` and `#terms`), and copyright.
- **Legal page:** One page at `/legal` with two sections (Privacy Policy, Terms of Service). In-page links at the top jump to `#privacy` and `#terms`. Replace the placeholder content when you have final copy.

To add a header link to Legal site-wide, add a single “Legal” or “Privacy & Terms” link in `Layout.astro` next to the theme switcher (or in the center nav slot when it’s empty).

## Project overview

- **Homepage:** Hero and a grid of venture cards (e.g. League).
- **League** (`/league`): Rules, Registration, and Waivers sections (placeholders; links to external forms).
- **Branches:** `dev` = development, `main` = production. The live site is built and deployed only from `main`.

## Prerequisites

- **Node.js** 24.x and **npm**

## Install

```bash
npm install
```

## Build locally

```bash
npm run build
```

Output is in `dist/`. The site is static; you can serve `dist/` with any static server.

## Test locally

**Development server** (hot reload):

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

**Preview production build** (after `npm run build`):

```bash
npm run preview
```

## Environment variables (forms + reCAPTCHA)

League forms use `src/env/publicForms.ts`. Wedding guest details use `src/env/weddingForms.ts`. Both reuse the same reCAPTCHA site keys.

| Variable | When |
| -------- | ---- |
| `PUBLIC_FORMS_API_URL` | **Required** for league/contact forms in production. League Apps Script Web App URL. |
| `PUBLIC_FORMS_API_URL_DEV` | Optional. Used only in **`astro dev`** for league forms. |
| `PUBLIC_WEDDING_FORMS_API_URL` | **Required** for wedding guest details form in production. Wedding Apps Script Web App URL. |
| `PUBLIC_WEDDING_FORMS_API_URL_DEV` | Optional. Used only in **`astro dev`** for wedding forms. |
| `PUBLIC_RECAPTCHA_SITE_KEY_V3` | **Recommended.** reCAPTCHA v3 site key — **shared** by league and wedding forms. |
| `PUBLIC_RECAPTCHA_SITE_KEY` | Optional **v2** site key (checkbox). Shared by league and wedding. Must pair with `RECAPTCHA_SECRET` in Apps Script (set the same value in both `league_forms_api` and `wedding_forms_api`). |

When `PUBLIC_FORMS_API_URL` and reCAPTCHA keys are set, the **Soccer** page’s Standings & Schedule section can load captain scores from the league Web App. Configure `GAME_SCORES_SHEET_ID` in Apps Script per `google-workspace-apps` README.

**GitHub Actions:** Repository **secrets** `PUBLIC_RECAPTCHA_SITE_KEY_V3` and optionally `PUBLIC_RECAPTCHA_SITE_KEY` (v2). Repository **variables** `PUBLIC_FORMS_API_URL` and `PUBLIC_WEDDING_FORMS_API_URL`. See `.github/workflows/deploy.yml`.

Copy `.env.example` to `.env` for local development (`.env` is gitignored).

## Deploy

1. **Work on `dev`.** All feature work and commits happen on the `dev` branch.

2. **When ready for production,** merge `dev` into `main` and push:
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```

3. **GitHub Actions** runs on every push to `main`: it installs deps, builds the Astro site, and deploys to GitHub Pages. The custom domain **solker.ca** is kept via `public/CNAME`.

**First-time setup:** In the repo **Settings → Pages**, set **Source** to **GitHub Actions**. No need to choose a branch or folder; the workflow publishes the built site.

## Scripts

| Script    | Description                    |
| --------- | ------------------------------ |
| `npm run dev`     | Start dev server (port 4321)   |
| `npm run build`   | Build static site to `dist/`  |
| `npm run preview` | Serve `dist/` locally         |
