import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import StepIndicator from './StepIndicator.jsx'
import StepTeam from './StepTeam.jsx'
import StepPlayers from './StepPlayers.jsx'
import StepSummary from './StepSummary.jsx'
import RegistrationClosed from './RegistrationClosed.jsx'
import Emoji from '../../components/ui/Emoji.jsx'
import { submitRegistration } from '../../lib/api.js'
import { clearProgress, loadProgress, saveProgress } from '../../lib/storage.js'
import { ANCHORS } from '../../lib/constants.js'

const EMPTY_TEAM = {
  teamName: '',
  contactName: '',
  idNumber: '',
  phone: '',
  email: '',
  school: '',
  grade: '',
  city: '',
  neighborhood: '',
}

function fireConfetti() {
  const colors = ['#f6c400', '#ffd370', '#ffffff', '#2d7a3a']
  confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors })
  setTimeout(
    () => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0 }, colors }),
    150,
  )
  setTimeout(
    () => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1 }, colors }),
    300,
  )
}

export default function RegistrationForm({ full, onSubmitted }) {
  const saved = useRef(loadProgress())
  const [step, setStep] = useState(saved.current?.step ?? 1)
  const [team, setTeam] = useState(saved.current?.team ?? EMPTY_TEAM)
  const [players, setPlayers] = useState(saved.current?.players ?? [])
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')
  const [successTeam, setSuccessTeam] = useState('')

  // Persist progress on every change (PRD: survive a browser close).
  useEffect(() => {
    if (status === 'success') return
    saveProgress({ step, team, players })
  }, [step, team, players, status])

  const goTo = (n) => {
    setStep(n)
    document.getElementById(ANCHORS.register)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async ({ termsAcknowledged } = {}) => {
    setStatus('submitting')
    setError('')
    const payload = {
      ...team,
      termsAcknowledged,
      players: players.map(({ confirmed, ...p }) => p), // eslint-disable-line no-unused-vars
    }
    try {
      const res = await submitRegistration(payload)
      if (res?.success) {
        setSuccessTeam(team.teamName)
        setStatus('success')
        clearProgress()
        fireConfetti()
        onSubmitted?.()
      } else {
        setStatus('error')
        setError(res?.message || 'אירעה שגיאה בשליחה. נסו שוב.')
      }
    } catch {
      setStatus('error')
      setError('לא הצלחנו לשלוח את הטופס. בדקו את החיבור ונסו שוב.')
    }
  }

  // Registration full — replace the whole form.
  if (full && status !== 'success') {
    return (
      <section id={ANCHORS.register} className="px-5 py-20 md:px-8">
        <RegistrationClosed />
      </section>
    )
  }

  return (
    <section id={ANCHORS.register} className="px-5 py-20 md:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block text-sm font-bold uppercase tracking-[0.25em] text-gold">
            הרשמה
          </span>
          <h2 className="text-3xl font-black text-white md:text-5xl">
            רשמו את הקבוצה שלכם
          </h2>
        </div>

        <div className="rounded-3xl border-2 border-gold/50 bg-gradient-to-br from-navy/60 to-navy-deep p-6 glow-gold md:p-10">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center"
            >
              <div className="mb-4 text-6xl">
                <Emoji char="🎉" className="mx-auto" />
              </div>
              <h3 className="text-2xl font-black text-gold text-glow-gold md:text-3xl">
                !הרישום התקבל בהצלחה 🎉
              </h3>
              <p className="mt-3 text-white/80">
                רישומכם יאושר סופית רק לאחר השיחה עם נועם
              </p>
              <a
                href={`https://wa.me/972532787225?text=${encodeURIComponent(
                  `היי נועם! נרשמנו לליגת הלב היהודי 🏆 שם הקבוצה: ${successTeam} נציג: ${team.contactName} טלפון: ${team.phone}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: '#25D366' }}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-current" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.668.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.746-.872-2.888-1.553-4.038-3.524-.305-.524.305-.486.873-1.62.099-.198.05-.371-.05-.52-.099-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.668-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.059 3.143 5.062 4.282 2.521.937 3.039.6 3.589.5.549-.1 1.758-.717 2.006-1.413.249-.696.249-1.292.174-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                פתח שיחה עם נועם לאישור ותשלום 💬
              </a>
              <p className="mt-5 text-center text-xs text-white/45">
                📧 אישור הרישום נשלח למייל שלך — אם לא קיבלת, בדוק בתיקיית הספאם שבמייל
              </p>
            </motion.div>
          ) : (
            <>
              {/* Info box — shown before Step 1 begins */}
              <div className="mb-6 rounded-xl border border-gold/50 bg-navy-deep/80 px-5 py-4 text-sm text-white/80">
                <p className="mb-2 font-bold text-gold">📋 לפני שמתחילים - חשוב לדעת:</p>
                <ul className="space-y-1.5">
                  <li>• מספר משתתפים בקבוצה הוא 10 בדיוק</li>
                  <li>• בסיום הרישום תועברו לאחראי הטורניר כדי למלא טופסי הצהרת בריאות ותקנון</li>
                  <li>• ללא מילוי טפסים אלו לא ניתן להשתתף בטורניר</li>
                  <li>• הרישום יאושר סופית על ידינו בהתאם לכמות הקבוצות הפנויות - ההרשמה מוגבלת</li>
                </ul>
              </div>

              <StepIndicator current={step} />
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <StepTeam
                    key="step1"
                    data={team}
                    onChange={setTeam}
                    onNext={() => goTo(2)}
                  />
                )}
                {step === 2 && (
                  <StepPlayers
                    key="step2"
                    players={players}
                    team={team}
                    onChange={setPlayers}
                    onNext={() => goTo(3)}
                    onBack={() => goTo(1)}
                  />
                )}
                {step === 3 && (
                  <StepSummary
                    key="step3"
                    team={team}
                    players={players}
                    status={status}
                    error={error}
                    onSubmit={handleSubmit}
                    onBack={() => goTo(2)}
                  />
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
