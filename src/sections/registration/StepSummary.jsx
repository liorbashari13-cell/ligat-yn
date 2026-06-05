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

export default function StepSummary({ team, players, onSubmit, onBack, status, error }) {
  const submitting = status === 'submitting'

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
              className="flex justify-between gap-4 rounded-lg bg-navy/30 px-3 py-2"
            >
              <span className="font-semibold text-white">
                {i + 1}. {p.fullName}
              </span>
              <span className="text-sm text-white/60">
                גיל {p.age} · שכבה {p.grade}
              </span>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <p className="mt-4 text-center text-sm font-semibold text-red-400">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="rounded-full px-6 py-3 font-semibold text-white/70 transition-colors hover:text-white disabled:opacity-40"
        >
          → חזרה
        </button>
        <GlowButton onClick={onSubmit} disabled={submitting} pulse className="!px-10">
          {submitting ? 'שולח…' : 'שלח רישום'}
        </GlowButton>
      </div>
    </motion.div>
  )
}
