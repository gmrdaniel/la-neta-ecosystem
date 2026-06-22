import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FloatingCard } from '../../components/FloatingCard'
import { HiArrowRight, HiX } from 'react-icons/hi'
import { useContactModal, type ContactModalVariant } from '../../contexts/ContactModalContext'
import { useTranslation } from 'react-i18next'

const LETS_TALK_IMAGE = 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/lets_talk.png'

const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSd8IlDTvRy-PT3XmVqUHvnZOKsqWjgjsBoaT_CVmNz7PoYdtw/formResponse'
const GOOGLE_FORM_ENTRIES = {
  name: 'entry.1809546207',
  email: 'entry.1010474045',
  company: 'entry.466047948',
  serviceTopic: 'entry.1477597184',
  subject: 'entry.1122482931',
  message: 'entry.1302748606',
  urgency: 'entry.1628389655',
} as const

/** Values sent to Google Form are always in Spanish (backend expectation) */
const SERVICE_TOPIC_VALUES = [
  'The Ad Factory (Campañas publicitarias/de influencia)',
  'The Glitch (Estrategia de contenido/Medios)',
  'The Hook Hunter (Identificación de oportunidades/Tendencias)',
  'The Amplifier (Rodear a la audiencia con prueba consistente)',
  'Empire Mode (Visibilidad de categoría/Saturación estratégica)',
  'Partnership/Colaboración general',
  'Otro tema',
]

const VARIANT_TO_SERVICE_TOPIC: Record<ContactModalVariant, string> = {
  adFactory: SERVICE_TOPIC_VALUES[0],
  glitch: SERVICE_TOPIC_VALUES[1],
  hookHunter: SERVICE_TOPIC_VALUES[2],
  amplifier: SERVICE_TOPIC_VALUES[3],
  empire: SERVICE_TOPIC_VALUES[4],
  global: '',
}

type LetsWorkTogetherVariant = ContactModalVariant

const IFRAME_NAME = 'google-form-submit-target'

function ContactFormModal({ onClose, variant = 'adFactory' }: { onClose: () => void; variant?: LetsWorkTogetherVariant }) {
  const { t } = useTranslation('adFactory')
  const copyKey = variant === 'amplifier' || variant === 'empire' ? 'hookHunter' : variant
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serviceTopic, setServiceTopic] = useState(() => VARIANT_TO_SERVICE_TOPIC[variant ?? 'adFactory'])

  const serviceTopicLabels = t('letsWorkTogether.serviceTopics', { returnObjects: true }) as string[]

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = (data.get('name') as string)?.trim() ?? ''
    const email = (data.get('email') as string)?.trim() ?? ''
    const company = (data.get('company') as string)?.trim() ?? ''
    const serviceTopic = (data.get('serviceTopic') as string) ?? ''
    const subject = (data.get('subject') as string)?.trim() ?? ''
    const message = (data.get('message') as string)?.trim() ?? ''
    const urgency = (data.get('urgency') as string) ?? ''

    const payload: Record<string, string> = {
      [GOOGLE_FORM_ENTRIES.name]: name,
      [GOOGLE_FORM_ENTRIES.email]: email,
      [GOOGLE_FORM_ENTRIES.company]: company,
      [GOOGLE_FORM_ENTRIES.serviceTopic]: serviceTopic,
      [GOOGLE_FORM_ENTRIES.subject]: subject,
      [GOOGLE_FORM_ENTRIES.message]: message,
      [GOOGLE_FORM_ENTRIES.urgency]: urgency,
    }

    setIsSubmitting(true)
    const doc = typeof document !== 'undefined' ? document : null
    if (doc) {
      const submitForm = doc.createElement('form')
      submitForm.setAttribute('action', GOOGLE_FORM_ACTION)
      submitForm.setAttribute('method', 'POST')
      submitForm.setAttribute('target', IFRAME_NAME)
      submitForm.setAttribute('style', 'display:none')
      Object.entries(payload).forEach(([key, value]) => {
        const input = doc.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', key)
        input.setAttribute('value', value)
        submitForm.appendChild(input)
      })
      doc.body.appendChild(submitForm)
      submitForm.submit()
      doc.body.removeChild(submitForm)
    }
    setSubmitted(true)
    setIsSubmitting(false)
    setTimeout(() => onClose(), 2200)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex min-h-0 items-center justify-center overflow-y-auto p-3 py-6 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <iframe name={IFRAME_NAME} title="Google Form submit" className="hidden" />
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative my-auto w-full min-w-0 max-w-[25rem] max-h-[calc(100dvh-2rem)] min-h-0 flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200/80 md:max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          aria-hidden
          className="h-1 w-full shrink-0"
          style={{
            background: 'linear-gradient(90deg, var(--laneta-purple), var(--laneta-pink), var(--laneta-blue))',
          }}
        />
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5 md:p-8">
          <div className="mb-4 flex items-center justify-between md:mb-6">
            <h2 id="contact-modal-title" className="text-lg font-bold text-[var(--laneta-slate)] md:text-2xl">
              {t('letsWorkTogether.letsTalk')}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
              aria-label={t('letsWorkTogether.close')}
            >
              <HiX className="size-5" />
            </button>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-lg font-semibold text-[var(--laneta-slate)]">{t('letsWorkTogether.thankYou')}</p>
              <p className="mt-2 text-slate-600">{t('letsWorkTogether.thankYouBody')}</p>
            </div>
          ) : (
            <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  {t('letsWorkTogether.fullName')}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  placeholder={t('letsWorkTogether.namePlaceholder')}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-[var(--laneta-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)]/20 md:rounded-xl md:px-4 md:py-3 md:text-base"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  {t('letsWorkTogether.email')}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  placeholder={t('letsWorkTogether.emailPlaceholder')}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-[var(--laneta-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)]/20 md:rounded-xl md:px-4 md:py-3 md:text-base"
                />
              </div>
              <div>
                <label htmlFor="contact-company" className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  {t('letsWorkTogether.companyLabel')}
                </label>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  required
                  placeholder={t('letsWorkTogether.companyPlaceholder')}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-[var(--laneta-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)]/20 md:rounded-xl md:px-4 md:py-3 md:text-base"
                />
              </div>
              <div>
                <label htmlFor="contact-service" className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  {t('letsWorkTogether.serviceLabel')}
                </label>
                <select
                  id="contact-service"
                  name="serviceTopic"
                  required
                  value={serviceTopic}
                  onChange={(e) => setServiceTopic(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 transition-colors focus:border-[var(--laneta-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)]/20 md:rounded-xl md:px-4 md:py-3 md:text-base"
                >
                  <option value="">{t('letsWorkTogether.choose')}</option>
                  {serviceTopicLabels.map((label, i) => (
                    <option key={i} value={SERVICE_TOPIC_VALUES[i]}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-subject" className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  {t('letsWorkTogether.subjectLabel')}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  required
                  placeholder={t('letsWorkTogether.subjectPlaceholder')}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-[var(--laneta-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)]/20 md:rounded-xl md:px-4 md:py-3 md:text-base"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  {t('letsWorkTogether.messageLabel')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={3}
                  placeholder={t(`letsWorkTogether.copy.${copyKey}.messagePlaceholder`)}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-[var(--laneta-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)]/20 md:rounded-xl md:rows-4 md:px-4 md:py-3 md:text-base"
                />
              </div>
              <div>
                <span className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  {t('letsWorkTogether.urgencyLabel')}
                </span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2" role="radiogroup" aria-label="Urgency">
                  {(['1', '2', '3', '4', '5'] as const).map((num) => (
                    <label key={num} className="flex cursor-pointer items-center gap-1.5">
                      <input type="radio" name="urgency" value={num} required className="text-[var(--laneta-purple)]" />
                      <span className="text-sm text-slate-700">{t(`letsWorkTogether.urgency.${num}`)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--laneta-purple)] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[var(--laneta-purple)]/90 hover:shadow-[var(--laneta-purple)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)] focus:ring-offset-2 disabled:opacity-70 md:rounded-xl md:px-6 md:py-3.5 md:text-base cursor-pointer hover:cursor-pointer"
              >
                {isSubmitting ? t('letsWorkTogether.sending') : t('letsWorkTogether.sendMessage')}
                <HiArrowRight className="size-5" />
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const HOOK_HUNTER_ACCENT = '#f59e0b'

export function LetsWorkTogetherSection({ variant = 'adFactory' }: { variant?: LetsWorkTogetherVariant }) {
  const { t } = useTranslation('adFactory')
  const { modalOpen, variant: modalVariant, openModal, closeModal } = useContactModal()
  const copyKey = variant === 'amplifier' || variant === 'empire' ? 'hookHunter' : variant
  const isHookHunter = variant === 'hookHunter'
  const showModal = modalOpen
  const effectiveVariant = modalOpen ? modalVariant : variant

  const sloganQuote = t('common:slogan').split('. ')[0] + '.'
  const sloganAccent = t('common:slogan').split('. ').slice(1).join('. ')

  const content = (
    <div className="relative grid gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-12 lg:gap-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          backgroundColor: isHookHunter ? `${HOOK_HUNTER_ACCENT}12` : 'rgba(102, 65, 237, 0.1)',
        }}
      />
      <div className="order-2 md:order-1 text-center md:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
          {t('letsWorkTogether.sectionTitle')}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-700 md:text-xl">
          {t(`letsWorkTogether.copy.${copyKey}.intro`)}
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          {t(`letsWorkTogether.copy.${copyKey}.body`)}
        </p>
        <div
          className="mt-6 border-l-4 pl-5"
          style={{ borderColor: isHookHunter ? HOOK_HUNTER_ACCENT : 'var(--laneta-purple)' }}
        >
          <p className="text-base font-medium text-slate-900 md:text-lg">
            {sloganQuote}{' '}
            <span style={{ color: isHookHunter ? HOOK_HUNTER_ACCENT : 'var(--laneta-purple)' }}>{sloganAccent}</span>
          </p>
        </div>
        <div className="mt-8 flex justify-center md:justify-start">
          <button
            type="button"
            onClick={() => openModal(variant)}
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white cursor-pointer hover:opacity-95"
            style={{
              backgroundColor: isHookHunter ? HOOK_HUNTER_ACCENT : 'var(--laneta-purple)',
            }}
          >
            {t('letsWorkTogether.talkToUs')}
            <HiArrowRight className="size-5" />
          </button>
        </div>
      </div>
      <div className="order-1 md:order-2">
        <div className="relative overflow-hidden rounded-2xl ring-1 ring-slate-200/80 shadow-lg">
          <img
            src={LETS_TALK_IMAGE}
            alt=""
            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
          />
        </div>
      </div>
    </div>
  )

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-7xl px-4 md:px-6"
      >
        <FloatingCard className="group relative overflow-hidden">
          {isHookHunter && (
            <div aria-hidden className="absolute inset-x-0 top-0 z-10 h-1" style={{ backgroundColor: HOOK_HUNTER_ACCENT }} />
          )}
          {content}
        </FloatingCard>
      </motion.section>

      <AnimatePresence>
        {showModal && (
          <ContactFormModal onClose={closeModal} variant={effectiveVariant} />
        )}
      </AnimatePresence>
    </>
  )
}
