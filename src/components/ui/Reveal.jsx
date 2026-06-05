import { motion } from 'framer-motion'

const DIRECTIONS = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  start: { x: 40, y: 0 }, // from the inline-start (right, in RTL)
  end: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Scroll-reveal wrapper using Framer Motion `whileInView`. Default is a
 * fade + rise. Use `delay` for staggered groups, `as` to change the tag.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  as = 'div',
  amount = 0.25,
}) {
  const offset = DIRECTIONS[direction] ?? DIRECTIONS.up
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
