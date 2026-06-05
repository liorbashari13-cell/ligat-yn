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

        <GlowButton onClick={goToRegister} className="!px-6 !py-2.5 !text-base">
          הירשם עכשיו
        </GlowButton>
      </nav>
    </motion.header>
  )
}
