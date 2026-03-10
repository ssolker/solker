# Solker

Personal site and ventures hub for [solker.ca](https://solker.ca). Built with [Astro](https://astro.build) and Tailwind CSS, deployed on GitHub Pages.

## Routing

| URL | Description |
| --- | ----------- |
| **solker.ca** | Main site (homepage). |
| **solker.ca/league** | League — rules, registration, waivers. |
| **solker.ca/wedding** | Wedding — Shuaib & Hanna, event details, travel, registry. |
| **solker.ca/color-palette** | Color palette (dev reference). |
| **solker.ca/404** | 404 page (linked when a route is not found). |

**Subdomain redirects** (configured at DNS/hosting; they point at the same static site):

| Subdomain | Redirects to |
| --------- | ------------- |
| **sports.solker.ca** | solker.ca/league |
| **leagues.solker.ca** | solker.ca/league |
| **wedding.solker.ca** | solker.ca/wedding |

When you add a new route (e.g. a new page under `src/pages/`), update this **Routing** section and the table of URLs so the README stays accurate.

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
