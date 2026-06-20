import { motion } from 'framer-motion'
import Section from '../components/ui/Section.jsx'
import { ANCHORS } from '../lib/constants.js'

// Taller than old layout to comfortably fit 4 group boxes (120px per box at 30rem)
const COL_HEIGHT = 'h-[30rem]'

function TrophyIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6 3h12v5a6 6 0 0 1-12 0V3z" />
      <path
        d="M6 4.5H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4h1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M18 4.5h2a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4h-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect x="11" y="13.3" width="2" height="3.2" />
      <rect x="9" y="16.3" width="6" height="1.6" rx="0.6" />
      <rect x="7" y="18.1" width="10" height="1.8" rx="0.7" />
    </svg>
  )
}

function FootballIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" fill="#ffffff" stroke="#f6c400" strokeWidth="1.3" />
      <polygon points="12,7.3 15.2,9.7 14,13.5 10,13.5 8.8,9.7" fill="#f6c400" />
      <path
        d="M12 7.3 L12 4.2 M15.2 9.7 L18.3 8.1 M14 13.5 L15.8 17.1 M10 13.5 L8.2 17.1 M8.8 9.7 L5.7 8.1"
        stroke="#f6c400"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function Column({ label, children }) {
  return (
    <div className="flex shrink-0 flex-col items-center">
      <div className="mb-2 flex h-7 items-center justify-center sm:h-8 md:h-9">
        {label && (
          <span className="text-glow-gold whitespace-nowrap text-xs font-extrabold tracking-wide text-gold sm:text-sm md:text-base">
            {label}
          </span>
        )}
      </div>
      <div className={`relative ${COL_HEIGHT}`}>{children}</div>
    </div>
  )
}

// A single group box with "בית X" heading + 4 team-slot rows.
function GroupBox({ label, fromX = 0, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: fromX }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="animate-sweep-r16 mx-auto w-28 overflow-hidden rounded-lg border border-gold/60 bg-gradient-to-b from-navy/60 to-dark-soft sm:w-32 md:w-36"
    >
      <div className="border-b border-gold/30 bg-gold/20 px-2 py-0.5 text-center">
        <span className="text-[9px] font-extrabold text-gold sm:text-[10px] md:text-xs">{label}</span>
      </div>
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          className={`flex items-center gap-1.5 px-2 py-1 ${i > 0 ? 'border-t border-gold/20' : ''}`}
        >
          <FootballIcon className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
          <div className="h-1 flex-1 rounded-full bg-white/20" />
        </div>
      ))}
    </motion.div>
  )
}

// Column of 4 group boxes. The 4-row grid keeps centers at 12.5/37.5/62.5/87.5%
// so they align exactly with BracketConnector(count=4)'s elbow math.
function GroupsColumn({ label, fromX = 0 }) {
  return (
    <Column label={label}>
      <div className="grid h-full" style={{ gridTemplateRows: 'repeat(4, 1fr)' }}>
        {['בית 1', 'בית 2', 'בית 3', 'בית 4'].map((g, i) => (
          <div key={i} className="flex items-center justify-center px-1 py-1">
            <GroupBox label={g} fromX={fromX} delay={i * 0.08} />
          </div>
        ))}
      </div>
    </Column>
  )
}

function BracketSlot({ fromX = 0, sweepClass = 'animate-sweep-sf' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: fromX }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`flex h-10 w-24 items-center justify-center gap-1.5 rounded-lg border border-gold/50 bg-gradient-to-b from-navy/60 to-dark-soft px-1.5 sm:h-11 sm:w-28 md:h-12 md:w-32 ${sweepClass}`}
    >
      <FootballIcon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
    </motion.div>
  )
}

// count slots in equal grid rows so centers match BracketConnector percentages.
function SlotColumn({ count, label, fromX, sweepClass }) {
  return (
    <Column label={label}>
      <div className="grid h-full" style={{ gridTemplateRows: `repeat(${count}, 1fr)` }}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="flex items-center justify-center">
            <BracketSlot fromX={fromX} sweepClass={sweepClass} />
          </div>
        ))}
      </div>
    </Column>
  )
}

// Elbow connectors: each pair of `count` rows merges to a midpoint.
function BracketConnector({ count }) {
  const pairs = Array.from({ length: count / 2 }, (_, i) => i)
  return (
    <Column>
      <div className="relative h-full w-6 sm:w-8 md:w-10">
        {pairs.map((i) => {
          const y1 = ((2 * i + 0.5) / count) * 100
          const y2 = ((2 * i + 1.5) / count) * 100
          const yMid = (y1 + y2) / 2
          return (
            <div
              key={i}
              className="animate-bracket-line absolute inset-0"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className="absolute left-0 h-px w-1/2 bg-gold/70" style={{ top: `${y1}%` }} />
              <span className="absolute left-0 h-px w-1/2 bg-gold/70" style={{ top: `${y2}%` }} />
              <span
                className="absolute left-1/2 w-px bg-gold/70"
                style={{ top: `${y1}%`, height: `${y2 - y1}%` }}
              />
              <span className="absolute left-1/2 h-px w-1/2 bg-gold/70" style={{ top: `${yMid}%` }} />
            </div>
          )
        })}
      </div>
    </Column>
  )
}

function FinalColumn() {
  return (
    <Column label="גמר">
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <BracketSlot sweepClass="animate-sweep-final" />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="animate-trophy-glow flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-gradient-to-b from-navy/70 to-dark-soft text-gold sm:h-12 sm:w-12"
        >
          <TrophyIcon className="h-5 w-5 sm:h-7 sm:w-7" />
        </motion.div>
      </div>
    </Column>
  )
}

// ── Mobile: stacked vertical layout ──────────────────────────────────

function DownArrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold/60" fill="currentColor" aria-hidden>
      <path d="M12 17 5 10h14z" />
    </svg>
  )
}

function MobileGroupBox({ label, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      className="rounded-xl border border-gold/50 bg-gradient-to-b from-navy/60 to-dark-soft p-2"
    >
      <div className="mb-1.5 text-center text-[10px] font-extrabold text-gold">{label}</div>
      <div className="flex flex-wrap justify-center gap-1">
        {Array.from({ length: 4 }, (_, i) => (
          <span
            key={i}
            className="flex h-5 w-5 items-center justify-center rounded-full border border-gold/40 bg-navy/40"
          >
            <FootballIcon className="h-3 w-3" />
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function MobileRound({ label, count, sweepClass }) {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-center gap-2">
        <span className="text-glow-gold text-sm font-extrabold tracking-wide text-gold">{label}</span>
        <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs font-bold text-gold">
          {count} קבוצות
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
            className={`flex h-7 w-7 items-center justify-center rounded-full border border-gold/50 bg-gradient-to-b from-navy/60 to-dark-soft ${sweepClass}`}
          >
            <FootballIcon className="h-3.5 w-3.5" />
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function MobileBracket() {
  return (
    <div className="flex flex-col items-center gap-1 md:hidden">
      {/* Group stage — 4 group cards in 2×2 grid */}
      <div className="w-full">
        <div className="mb-3 flex items-center justify-center gap-2">
          <span className="text-glow-gold text-sm font-extrabold tracking-wide text-gold">שלב הבתים</span>
          <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs font-bold text-gold">4 בתים</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['בית 1', 'בית 2', 'בית 3', 'בית 4'].map((g, i) => (
            <MobileGroupBox key={i} label={g} index={i} />
          ))}
        </div>
      </div>
      <DownArrow />
      <MobileRound label="חצי גמר" count={4} sweepClass="animate-sweep-sf" />
      <DownArrow />
      <MobileRound label="גמר" count={2} sweepClass="animate-sweep-final" />
      <DownArrow />
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="animate-trophy-glow mt-1 text-gold"
      >
        <TrophyIcon className="h-14 w-14" />
      </motion.div>
      <p className="mt-4 text-center text-sm font-bold text-gold text-glow-gold">
        זוכי הגמר ישחקו משחק מול כוכבי ליגת העל ונבחרת ישראל
      </p>
    </div>
  )
}

export default function TournamentBracket() {
  return (
    <Section id={ANCHORS.bracket} eyebrow="הדרך לגמר" title="מבנה הטורניר">
      {/* Desktop: horizontal bracket — groups → SF → Final */}
      <div className="hidden md:block">
        <div className="animate-trophy-glow mb-4 flex justify-center text-gold">
          <TrophyIcon className="h-16 w-16 md:h-20 md:w-20" />
        </div>
        <p className="mb-8 text-center text-base font-bold text-gold text-glow-gold">
          זוכי הגמר ישחקו משחק מול כוכבי ליגת העל ונבחרת ישראל
        </p>

        <div className="rounded-3xl border border-gold/20 bg-gradient-to-b from-navy/25 to-transparent p-4 sm:p-6">
          <div
            className="scrollbar-gold overflow-x-auto pb-2"
            dir="ltr"
            style={{ scrollbarColor: '#f6c400 #131a24', scrollbarWidth: 'thin' }}
          >
            <div className="mx-auto flex w-max items-start">
              <GroupsColumn label="שלב הבתים" fromX={-16} />
              <BracketConnector count={4} />
              <SlotColumn count={2} label="חצי גמר" fromX={-16} sweepClass="animate-sweep-sf" />
              <BracketConnector count={2} />
              <FinalColumn />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked vertical bracket */}
      <div className="rounded-3xl border border-gold/20 bg-gradient-to-b from-navy/25 to-transparent p-5 md:hidden">
        <MobileBracket />
      </div>
    </Section>
  )
}
