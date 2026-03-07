# Solker

Personal site and ventures hub for [solker.ca](https://solker.ca). Built with [Astro](https://astro.build) and Tailwind CSS, deployed on GitHub Pages.

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
