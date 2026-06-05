import { useState } from 'react'
import { motion } from 'framer-motion'
import Field from './Field.jsx'
import GlowButton from '../../components/ui/GlowButton.jsx'
import { GRADES } from '../../lib/constants.js'
import { formatPhone, hasErrors, validateTeam } from '../../lib/validation.js'

export default function StepTeam({ data, onChange, onNext }) {
  const [errors, setErrors] = useState({})

  const update = (e) => {
    const { name, value } = e.target
    onChange({ ...data, [name]: name === 'phone' ? formatPhone(value) : value })
  }

  const next = () => {
    const found = validateTeam(data)
    setErrors(found)
    if (!hasErrors(found)) onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="שם הקבוצה" name="teamName" value={data.teamName} onChange={update} error={errors.teamName} />
        <Field label="שם הנציג (שם מלא)" name="contactName" value={data.contactName} onChange={update} error={errors.contactName} />
        <Field label="טלפון" name="phone" type="tel" inputMode="tel" placeholder="05X-XXXXXXX" ltr value={data.phone} onChange={update} error={errors.phone} />
        <Field label="מייל" name="email" type="email" inputMode="email" ltr note="לצורך אישור הרישום" value={data.email} onChange={update} error={errors.email} />
        <Field label="בית ספר" name="school" value={data.school} onChange={update} error={errors.school} />
        <Field label="שכבה" name="grade" as="select" value={data.grade} onChange={update} error={errors.grade}>
          <option value="">בחר שכבה</option>
          {GRADES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </Field>
        <Field label="עיר מגורים" name="city" value={data.city} onChange={update} error={errors.city} />
        <Field label="שכונה" name="neighborhood" note="אופציונלי" value={data.neighborhood} onChange={update} error={errors.neighborhood} />
      </div>

      <div className="mt-8 flex justify-center">
        <GlowButton onClick={next}>← הבא - פרטי שחקנים!</GlowButton>
      </div>
    </motion.div>
  )
}
