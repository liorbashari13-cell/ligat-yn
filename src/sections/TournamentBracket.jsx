import { motion } from 'framer-motion'
import Section from '../components/ui/Section.jsx'
import { ANCHORS } from '../lib/constants.js'

// Shared height for every column's slot/connector area so percentage-based
// math lines up exactly between adjacent columns (see BracketConnector).
const COL_HEIGHT = 'h-64 sm:h-80 md:h-96'

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

// Gold-and-white football — gold pentagon seams instead of the classic
// black ones, to stay on-brand.
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

function BracketSlot({ fromX = 0, sweepClass = 'animate-sweep-r16', number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: fromX }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`flex h-10 w-24 items-center justify-center gap-1.5 rounded-lg border border-gold/50 bg-gradient-to-b from-navy/60 to-dark-soft px-1.5 sm:h-11 sm:w-28 md:h-12 md:w-32 ${sweepClass}`}
    >
      <FootballIcon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
      {number && (
        <span className="truncate text-[9px] font-bold text-white sm:text-[11px] md:text-xs">
          קבוצה {number}
        </span>
      )}
    </motion.div>
  )
}

// A round of `count` slots, vertically centered on equal CSS-grid rows so
// each pair's midpoint exactly matches the next round's slot center.
function SlotColumn({ count, label, fromX, sweepClass, startNumber }) {
  return (
    <Column label={label}>
      <div className="grid h-full" style={{ gridTemplateRows: `repeat(${count}, 1fr)` }}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="flex items-center justify-center">
            <BracketSlot
              fromX={fromX}
              sweepClass={sweepClass}
              number={startNumber ? startNumber + i : undefined}
            />
          </div>
        ))}
      </div>
    </Column>
  )
}

// Draws the gold "elbow" lines merging each pair of `count` slots into one
// point on the far side. `mirrored` flips it for the right half of the
// bracket (input from the right, output to the left).
function BracketConnector({ count, mirrored = false }) {
  const pairs = Array.from({ length: count / 2 }, (_, i) => i)
  return (
    <Column>
      <div className={`relative h-full w-6 sm:w-8 md:w-10 ${mirrored ? 'scale-x-[-1]' : ''}`}>
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
      <div className="flex h-full flex-col items-center justify-center gap-2.5">
        <BracketSlot sweepClass="animate-sweep-final" />
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="animate-sweep-trophy flex h-9 w-9 items-center justify-center rounded-full border border-gold bg-gradient-to-b from-navy/70 to-dark-soft text-gold sm:h-10 sm:w-10"
        >
          <TrophyIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.div>
        <BracketSlot sweepClass="animate-sweep-final" />
      </div>
    </Column>
  )
}

// ── Mobile: stacked vertical layout ──────────────────────────────────
// The horizontal bracket is unreadable on narrow screens, so below md we
// show each round as a heading + a row of small pill badges instead.

function DownArrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold/60" fill="currentColor" aria-hidden>
      <path d="M12 17 5 10h14z" />
    </svg>
  )
}

function MobileRound({ label, count, numbered, sweepClass }) {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-center gap-2">
        <span className="text-glow-gold text-sm font-extrabold tracking-wide text-gold">
          {label}
        </span>
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
            transition={{ duration: 0.4, delay: i * 0.02, ease: 'easeOut' }}
            className={`flex h-7 w-7 items-center justify-center rounded-full border border-gold/50 bg-gradient-to-b from-navy/60 to-dark-soft text-[10px] font-bold text-white ${sweepClass}`}
          >
            {numbered ? i + 1 : <FootballIcon className="h-3.5 w-3.5" />}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function MobileBracket() {
  return (
    <div className="flex flex-col items-center gap-1 md:hidden">
      <MobileRound label="שמינית גמר" count={16} numbered sweepClass="animate-sweep-r16" />
      <DownArrow />
      <MobileRound label="רבע גמר" count={8} sweepClass="animate-sweep-qf" />
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
      {/* Desktop: full horizontal bracket */}
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
              <SlotColumn count={8} label="שמינית גמר" fromX={-16} sweepClass="animate-sweep-r16" startNumber={1} />
              <BracketConnector count={8} />
              <SlotColumn count={4} label="רבע גמר" fromX={-16} sweepClass="animate-sweep-qf" />
              <BracketConnector count={4} />
              <SlotColumn count={2} label="חצי גמר" fromX={-16} sweepClass="animate-sweep-sf" />
              <BracketConnector count={2} />
              <FinalColumn />
              <BracketConnector count={2} mirrored />
              <SlotColumn count={2} label="חצי גמר" fromX={16} sweepClass="animate-sweep-sf" />
              <BracketConnector count={4} mirrored />
              <SlotColumn count={4} label="רבע גמר" fromX={16} sweepClass="animate-sweep-qf" />
              <BracketConnector count={8} mirrored />
              <SlotColumn count={8} label="שמינית גמר" fromX={16} sweepClass="animate-sweep-r16" startNumber={9} />
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
