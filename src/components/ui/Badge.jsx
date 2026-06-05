/**
 * Glowing hero pill — icon + label. Glassy navy fill with a gold ring.
 */
export default function Badge({ icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/40 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md glow-gold-sm md:text-base">
      {icon && <span className="text-gold">{icon}</span>}
      <span>{children}</span>
    </div>
  )
}
