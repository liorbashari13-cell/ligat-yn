import { motion } from 'framer-motion'
import Emoji from '../../components/ui/Emoji.jsx'

/**
 * Shown in place of the form once MAX_TEAMS is reached.
 */
export default function RegistrationClosed() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="mx-auto max-w-2xl rounded-3xl border border-gold/50 bg-gradient-to-br from-navy to-dark p-12 text-center glow-gold"
    >
      <div className="mb-4 text-6xl">
        <Emoji char="⚽" className="mx-auto" />
      </div>
      <h3 className="text-3xl font-black text-gold text-glow-gold md:text-4xl">
        !הרישום הסתיים - נתראה במגרש
      </h3>
      <p className="mt-4 text-white/70">
        כל המקומות נתפסו. עקבו אחרינו לעדכונים על העונה הבאה.
      </p>
    </motion.div>
  )
}
