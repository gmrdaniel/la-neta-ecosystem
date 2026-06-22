import { motion } from 'motion/react'
import { HiArrowRight } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

const SECTION_ID = 'for-brands'

type BrandOption = {
  id: 'business' | 'ads'
  url: string
  thumbnail: string
  hasBadge?: boolean
}

const OPTIONS: BrandOption[] = [
  {
    id: 'business',
    url: 'https://business.laneta.com',
    thumbnail: '/assets/businesslanetacom.png',
  },
  {
    id: 'ads',
    url: 'https://ads.laneta.com',
    thumbnail: '/assets/adslaneta.png',
    hasBadge: true,
  },
]

function BrandOptionCard({ option, index }: { option: BrandOption; index: number }) {
  const { t } = useTranslation('forBrands')
  const title = t(`${option.id}.title`)

  return (
    <motion.a
      href={option.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg ring-1 ring-slate-200/50 transition-all hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)] focus:ring-offset-2"
    >
      {/* Thumbnail (site preview) */}
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-slate-100">
        <img
          src={option.thumbnail}
          alt={t('previewAlt', { name: title })}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
        />
        {option.hasBadge && (
          <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-[var(--laneta-pink)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
            {t('badge')}
          </span>
        )}
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--laneta-blue)]">
          {t(`${option.id}.eyebrow`)}
        </p>
        <h3 className="text-xl font-extrabold leading-snug tracking-tight text-slate-800 md:text-2xl">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-base leading-relaxed text-slate-600">
          {t(`${option.id}.description`)}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-base font-semibold text-[var(--laneta-purple)] transition-colors group-hover:text-[var(--laneta-pink)]">
          {t('cta')}
          <HiArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.a>
  )
}

export function ForBrands() {
  const { t } = useTranslation('forBrands')

  return (
    <section id={SECTION_ID} className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--laneta-purple)] md:text-sm">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 md:text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {OPTIONS.map((option, index) => (
            <BrandOptionCard key={option.id} option={option} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
