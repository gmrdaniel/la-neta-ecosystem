import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { gsap } from 'gsap'
import {
  HiLightningBolt,
  HiUserGroup,
  HiClipboardList,
  HiFire,
  HiChartBar,
  HiSearchCircle,
  HiCash,
  HiArrowRight,
} from 'react-icons/hi'
import { AD_FACTORY_SLOGAN } from '../constants/copy'
import { SiMeta, SiPinterest } from 'react-icons/si'
import { MdAddReaction } from 'react-icons/md'
import { ImEye } from 'react-icons/im'
import { FaPhotoVideo } from 'react-icons/fa'
import type { IconType } from 'react-icons'

const STATS = [
  { value: 2, suffix: 'B', label: 'impressions generated', unit: 'billion', icon: MdAddReaction },
  { value: 1, suffix: 'M', label: 'in revenue', unit: 'million', icon: HiCash },
  { value: 100, suffix: 'M', label: 'views per year', unit: 'million', icon: ImEye },
  { value: 2, suffix: 'K+', label: 'Videos produced', unit: 'k', icon: FaPhotoVideo },
] as const

const OFFER_SLIDES = [
  {
    icon: HiLightningBolt,
    title: 'Strategy & Creative',
    metric: '3x',
    metricLabel: 'higher engagement vs. standard ads',
    impact: 'Campaigns that break through the noise.',
    copy: 'High-impact concepts designed to go viral. We don’t follow trends—we set them. From insight to execution, every idea is built to dominate feeds and convert.',
  },
  {
    icon: HiUserGroup,
    title: 'Top-Tier Talent',
    metric: '4,000+',
    metricLabel: 'vetted creators in our network',
    impact: 'Real people. Real results. No dead weight.',
    copy: 'We handpick creators who actually move the needle. Access to the best talent across niches and regions. Your brand in the right hands, every time.',
  },
  {
    icon: HiClipboardList,
    title: 'Flawless Ops',
    metric: '21',
    metricLabel: 'days from brief to delivery',
    impact: 'You focus on the vision. We handle the rest.',
    copy: 'Contracts, invoices, rights, and logistics—all managed. One point of contact, clear timelines, zero surprises. Scale without the operational headache.',
  },
  {
    icon: HiFire,
    title: 'Full-Service Fire',
    metric: '100%',
    metricLabel: 'turnkey production',
    impact: 'From idea to live campaign—we own it.',
    copy: AD_FACTORY_SLOGAN,
  },
  {
    icon: HiChartBar,
    title: 'Data & Analytics',
    metric: 'Clear',
    metricLabel: 'reports that show what worked',
    impact: 'Stop guessing. Start optimizing.',
    copy: 'Performance dashboards that tell you exactly what drove results. Attribution, benchmarks, and actionable insights so every dollar works harder.',
  },
  {
    icon: HiSearchCircle,
    title: 'Elite Scouting',
    metric: '24/7',
    metricLabel: 'talent discovery & vetting',
    impact: 'We find the creators your competitors haven’t.',
    copy: 'Our team constantly discovers and vets new talent. First access to rising stars and niche experts. The right face for your brand, before everyone else.',
  },
]

const OFFER_AUTO_ADVANCE_MS = 5500

const VIDEO_PLAYBACK_RATE = 0.55

/** Convierte value + unit al número objetivo (ej. 2 + 'billion' → 2e9). */
function getTargetNumber(val: number, unit: string): number {
  if (unit === 'billion') return val * 1e9
  if (unit === 'million') return val * 1e6
  if (unit === 'k') return val * 1e3
  return val
}

/** Formatea un número para mostrar con K/M/B según la magnitud. */
function formatScaled(
  num: number,
  finalSuffix: string
): { value: string; suffix: string } {
  if (num === 0) return { value: '0', suffix: '' }
  if (num >= 1e9) return { value: (num / 1e9).toFixed(0), suffix: 'B' }
  if (num >= 1e6) {
    const v = num / 1e6
    return { value: v >= 10 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, ''), suffix: 'M' }
  }
  if (num >= 1e3) {
    const v = num / 1e3
    const suffix = finalSuffix === 'K+' ? 'K+' : 'K'
    return { value: v >= 10 ? v.toFixed(0) : v.toFixed(1).replace(/\.0$/, ''), suffix }
  }
  return { value: Math.round(num).toString(), suffix: '' }
}

function StatCard({
  value,
  suffix,
  label,
  unit,
  index,
  icon: Icon,
}: {
  value: number
  suffix: string
  label: string
  unit: string
  index: number
  icon: IconType
}) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const suffixRef = useRef<HTMLSpanElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const progressRef = useRef({ p: 0 })

  useEffect(() => {
    const valueEl = valueRef.current
    const suffixEl = suffixRef.current
    const labelEl = labelRef.current
    if (!valueEl || !suffixEl) return

    const targetNumber = getTargetNumber(value, unit)
    const delay = 0.9 + index * 0.2
    if (targetNumber <= 0) return

    if (labelEl) gsap.set(labelEl, { opacity: 0, y: 8 })

    gsap.fromTo(
      progressRef.current,
      { p: 0 },
      {
        p: 1,
        duration: 2.6,
        delay,
        ease: 'power2.inOut',
        overwrite: true,
        onStart: () => {
          valueEl.textContent = '0'
          suffixEl.textContent = ''
          if (cardRef.current) {
            gsap.to(cardRef.current, {
              scale: 1.02,
              duration: 0.3,
              boxShadow:
                '0 25px 50px -12px rgba(0,0,0,0.35), 0 0 30px -8px rgba(102,65,237,0.35)',
            })
          }
        },
        onUpdate: () => {
          const p = progressRef.current.p
          const raw = p <= 0 ? 0 : Math.pow(10, p * Math.log10(targetNumber))
          const { value: displayValue, suffix: displaySuffix } = formatScaled(raw, suffix)
          valueEl.textContent = displayValue
          suffixEl.textContent = displaySuffix
        },
        onComplete: () => {
          const { value: displayValue, suffix: displaySuffix } = formatScaled(
            targetNumber,
            suffix
          )
          valueEl.textContent = displayValue
          suffixEl.textContent = displaySuffix
          if (cardRef.current) {
            gsap.to(cardRef.current, {
              scale: 1,
              duration: 0.4,
              ease: 'back.out(1.2)',
              boxShadow:
                '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)',
            })
          }
          if (labelEl) {
            gsap.to(labelEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
          }
        },
      }
    )
  }, [index, value, unit, suffix])

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-5 shadow-2xl backdrop-blur-sm"
      style={{
        background: 'linear-gradient(135deg, rgba(102,65,237,0.2) 0%, rgba(255,71,172,0.1) 100%)',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)',
      }}
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.65,
        delay: 0.35 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.06,
        transition: { duration: 0.25 },
      }}
      onHoverStart={() => {
        if (cardRef.current) {
          gsap.to(cardRef.current, {
            boxShadow:
              '0 28px 56px -12px rgba(0,0,0,0.35), 0 0 48px -12px rgba(102,65,237,0.45), 0 0 0 1px rgba(255,255,255,0.08)',
            duration: 0.3,
          })
        }
      }}
      onHoverEnd={() => {
        if (cardRef.current) {
          gsap.to(cardRef.current, {
            boxShadow:
              '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05)',
            duration: 0.3,
          })
        }
      }}
    >
      {/* Background icon */}
      <span
        className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-white/10 md:right-2"
        aria-hidden
      >
        <Icon size={96} />
      </span>
      <p className="relative mb-1 font-mono text-3xl font-bold tracking-tight text-white md:text-4xl">
        <span ref={valueRef}>0</span>
        <span ref={suffixRef} className="text-[var(--laneta-pink)]" />
      </p>
      <p ref={labelRef} className="relative text-sm font-medium text-white/80">
        {label}
      </p>
    </motion.div>
  )
}

const HERO_VIDEO_SRC = '/assets/videos/presence_on_the_net.mp4'

function OfferCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(Date.now())
  const total = OFFER_SLIDES.length

  const goTo = (next: number, dir: number) => {
    setDirection(dir)
    setIndex((next + total) % total)
    setProgress(0)
    startTimeRef.current = Date.now()
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total)
      setDirection(1)
      setProgress(0)
      startTimeRef.current = Date.now()
    }, OFFER_AUTO_ADVANCE_MS)
  }

  useEffect(() => {
    startTimeRef.current = Date.now()
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total)
      setDirection(1)
      setProgress(0)
      startTimeRef.current = Date.now()
    }, OFFER_AUTO_ADVANCE_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [total])

  useEffect(() => {
    startTimeRef.current = Date.now()
  }, [index])

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(Math.min((Date.now() - startTimeRef.current) / OFFER_AUTO_ADVANCE_MS, 1))
    }, 80)
    return () => clearInterval(t)
  }, [])

  const slide = OFFER_SLIDES[index]

  return (
    <motion.div
      className="rounded-2xl border border-white/10 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(3,7,18,0.85) 100%)',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <h2 className="text-lg font-bold text-white md:text-xl">What we offer</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1, -1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Previous service"
          >
            <span className="text-lg">←</span>
          </button>
          <span className="min-w-[4ch] text-center text-sm font-medium text-white/80">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            onClick={() => goTo(index + 1, 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Next service"
          >
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
      <div className="relative min-h-[483px] pb-2 md:min-h-[414px] md:pb-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -80 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col md:flex-row md:items-center gap-6 md:gap-12 px-6 pt-6 pb-4 md:px-10 md:py-10"
          >
            <motion.span
              className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl text-4xl text-white md:h-32 md:w-32 md:text-6xl"
              style={{
                background: 'linear-gradient(135deg, var(--laneta-purple), var(--laneta-pink))',
                boxShadow: '0 12px 40px rgba(102,65,237,0.5)',
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              <slide.icon />
            </motion.span>
            <div className="flex-1 min-w-0">
              <motion.h3
                className="text-2xl font-bold text-white md:text-4xl mb-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {slide.title}
              </motion.h3>
              <motion.div
                className="flex flex-wrap items-baseline gap-3 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="font-mono text-4xl font-bold text-[var(--laneta-pink)] md:text-5xl">
                  {slide.metric}
                </span>
                <span className="text-base text-white/80 md:text-lg">{slide.metricLabel}</span>
              </motion.div>
              <motion.p
                className="text-base font-semibold text-white/95 mb-4 md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                {slide.impact}
              </motion.p>
              <motion.p
                className="text-base text-white/75 leading-relaxed max-w-2xl md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {slide.copy}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div
        className="relative z-10 flex items-center gap-2 border-t border-white/10 bg-slate-900/40 px-6 py-4 backdrop-blur-sm"
        style={{
          background: 'linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(3,7,18,0.6) 100%)',
        }}
      >
        <div className="flex-1 h-1.5 min-w-0 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--laneta-purple)] to-[var(--laneta-pink)]"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex shrink-0 gap-1.5">
          {OFFER_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [heroInView, setHeroInView] = useState(true)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const io = new IntersectionObserver(
      (entries) => {
        setHeroInView(!!entries[0]?.isIntersecting)
      },
      { rootMargin: '0px', threshold: 0 }
    )
    io.observe(section)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (heroInView) {
      video.playbackRate = VIDEO_PLAYBACK_RATE
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [heroInView])

  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el
    if (el) {
      el.playbackRate = VIDEO_PLAYBACK_RATE
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Background video: solo se reproduce cuando el hero está en vista */}
      <div className="absolute inset-0">
        <video
          ref={setVideoRef}
          onLoadedMetadata={(e) => {
            e.currentTarget.playbackRate = VIDEO_PLAYBACK_RATE
          }}
          onCanPlay={(e) => {
            e.currentTarget.playbackRate = VIDEO_PLAYBACK_RATE
            if (heroInView) e.currentTarget.play().catch(() => {})
          }}
          src={HERO_VIDEO_SRC}
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          aria-hidden
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(15,23,42,0.75) 0%, rgba(102,65,237,0.6) 50%, rgba(3,7,18,0.85) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Brand anchor: ancla institucional (marca = estabilidad, animación mínima) */}
        <motion.div
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src="https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/logo.png"
            alt="La Neta"
            className="h-10 w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:h-12 lg:h-14"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            }}
            viewport={{ once: true, amount: 0.2 }}
          />
          <div className="hidden h-8 w-px bg-white/20 md:block" aria-hidden />
          <p className="text-sm font-medium tracking-wide text-white/70 md:text-base">
            Content & Talent Infrastructure
          </p>
        </motion.div>
        {/* Labels */}
        <motion.p
          className="mb-3 text-sm font-medium tracking-[0.2em] text-white/70 uppercase md:mb-4 md:text-base"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          For brands · Global · Digital · Creators
        </motion.p>

        {/* Title */}
        <motion.h1
          className="mb-6 max-w-5xl overflow-visible md:mb-8"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
        >
          <span className="block text-4xl font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)] md:text-5xl lg:text-6xl xl:text-7xl">
          <span
            className="mt-2 pb-1 leading-[1.35] bg-gradient-to-r from-[var(--laneta-blue)] via-[var(--laneta-purple)] to-[#a78bfa] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl md:pb-1.5 lg:text-6xl xl:text-7xl"
            style={{
              filter: 'drop-shadow(0 0 24px rgba(238, 34, 211, 0.46)) drop-shadow(0 2px 12px rgba(23, 103, 207, 0.25))',
            }}
          >La Neta</span> — Leaders of the digital ecosystem
          </span>
          <span
            className="mt-2 block pb-1 leading-[1.35] text-white/95 text-2xl font-semibold md:text-3xl lg:text-4xl"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}
          >
            Content & talent infrastructure for brands that scale.
          </span>
        </motion.h1>

        {/* Slogan */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <p className="mb-2 text-base text-white/80 md:text-lg">
            We don’t just manage campaigns.
          </p>
          <p className="inline-block rounded-xl bg-white/10 px-5 py-2.5 text-xl font-bold tracking-tight text-white shadow-[0_0_30px_rgba(102,65,237,0.3)] ring-1 ring-white/20 backdrop-blur-sm md:text-2xl">
            We Dominate Feeds.
          </p>
        </motion.div>

        {/* Trusted by + CTA */}
        <motion.div
          className="mb-12 flex flex-col gap-8 md:mb-14 md:flex-row md:items-center md:justify-between md:gap-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60 md:text-sm">
              Trusted by & official partners
            </span>
            <div className="flex items-center gap-6 md:gap-8">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm md:h-16 md:w-16"
                aria-hidden
              >
                <img
                  src="https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/air_media_tech.png"
                  alt="Air Media Tech"
                  className="h-25 w-25 object-contain md:h-25 md:w-25"
                />
              </div>
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm md:h-16 md:w-16"
                aria-hidden
              >
                <SiMeta className="h-7 w-7 md:h-8 md:w-8" style={{ color: '#1877F2' }} aria-label="Meta" />
              </div>
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm md:h-16 md:w-16"
                aria-hidden
              >
                <SiPinterest className="h-7 w-7 md:h-8 md:w-8" style={{ color: '#E60023' }} aria-label="Pinterest" />
              </div>
            </div>
          </div>
          <a
            href="#lets-work-together"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('lets-work-together')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-bold text-slate-900 shadow-xl transition hover:bg-white/95 hover:shadow-[0_0_40px_rgba(102,65,237,0.4)] md:px-8 md:py-4 md:text-lg"
          >
            Get in touch
            <HiArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" aria-hidden />
          </a>
        </motion.div>

        {/* Stats grid */}
        <div className="mb-3 grid grid-cols-2 gap-4 md:mb-5 md:grid-cols-4 md:gap-6">
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              unit={stat.unit}
              index={index}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Positioning statement */}
        <motion.div
          className="mb-12 max-w-3xl md:mb-14"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="mt-3 text-base font-medium text-white/70 md:text-lg">
            500+ power brands · 98% client retention
          </p>
        </motion.div>

        {/* Offer carousel */}
        <OfferCarousel />
      </div>
    </section>
  )
}
