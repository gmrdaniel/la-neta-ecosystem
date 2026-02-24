import { motion } from 'motion/react'
import { FloatingCard } from '../../components/FloatingCard'

/** La Neta: solo púrpura y rosa, alternando por fase */
const LANETA_ACCENTS = [
  { border: 'rgba(102, 65, 237, 0.5)', pillBg: 'rgba(102, 65, 237, 0.15)', pillColor: 'var(--laneta-purple)' },
  { border: 'rgba(255, 71, 172, 0.5)', pillBg: 'rgba(255, 71, 172, 0.15)', pillColor: 'var(--laneta-pink)' },
] as const

const ROADMAP_PHASES = [
  {
    dayRange: 'Day 1–3',
    title: 'Kickoff & Brief',
    description: 'We align on goals, messaging, and creative direction.',
    detail: 'One kickoff, one brief. You sign off; we move.',
  },
  {
    dayRange: 'Day 4–8',
    title: 'Talent & Scripts',
    description: 'We select the right creators and develop high-converting scripts.',
    detail: 'Pre-vetted talent and copy optimized for your KPIs.',
  },
  {
    dayRange: 'Day 9–16',
    title: 'Production',
    description: 'We produce and edit performance-driven content.',
    detail: 'In-house production. Every format, every cut.',
  },
  {
    dayRange: 'Day 17–21',
    title: 'Review & Final Delivery',
    description: 'You provide feedback, we refine, and deliver ready-to-run ads in all required formats.',
    detail: 'Structured feedback, quick iterations. Then one pack: 9:16, 1:1, 16:9.',
  },
] as const

function PhaseRow({
  phase,
  index,
}: {
  phase: (typeof ROADMAP_PHASES)[number]
  index: number
}) {
  const accent = LANETA_ACCENTS[index % 2]
  const isPurple = index % 2 === 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-24px' }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group relative flex gap-4 md:gap-6"
    >
      {/* Number circle — degradado púrpura → rosa */}
      <div
        className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white text-base font-bold text-white shadow-lg ring-2 ring-slate-200/80 md:h-14 md:w-14 md:text-lg"
        style={{
          background: 'linear-gradient(135deg, var(--laneta-purple), var(--laneta-pink))',
          borderColor: 'white',
          boxShadow: '0 4px 14px rgba(102, 65, 237, 0.3)',
        }}
      >
        {index + 1}
      </div>

      {/* Content card — más impacto visual */}
      <div
        className="relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg ring-1 ring-slate-200/80 transition-all duration-300 hover:shadow-xl hover:ring-[var(--laneta-purple)]/25 md:rounded-2xl"
        style={{
          borderLeftWidth: '4px',
          borderLeftColor: isPurple ? 'var(--laneta-purple)' : 'var(--laneta-pink)',
        }}
      >
        {/* Barra superior en degradado */}
        <div
          className="absolute inset-x-0 top-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, ${isPurple ? 'var(--laneta-purple)' : 'var(--laneta-pink)'}, ${isPurple ? 'var(--laneta-pink)' : 'var(--laneta-purple)'})`,
          }}
          aria-hidden
        />
        {/* Textura de grid sutil */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(148 163 184 / 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(148 163 184 / 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
        {/* Glow suave en esquina */}
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-30 transition-opacity duration-300 group-hover:opacity-50"
          style={{
            background: isPurple
              ? 'radial-gradient(circle, rgba(102,65,237,0.25) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255,71,172,0.25) 0%, transparent 70%)',
          }}
        />

        <div className="relative px-5 py-5 md:px-7 md:py-6">
          {/* Días como pill destacado */}
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest md:text-xs"
            style={{
              backgroundColor: accent.pillBg,
              color: accent.pillColor,
            }}
          >
            {phase.dayRange}
          </span>
          <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
            {phase.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">
            {phase.description}
          </p>
          {/* Detalle en bloque tipo callout */}
          <div
            className="mt-4 rounded-xl border-l-4 py-2.5 pl-4 pr-3 md:mt-5 md:py-3 md:pl-5"
            style={{
              borderLeftColor: isPurple ? 'var(--laneta-purple)' : 'var(--laneta-pink)',
              backgroundColor: isPurple ? 'rgba(102, 65, 237, 0.06)' : 'rgba(255, 71, 172, 0.06)',
            }}
          >
            <p className="text-xs font-medium leading-snug text-slate-600 md:text-sm">
              {phase.detail}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function RoadmapSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-6xl px-4 md:px-6"
    >
      <FloatingCard className="overflow-hidden bg-transparent shadow-none ring-0 backdrop-blur-none">
        <div className="pb-16 pt-8 md:pb-20 md:pt-10">
          {/* Header + intro hook */}
          <div className="mb-10 text-center md:mb-12">
            <p
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--laneta-purple)]"
              style={{ backgroundColor: 'rgba(102, 65, 237, 0.12)' }}
            >
              4 phases · 21 days
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl lg:text-4xl">
              21-day roadmap
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-700 md:text-lg">
              You approve the brief; we handle the rest. 0% operational headache for your team.
            </p>
          </div>

          {/* Timeline: 4 phases */}
          <div className="relative">
            <div
              className="absolute left-6 top-7 bottom-7 w-0.5 md:left-7 md:top-8 md:bottom-8"
              style={{
                background: 'linear-gradient(to bottom, var(--laneta-purple), var(--laneta-pink) 50%, var(--laneta-purple))',
              }}
              aria-hidden
            />
            <div className="space-y-4 md:space-y-5">
              {ROADMAP_PHASES.map((phase, i) => (
                <PhaseRow key={phase.title} phase={phase} index={i} />
              ))}
            </div>
          </div>

          {/* Closing: Simple. Structured. Built for speed. */}
          <div className="mt-14 rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center shadow-lg md:px-10 md:py-10">
            <p className="text-xl font-bold tracking-tight text-slate-800 md:text-2xl" style={{ color: 'var(--laneta-purple)' }}>
              Simple. Structured. Built for speed.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Day 1: your brief. Day 21: ads that perform. One roadmap, no surprises.
            </p>
          </div>
        </div>
      </FloatingCard>
    </motion.section>
  )
}
