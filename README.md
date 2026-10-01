# Milindu Weerawarna · Portfolio

A responsive, professional portfolio built with React, TypeScript, and Vite. All biographical information, education, project descriptions, achievements, and certificate links come from the supplied CV. Current learning interests come from the public GitHub profile.

## Run locally

Use Node.js 22.12+ or 24 LTS.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

```sh
npm run build    # Type-check and create the production site in dist/
npm run preview  # Preview the production build
```

## Features

- Responsive charcoal, off-white, and lime visual design.
- Optimized professional portrait and locally hosted Manrope font.
- Five CV projects, category filtering, and accessible project-detail dialogs.
- Verified CV links to project repositories and eight certifications.
- Education, technical skills, seven competition achievements, and community involvement.
- Email, copy-email feedback, phone, GitHub, and LinkedIn links.
- Downloadable CV, social-sharing image, metadata, and favicon.
- Keyboard navigation, skip link, native dialog focus management, and reduced-motion support.
- No backend, analytics, remote fonts, contact-form service, or API credentials required.

Project graphics are original illustrations, not screenshots of the underlying applications. The contact section uses email links rather than pretending to send messages without a backend.

## Edit content

- `src/data.ts`: profile, project descriptions and links, skills, certificates, and achievements.
- `src/App.tsx`: page layout, education, about text, and interactive components.
- `src/styles.css`: visual design and responsive breakpoints.
- `public/portrait.webp`: website portrait, converted from the original HEIC.
- `public/social-preview.jpg`: 1200 × 630 sharing image.
- `public/Milindu_Weerawarna_CV.pdf`: public downloadable CV.

The public CV removes referees’ email addresses and mobile numbers for privacy. The original PDF and HEIC remain untouched in `source/`; do not deploy that folder. Reapply the same redactions if replacing the downloadable CV.

## Tests

```sh
npx playwright install chromium
npm test
```

The suite builds and serves the production site automatically, then tests desktop and mobile layouts, filters, project dialogs, focus restoration, certification expansion, contact links, CV downloads, clipboard success/failure, reduced motion, and overflow from 320 to 1440 pixels. Screenshots are saved under `test-results/`.

An installed Chrome can be used instead of downloading Chromium. In Git Bash:

```sh
PLAYWRIGHT_CHANNEL=chrome npm test
```

## Host on GitHub Pages

The deployment workflow is `.github/workflows/deploy-pages.yml`. It builds the portfolio for the repository path `/Portfolio/` and publishes only `dist/`.

One-time setup:

1. Open [Portfolio → Settings → Pages](https://github.com/Milindu-Weerawarna/Portfolio/settings/pages).
2. Under **Build and deployment**, set **Source** to **GitHub Actions**. Do not select “Deploy from a branch”; the repository contains source code that must be built first.
3. Commit and push the deployment configuration to `main`.
4. Open the repository’s **Actions** tab and wait for **Deploy portfolio to GitHub Pages** to finish. If the configuration was pushed before Pages was enabled, select the workflow and use **Run workflow** after enabling Pages.
5. Visit **https://milindu-weerawarna.github.io/Portfolio/** after the deployment succeeds. The first publish may take a few minutes.

Future pushes to `main` automatically rebuild and deploy the site. No personal access token, paid hosting, or separate `gh-pages` branch is required for a public repository.

To check the Pages build locally:

```sh
npm run build:pages
npm run preview
```

Open `http://localhost:4173/Portfolio/` (or the port Vite prints). The regular `npm run dev` and `npm run build` still use the root path so existing local tests continue to work.

## Other hosting

Deploy only `dist/` to any static host. For Vercel or Netlify, use build command `npm run build` and output directory `dist`. No client-side router or server rewrites are needed.

Before publishing:

1. Confirm the public CV and displayed email/phone are the information you want to share.
2. If changing the domain or repository name, update the canonical URL, `og:url`, and `og:image` in `index.html` and the Pages base path in `package.json`.
3. Do not deploy the original files in `source/`. Application assets and the favicon respect Vite’s build base.

LinkedIn did not provide readable public content during development; no unverified LinkedIn claims were added. External project and credential destinations were extracted directly from the CV, but external services may require login or change availability over time.
