# ליגת יראנו ניסים — Ligat Yaranu Nisim

A Hebrew **RTL** landing page for a youth football (soccer) league in Netanya, Israel. Single-page marketing site with an animated hero, live registration counter, and a multi-step team-registration form backed by Google Apps Script + Google Sheets.

## Tech stack

- **React 18** + **Vite 6**
- **Tailwind CSS v4** (CSS-based config — design tokens live in `src/index.css`)
- **Framer Motion** — declarative UI transitions & scroll reveals
- **GSAP** — imperative timelines & scroll-triggered animations
- **canvas-confetti** — success celebration
- **Twemoji** (via CDN) — consistent emoji rendering across devices
- **Heebo** Google Font, full RTL layout

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Configuration

Registration is wired to a Google Apps Script web app. Copy the example env file and fill in your deployed URL:

```bash
cp .env.example .env
```

```env
VITE_APPS_SCRIPT_URL=YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL
```

> The site runs without this set — the registration counter falls back to `0` and form submission shows a friendly error instead of crashing. Restart the dev server after editing `.env`.

See **[SETUP.md](./SETUP.md)** for deploying the Apps Script backend (source in [`Code.gs`](./Code.gs)).

## Project structure

```
src/
├── App.jsx                  # composes the page; owns the shared count hook
├── index.css                # Tailwind v4 import + @theme design tokens + glow utilities
├── components/ui/           # reusable primitives (GlowButton, Reveal, Section, Emoji, …)
├── sections/                # page sections (Navbar, Hero, About, Players, Footer, …)
│   └── registration/        # 3-step registration wizard
├── hooks/                   # useGsap, useRegistrationCount
├── lib/                     # constants, validation, localStorage, Apps Script API
└── data/content.js          # static copy (players, feature cards, timeline)
Code.gs                      # Google Apps Script backend (not bundled)
```

## Notes

- **RTL-first:** the page uses logical Tailwind utilities (`ms-*`, `pe-*`, `start-*`, `text-start`) so layout mirrors correctly. UI copy is in Hebrew.
- **Single polling source:** `useRegistrationCount` runs once in `App.jsx` and feeds both the counter and the form (30s interval).
- **Progress persistence:** the registration form saves to `localStorage` on every step, so users can close the browser and resume.
- Player portraits are styled placeholders — swap in real images where marked `// Replace placeholder with real image when received`.
- Tunables (`MIN_PLAYERS`, `MAX_TEAMS`) live in `src/lib/constants.js`.
