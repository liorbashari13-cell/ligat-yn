// ── localStorage persistence ────────────────────────────────────────
// The PRD requires saving progress at every step so a user can close the
// browser and resume. One JSON blob under STORAGE_KEY.

import { STORAGE_KEY } from './constants.js'

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveProgress(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Quota/private-mode failures are non-fatal — keep the form usable.
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
