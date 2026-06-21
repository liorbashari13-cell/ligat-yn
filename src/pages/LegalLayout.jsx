import { Link } from 'react-router-dom'
import Footer from '../sections/Footer.jsx'

export default function LegalLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen">
      {/* Minimal top bar with back link */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-dark/95 px-5 py-3 backdrop-blur-md">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-gold"
          >
            <span aria-hidden>→</span> חזרה לעמוד הבית
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-5 py-12 md:px-8">
        <h1 className="mb-1 text-3xl font-black text-gold md:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mb-10 text-sm text-white/40">{subtitle}</p>
        )}
        <div className="space-y-10 leading-relaxed text-white/80">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Reusable section block for legal content
export function LegalSection({ title, children }) {
  return (
    <section className="border-b border-white/10 pb-8 last:border-0 last:pb-0">
      <h2 className="mb-4 text-lg font-bold text-white">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}
