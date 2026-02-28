/**
 * Service Overview Layer (Decision Layer) — B2B.
 * Map of the full system before detail. Enables quick self-identification:
 * Platform → Execution modes → "I need THIS" → click.
 * Not "Our Services" — positioned as "The System" / execution layers.
 */
import { motion } from 'motion/react'
import { useContactModal } from '../contexts/ContactModalContext'

const THE_AD_FACTORY_VIDEO_SRC = 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/ad_cafe.mp4'

/** Accent for card decoration — La Neta palette to match light background. */
const CARD_ACCENTS = ['purple', 'pink', 'purple', 'pink'] as const

const EXECUTION_SERVICES = [
  {
    tagline: 'AI Execution Layer',
    title: 'The Glitch',
    value: 'Generate and test content at scale using AI talent.',
    forLabel: 'For performance marketing teams',
    ctaLabel: 'View AI execution',
    href: '#the-glitch',
  },
  {
    tagline: 'Creator Execution Layer',
    title: 'The Hook Hunter',
    value: 'UGC creators optimized for performance hooks and conversions.',
    forLabel: 'For growth teams',
    ctaLabel: 'View creator execution',
    href: '#hook-hunter',
  },
  {
    tagline: 'Scaling Layer',
    title: 'The Amplifier',
    value: 'Turn winning content into consistent volume and reach.',
    forLabel: 'For performance brands',
    ctaLabel: 'Scale campaigns',
    href: '#amplifier',
  },
  {
    tagline: 'Market Domination Layer',
    title: 'Empire Mode',
    value: 'Own your category with multi-creator feed saturation.',
    forLabel: 'For category leaders',
    ctaLabel: 'Dominate the feed',
    href: '#empire',
  },
]

/** Decorative SVG: soft arc + dot pattern for execution cards (La Neta purple/pink). */
function CardDecoration({ accent }: { accent: (typeof CARD_ACCENTS)[number] }) {
  const isPurple = accent === 'purple'
  const stroke = isPurple ? 'rgba(102, 65, 237, 0.4)' : 'rgba(255, 71, 172, 0.4)'
  const fill = isPurple ? 'rgba(102, 65, 237, 0.08)' : 'rgba(255, 71, 172, 0.08)'
  return (
    <svg
      className="pointer-events-none absolute right-0 top-0 h-full w-2/5 max-w-[220px] opacity-80"
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Soft arc */}
      <path
        d="M 0 40 Q 120 20 200 80 T 180 280"
        stroke={stroke}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Second arc */}
      <path
        d="M 40 0 Q 160 60 200 140"
        stroke={stroke}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Small circles */}
      <circle cx="160" cy="60" r="3" fill={fill} />
      <circle cx="180" cy="120" r="2" fill={fill} />
      <circle cx="140" cy="180" r="2.5" fill={fill} />
      {/* System node: flow → connection → execution point */}
      <circle cx="180" cy="40" r="6" fill="none" stroke={stroke} strokeWidth="1" />
      <circle cx="180" cy="40" r="2" fill={stroke} />
    </svg>
  )
}

function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export function ServicesOverviewSection() {
  const { openModal } = useContactModal()
  return (
    <section id="system-overview" className="scroll-mt-24">
      <motion.div
        className="grid gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        {/* Micro headline — legible on light background, La Neta accent */}
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--laneta-purple)] md:text-sm">
            La Neta Ecosystem
          </p>
          
        </div>

        {/* Platform card — full width, La Neta gradient bar + CTA */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-xl ring-1 ring-slate-200/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
          >
            <video
              src={THE_AD_FACTORY_VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover object-center"
              aria-hidden
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-slate-900/88 via-slate-900/65 to-slate-900/45"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-[var(--laneta-purple)] via-[var(--laneta-pink)] to-[var(--laneta-blue)]"
          />
          {/* Content: min-height on small/medium so content isn't squashed; aspect 21/9 only from xl (1280px) up */}
          <div className="relative z-10 flex min-h-[380px] flex-col justify-end px-4 py-8 sm:min-h-[420px] sm:px-6 sm:py-10 md:min-h-[460px] md:px-10 md:py-12 lg:min-h-[480px] lg:px-12 xl:min-h-0 xl:aspect-[21/9] xl:px-16 xl:py-14">
            <div
              aria-hidden
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--laneta-purple)]/15 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[var(--laneta-pink)]/15 blur-3xl"
            />
            <div className="relative w-full max-w-2xl text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--laneta-pink)] sm:tracking-[0.25em] md:text-sm">
                Content operating system
              </p>
              <h3 className="mt-1.5 text-2xl font-extrabold tracking-tight text-white drop-shadow-sm sm:mt-2 sm:text-3xl md:text-4xl xl:text-5xl">
                The Ad Factory
              </h3>
              <p className="mt-3 text-base font-semibold leading-snug text-white/95 sm:mt-4 sm:text-lg md:text-xl">
                Stop Guessing. Start Scaling. Performance-Driven Ads in 21 Days.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:mt-3 sm:text-base md:text-lg">
                We specialize in taking users from scroll to click through ads that build community and immediate credibility.
              </p>
              <ul className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-2 md:mt-6 md:gap-x-6 md:gap-y-3 lg:gap-x-8">
                <li className="flex items-center gap-2.5 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/10 sm:px-4 sm:py-2.5 md:text-base">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--laneta-pink)]/30 text-[var(--laneta-pink)]" aria-hidden>✓</span>
                  We create UGC advertisements
                </li>
                <li className="flex items-center gap-2.5 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/10 sm:px-4 sm:py-2.5 md:text-base">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--laneta-pink)]/30 text-[var(--laneta-pink)]" aria-hidden>✓</span>
                  We edit videos
                </li>
                <li className="flex items-center gap-2.5 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/10 sm:px-4 sm:py-2.5 md:text-base">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--laneta-pink)]/30 text-[var(--laneta-pink)]" aria-hidden>✓</span>
                  We generate variants with AI
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openModal('adFactory')}
                className="mt-6 w-full min-w-0 sm:mt-8 sm:w-auto sm:flex-initial inline-flex items-center justify-center gap-2.5 rounded-xl bg-[var(--laneta-purple)] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[var(--laneta-purple)]/25 transition-all hover:bg-[var(--laneta-pink)] hover:shadow-[var(--laneta-pink)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--laneta-pink)] focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer"
              >
                Request a Free Consultation
                <span className="text-xl leading-none" aria-hidden>→</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Execution cards — 2x2 grid, light cards matching background */}
        <div className="hidden">{/* grid gap-6 md:grid-cols-2 */}
          {EXECUTION_SERVICES.map((service, index) => {
            const accent = CARD_ACCENTS[index]
            const isPurple = accent === 'purple'
            return (
            <motion.a
              key={service.href + service.title}
              href={service.href}
              onClick={(e) => scrollToSection(e, service.href)}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/95 p-6 text-left shadow-lg ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:ring-[var(--laneta-purple)]/30 md:p-8 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              {/* 1. Technical grid texture — sutil sobre fondo claro */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.5]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgb(148 163 184 / 0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(148 163 184 / 0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: '32px 32px',
                }}
              />
              {/* 2. Directional light sweep — suave sobre claro */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-60"
                style={{
                  background: isPurple
                    ? 'radial-gradient(600px circle at 85% 20%, rgba(102,65,237,0.06), transparent 60%)'
                    : 'radial-gradient(600px circle at 85% 20%, rgba(255,71,172,0.06), transparent 60%)',
                }}
              />
              {/* Blob — La Neta purple/pink */}
              <div
                aria-hidden
                className={`absolute -bottom-12 -left-12 h-36 w-36 rounded-full blur-2xl opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40 ${
                  isPurple ? 'bg-[var(--laneta-purple)]/40' : 'bg-[var(--laneta-pink)]/40'
                }`}
              />
              {/* Edge glow — purple/pink al hover */}
              <div
                aria-hidden
                className={`absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  isPurple
                    ? 'bg-gradient-to-r from-transparent via-[var(--laneta-purple)]/70 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-[var(--laneta-pink)]/70 to-transparent'
                }`}
              />
              {/* Left edge accent */}
              <div
                aria-hidden
                className={`absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent ${isPurple ? 'via-[var(--laneta-purple)]/20' : 'via-[var(--laneta-pink)]/20'} to-transparent`}
              />
              <CardDecoration accent={accent} />
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent"
              />
              <p className="relative text-xs font-semibold uppercase tracking-wider text-slate-500 md:text-sm">
                {service.tagline}
              </p>
              <h4 className="relative mt-2 text-xl font-bold tracking-tight text-slate-800 md:text-2xl">
                {service.title}
              </h4>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                {service.value}
              </p>
              <p className="relative mt-3 text-xs text-slate-500">
                {service.forLabel}
              </p>
              <span className={`relative mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:opacity-90 ${isPurple ? 'text-[var(--laneta-purple)]' : 'text-[var(--laneta-pink)]'}`}>
                {service.ctaLabel}
                <span className="text-lg leading-none transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </span>
            </motion.a>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
