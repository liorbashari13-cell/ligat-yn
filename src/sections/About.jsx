import { motion } from 'framer-motion'
import Section from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { ABOUT_CARDS } from '../data/content.js'
import { ANCHORS } from '../lib/constants.js'

function GiftIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <rect x="4" y="10" width="16" height="10" rx="1.2" />
      <rect x="3" y="7" width="18" height="4" rx="1" />
      <rect x="10.3" y="7" width="3.4" height="13" fill="#0d1117" opacity="0.55" />
      <circle cx="9" cy="5.2" r="2.1" />
      <circle cx="15" cy="5.2" r="2.1" />
    </svg>
  )
}

function ShirtIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8 4 4 7l2 3 2-1.5V20h8V8.5L18 10l2-3-4-3c-1 1.5-3 2-4 2s-3-.5-4-2z" />
    </svg>
  )
}

function ShoeIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M2 17a1 1 0 0 1 1-1h1.2l2.1-3.1c.3-.4.8-.6 1.3-.5l4.6 1c.4.1.8 0 1.1-.3l1.6-1.5c.4-.4 1-.5 1.5-.2l3 1.7c.5.3.8.8.8 1.4V16h1.8a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
    </svg>
  )
}

function StarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z" />
    </svg>
  )
}

const PRIZE_ICONS = {
  gift: GiftIcon,
  shirt: ShirtIcon,
  shoe: ShoeIcon,
  star: StarIcon,
}

export default function About() {
  return (
    <Section id={ANCHORS.about} eyebrow="האירוע" title="מה מחכה לכם">
      {/* Prize cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ABOUT_CARDS.map((card, i) => {
          const Icon = PRIZE_ICONS[card.icon]
          return (
            <Reveal key={card.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group h-full rounded-2xl border border-white/10 bg-navy/30 p-8 text-center backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-navy/50 hover:glow-gold-sm"
              >
                <Icon className="mx-auto mb-4 h-12 w-12 text-gold transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mb-2 text-2xl font-extrabold text-gold">
                  {card.title}
                </h3>
                <p className="text-white/75">{card.text}</p>
              </motion.div>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={0.4}>
        <p className="mt-8 text-center text-lg font-bold text-gold text-glow-gold">
          !ועוד הרבה הפתעות שוות לכל המשתתפים 🎉
        </p>
      </Reveal>
    </Section>
  )
}
