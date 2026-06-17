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

  const handleSubmit = async () => {
    setStatus('submitting')
    setError('')
    const payload = {
      ...team,
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
                !הקבוצה {successTeam} נרשמה בהצלחה
              </h3>
              <p className="mt-3 flex items-center justify-center gap-2 text-white/80">
                אישור נשלח למייל שלך <Emoji char="🎉" />
              </p>
            </motion.div>
          ) : (
            <>
              {/* Info box — shown before Step 1 begins */}
              <div className="mb-6 rounded-xl border border-gold/50 bg-navy-deep/80 px-5 py-4 text-sm text-white/80">
                <p className="mb-2 font-bold text-gold">📋 לפני שמתחילים - חשוב לדעת:</p>
                <ul className="space-y-1.5">
                  <li>• עליך למלא פרטים עבור כל 10 שחקני הקבוצה</li>
                  <li>• בסיום הרישום תועברו לשיחה עם נועם לאישור בריאותי ותשלום</li>
                  <li>• רישומכם יאושר סופית רק לאחר השיחה עם נועם</li>
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
