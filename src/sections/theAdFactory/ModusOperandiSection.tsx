import { motion } from 'motion/react'
import { BsGearWideConnected } from 'react-icons/bs'
import { FaGears } from 'react-icons/fa6'
import { GiGears } from 'react-icons/gi'
import { useTranslation } from 'react-i18next'

const STEP_ICONS = [BsGearWideConnected, FaGears, GiGears]
const STEP_NUMBERS = ['01', '02', '03']
const STEP_ACCENTS = ['var(--laneta-purple)', 'var(--laneta-pink)', 'var(--laneta-blue)']

export function ModusOperandiSection() {
  const { t } = useTranslation('adFactory')
  const steps = t('modusOperandi.steps', { returnObjects: true }) as { title: string; description: string }[]

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-7xl px-4 md:px-6"
    >
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-xl ring-1 ring-slate-200/80 backdrop-blur-sm">
        <div
          className="h-1.5 w-full"
          style={{
            background: 'linear-gradient(90deg, var(--laneta-purple), var(--laneta-pink), var(--laneta-blue))',
          }}
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
          <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[var(--laneta-purple)]/12 blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--laneta-pink)]/10 blur-[90px]" />
          <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[var(--laneta-blue)]/12 blur-[100px]" />
        </div>

        <div className="relative border-b border-slate-200 px-6 py-8 text-center md:px-12 md:py-10">
          <p
            className="mb-3 inline-block rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: 'var(--laneta-purple)', backgroundColor: 'rgba(102, 65, 237, 0.12)' }}
          >
            {t('modusOperandi.badge')}
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl lg:text-5xl">
            {t('modusOperandi.sectionTitle')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 md:text-lg">
            {t('modusOperandi.subtitle')}
          </p>
        </div>

        <div className="relative grid gap-0 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i]
            const accent = STEP_ACCENTS[i]
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative flex flex-col items-center border-slate-200 px-6 py-10 md:border-r md:last:border-r-0 md:py-14 md:px-8"
              >
                <span
                  className="absolute left-6 top-6 text-5xl font-black opacity-15 md:left-8 md:top-8 md:text-6xl"
                  style={{ color: accent }}
                  aria-hidden
                >
                  {STEP_NUMBERS[i]}
                </span>

                <motion.div
                  className="relative flex shrink-0 items-center justify-center"
                  whileHover={{ rotate: 12 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div
                    className="absolute inset-0 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-45"
                    style={{ backgroundColor: accent }}
                    aria-hidden
                  />
                  <div
                    className="relative flex size-32 items-center justify-center rounded-full md:size-40"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${accent}40, ${accent}18)`,
                      boxShadow: `0 0 0 2px ${accent}40, 0 16px 48px -12px ${accent}35`,
                    }}
                    aria-hidden
                  >
                    <Icon
                      className="size-16 md:size-20"
                      style={{ color: 'white', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))' }}
                      aria-hidden
                    />
                  </div>
                </motion.div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-800 md:text-2xl lg:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-center text-sm leading-relaxed text-slate-600 md:text-base">
                  {step.description}
                </p>
              </motion.article>
            )
          })}
        </div>

        <div className="relative border-t border-slate-200 px-6 py-5 text-center md:px-12">
          <p className="text-sm font-semibold text-slate-600 md:text-base">
            {t('modusOperandi.closingLine')} <span className="text-[var(--laneta-purple)]">{t('modusOperandi.closingAccent')}</span>
          </p>
        </div>
      </div>
    </motion.section>
  )
}
