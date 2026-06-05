// ── Google Apps Script integration ──────────────────────────────────
// The web app URL lives in VITE_APPS_SCRIPT_URL (.env).

import { MAX_TEAMS } from './constants.js'

const URL = import.meta.env.VITE_APPS_SCRIPT_URL

function isConfigured() {
  return URL && URL !== 'YOUR_URL_HERE'
}

/**
 * GET the current registration count.
 * Returns { count, max }. On any failure (not configured, network, CORS)
 * we fall back to count 0 so the page still renders gracefully.
 */
export async function getRegistrationCount() {
  if (!isConfigured()) return { count: 0, max: MAX_TEAMS, configured: false }
  try {
    const res = await fetch(URL, { method: 'GET' })
    const data = await res.json()
    return {
      count: Number(data.count) || 0,
      max: Number(data.max) || MAX_TEAMS,
      configured: true,
    }
  } catch {
    return { count: 0, max: MAX_TEAMS, configured: true, error: true }
  }
}

/**
 * POST a completed registration.
 *
 * We send the body as text/plain on purpose: Apps Script web apps don't
 * answer the CORS preflight that a `application/json` content-type would
 * trigger, so a JSON content-type makes the browser block the request.
 * `e.postData.contents` is still the raw string, so JSON.parse works
 * server-side.
 *
 * Returns the parsed server response, e.g.
 *   { success: true, teamNumber }  |  { success: false, message }
 */
export async function submitRegistration(payload) {
  if (!isConfigured()) {
    throw new Error('VITE_APPS_SCRIPT_URL is not configured')
  }
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
  return res.json()
}
