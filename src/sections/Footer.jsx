import { Link } from 'react-router-dom'
import { LEAGUE } from '../lib/constants.js'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark px-5 py-12 text-center md:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
        <img
          src="/logo.png"
          alt={LEAGUE.name}
          className="h-16 w-16 object-contain"
        />
        <p className="text-lg font-extrabold text-white">{LEAGUE.name}</p>
        <p className="text-gold">הקשר שלך ליהדות</p>
        <a
          href={`mailto:${LEAGUE.email}`}
          className="ltr text-white/70 transition-colors hover:text-gold"
        >
          {LEAGUE.email}
        </a>
        <p className="text-white/70">
          איש קשר: {LEAGUE.contactPerson} ·{' '}
          <a
            href={`tel:${LEAGUE.phone}`}
            className="ltr transition-colors hover:text-gold"
          >
            {LEAGUE.phone}
          </a>
        </p>
        <p className="mt-4 text-xs text-white/40">
          © 2026 {LEAGUE.name}. כל הזכויות שמורות.
        </p>
        <div className="flex gap-4 text-xs text-white/30">
          <Link to="/privacy" className="transition-colors hover:text-white/60">
            מדיניות פרטיות
          </Link>
          <span aria-hidden>·</span>
          <Link to="/accessibility" className="transition-colors hover:text-white/60">
            הצהרת נגישות
          </Link>
        </div>
      </div>
    </footer>
  )
}
