/**
 * Labeled input/select for the registration steps. Shows an inline error
 * and an optional helper note. Pass `as="select"` with <option> children.
 */
export default function Field({
  label,
  name,
  value,
  onChange,
  error,
  note,
  type = 'text',
  as = 'input',
  inputMode,
  placeholder,
  ltr = false,
  children,
}) {
  const base =
    'w-full rounded-xl border bg-dark-soft/80 px-4 py-3 text-white placeholder-white/30 ' +
    'outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30 ' +
    (error ? 'border-red-400/70 ' : 'border-white/15 ') +
    (ltr ? 'ltr text-start ' : '')

  return (
    <label className="block text-start">
      <span className="mb-1.5 block text-sm font-semibold text-white/80">
        {label}
      </span>
      {as === 'select' ? (
        <select name={name} value={value} onChange={onChange} className={base}>
          {children}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          inputMode={inputMode}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={base}
        />
      )}
      {note && <span className="mt-1 block text-xs text-white/45">{note}</span>}
      {error && (
        <span className="mt-1 block text-xs font-semibold text-red-400">
          {error}
        </span>
      )}
    </label>
  )
}
