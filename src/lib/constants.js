// ── League / registration configuration ────────────────────────────
// Single source of truth for the numbers the PRD calls out.

export const MIN_PLAYERS = 9
export const MAX_PLAYERS = 9
export const MAX_TEAMS = 16

// Secret override: entering ROSTER_UNLOCK_CODE in the step-1 "קוד" field lowers
// the minimum roster (representative + others) from MIN_PLAYERS + 1 to
// MIN_PLAYERS_UNLOCKED + 1. Empty/wrong value → normal MIN_PLAYERS applies.
export const MIN_PLAYERS_UNLOCKED = 7
export const ROSTER_UNLOCK_CODE = '12345678'

export const LEAGUE = {
  name: 'ליגת הלב היהודי',
  startDate: '4.7.2026',
  stadium: 'איצטדיון טוברוק, נתניה',
  email: 'ligat.yn@gmail.com',
  phone: '053-278-7225',
  contactPerson: 'נועם עזרא',
}

// Per-player participation fee, displayed prominently on the page.
export const REGISTRATION_COST = 100

// Section anchors (used by navbar scroll + form target).
export const ANCHORS = {
  hero: 'hero',
  about: 'about',
  bracket: 'bracket',
  counter: 'counter',
  players: 'players',
  register: 'register',
}

// Grade options for the dropdowns (שכבה).
export const GRADES = ['י', 'יא', 'יב']

// localStorage key for in-progress registration.
export const STORAGE_KEY = 'ligat-yn:registration'

// Counter auto-refresh interval (ms).
export const COUNT_REFRESH_MS = 30_000
