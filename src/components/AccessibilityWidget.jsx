import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const FONT_STEPS = [1, 1.2, 1.4]
const FONT_LABELS = ['רגיל', 'גדול', 'גדול מאוד']

function A11yIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      {/* Head */}
      <circle cx="12" cy="4.5" r="2" />
      {/* Body with raised arms — universal accessibility silhouette */}
      <path d="M16 8.5H8l-2 3h4.5v8h3v-8H18l-2-3z" />
    </svg>
  )
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-2">
      <span className="text-sm font-medium text-white/85">{label}</span>
      <div
        className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
          checked ? 'bg-gold' : 'bg-white/20'
        }`}
      >
        <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
            checked ? 'start-0.5 translate-x-[-100%] me-[-20px]' : 'end-0.5'
          }`}
          style={{ insetInlineEnd: checked ? '2px' : undefined, insetInlineStart: checked ? undefined : '2px' }}
        />
      </div>
    </label>
  )
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [fontStep, setFontStep] = useState(0)
  const [highContrast, setHighContrast] = useState(false)
  const [noAnimations, setNoAnimations] = useState(false)

  // Apply font scale to root so rem units scale site-wide
  useEffect(() => {
    const scale = FONT_STEPS[fontStep]
    document.documentElement.style.fontSize = scale === 1 ? '' : `${scale * 100}%`
  }, [fontStep])

  useEffect(() => {
    document.documentElement.classList.toggle('a11y-high-contrast', highContrast)
  }, [highContrast])

  useEffect(() => {
    document.documentElement.classList.toggle('a11y-no-animations', noAnimations)
  }, [noAnimations])

  return (
    <div className="fixed bottom-6 end-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-64 rounded-2xl border border-gold/30 bg-navy-deep/95 p-4 shadow-2xl backdrop-blur-md"
            role="dialog"
            aria-label="כלי נגישות"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-bold text-gold">נגישות</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-white/50 transition-colors hover:text-white"
                aria-label="סגור כלי נגישות"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Font size */}
            <div className="border-b border-white/10 pb-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/50">
                גודל טקסט
              </p>
              <div className="flex gap-2">
                {FONT_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFontStep(i)}
                    aria-pressed={fontStep === i}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-colors ${
                      fontStep === i
                        ? 'bg-gold text-navy-deep'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {FONT_LABELS[i]}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="pt-1">
              <ToggleRow
                label="ניגודיות גבוהה"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
              />
              <div className="border-t border-white/10" />
              <ToggleRow
                label="הפסק אנימציות"
                checked={noAnimations}
                onChange={(e) => setNoAnimations(e.target.checked)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? 'סגור כלי נגישות' : 'פתח כלי נגישות'}
        aria-expanded={open}
        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-lg transition-colors ${
          open
            ? 'border-gold bg-gold text-navy-deep'
            : 'border-gold/60 bg-navy-deep/90 text-gold backdrop-blur-md hover:border-gold hover:bg-navy'
        }`}
      >
        <A11yIcon className="h-6 w-6" />
      </motion.button>
    </div>
  )
}
