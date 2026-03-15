import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'motion/react'
import { BsAwardFill } from 'react-icons/bs'
import { FaFaceGrinHearts } from 'react-icons/fa6'
import { DiCodeigniter } from 'react-icons/di'
import { FloatingCard } from '../../components/FloatingCard'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

const SCROLL_CLICK_IMAGE = 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/ad_laneta.png'

const FEATURE_KEYS = ['distinct', 'detail', 'trend'] as const
const FEATURE_ACCENTS = ['var(--laneta-purple)', 'var(--laneta-pink)', 'var(--laneta-blue)']

const AD_SCORE_CONFIG = [
  { icon: BsAwardFill, key: 'popularity' as const },
  { icon: FaFaceGrinHearts, key: 'impressions' as const },
  { icon: DiCodeigniter, key: 'trend' as const },
]

const AD_KEYS = ['nyx', 'amd', 'pinterest'] as const
const AD_IMAGES = [
  'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/ad_nyx.png',
  'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/ad_amd.png',
  'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/ad_pinterest.png',
]
const AD_BRANDS = ['Nyx', 'AMD', 'Pinterest']
const AD_ACCENTS = ['var(--laneta-purple)', 'var(--laneta-pink)', 'var(--laneta-blue)']
const AD_STATS = [
  { popularity: '4.8', impressions: '12M+', trend: '+34%' },
  { popularity: '4.9', impressions: '18M+', trend: '+42%' },
  { popularity: '4.7', impressions: '8M+', trend: '+28%' },
]

export function ServicePresentationSection() {
  const { t } = useTranslation('adFactory')
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => emblaApi.scrollNext(), 15_000)
    return () => clearInterval(interval)
  }, [emblaApi])

  const capabilities = t('presentation.capabilities', { returnObjects: true }) as string[]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto w-full max-w-7xl px-4 md:px-6"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--laneta-purple)]/10 blur-[100px]"
        aria-hidden
      />

      <div className="relative space-y-4 lg:space-y-5">
        {/* Carousel */}
        <FloatingCard variant="light" withAccentBar={false} className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {t('presentation.creativesStory')}
            </p>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={scrollPrev}
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[var(--laneta-purple)]"
                aria-label={t('presentation.previousSlide')}
              >
                <HiChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[var(--laneta-purple)]"
                aria-label={t('presentation.nextSlide')}
              >
                <HiChevronRight className="size-5" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container flex">
                {AD_KEYS.map((adKey, i) => (
                  <div
                    key={i}
                    className="embla__slide min-w-0 flex-[0_0_100%] px-2 md:px-4"
                  >
                    <div className="flex flex-col gap-6 md:gap-8">
                      <div className="aspect-video w-full overflow-hidden rounded-xl bg-slate-100 shadow-lg ring-1 ring-slate-200/80">
                        <img
                          src={AD_IMAGES[i]}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="text-sm font-bold"
                              style={{ color: AD_ACCENTS[i] }}
                            >
                              {AD_BRANDS[i]}
                            </span>
                            <span className="text-slate-400">·</span>
                            <span className="text-xs text-slate-500">
                              {t(`presentation.ads.${adKey}.format`)}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800">
                            {t(`presentation.ads.${adKey}.caption`)}
                          </h3>
                          <p className="text-sm leading-relaxed text-slate-600">
                            {t(`presentation.ads.${adKey}.story`)}
                          </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 md:justify-end">
                          {AD_SCORE_CONFIG.map(({ icon: Icon, key }) => (
                            <div
                              key={key}
                              className="flex flex-col items-center rounded-xl bg-white px-6 py-4 shadow-md ring-1 ring-slate-200/80"
                            >
                              <Icon
                                className="size-6 mb-2"
                                style={{ color: AD_ACCENTS[i] }}
                                aria-hidden
                              />
                              <p
                                className="text-lg font-bold"
                                style={{ color: AD_ACCENTS[i] }}
                              >
                                {AD_STATS[i][key]}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {AD_KEYS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === selectedIndex ? 'w-6' : 'w-2 bg-slate-300'
                }`}
                style={{
                  backgroundColor:
                    i === selectedIndex ? 'var(--laneta-purple)' : undefined,
                }}
                aria-label={t('presentation.goToSlide', { number: i + 1 })}
              />
            ))}
          </div>
        </FloatingCard>

        {/* Value statement + Scroll→Click + Feature grid */}
        <div className="flex flex-col gap-3 lg:gap-4">
            <FloatingCard variant="light" className="py-6 md:py-8">
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
                {t('presentation.valueStatement')}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {capabilities.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-[var(--laneta-purple)]/15 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-[var(--laneta-purple)]/25 hover:text-[var(--laneta-purple)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </FloatingCard>

            {/* Scroll → Click */}
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[var(--laneta-purple)]/10 blur-3xl"
              />
              <FloatingCard variant="light" className="group relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--laneta-purple)] to-transparent"
                />
                <div className="relative grid gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-12 lg:gap-16">
                  <div className="order-2 md:order-1">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
                      {t('presentation.fromScroll')}{' '}
                      <span className="text-slate-500">{t('presentation.scroll')}</span>
                      <span className="mx-3 text-[var(--laneta-purple)]">→</span>
                      <span className="text-[var(--laneta-purple)]">{t('presentation.click')}</span>
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600">
                      {t('presentation.scrollToClick')}
                    </p>
                    <p className="mt-3 leading-relaxed text-slate-600">
                      {t('presentation.scrollToClickBody')}
                    </p>
                    <div className="mt-8 border-l-4 border-[var(--laneta-purple)] pl-5">
                      <p className="text-lg font-medium text-slate-700 md:text-xl">
                        {t('presentation.scrollQuote')}{' '}
                        <span className="text-[var(--laneta-purple)]">
                          {t('presentation.scrollQuoteAccent')}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={SCROLL_CLICK_IMAGE}
                        alt="La Neta: The Creative Power Platform"
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                      />
                    </div>
                  </div>
                </div>
              </FloatingCard>
            </div>

            {/* Feature grid */}
            <div className="grid gap-4 sm:grid-cols-3">
              {FEATURE_KEYS.map((fKey, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <FloatingCard variant="light" withAccentBar={false} className="h-full">
                    <div className="space-y-2">
                      <h3
                        className="text-base font-semibold"
                        style={{ color: FEATURE_ACCENTS[i] }}
                      >
                        {t(`presentation.features.${fKey}.title`)}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {t(`presentation.features.${fKey}.description`)}
                      </p>
                    </div>
                  </FloatingCard>
                </motion.div>
              ))}
            </div>
        </div>
      </div>
    </motion.section>
  )
}
