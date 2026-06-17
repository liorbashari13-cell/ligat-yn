import { useState } from 'react'
import { motion } from 'framer-motion'
import Field from './Field.jsx'
import Emoji from '../../components/ui/Emoji.jsx'
import { GRADES } from '../../lib/constants.js'
import { formatPhone, hasErrors, validatePlayer } from '../../lib/validation.js'

/**
 * One player. Two visual states:
 *  - editing  → form fields + "אשר שחקן" (confirm)
 *  - confirmed → ✅ name + 👁️ edit button (collapsed)
 */
export default function PlayerCard({
  player,
  index,
  displayNumber,
  editing,
  onChange,
  onConfirm,
  onEdit,
  onRemove,
  canRemove,
}) {
  const [errors, setErrors] = useState({})

  const update = (e) => {
    const { name, value } = e.target
    onChange({ ...player, [name]: name === 'phone' ? formatPhone(value) : value })
  }

  const confirm = () => {
    const found = validatePlayer(player)
    setErrors(found)
    if (!hasErrors(found)) onConfirm()
  }

  if (!editing) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between rounded-xl border border-grass/40 bg-grass/10 px-4 py-3"
      >
        <span className="flex items-center gap-2 font-bold text-white">
          <Emoji char="✅" /> {player.fullName}
        </span>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-gold transition-colors hover:bg-gold/10"
          aria-label={`ערוך את ${player.fullName}`}
        >
          <Emoji char="👁️" /> צפה / ערוך
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gold/40 bg-dark-soft/70 p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-extrabold text-gold">שחקן {displayNumber ?? index + 1}</h4>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-sm text-red-400 transition-colors hover:text-red-300"
          >
            הסר
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="שם מלא" name="fullName" value={player.fullName} onChange={update} error={errors.fullName} />
        <Field label="גיל" name="age" type="number" inputMode="numeric" value={player.age} onChange={update} error={errors.age} />
        <Field label="בית ספר" name="school" value={player.school} onChange={update} error={errors.school} />
        <Field label="שכבה" name="grade" as="select" value={player.grade} onChange={update} error={errors.grade}>
          <option value="">בחר שכבה</option>
          {GRADES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </Field>
        <Field label="טלפון" name="phone" type="tel" inputMode="tel" placeholder="05X-XXXXXXX" ltr value={player.phone} onChange={update} error={errors.phone} />
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          onClick={confirm}
          className="rounded-full bg-grass px-6 py-2.5 font-bold text-white transition-colors hover:bg-grass-light"
        >
          אשר שחקן ✓
        </button>
      </div>
    </motion.div>
  )
}
