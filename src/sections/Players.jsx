import { motion } from 'framer-motion'
import Section from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Emoji from '../components/ui/Emoji.jsx'
import { PLAYERS } from '../data/content.js'
import { ANCHORS } from '../lib/constants.js'

export default function Players() {
  return (
    <Section
      id={ANCHORS.players}
      eyebrow="ליגת העל"
      title="הכוכבים שתפגשו"
    >
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {PLAYERS.map((player, i) => (
          <Reveal key={player.name} delay={(i % 4) * 0.08}>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-navy/40 to-dark-soft p-6 text-center transition-all duration-300 hover:border-gold/60 hover:glow-gold"
            >
              {/* Placeholder portrait — football icon.
                  // Replace placeholder with real image when received */}
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-navy-light to-navy-deep text-4xl ring-2 ring-gold/40 transition-transform duration-300 group-hover:scale-105 group-hover:ring-gold">
                <Emoji char="⚽" />
              </div>

              <h3 className="text-lg font-extrabold text-white">
                {player.name}
              </h3>
              <p className="mt-1 text-sm font-semibold text-gold">
                שחקן ליגת העל
              </p>

              {/* gold sheen on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
