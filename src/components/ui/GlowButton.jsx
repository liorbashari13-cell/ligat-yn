import { motion } from 'framer-motion'

/**
 * Primary glowing gold CTA. Renders an <a> when `href` is given, else a
 * <button>. `pulse` adds the continuous gold-pulse animation (hero CTA).
 */
export default function GlowButton({
  children,
  href,
  onClick,
  type = 'button',
  pulse = false,
  className = '',
  disabled = false,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-light to-gold ' +
    'px-8 py-4 text-lg font-extrabold text-navy-deep ring-1 ring-gold-light/60 ' +
    'transition-colors disabled:cursor-not-allowed disabled:opacity-50 ' +
    (pulse ? 'animate-gold-pulse ' : 'glow-gold-sm ')

  const Comp = href ? motion.a : motion.button
  const extra = href ? { href } : { type, disabled }

  return (
    <Comp
      {...extra}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.05, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`${base}${className}`}
    >
      {children}
    </Comp>
  )
}
