import { motion } from 'framer-motion'
import Section from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Emoji from '../components/ui/Emoji.jsx'
import { ABOUT_CARDS } from '../data/content.js'
import { ANCHORS } from '../lib/constants.js'

export default function About() {
  return (
    <Section id={ANCHORS.about} eyebrow="האירוע" title="?מה מחכה לכם">
      {/* Prize cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ABOUT_CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group h-full rounded-2xl border border-white/10 bg-navy/30 p-8 text-center backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-navy/50 hover:glow-gold-sm"
            >
              <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110">
                <Emoji char={card.icon} className="mx-auto" />
              </div>
              <h3 className="mb-2 text-2xl font-extrabold text-gold">
                {card.title}
              </h3>
              <p className="text-white/75">{card.text}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
