import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Send, Loader2, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputBase =
  'w-full px-4 py-3 rounded-xl border bg-primary-50/50 dark:bg-dark-bg text-text-primary dark:text-white placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 transition-all duration-200'
const inputNormal =
  'border-primary/10 dark:border-dark-border focus:border-primary focus:ring-primary/10'
const inputError =
  'border-red-400 dark:border-red-500 focus:border-red-400 focus:ring-red-400/10'

export default function ContactForm() {
  const { t } = useLanguage()
  const f = t.contact.form

  const [data, setData] = useState<FormData>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState({ name: false, email: false, subject: false, message: false })
  const [status, setStatus] = useState<Status>('idle')

  const validate = (fields: FormData): FormErrors => {
    const e: FormErrors = {}
    if (!fields.name.trim())                    e.name    = f.errors.nameRequired
    else if (fields.name.trim().length < 2)     e.name    = f.errors.nameMin
    if (!fields.email.trim())                   e.email   = f.errors.emailRequired
    else if (!EMAIL_REGEX.test(fields.email))   e.email   = f.errors.emailInvalid
    if (!fields.subject)                         e.subject = f.errors.subjectRequired
    if (!fields.message.trim())                 e.message = f.errors.messageRequired
    else if (fields.message.trim().length < 20) e.message = f.errors.messageMin
    return e
  }

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validate(data))
  }

  const handleChange = (field: keyof FormData, value: string) => {
    const updated = { ...data, [field]: value }
    setData(updated)
    if (touched[field]) setErrors(validate(updated))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, subject: true, message: true })
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('sending')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name:  data.name,
          from_email: data.email,
          subject:    data.subject,
          message:    data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setData({ name: '', email: '', subject: '', message: '' })
    setErrors({})
    setTouched({ name: false, email: false, subject: false, message: false })
    setStatus('idle')
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-full min-h-64 text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-text-primary dark:text-white">{f.success}</h3>
        <p className="text-text-secondary dark:text-text-muted text-sm max-w-xs">{f.successDetail}</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 mt-2 text-sm text-primary hover:underline cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {f.retry}
        </button>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 border border-primary/5 dark:border-dark-border shadow-sm dark:shadow-none h-full">
      <h3 className="text-lg font-bold text-text-primary dark:text-white mb-6">{f.title}</h3>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* Name + Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary dark:text-text-muted mb-1.5">
              {f.name} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              placeholder={f.namePlaceholder}
              className={`${inputBase} ${errors.name && touched.name ? inputError : inputNormal}`}
            />
            {errors.name && touched.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary dark:text-text-muted mb-1.5">
              {f.email} <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder={f.emailPlaceholder}
              className={`${inputBase} ${errors.email && touched.email ? inputError : inputNormal}`}
            />
            {errors.email && touched.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-text-secondary dark:text-text-muted mb-1.5">
            {f.subject} <span className="text-red-400">*</span>
          </label>
          <select
            value={data.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            onBlur={() => handleBlur('subject')}
            className={`${inputBase} cursor-pointer ${errors.subject && touched.subject ? inputError : inputNormal} ${!data.subject ? 'text-text-muted' : ''}`}
          >
            <option value="" disabled>{f.subjectPlaceholder}</option>
            {f.subjectOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-text-primary dark:text-white">
                {opt.label}
              </option>
            ))}
          </select>
          {errors.subject && touched.subject && (
            <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-text-secondary dark:text-text-muted mb-1.5">
            {f.message} <span className="text-red-400">*</span>
          </label>
          <textarea
            rows={5}
            value={data.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            placeholder={f.messagePlaceholder}
            className={`${inputBase} resize-none ${errors.message && touched.message ? inputError : inputNormal}`}
          />
          <div className="flex justify-between items-start mt-1">
            {errors.message && touched.message
              ? <p className="text-xs text-red-500">{errors.message}</p>
              : <span />
            }
            <span className={`text-xs ml-auto ${data.message.length < 20 ? 'text-text-muted' : 'text-green-500'}`}>
              {data.message.length}/20
            </span>
          </div>
        </div>

        {/* Error banner */}
        {status === 'error' && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">{f.error}</p>
              <p className="text-xs text-red-500 dark:text-red-400 mt-0.5">{f.errorDetail}</p>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {f.sending}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {f.send}
            </>
          )}
        </button>
      </form>
    </div>
  )
}
