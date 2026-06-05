// ── League / registration configuration ────────────────────────────
// Single source of truth for the numbers the PRD calls out.

export const MIN_PLAYERS = 8 // Change this number to update minimum players required
export const MAX_TEAMS = 19

export const LEAGUE = {
  name: 'ליגת יראנו ניסים',
  startDate: '1.7.2026',
  stadium: 'איצטדיון טוברוק, נתניה',
  email: 'ligat.yn@gmail.com',
}

// Section anchors (used by navbar scroll + form target).
export const ANCHORS = {
  hero: 'hero',
  about: 'about',
  players: 'players',
  register: 'register',
}

// Grade options for the dropdowns (שכבה).
export const GRADES = ['י', 'יא', 'יב']

// localStorage key for in-progress registration.
export const STORAGE_KEY = 'ligat-yn:registration'

// Counter auto-refresh interval (ms).
export const COUNT_REFRESH_MS = 30_000
