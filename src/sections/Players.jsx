import { motion } from 'framer-motion'
import Section from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { PLAYERS } from '../data/content.js'
import { ANCHORS } from '../lib/constants.js'

export default function Players() {
  return (
    <Section
      id={ANCHORS.players}
      eyebrow="ליגת העל ונבחרת ישראל"
      title="הכוכבים שתפגשו"
    >
      <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
        {PLAYERS.map((player, i) => (
          <Reveal key={player.name} delay={(i % 4) * 0.08}>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="group relative h-full overflow-hidden rounded-2xl border border-gold/30 bg-dark-soft text-center transition-all duration-300 hover:border-gold hover:glow-gold"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-gradient-to-b from-navy-light to-navy-deep">
                <img
                  src={player.image}
                  alt={player.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* fade into the card so the photo blends with the info panel */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark-soft to-transparent" />
              </div>

              <div className="relative px-1.5 py-2.5 sm:px-3 sm:py-4">
                <h3 className="truncate text-[11px] font-extrabold text-white sm:text-base md:text-lg">
                  {player.name}
                </h3>
                <p className="mt-0.5 truncate text-[9px] font-semibold text-gold sm:mt-1 sm:text-sm">
                  {player.role}
                </p>
              </div>

              {/* gold sheen on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
