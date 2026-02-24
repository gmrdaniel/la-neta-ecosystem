import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FloatingCard } from '../../components/FloatingCard'
import { HiArrowRight, HiX } from 'react-icons/hi'
import { useContactModal, type ContactModalVariant } from '../../contexts/ContactModalContext'
import { AD_FACTORY_SLOGAN } from '../../constants/copy'

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

const SERVICE_TOPIC_OPTIONS: { label: string; value: string }[] = [
  { label: 'The Ad Factory (Advertising / influencer campaigns)', value: 'The Ad Factory (Campañas publicitarias/de influencia)' },
  { label: 'The Glitch (Content / media strategy)', value: 'The Glitch (Estrategia de contenido/Medios)' },
  { label: 'The Hook Hunter (Opportunity / trend identification)', value: 'The Hook Hunter (Identificación de oportunidades/Tendencias)' },
  { label: 'The Amplifier (Surround audience with consistent proof)', value: 'The Amplifier (Rodear a la audiencia con prueba consistente)' },
  { label: 'Empire Mode (Category visibility / strategic saturation)', value: 'Empire Mode (Visibilidad de categoría/Saturación estratégica)' },
  { label: 'Partnership / general collaboration', value: 'Partnership/Colaboración general' },
  { label: 'Other topic', value: 'Otro tema' },
]

const VARIANT_TO_SERVICE_TOPIC: Record<ContactModalVariant, string> = {
  adFactory: 'The Ad Factory (Campañas publicitarias/de influencia)',
  glitch: 'The Glitch (Estrategia de contenido/Medios)',
  hookHunter: 'The Hook Hunter (Identificación de oportunidades/Tendencias)',
  amplifier: 'The Amplifier (Rodear a la audiencia con prueba consistente)',
  empire: 'Empire Mode (Visibilidad de categoría/Saturación estratégica)',
  global: '',
}

const URGENCY_LABELS: Record<string, string> = {
  1: 'Just exploring',
  2: 'Not urgent (next quarter)',
  3: 'Moderate need (this month)',
  4: 'Urgent (this week)',
  5: 'We need it as soon as possible'
}

type LetsWorkTogetherVariant = ContactModalVariant

const COPY = {
  global: {
    intro: "Have a vision you'd like to bring to life? Let's talk.",
    body: "Whether you need UGC ads, AI-powered content, high-performing hooks, or a full creative pipeline—we're here to help your brand scale. Share your goals, timelines, or a rough idea. We'll match you with the right solution and get back to you with next steps.",
    quote: AD_FACTORY_SLOGAN.split('. ')[0] + '.',
    quoteAccent: AD_FACTORY_SLOGAN.split('. ').slice(1).join('. '),
    messagePlaceholder: "Tell us about your brand and what you're looking for. Campaign goals, preferred formats, timeline—whatever helps us get started.",
  },
  adFactory: {
    intro: "Do you have an idea you'd like to bring to life? Don't waste time and talk to us.",
    body: "Whether you need ads that convert, creative that stands out, or a full pipeline from brief to feed—we're here to turn your vision into reality. Share your goals, timelines, or a rough concept. We'll get back to you with next steps.",
    quote: AD_FACTORY_SLOGAN.split('. ')[0] + '.',
    quoteAccent: AD_FACTORY_SLOGAN.split('. ').slice(1).join('. '),
    messagePlaceholder: 'What do you want to bring to life? Campaign goals, formats, timeline—share whatever helps us get started.',
  },
  glitch: {
    intro: "Ready to amplify your brand with AI-generated content? Let's talk about The Glitch.",
    body: "Whether you need AI avatars for your brand, a 24-asset content pack, or a full 21-day roadmap from kickoff to delivery—we're here to make it happen. Share your campaign goals and timelines. We'll get back to you with next steps.",
    quote: 'You bring the idea.',
    quoteAccent: "We bring the AI-powered content.",
    messagePlaceholder: "Tell us about your brand and campaign goals. Interested in The Glitch? Share your timeline and we'll reach out.",
  },
  hookHunter: {
    intro: "Ready for hooks that convert? Let's talk about The Hook Hunter, The Amplifier, or Empire Mode.",
    body: "Whether you want to validate winning hooks with 1 talent (The Hook Hunter), dominate your feed with 3 (The Amplifier), or own your category with 5 (Empire Mode)—we're here to turn your vision into UGC content that performs. Share your goals, timelines, or pack preference. We'll get back to you with next steps.",
    quote: 'You bring the idea.',
    quoteAccent: 'We bring the UGC talents and hooks that convert.',
    messagePlaceholder: 'Which pack interests you—Hunter, Amplifier, or Empire? Share your campaign goals, timeline, and we\'ll reach out.',
  },
  amplifier: {
    intro: "Ready for hooks that convert? Let's talk about The Hook Hunter, The Amplifier, or Empire Mode.",
    body: "Whether you want to validate winning hooks with 1 talent (The Hook Hunter), dominate your feed with 3 (The Amplifier), or own your category with 5 (Empire Mode)—we're here to turn your vision into UGC content that performs. Share your goals, timelines, or pack preference. We'll get back to you with next steps.",
    quote: 'You bring the idea.',
    quoteAccent: 'We bring the UGC talents and hooks that convert.',
    messagePlaceholder: 'Which pack interests you—Hunter, Amplifier, or Empire? Share your campaign goals, timeline, and we\'ll reach out.',
  },
  empire: {
    intro: "Ready for hooks that convert? Let's talk about The Hook Hunter, The Amplifier, or Empire Mode.",
    body: "Whether you want to validate winning hooks with 1 talent (The Hook Hunter), dominate your feed with 3 (The Amplifier), or own your category with 5 (Empire Mode)—we're here to turn your vision into UGC content that performs. Share your goals, timelines, or pack preference. We'll get back to you with next steps.",
    quote: 'You bring the idea.',
    quoteAccent: 'We bring the UGC talents and hooks that convert.',
    messagePlaceholder: 'Which pack interests you—Hunter, Amplifier, or Empire? Share your campaign goals, timeline, and we\'ll reach out.',
  },
}

const IFRAME_NAME = 'google-form-submit-target'

function ContactFormModal({ onClose, variant = 'adFactory' }: { onClose: () => void; variant?: LetsWorkTogetherVariant }) {
  const copy = COPY[variant ?? 'adFactory']
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serviceTopic, setServiceTopic] = useState(() => VARIANT_TO_SERVICE_TOPIC[variant ?? 'adFactory'])

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
              Let&apos;s talk
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <HiX className="size-5" />
            </button>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-lg font-semibold text-[var(--laneta-slate)]">Thank you.</p>
              <p className="mt-2 text-slate-600">We&apos;ve received your message and will get back to you with next steps as soon as possible. 🚀</p>
            </div>
          ) : (
            <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  Full name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-[var(--laneta-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)]/20 md:rounded-xl md:px-4 md:py-3 md:text-base"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  placeholder="john.doe@example.com"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-[var(--laneta-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)]/20 md:rounded-xl md:px-4 md:py-3 md:text-base"
                />
              </div>
              <div>
                <label htmlFor="contact-company" className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  Company or project
                </label>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  required
                  placeholder="Your brand or company"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-[var(--laneta-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)]/20 md:rounded-xl md:px-4 md:py-3 md:text-base"
                />
              </div>
              <div>
                <label htmlFor="contact-service" className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  What service or topic would you like to discuss?
                </label>
                <select
                  id="contact-service"
                  name="serviceTopic"
                  required
                  value={serviceTopic}
                  onChange={(e) => setServiceTopic(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 transition-colors focus:border-[var(--laneta-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)]/20 md:rounded-xl md:px-4 md:py-3 md:text-base"
                >
                  <option value="">Choose</option>
                  {SERVICE_TOPIC_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-subject" className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  Subject (brief title of your project or idea)
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  required
                  placeholder="e.g. Campaign inquiry, The Glitch, partnership"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-[var(--laneta-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)]/20 md:rounded-xl md:px-4 md:py-3 md:text-base"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  Message: tell us what you need (goals, timeline, formats, or any relevant details)
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={3}
                  placeholder={copy.messagePlaceholder}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-[var(--laneta-purple)] focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)]/20 md:rounded-xl md:rows-4 md:px-4 md:py-3 md:text-base"
                />
              </div>
              <div>
                <span className="mb-1 block text-xs font-medium text-slate-700 md:mb-1.5 md:text-sm">
                  How urgent is your need for a response?
                </span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2" role="radiogroup" aria-label="Urgency">
                  {(['1', '2', '3', '4', '5'] as const).map((num) => (
                    <label key={num} className="flex cursor-pointer items-center gap-1.5">
                      <input type="radio" name="urgency" value={num} required className="text-[var(--laneta-purple)]" />
                      <span className="text-sm text-slate-700">{URGENCY_LABELS[num]}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--laneta-purple)] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[var(--laneta-purple)]/90 hover:shadow-[var(--laneta-purple)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)] focus:ring-offset-2 disabled:opacity-70 md:rounded-xl md:px-6 md:py-3.5 md:text-base cursor-pointer hover:cursor-pointer"
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
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
  const { modalOpen, variant: modalVariant, openModal, closeModal } = useContactModal()
  const copy = COPY[variant ?? 'adFactory']
  const isHookHunter = variant === 'hookHunter'
  const showModal = modalOpen
  const effectiveVariant = modalOpen ? modalVariant : variant

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
          Let&apos;s Work Together
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-700 md:text-xl">
          {copy.intro}
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          {copy.body}
        </p>
        <div
          className="mt-6 border-l-4 pl-5"
          style={{ borderColor: isHookHunter ? HOOK_HUNTER_ACCENT : 'var(--laneta-purple)' }}
        >
          <p className="text-base font-medium text-slate-900 md:text-lg">
            {copy.quote}{' '}
            <span style={{ color: isHookHunter ? HOOK_HUNTER_ACCENT : 'var(--laneta-purple)' }}>{copy.quoteAccent}</span>
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
            Talk to us
            <HiArrowRight className="size-5" />
          </button>
        </div>
      </div>
      <div className="order-1 md:order-2">
        <div className="relative overflow-hidden rounded-2xl ring-1 ring-slate-200/80 shadow-lg">
          <img
            src={LETS_TALK_IMAGE}
            alt="Let's work together — bring your idea to life"
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
