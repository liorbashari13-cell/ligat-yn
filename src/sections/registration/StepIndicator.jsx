const STEPS = ['פרטי קבוצה', 'שחקנים', 'סיכום']

/**
 * 1–2–3 progress header for the registration card. `current` is 1-based.
 */
export default function StepIndicator({ current }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {STEPS.map((label, i) => {
        const n = i + 1
        const done = n < current
        const active = n === current
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black transition-colors ${
                  active
                    ? 'bg-gold text-navy-deep glow-gold-sm'
                    : done
                      ? 'bg-grass text-white'
                      : 'bg-navy-deep text-white/50 ring-1 ring-white/15'
                }`}
              >
                {done ? '✓' : n}
              </div>
              <span
                className={`text-xs font-semibold ${
                  active ? 'text-gold' : 'text-white/50'
                }`}
              >
                {label}
              </span>
            </div>
            {n < STEPS.length && (
              <div
                className={`mb-5 h-0.5 w-8 md:w-14 ${
                  done ? 'bg-grass' : 'bg-white/15'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
