import { useRef, useState, useEffect } from 'react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { HiArrowRight } from 'react-icons/hi'
import { useContactModal } from '../contexts/ContactModalContext'
import { useTranslation } from 'react-i18next'

const SECTION_ID = 'who-is-la-neta'

const IMAGES = {
  creatorTypes: [
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/Food_blogger.jpg', label: 'Food' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/gamer.jpg', label: 'Gaming' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/influencer_male.jpg', label: 'Fashion' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/influencer_famel.jpg', label: 'Creator Content' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/fotographer.jpg', label: 'Photography' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/traveler.jpg', label: 'Traveler' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/sci-fy_influencer.jpg', label: 'Sci-Fi' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/music_influencer.jpg', label: 'Music' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/mode_influencer.jpg', label: 'Mode' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/influencer_fitness.jpg', label: 'Fitness' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/influencer_artist.jpg', label: 'Artist' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/humor_influencer.jpg', label: 'Humor' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/mistery_influencer.jpg', label: 'Mystery' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/pets_influencer.jpg', label: 'Pets' },
    { src: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/influencer_jewelry.jpg', label: 'Jewelry' },
  ],
  story: {
    main: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/studio.jpg',
    support: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/creators.jpg',
  },
  process: [
    'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/Vance.jpg',
    'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/editor.jpg',
    'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/not_limits.png',
  ],
} as const

const METRIC_KEYS = ['creators', 'countries', 'impressions', 'retention', 'delivery', 'brands'] as const
const STEP_KEYS = ['step1', 'step2', 'step3'] as const
const STEP_NUMBERS = ['01', '02', '03'] as const

function MetricCard({
  value,
  label,
  sub,
  index,
}: {
  value: string
  label: string
  sub: string
  index: number
}) {
  return (
    <motion.div
      layout={false}
      className="rounded-2xl border border-slate-200 bg-slate-50/80 px-6 py-5 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-mono text-2xl font-bold text-[var(--laneta-pink)] md:text-3xl">{value}</p>
      <p className="mt-1 font-semibold text-slate-800">{label}</p>
      <p className="mt-0.5 text-sm text-slate-500">{sub}</p>
    </motion.div>
  )
}

// 40% más lento: 28 * 1.4 ≈ 39s
const CAROUSEL_DURATION = 39

function CreatorTypesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const tweenRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const io = new IntersectionObserver(
      (entries) => {
        const [e] = entries
        setIsInView(!!e?.isIntersecting)
      },
      { rootMargin: '100px', threshold: 0 }
    )
    io.observe(container)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    const track = trackRef.current
    if (!track) return

    let cancelled = false
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return
        const totalWidth = track.scrollWidth / 2
        const tl = gsap.timeline({ repeat: -1 })
        tl.to(track, {
          x: -totalWidth,
          duration: CAROUSEL_DURATION,
          ease: 'none',
          force3D: true,
        }).set(track, { x: 0 })
        tweenRef.current = tl
      })
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(id)
      tweenRef.current?.kill()
      tweenRef.current = null
    }
  }, [isInView])

  return null
}

function ProcessStepCard({
  number,
  title,
  body,
  imageSrc,
  index,
}: {
  number: string
  title: string
  body: string
  imageSrc: string
  index: number
}) {
  return (
    <motion.article
      layout={false}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md md:flex"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full shrink-0 md:w-44">
        <div className="aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]">
          <img
            src={imageSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent pointer-events-none md:from-white/30"
          aria-hidden
        />
      </div>
      <div className="flex-1 p-6 md:p-8">
        <span className="font-mono text-sm font-bold tracking-wider text-[var(--laneta-pink)]">
          {number}
        </span>
        <h3 className="mt-2 text-xl font-bold text-[var(--laneta-blue)] md:text-2xl">{title}</h3>
        <p className="mt-4 leading-relaxed text-slate-600">{body}</p>
      </div>
    </motion.article>
  )
}

export function WhoIsLaNeta() {
  const { openModal } = useContactModal()
  const { t } = useTranslation('whoIsLaNeta')

  const paragraphs = t('paragraphs', { returnObjects: true }) as string[]

  return (
    <section
      id={SECTION_ID}
      className="relative overflow-hidden border-b-0 bg-slate-50 py-20 md:py-28 shadow-none scroll-mt-24"
      style={{ contentVisibility: 'auto' }}
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8">
        {/* Head */}
        <motion.header
          layout={false}
          className="mb-16 text-center md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-sm font-medium tracking-[0.2em] uppercase text-[var(--laneta-blue)]">
            {t('ourStory')}
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl lg:text-5xl">
            {t('title')} <span className="text-[var(--laneta-pink)]">{t('titleHighlight')}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            {t('hook')}
          </p>
        </motion.header>

        {/* Story */}
        <motion.div
          layout={false}
          className="mb-20 md:mb-24"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="space-y-6 md:col-span-8 md:pr-4">
              {paragraphs.map((paragraph, i) => (
                <motion.p
                  key={i}
                  className={`text-lg leading-relaxed text-slate-700 md:text-xl md:leading-relaxed${i === 1 ? ' hidden md:block' : ''}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            <div className="md:col-span-4 md:flex md:items-start md:justify-end">
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 shadow-md md:max-w-full">
                <img
                  src={IMAGES.story.support}
                  alt="Creator at work"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center md:justify-start">
            <button
              type="button"
              onClick={() => openModal('global')}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--laneta-purple)] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)] focus:ring-offset-2 cursor-pointer"
            >
              {t('letsWorkTogether')}
              <HiArrowRight className="size-5" />
            </button>
          </div>
        </motion.div>

        {/* Creator types — Our ecosystem */}
        <div id="our-ecosystem" className="scroll-mt-24">
          <CreatorTypesCarousel />
        </div>

        {/* Metrics dashboard */}
        <div id="what-we-achieved" className="mb-20 scroll-mt-24 md:mb-28">
          <motion.h3
            layout={false}
            className="mb-8 text-center text-xl font-bold text-[var(--laneta-blue)] md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('whatWeAchieved')}
          </motion.h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {METRIC_KEYS.map((key, index) => (
              <MetricCard
                key={key}
                value={t(`metrics.${key}.value`)}
                label={t(`metrics.${key}.label`)}
                sub={t(`metrics.${key}.sub`)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Creative process */}
        <div id="our-creative-process" className="scroll-mt-24">
          <motion.h3
            layout={false}
            className="mb-4 text-center text-xl font-bold text-[var(--laneta-blue)] md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('ourCreativeProcess')}
          </motion.h3>
          <motion.p
            layout={false}
            className="mx-auto mb-3 max-w-2xl text-center text-slate-600"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('processDescription')}
          </motion.p>
          <motion.p
            layout={false}
            className="mx-auto mb-12 max-w-2xl text-center text-sm text-slate-500"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('processSub')}
          </motion.p>
          <div className="space-y-6 md:space-y-8">
            {STEP_KEYS.map((stepKey, index) => (
              <ProcessStepCard
                key={stepKey}
                number={STEP_NUMBERS[index]}
                title={t(`processSteps.${stepKey}.title`)}
                body={t(`processSteps.${stepKey}.body`)}
                imageSrc={IMAGES.process[index]}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
