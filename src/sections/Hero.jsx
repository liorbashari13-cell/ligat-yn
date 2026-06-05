import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useGsap } from '../hooks/useGsap.js'
import GlowButton from '../components/ui/GlowButton.jsx'
import Badge from '../components/ui/Badge.jsx'
import Emoji from '../components/ui/Emoji.jsx'
import { ANCHORS, LEAGUE } from '../lib/constants.js'

const STADIUM_BG =
  'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1920&q=80'

// Particle positions are static (no Math.random at module load) so the
// layout is deterministic; GSAP animates them on mount.
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 37 + 8) % 100}%`,
  size: 2 + (i % 4),
  delay: (i % 10) * 0.4,
  duration: 6 + (i % 6),
}))

export default function Hero() {
  const scope = useGsap(() => {
    // Light rays: slow sweep + breathing opacity.
    gsap.to('.hero-ray', {
      opacity: 0.55,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.6,
    })
    // Particles drift upward continuously.
    gsap.utils.toArray('.hero-particle').forEach((p) => {
      gsap.to(p, {
        y: -140,
        opacity: 0,
        duration: Number(p.dataset.duration),
        delay: Number(p.dataset.delay),
        ease: 'none',
        repeat: -1,
      })
    })
  })

  const goToRegister = (e) => {
    e.preventDefault()
    document
      .getElementById(ANCHORS.register)
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  }
  const item = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <section
      id={ANCHORS.hero}
      ref={scope}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 text-center"
    >
      {/* Stadium background + dark overlay (rgba 0,0,0,0.6 for readability) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${STADIUM_BG})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        aria-hidden
      />
      {/* subtle brand tint + fade into the dark section below */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/30 via-transparent to-dark"
        aria-hidden
      />

      {/* GSAP light rays */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="hero-ray absolute top-[-30%] h-[160%] w-40 opacity-0 blur-2xl"
            style={{
              left: `${20 + i * 28}%`,
              background:
                'linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)',
              transform: `rotate(${i % 2 === 0 ? 12 : -12}deg)`,
            }}
          />
        ))}
        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="hero-particle absolute bottom-0 rounded-full bg-gold/70"
            data-delay={p.delay}
            data-duration={p.duration}
            style={{ left: p.left, width: p.size, height: p.size }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center"
      >
        <motion.img
          variants={item}
          src="/logo.png"
          alt={LEAGUE.name}
          className="mb-8 h-28 w-28 object-contain drop-shadow-[0_0_30px_rgba(201,168,76,0.5)] md:h-36 md:w-36"
        />

        <motion.h1
          variants={item}
          className="text-4xl font-black leading-tight text-white text-glow-gold md:text-7xl"
        >
          ליגת הכדורגל של נתניה
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 text-lg text-white/85 md:text-2xl"
        >
          הקבוצה שלך יכולה לשחק מול כוכבי ליגת העל
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Badge icon={<Emoji char="📅" />}>
            {LEAGUE.startDate} | תחילת הליגה
          </Badge>
          <Badge icon={<Emoji char="📍" />}>{LEAGUE.stadium}</Badge>
        </motion.div>

        <motion.div variants={item} className="mt-10">
          <GlowButton onClick={goToRegister} pulse className="!px-10 !py-5 !text-xl">
            ← רשום את הקבוצה שלך!
          </GlowButton>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.2, y: { repeat: Infinity, duration: 1.8 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/70"
        aria-hidden
      >
        ↓
      </motion.div>
    </section>
  )
}
