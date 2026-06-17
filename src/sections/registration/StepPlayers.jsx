import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PlayerCard from './PlayerCard.jsx'
import ProgressBar from '../../components/ui/ProgressBar.jsx'
import GlowButton from '../../components/ui/GlowButton.jsx'
import { MAX_PLAYERS, MIN_PLAYERS } from '../../lib/constants.js'

function emptyPlayer() {
  return { fullName: '', age: '', school: '', grade: '', phone: '', confirmed: false }
}

/**
 * Step 2 — dynamic players. A player card is "editing" while it is not yet
 * confirmed; confirmed cards collapse to a ✅ row. "+ הוסף שחקן" appears only
 * when every existing card is confirmed. Step 3 is blocked until at least
 * MIN_PLAYERS players are confirmed (and none are left open).
 */
export default function StepPlayers({ players, onChange, onNext, onBack }) {
  // Ensure there's always at least one card to fill in.
  useEffect(() => {
    if (players.length === 0) onChange([emptyPlayer()])
  }, [players.length, onChange])

  const confirmedCount = players.filter((p) => p.confirmed).length
  const allConfirmed = players.length > 0 && players.every((p) => p.confirmed)
  const canProceed = allConfirmed && confirmedCount >= MIN_PLAYERS

  const updateAt = (index, next) =>
    onChange(players.map((p, i) => (i === index ? next : p)))

  const confirmAt = (index) =>
    updateAt(index, { ...players[index], confirmed: true })

  const editAt = (index) =>
    updateAt(index, { ...players[index], confirmed: false })

  const removeAt = (index) =>
    onChange(players.filter((_, i) => i !== index))

  const addPlayer = () => onChange([...players, emptyPlayer()])

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
    >
      {/* Progress */}
      <div className="mb-6">
        <p className="mb-2 text-center font-bold text-white">
          {confirmedCount} / {MIN_PLAYERS} שחקנים אושרו
        </p>
        <ProgressBar value={confirmedCount} max={MIN_PLAYERS} />
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {players.map((player, i) => (
            <PlayerCard
              key={i}
              player={player}
              index={i}
              editing={!player.confirmed}
              onChange={(next) => updateAt(i, next)}
              onConfirm={() => confirmAt(i)}
              onEdit={() => editAt(i)}
              onRemove={() => removeAt(i)}
              canRemove={players.length > 1}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Add appears only when all cards are confirmed and cap not yet reached */}
      {allConfirmed && players.length < MAX_PLAYERS && (
        <button
          type="button"
          onClick={addPlayer}
          className="mt-4 w-full rounded-xl border-2 border-dashed border-gold/40 py-3 font-bold text-gold transition-colors hover:border-gold hover:bg-gold/5"
        >
          + הוסף שחקן
        </button>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full px-6 py-3 font-semibold text-white/70 transition-colors hover:text-white"
        >
          → חזרה
        </button>
        <GlowButton onClick={onNext} disabled={!canProceed}>
          ← המשך לסיכום
        </GlowButton>
      </div>

      {!canProceed && confirmedCount < MIN_PLAYERS && (
        <p className="mt-3 text-center text-sm text-white/50">
          יש להוסיף עוד {MIN_PLAYERS - confirmedCount} שחקנים
        </p>
      )}
    </motion.div>
  )
}
