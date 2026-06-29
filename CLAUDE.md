# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Hebrew **RTL** landing page for a youth football (soccer) league in Netanya, Israel — **ליגת הלב היהודי** (Lev HaYehudi League), ages 15-21. Single-page marketing site, animation-heavy, with a multi-step team-registration form backed by Google Apps Script + Sheets.

## Commands

```bash
npm run dev      # Vite dev server (HMR) — http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the built dist/ locally
npm run lint     # ESLint (flat config)
```

No test runner is configured yet. If adding tests, Vitest pairs naturally with Vite.

`VITE_APPS_SCRIPT_URL` (in `.env`) points at the deployed Apps Script web app. Until it's set the page still runs: the counter falls back to `0` and form submit surfaces a Hebrew error instead of crashing (see `src/lib/api.js`). See `SETUP.md` for deployment; backend source is `Code.gs` (project root, not bundled).

## Stack

React 18 · Vite 6 · Tailwind CSS **v4** · Framer Motion · GSAP · canvas-confetti. JavaScript + JSX (no TypeScript).

## Architecture & conventions

- **RTL is the default, not an add-on.** `index.html` sets `lang="he" dir="rtl"`. Always use logical/direction-agnostic Tailwind utilities (`ms-*`/`me-*`, `ps-*`/`pe-*`, `start-*`/`end-*`, `text-start`/`text-end`) rather than physical ones (`ml-*`, `pl-*`, `left-*`, `text-left`) so layout mirrors correctly. UI copy is in Hebrew.

- **Page composition:** `App.jsx` renders the sections in order (Navbar · Hero · About · RegistrationCounter · Players · RegistrationForm · Footer) from `src/sections/`. Reusable presentational primitives live in `src/components/ui/` (`GlowButton`, `Reveal`, `Section`, `ProgressBar`, `Badge`); pure logic lives in `src/lib/` (`constants`, `validation`, `storage`, `api`) and static copy in `src/data/content.js`.

- **Single polling source for the live count.** `useRegistrationCount` (polls Apps Script every 30s) is instantiated **once in `App.jsx`** and its result passed down to both the counter and the form — don't call the hook again in a child, or you'll run duplicate intervals. `full` (count ≥ `MAX_TEAMS`) swaps the form for `RegistrationClosed`.

- **Registration form** (`src/sections/registration/`) is a 3-step wizard: `RegistrationForm` owns all state (`step`, `team`, `players`, submit status) and persists it to `localStorage` on every change via `src/lib/storage.js` (PRD requirement — survive a browser close). A player is "editing" while `confirmed === false` and collapses to a ✅ row once confirmed. Tunables: `MIN_PLAYERS` and `MAX_TEAMS` in `src/lib/constants.js`.

- **Split backends for the form:** `src/lib/api.js` POSTs completed registrations to a **Make.com webhook** (`submitRegistration`, `mode: 'cors'` + `application/json`; Make answers the preflight and exposes CORS headers, so the response is readable — but Make returns plain text `Accepted`, so success is keyed off `res.ok`, not a parsed body). The **GET counter** (`getRegistrationCount`) still hits the Apps Script web app via `VITE_APPS_SCRIPT_URL`. The "full" state comes from that counter, which the form refreshes after submit.

- **Tailwind v4 — config lives in CSS, not a JS file.** There is no `tailwind.config.js`. `src/index.css` does `@import "tailwindcss"` and defines design tokens in the `@theme` block. Adding a variable there generates utilities automatically (e.g. `--color-navy` → `bg-navy`/`text-navy`, `--font-display` → `font-display`). Custom effects (the gold glow, `animate-gold-pulse`) are defined with `@utility` blocks in the same file. Change brand colors, fonts, and glows there — do not hardcode hex values in components.

- **Two animation libraries, deliberate split:**
  - **Framer Motion** for declarative, component-level transitions — enter/exit, hover/tap, and scroll-reveal via `whileInView`. This is the default for most UI motion.
  - **GSAP** for imperative timelines and scroll-scrubbing (ScrollTrigger). Always scope GSAP through the `useGsap` hook in `src/hooks/useGsap.js`, which wraps `gsap.context` and auto-reverts on unmount to prevent leaked tweens. Pass a selector-based setup and attach the returned ref to the section root.
  - `src/sections/Hero.jsx` is the reference example showing both used together.

- **ESLint** uses the flat config (`eslint.config.js`). `react/jsx-uses-vars` is enabled so namespaced JSX elements like `<motion.h1>` aren't reported as unused imports. `no-unused-vars` ignores PascalCase/UPPER_CASE identifiers.

## Asset note

Player portraits in `src/sections/Players.jsx` use real photos from `public/players/` (object-cover, face-centered). The logo is `public/logo.png`, referenced as `/logo.png`.
