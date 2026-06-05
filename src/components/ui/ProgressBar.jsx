import { motion } from 'framer-motion'

/**
 * Animated gold progress bar. `value`/`max` drive the fill width; the fill
 * springs to its target and carries a soft gold glow.
 */
export default function ProgressBar({ value, max, className = '' }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0

  return (
    <div
      className={`h-3 w-full overflow-hidden rounded-full bg-navy-deep/80 ring-1 ring-gold/20 ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light glow-gold-sm"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
