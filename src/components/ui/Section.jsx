import Reveal from './Reveal.jsx'

/**
 * Section shell: id anchor, vertical rhythm, centered max-width container,
 * and an optional revealed heading (title + kicker/eyebrow).
 */
export default function Section({
  id,
  title,
  eyebrow,
  children,
  className = '',
  containerClassName = '',
}) {
  return (
    <section id={id} className={`relative px-5 py-20 md:px-8 md:py-28 ${className}`}>
      <div className={`mx-auto w-full max-w-6xl ${containerClassName}`}>
        {(eyebrow || title) && (
          <Reveal className="mb-12 text-center md:mb-16">
            {eyebrow && (
              <span className="mb-3 inline-block text-sm font-bold uppercase tracking-[0.25em] text-gold">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-3xl font-black text-white md:text-5xl">
                {title}
              </h2>
            )}
            <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent" />
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
