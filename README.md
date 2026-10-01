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

## Deploy

Deploy only `dist/` to any static host. For Vercel or Netlify, use build command `npm run build` and output directory `dist`. No client-side router or server rewrites are needed.

Before publishing:

1. Replace the relative `og:image` in `index.html` with the absolute deployed URL (for example, your site’s URL followed by `/social-preview.jpg`). Add a canonical URL and `og:url` once the real domain is known.
2. Confirm the public CV and displayed email/phone are the information you want to share.
3. If deploying below a subpath, configure Vite’s `base` and adjust the favicon and social metadata paths in `index.html` accordingly. Application asset paths already respect Vite’s base.

LinkedIn did not provide readable public content during development; no unverified LinkedIn claims were added. External project and credential destinations were extracted directly from the CV, but external services may require login or change availability over time.
