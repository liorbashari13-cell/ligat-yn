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
  if (!isConfigured()) return { count: 8, max: MAX_TEAMS, configured: false }
  try {
    const res = await fetch(URL, { method: 'GET' })
    const data = await res.json()
    return {
      count: Number(data.count) || 0,
      max: Number(data.max) || MAX_TEAMS,
      configured: true,
    }
  } catch {
    return { count: 8, max: MAX_TEAMS, configured: true, error: true }
  }
}

// Make.com webhook that receives completed registrations.
const MAKE_WEBHOOK_URL =
  'https://hook.eu2.make.com/jdjmx6gg3l9pmmpd2exdedw4gpkrs43j'

/**
 * POST a completed registration to the Make.com webhook.
 *
 * Make webhooks expose proper CORS headers (and answer the preflight that
 * `application/json` triggers), so a normal `cors` fetch works and we can
 * read the response. On success Make returns the plain text `Accepted`, not
 * JSON, so we treat any 2xx (`res.ok`) as success rather than parsing a body.
 *
 * @throws on a non-2xx response or a genuine network failure — both surface
 *         as an error in the form.
 */
export async function submitRegistration(data) {
  const res = await fetch(MAKE_WEBHOOK_URL, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error(`Submission failed (${res.status})`)
  }
  return { success: true }
}
