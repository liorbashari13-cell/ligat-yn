import { motion } from 'framer-motion'
import Reveal from '../components/ui/Reveal.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import Emoji from '../components/ui/Emoji.jsx'
import { ANCHORS } from '../lib/constants.js'

/**
 * Live registration counter. Receives count/max from the shared hook in
 * App (single polling source). Glowing gold panel + animated bar.
 */
export default function RegistrationCounter({ count, max, loading }) {
  const remaining = Math.max(0, max - count)

  return (
    <section id={ANCHORS.counter} className="px-5 py-16 md:px-8">
      <Reveal>
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gold/50 bg-gradient-to-br from-navy via-navy-deep to-dark p-8 text-center glow-gold md:p-12">
          {/* soft gold halo */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />

          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold">
              ההרשמה בעיצומה
            </p>

            <div className="my-5 flex items-end justify-center gap-3 text-white">
              <motion.span
                key={count}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="text-6xl font-black text-gold text-glow-gold md:text-7xl"
              >
                {loading ? '—' : count}
              </motion.span>
              <span className="pb-2 text-2xl font-bold text-white/70">
                / {max}
              </span>
            </div>

            <p className="mb-6 text-lg font-semibold text-white md:text-xl">
              {loading
                ? 'טוען מספר נרשמים…'
                : `${count} קבוצות נרשמו מתוך ${max} מקומות`}
            </p>

            <ProgressBar value={count} max={max} />

            {!loading && (
              <p className="mt-4 text-sm text-gold-light">
                {remaining > 0 ? (
                  `נותרו ${remaining} מקומות בלבד — אל תפספסו!`
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    כל המקומות נתפסו <Emoji char="🎉" />
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
