import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '../hooks/useGsap.js'
import Section from '../components/ui/Section.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Emoji from '../components/ui/Emoji.jsx'
import { ABOUT_CARDS, TIMELINE } from '../data/content.js'
import { ANCHORS } from '../lib/constants.js'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  // Timeline items slide/fade in as the list scrolls into view, and the
  // connecting line draws itself from top to bottom.
  const scope = useGsap(() => {
    gsap.from('.timeline-item', {
      opacity: 0,
      x: 40,
      stagger: 0.2,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 75%',
      },
    })
    gsap.from('.timeline-line', {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 75%',
      },
    })
  })

  return (
    <Section id={ANCHORS.about} eyebrow="האירוע" title="?מה מחכה לכם">
      {/* 3 feature cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {ABOUT_CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group h-full rounded-2xl border border-white/10 bg-navy/30 p-8 text-center backdrop-blur-sm transition-colors hover:border-gold/50 hover:bg-navy/50 hover:glow-gold-sm"
            >
              <div className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110">
                <Emoji char={card.icon} className="mx-auto" />
              </div>
              <h3 className="mb-2 text-2xl font-extrabold text-gold">
                {card.title}
              </h3>
              <p className="text-white/75">{card.text}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Tournament timeline */}
      <div ref={scope} className="mt-20">
        <h3 className="mb-10 text-center text-2xl font-black text-white md:text-3xl">
          איך הליגה עובדת
        </h3>
        <div className="timeline relative mx-auto max-w-3xl ps-8">
          {/* vertical line on the inline-start (right in RTL) */}
          <div className="timeline-line absolute bottom-0 top-0 right-[11px] w-0.5 bg-gradient-to-b from-gold via-gold/50 to-transparent" />
          <div className="space-y-8">
            {TIMELINE.map((t) => (
              <div key={t.step} className="timeline-item relative">
                <span className="absolute right-[-29px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-black text-navy-deep glow-gold-sm">
                  {t.step}
                </span>
                <div className="rounded-xl border border-white/10 bg-dark-soft/60 p-5">
                  <h4 className="text-lg font-bold text-gold">{t.title}</h4>
                  <p className="mt-1 text-white/75">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
