import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import GlowButton from '../components/ui/GlowButton.jsx'
import { ANCHORS, LEAGUE } from '../lib/constants.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goToRegister = (e) => {
    e.preventDefault()
    document
      .getElementById(ANCHORS.register)
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-dark/80 py-3 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <a href={`#${ANCHORS.hero}`} className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt={LEAGUE.name}
            className="h-10 w-10 object-contain md:h-12 md:w-12"
          />
          <span className="hidden text-lg font-extrabold text-white sm:inline">
            {LEAGUE.name}
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <GlowButton onClick={goToRegister} className="!px-6 !py-2.5 !text-base">
            הירשם עכשיו
          </GlowButton>

          <a
            href="https://wa.me/972532787225"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="נועם עזרא בוואטסאפ"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
            style={{ backgroundColor: '#25D366' }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.668.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.746-.872-2.888-1.553-4.038-3.524-.305-.524.305-.486.873-1.62.099-.198.05-.371-.05-.52-.099-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.668-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.059 3.143 5.062 4.282 2.521.937 3.039.6 3.589.5.549-.1 1.758-.717 2.006-1.413.249-.696.249-1.292.174-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            <span className="hidden sm:inline">לשאלות - נועם עזרא</span>
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
