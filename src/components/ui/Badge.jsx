/**
 * Glowing hero pill — icon + label. Glassy navy fill with a gold ring.
 * `variant="subtle"` is a smaller, lower-emphasis style for secondary info.
 */
const VARIANTS = {
  default:
    'gap-2 rounded-full border border-gold/40 bg-navy/40 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md glow-gold-sm md:text-base',
  subtle:
    'gap-1.5 rounded-full border border-gold/40 bg-navy/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md',
}

export default function Badge({ icon, children, className = '', variant = 'default' }) {
  return (
    <div className={`inline-flex items-center ${VARIANTS[variant]} ${className}`}>
      {icon && <span className="text-gold">{icon}</span>}
      <span>{children}</span>
    </div>
  )
}
