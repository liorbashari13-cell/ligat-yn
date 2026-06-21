import { useState } from 'react'
import { motion } from 'framer-motion'
import GlowButton from '../../components/ui/GlowButton.jsx'

function Row({ label, value, ltr }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 py-2 last:border-0">
      <span className="text-white/60">{label}</span>
      <span className={`font-semibold text-white ${ltr ? 'ltr' : ''}`}>
        {value || '—'}
      </span>
    </div>
  )
}

function findDuplicateError(team, players) {
  const allIds = [team.idNumber, ...players.map((p) => p.idNumber)]
  const allEmails = [team.email, ...players.map((p) => p.email)].map((e) =>
    String(e ?? '').toLowerCase().trim(),
  )

  const seenIds = new Set()
  for (const id of allIds) {
    if (!id) continue
    if (seenIds.has(id)) return 'תעודת זהות זו כבר הוזנה לשחקן אחר בקבוצה'
    seenIds.add(id)
  }

  const seenEmails = new Set()
  for (const email of allEmails) {
    if (!email) continue
    if (seenEmails.has(email)) return 'כתובת מייל זו כבר הוזנה לשחקן אחר בקבוצה'
    seenEmails.add(email)
  }

  return null
}

function Checkmark() {
  return (
    <svg viewBox="0 0 12 9" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 4.5L4.5 8L11 1" />
    </svg>
  )
}

export default function StepSummary({ team, players, onSubmit, onBack, status, error }) {
  const submitting = status === 'submitting'
  const [dupError, setDupError] = useState(null)
  const [termsChecked, setTermsChecked] = useState(false)
  const [termsTimestamp, setTermsTimestamp] = useState(null)
  const [termsError, setTermsError] = useState(null)

  const handleTermsChange = (e) => {
    const checked = e.target.checked
    setTermsChecked(checked)
    if (checked) {
      setTermsTimestamp(new Date().toISOString())
      setTermsError(null)
    } else {
      setTermsTimestamp(null)
    }
  }

  const handleSubmit = () => {
    if (!termsChecked) {
      setTermsError('יש לאשר את התנאים לפני שליחת הרישום')
      return
    }
    const dup = findDuplicateError(team, players)
    if (dup) {
      setDupError(dup)
      return
    }
    setDupError(null)
    setTermsError(null)
    onSubmit({ termsAcknowledged: termsTimestamp })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
    >
      {/* Team */}
      <div className="rounded-2xl border border-white/10 bg-dark-soft/60 p-5">
        <h4 className="mb-3 text-lg font-extrabold text-gold">פרטי הקבוצה</h4>
        <Row label="שם הקבוצה" value={team.teamName} />
        <Row label="שם הנציג" value={team.contactName} />
        <Row label="ת&quot;ז נציג" value={team.idNumber} ltr />
        <Row label="טלפון" value={team.phone} ltr />
        <Row label="מייל" value={team.email} ltr />
        <Row label="בית ספר" value={team.school} />
        <Row label="שכבה" value={team.grade} />
        <Row label="עיר מגורים" value={team.city} />
        <Row label="שכונה" value={team.neighborhood} />
      </div>

      {/* Players */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-dark-soft/60 p-5">
        <h4 className="mb-3 text-lg font-extrabold text-gold">
          שחקנים ({players.length})
        </h4>
        <div className="space-y-2">
          {players.map((p, i) => (
            <div
              key={i}
              className="flex flex-wrap justify-between gap-2 rounded-lg bg-navy/30 px-3 py-2"
            >
              <span className="font-semibold text-white">
                {i + 1}. {p.fullName}
              </span>
              <span className="text-sm text-white/60">
                ת&quot;ז {p.idNumber} · גיל {p.age}
              </span>
            </div>
          ))}
        </div>
      </div>

      {dupError && (
        <p className="mt-4 text-center text-sm font-semibold text-red-400">{dupError}</p>
      )}
      {error && (
        <p className="mt-4 text-center text-sm font-semibold text-red-400">{error}</p>
      )}

      {/* Terms acknowledgement */}
      <div className={`mt-6 rounded-xl border p-4 transition-colors ${termsError ? 'border-red-400/60 bg-red-400/5' : 'border-gold/30 bg-navy/30'}`}>
        <label className="flex cursor-pointer items-start gap-3">
          {/* Custom gold checkbox */}
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={handleTermsChange}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label="אישור תנאי השתתפות"
            />
            <div
              className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all duration-150 ${
                termsChecked
                  ? 'border-gold bg-gold text-navy-deep'
                  : 'border-gold/50 bg-dark-soft/80 text-transparent'
              }`}
            >
              <Checkmark />
            </div>
          </div>
          <span className="text-sm leading-relaxed text-white/80">
            קראתי ואני מאשר/ת כי מילוי טופס זה אינו מהווה הרשמה סופית. ההשתתפות בטורניר מותנית בחתימה פיזית על תקנון והצהרת בריאות בתיאום עם נועם עזרא.
          </span>
        </label>
        {termsError && (
          <p className="mt-2 pe-1 text-xs font-semibold text-red-400">{termsError}</p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="rounded-full px-6 py-3 font-semibold text-white/70 transition-colors hover:text-white disabled:opacity-40"
        >
          → חזרה
        </button>
        <GlowButton
          onClick={handleSubmit}
          disabled={!termsChecked || submitting}
          pulse
          className="!px-10"
        >
          {submitting ? 'שולח…' : 'שלח רישום'}
        </GlowButton>
      </div>
    </motion.div>
  )
}
