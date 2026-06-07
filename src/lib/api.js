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
 * Apps Script web apps don't expose CORS headers on their responses, so a
 * normal (cors) fetch that tries to READ the response is blocked by the
 * browser ("Failed to fetch"). We send the request in `no-cors` mode: the
 * POST still reaches the script and the row is written to the sheet, but
 * the response comes back "opaque" — we can't read its status or body.
 *
 * `text/plain` keeps this a CORS "simple request" (no preflight), and the
 * raw JSON string is still available server-side via `e.postData.contents`,
 * so `JSON.parse` works in Code.gs.
 *
 * Because the response is opaque we can't read the server's
 * { success, teamNumber } payload, so we resolve optimistically when the
 * request completes without a network error. The "registration full" state
 * is reflected by the GET counter (useRegistrationCount), which the form
 * refreshes immediately after submit.
 *
 * @throws if the URL isn't configured, or on a genuine network failure
 *         (offline / DNS) — both surface as an error in the form.
 */
export async function submitRegistration(payload) {
  if (!isConfigured()) {
    throw new Error('VITE_APPS_SCRIPT_URL is not configured')
  }
  await fetch(URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  })
  // Opaque response — assume success if fetch didn't throw.
  return { success: true }
}
