import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'motion/react'
import { BsAwardFill } from 'react-icons/bs'
import { FaFaceGrinHearts } from 'react-icons/fa6'
import { DiCodeigniter } from 'react-icons/di'
import { FloatingCard } from '../../components/FloatingCard'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

//const VIDEO_SRC = 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/ad_cafe.mp4'
const SCROLL_CLICK_IMAGE = 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/ad_laneta.png'

const FEATURES = [
  {
    title: 'Distinct creative',
    description: 'Visuals that break through noise.',
    accent: 'var(--laneta-purple)',
  },
  {
    title: 'Detail obsessed',
    description: 'Every frame intentionally crafted.',
    accent: 'var(--laneta-pink)',
  },
  {
    title: 'Trend-aware',
    description: 'Current without becoming dated.',
    accent: 'var(--laneta-blue)',
  },
]

const CAPABILITIES = [
  'Creative & media strategy',
  'In-house production',
  'Curated talent',
  'Paid social distribution',
  'Systematic testing',
  'Scalability',
]

const AD_SCORES = [
  { icon: BsAwardFill, label: 'Popularity', key: 'popularity' as const },
  { icon: FaFaceGrinHearts, label: 'Impressions', key: 'impressions' as const },
  { icon: DiCodeigniter, label: 'Trend', key: 'trend' as const },
]

const AD_EXAMPLES = [
  {
    image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/ad_nyx.png',
    brand: 'Nyx',
    caption: 'Performance that converts',
    accent: 'var(--laneta-purple)',
    story:
      'We turned a product drop into a narrative moment. The creative leads with tension—a close-up, a pause—before revealing the payoff. Built for scroll-stopping impact and repeat viewability.',
    popularity: '4.8',
    impressions: '12M+',
    trend: '+34%',
    format: 'Static · Feed',
  },
  {
    image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/ad_amd.png',
    brand: 'AMD',
    caption: 'Reach that scales',
    accent: 'var(--laneta-pink)',
    story:
      'Tech that speaks to creators, not just specs. We flipped the script from product-first to lifestyle-first—showing what becomes possible, not just what\'s inside the box. Audience-first creative that scaled across markets.',
    popularity: '4.9',
    impressions: '18M+',
    trend: '+42%',
    format: 'Video · Cross-platform',
  },
  {
    image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/ad_pinterest.png',
    brand: 'Pinterest',
    caption: 'Quality that elevates',
    accent: 'var(--laneta-blue)',
    story:
      'Discovery-led creative for a discovery platform. We matched intent with inspiration—clean, aspirational visuals that feel native to the feed while driving clear action. Every frame optimized for both brand lift and conversion.',
    popularity: '4.7',
    impressions: '8M+',
    trend: '+28%',
    format: 'Static · Pinterest',
  },
]

export function ServicePresentationSection() {
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

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto w-full max-w-7xl px-4 md:px-6"
    >
      {/* Ambient background — depth, not flat */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[var(--laneta-purple)]/10 blur-[100px]"
        aria-hidden
      />

      <div className="relative space-y-4 lg:space-y-5">
        {/* 1. HERO — Video as protagonist, floating title; en móvil el bloque ocupa ~70vh y el título el doble de grande 
        <div className="relative h-[70vh] min-h-[380px] overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 ring-slate-200/80 md:h-auto md:min-h-0">
          <video
            src={VIDEO_SRC}
            className="absolute inset-0 h-full w-full object-cover md:relative md:aspect-video md:aspect-[21/9] md:h-auto"
            controls
            playsInline
            preload="metadata"
            aria-label="The Ad Factory — service presentation"
          >
            <track kind="captions" />
            Your browser does not support video playback.
          </video>
          {/* Depth overlay — same as Hook Hunter for consistent card presentation 
          <div
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-black/20 via-transparent to-white/5"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-b md:from-black/60 md:via-transparent md:to-transparent"
            aria-hidden
          />
          <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-auto md:top-8 md:left-8 md:right-auto">
            <p className="text-base font-medium uppercase tracking-[0.2em] opacity-90 md:text-xs">
              Full-service creative engine
            </p>
            <h1 className="mt-2 text-6xl font-bold leading-tight tracking-tight md:mt-1 md:text-4xl lg:text-5xl">
              The Ad Factory
            </h1>
            <p className="mt-3 text-2xl text-white/90 md:mt-2 md:text-lg md:text-xl">
              Where ideas become ads.
            </p>
          </div>
        </div>
        */}
        
        {/* 2. Carousel — Full width, below video, ads displayed completely */}
        <FloatingCard variant="light" withAccentBar={false} className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Creatives that tell a story
            </p>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={scrollPrev}
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[var(--laneta-purple)]"
                aria-label="Previous slide"
              >
                <HiChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[var(--laneta-purple)]"
                aria-label="Next slide"
              >
                <HiChevronRight className="size-5" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container flex">
                {AD_EXAMPLES.map((ad, i) => (
                  <div
                    key={i}
                    className="embla__slide min-w-0 flex-[0_0_100%] px-2 md:px-4"
                  >
                    <div className="flex flex-col gap-6 md:gap-8">
                      <div className="aspect-video w-full overflow-hidden rounded-xl bg-slate-100 shadow-lg ring-1 ring-slate-200/80">
                        <img
                          src={ad.image}
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
                              style={{ color: ad.accent }}
                            >
                              {ad.brand}
                            </span>
                            <span className="text-slate-400">·</span>
                            <span className="text-xs text-slate-500">
                              {ad.format}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800">
                            {ad.caption}
                          </h3>
                          <p className="text-sm leading-relaxed text-slate-600">
                            {ad.story}
                          </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 md:justify-end">
                          {AD_SCORES.map(({ icon: Icon, key }) => (
                            <div
                              key={key}
                              className="flex flex-col items-center rounded-xl bg-white px-6 py-4 shadow-md ring-1 ring-slate-200/80"
                            >
                              <Icon
                                className="size-6 mb-2"
                                style={{ color: ad.accent }}
                                aria-hidden
                              />
                              <p
                                className="text-lg font-bold"
                                style={{ color: ad.accent }}
                              >
                                {ad[key]}
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
            {AD_EXAMPLES.map((_, i) => (
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
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </FloatingCard>

        {/* 3. Value statement (with capabilities), feature grid */}
        <div className="flex flex-col gap-3 lg:gap-4">
            {/* Value statement — short, punchy + capabilities chips */}
            <FloatingCard variant="light" className="py-6 md:py-8">
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
                A fully integrated creative engine combining strategy, production, talent,
                and distribution under one roof. From brief to feed, we build ads designed
                to scale.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {CAPABILITIES.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-[var(--laneta-purple)]/15 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-[var(--laneta-purple)]/25 hover:text-[var(--laneta-purple)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </FloatingCard>

            {/* Scroll → Click — premium transition block */}
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
                      From{' '}
                      <span className="text-slate-500">Scroll</span>
                      <span className="mx-3 text-[var(--laneta-purple)]">→</span>
                      <span className="text-[var(--laneta-purple)]">Click</span>
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600">
                      We turn passive scrolling into intentional action.
                    </p>
                    <p className="mt-3 leading-relaxed text-slate-600">
                      Ads designed to build credibility, spark connection, and
                      convert attention into measurable engagement.
                    </p>
                    <div className="mt-8 border-l-4 border-[var(--laneta-purple)] pl-5">
                      <p className="text-lg font-medium text-slate-700 md:text-xl">
                        You bring the vision.{' '}
                        <span className="text-[var(--laneta-purple)]">
                          We turn it into global creative impact.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={SCROLL_CLICK_IMAGE}
                        alt="La Neta: The Creative Power Platform — Technology. Artistry. Authenticity."
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

            {/* Feature grid — product/SaaS feel */}
            <div className="grid gap-4 sm:grid-cols-3">
              {FEATURES.map((f, i) => (
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
                        style={{ color: f.accent }}
                      >
                        {f.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {f.description}
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
