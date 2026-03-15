import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'

const SECTION_ID = 'the-ad-factory'

function PlatformBlock({ embedded }: { embedded?: boolean }) {
  const { t } = useTranslation()
  const sloganText = t('common:slogan')

  const platform = {
    pageUrl: '/the-ad-factory',
    title: t('services:adFactory.title'),
    tagline: t('services:adFactory.tagline'),
    description: t('services:adFactory.description'),
    ctaLabel: t('services:adFactory.ctaLabel'),
    imageSrc: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/Ad-Factory.jpg',
  }

  if (embedded) {
    return (
      <motion.div
        className="group relative w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 min-h-[500px] sm:min-h-[520px] md:aspect-[21/9] md:min-h-[640px] 2xl:min-h-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0">
          <img
            src={platform.imageSrc}
            alt=""
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_120%_100%_at_50%_50%,transparent_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.5)_100%)]"
        />
        <div className="relative flex min-h-[500px] flex-col items-center justify-center overflow-y-auto px-5 py-8 text-center sm:min-h-[520px] sm:px-10 sm:py-12 md:min-h-0 md:max-h-none md:overflow-y-auto md:px-12 md:py-20 lg:px-16 lg:py-24 2xl:overflow-visible">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 md:gap-3">
            <span className="text-sm font-semibold tracking-wide text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] sm:text-lg md:text-xl">
              {platform.tagline}
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:mt-5 sm:text-4xl md:mt-6 md:text-5xl md:tracking-tight lg:mt-7 lg:text-6xl lg:leading-[1.1]">
            {platform.title}
          </h3>
          <div className="mx-auto mt-3 max-w-2xl space-y-1.5 text-sm leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] sm:mt-5 sm:space-y-2 sm:text-lg md:max-w-3xl md:mt-6 md:text-xl md:leading-snug md:space-y-2.5 lg:mt-7">
            {platform.description.split('\n').map((line, i) => (
              <p key={i}>{line.trim()}</p>
            ))}
          </div>
          <p className="mx-auto mt-5 max-w-xl rounded-full border border-white/25 bg-white/10 px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-white shadow-[0_0_30px_rgba(102,65,237,0.6)] backdrop-blur-md sm:mt-7 sm:px-6 sm:py-3 sm:text-xs md:mt-8 md:text-sm">
            {sloganText}
          </p>
          <a
            href={platform.pageUrl}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-[var(--laneta-purple)] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(102,65,237,0.5),0_0_0_1px_rgba(255,255,255,0.1)_inset] transition-all hover:scale-[1.03] hover:border-white/30 hover:bg-[var(--laneta-pink)] hover:shadow-[0_6px_32px_rgba(255,71,172,0.45)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/30 sm:mt-9 sm:px-10 sm:py-5 sm:text-lg md:mt-10"
          >
            {platform.ctaLabel}
            <span className="text-lg leading-none sm:text-xl" aria-hidden>→</span>
          </a>
        </div>
      </motion.div>
    )
  }

  const imageBlock = (
    <div className="group relative aspect-[21/9] overflow-hidden rounded-xl bg-slate-100 md:aspect-[3/1]">
      <img
        src={platform.imageSrc}
        alt=""
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
      />
    </div>
  )
  const textBlock = (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[var(--laneta-purple)]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[var(--laneta-pink)]/20 blur-3xl"
      />
      <div className="relative">
        <p className="mb-3 inline-flex rounded-full bg-[var(--laneta-purple)]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[var(--laneta-purple)]">
          {platform.tagline}
        </p>
        <h3 className="mb-3 text-xl font-bold text-slate-800 md:text-2xl">
          {platform.title}
        </h3>
        <p className="mb-4 text-slate-600 text-sm leading-relaxed md:mb-6 md:text-base">
          {platform.description}
        </p>
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--laneta-purple)]/60 bg-[var(--laneta-purple)]/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[var(--laneta-purple)] shadow-[0_0_18px_rgba(102,65,237,0.4)] backdrop-blur-sm md:mb-8 md:text-xs md:px-5 md:py-2.5 md:tracking-[0.22em]">
          {sloganText}
        </p>
        <a
          href={platform.pageUrl}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--laneta-purple)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[var(--laneta-pink)] hover:shadow-[var(--laneta-pink)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--laneta-pink)] focus:ring-offset-2"
        >
          {platform.ctaLabel}
          <span className="text-lg leading-none" aria-hidden>→</span>
        </a>
      </div>
    </div>
  )

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-slate-200/50">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--laneta-purple)] via-[var(--laneta-pink)] to-[var(--laneta-blue)]"
        />
        {imageBlock}
        <div className="relative flex flex-1 flex-col overflow-hidden p-6 md:p-8">
          {textBlock}
        </div>
      </div>
    </motion.div>
  )
}

export function ServicesCTA() {
  const { t } = useTranslation('services')

  return (
    <section
      id={SECTION_ID}
      className="relative -mt-px overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1680px] px-6 md:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-[var(--laneta-purple)]/[0.06] via-white via-40% to-[var(--laneta-pink)]/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 z-10 h-1.5 bg-gradient-to-r from-[var(--laneta-purple)] via-[var(--laneta-pink)] to-[var(--laneta-blue)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[var(--laneta-purple)]/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-[var(--laneta-pink)]/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-[var(--laneta-blue)]/10 blur-3xl"
          />
          <div className="relative p-6 md:p-10 lg:p-12">
            <motion.header
              className="mb-8 text-center md:mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-2 text-xs font-semibold tracking-[0.25em] uppercase text-[var(--laneta-blue)] md:text-sm">
                {t('contentOperatingSystem')}
              </p>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                {t('systemDescription')}
              </p>
            </motion.header>

            <div className="space-y-8 md:space-y-10">
              <PlatformBlock embedded />
              <motion.div
                className="flex flex-col items-center gap-6 rounded-2xl border border-slate-200/80 bg-white/60 px-6 py-8 text-center backdrop-blur-sm md:flex-row md:justify-center md:gap-12 md:px-10 md:py-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.15 }}
              >
                <p className="text-sm font-medium text-slate-600 md:text-base">
                  <span className="font-semibold text-slate-800">{t('oneSystem')}</span> {t('oneSystemDesc')}
                </p>
                <span className="hidden h-8 w-px bg-slate-200 md:block" aria-hidden />
                <p className="text-sm font-medium text-slate-600 md:text-base">
                  <span className="font-semibold text-slate-800">{t('clearOutcomes')}</span> {t('clearOutcomesDesc')}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
