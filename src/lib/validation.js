// ── Form validation ─────────────────────────────────────────────────
// Hebrew error messages, returned as { field: message } maps.

import { GRADES } from './constants.js'

// Israeli mobile: 05X-XXXXXXX (10 digits, optional dash after the prefix).
const PHONE_RE = /^05\d-?\d{7}$/
// Requires local part + @ + domain + dot + TLD of at least 2 alpha chars.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

export function isValidIsraeliPhone(value) {
  return PHONE_RE.test(String(value).trim())
}

export function isValidEmail(value) {
  return EMAIL_RE.test(String(value).trim())
}

// Normalize a phone to 05X-XXXXXXX for display/storage.
export function formatPhone(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  return `${digits.slice(0, 3)}-${digits.slice(3)}`
}

function required(value) {
  return String(value ?? '').trim().length > 0
}

// At least two whitespace-separated words (first name + last name).
function isFullName(value) {
  return String(value ?? '').trim().split(/\s+/).length >= 2
}

// Step 1 — team & representative. All required except `neighborhood`.
export function validateTeam(data) {
  const errors = {}
  if (!required(data.teamName)) errors.teamName = 'נא להזין שם קבוצה'
  if (!required(data.contactName)) {
    errors.contactName = 'נא להזין שם נציג'
  } else if (!isFullName(data.contactName)) {
    errors.contactName = 'יש להזין שם פרטי ושם משפחה'
  }
  if (!isValidIsraeliPhone(data.phone)) errors.phone = 'מספר טלפון לא תקין (05X-XXXXXXX)'
  if (!isValidEmail(data.email)) errors.email = 'כתובת מייל לא תקינה'
  if (!required(data.school)) errors.school = 'נא להזין בית ספר'
  if (!GRADES.includes(data.grade)) errors.grade = 'נא לבחור שכבה'
  if (!required(data.city)) errors.city = 'נא להזין עיר מגורים'
  // neighborhood is optional — no check.
  return errors
}

// Step 2 — a single player.
export function validatePlayer(player) {
  const errors = {}
  if (!required(player.fullName)) {
    errors.fullName = 'נא להזין שם מלא'
  } else if (!isFullName(player.fullName)) {
    errors.fullName = 'יש להזין שם פרטי ושם משפחה'
  }
  const age = Number(player.age)
  if (!player.age || Number.isNaN(age) || age < 14 || age > 19) {
    errors.age = 'הגיל חייב להיות בין 14 ל-19'
  }
  if (!required(player.school)) errors.school = 'נא להזין בית ספר'
  if (!GRADES.includes(player.grade)) errors.grade = 'נא לבחור שכבה'
  if (!isValidIsraeliPhone(player.phone)) errors.phone = 'טלפון לא תקין'
  return errors
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0
}
