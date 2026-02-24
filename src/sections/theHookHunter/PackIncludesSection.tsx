import { motion } from 'motion/react'
import { useContactModal } from '../../contexts/ContactModalContext'
import { HiArrowRight } from 'react-icons/hi'

type ExecutionStrategy = {
  id: string
  name: string
  strategyHeadline: string
  forWho: string
  description: string
  outcome: string
  accent: string
  production: string[]
  delivery: string[]
  rights: string[]
  assets: number
}

const STRATEGIES: ExecutionStrategy[] = [
  {
    id: 'the-glitch',
    name: 'AI-generated content. One avatar, 24 assets, 21 days.',
    strategyHeadline: 'The Glitch',
    forWho: 'Brands and marketing teams that want scale without headcount.',
    description:
      'One custom AI avatar speaks for your brand. No actors, no scheduling—just script, approve, and go. Two hero videos, six punchy clips, delivered in three formats (vertical, square, horizontal). Built for teams that need fast iteration, consistent voice, and full platform coverage from a single production.',
    outcome: 'AI never rests. This package is your infinite testing engine to find out which message sells best',
    accent: 'var(--laneta-blue)',
    assets: 24,
    production: ['1 AI Avatar', '2 videos of 15 seconds', '6 clips of 10 seconds', '3 video formats / 24 total contents'],
    delivery: ['Delivery within 21 business days'],
    rights: ['1 year of image use'],
  },
  {
    id: 'hook-hunter',
    name: 'Validate winning hooks with one voice.',
    strategyHeadline: 'The Hook Hunter',
    forWho: 'Brands and growth teams testing creative direction.',
    description:
      'A single UGC talent executes your hooks so you can prove what resonates before scaling. Built for teams that need fast validation, clear performance signals, and a lean footprint—one face, one narrative, 24 assets ready for feed dominance.',
    outcome: 'People buy from people. It generates 45% more immediate trust.',
    accent: '#f59e0b',
    assets: 24,
    production: ['1 UGC Talent', '2 videos of 15 seconds', '6 clips of 10 seconds', '3 video formats / 24 total contents'],
    delivery: ['Delivery within 21 business days'],
    rights: ['1 year of image use'],
  },
  {
    id: 'amplifier',
    name: 'Surround your audience with consistent proof.',
    strategyHeadline: 'The Amplifier',
    forWho: 'Brands ready to dominate a niche or launch.',
    description:
      'Three UGC talents carry your message so your audience sees multiple faces, one brand. We don’t shoot in the dark—we turn validated hooks into 66 assets that build repeat exposure and trust. Ideal for product launches, category entry, or campaigns where presence matters.',
    outcome: "We transform 3 signals into 66 echoes. We don't shoot in the dark; we surround your audience with UGC content that turns doubt into absolute confidence.",
    accent: '#10b981',
    assets: 66,
    production: ['3 UGC Talents', '6 videos of 15 seconds', '16 clips of 10 seconds', '3 video formats / 66 total contents'],
    delivery: ['Delivery within 21 business days'],
    rights: ['1 year of image use'],
  },
  {
    id: 'empire',
    name: 'Own category visibility. Strategic saturation.',
    strategyHeadline: 'Empire Mode',
    forWho: 'Brands that need to own the feed and the conversation.',
    description:
      'Five UGC talents. One hundred twenty assets. If your customer sees you everywhere with different, authentic faces, your brand becomes unquestionable. Designed for market leaders and ambitious brands that want to own their category—not just participate.',
    outcome: 'Strategic saturation. If your customer sees you everywhere with different faces, your brand becomes unquestionable.',
    accent: '#8b5cf6',
    assets: 120,
    production: ['5 UGC Talents', '10 videos of 15 seconds', '30 clips of 10 seconds', '3 video formats / 120 total contents'],
    delivery: ['Delivery within 21 business days'],
    rights: ['1 year of image use'],
  },
]

type PackModalVariant = 'glitch' | 'hookHunter' | 'amplifier' | 'empire'
function getPackVariant(id: string): PackModalVariant {
  if (id === 'the-glitch') return 'glitch'
  if (id === 'hook-hunter') return 'hookHunter'
  if (id === 'amplifier') return 'amplifier'
  if (id === 'empire') return 'empire'
  return 'hookHunter'
}

function StrategyBlock({
  strategy,
  index,
  onRequestPack,
}: {
  strategy: ExecutionStrategy
  index: number
  onRequestPack: (variant: PackModalVariant) => void
}) {
  const ctaLabel = `Scale With ${strategy.strategyHeadline.toUpperCase()}`
  const variant = getPackVariant(strategy.id)
  return (
    <motion.article
      id={strategy.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-slate-200/80 scroll-mt-24"
    >
      <div
        className="absolute left-0 right-0 top-0 z-0 h-1"
        style={{ backgroundColor: strategy.accent }}
        aria-hidden
      />
      <div className="relative p-6 md:p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          {/* Strategy narrative — B2B focused */}
          <div className="min-w-0 flex-1">
            <p
              className="text-xs font-bold uppercase tracking-[0.2em] md:text-sm"
              style={{ color: strategy.accent }}
            >
              {strategy.name}
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {strategy.strategyHeadline}
            </h3>
            <p className="mt-3 text-sm font-medium text-slate-600 md:text-base">
              {strategy.forWho}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
              {strategy.description}
            </p>
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Strategic outcome
              </p>
              <p className="mt-1 font-semibold text-slate-900">{strategy.outcome}</p>
            </div>
            <button
              type="button"
              onClick={() => onRequestPack(variant)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
              style={{
                backgroundColor: strategy.accent.startsWith('var(') ? 'var(--laneta-blue)' : strategy.accent,
              }}
            >
              {ctaLabel}
              <HiArrowRight className="size-5" aria-hidden />
            </button>
          </div>

          {/* What this strategy delivers — factual, not “pack” */}
          <div className="shrink-0 lg:w-[320px]">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                What this pack includes
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                {strategy.assets} <span className="text-sm font-medium text-slate-600">assets</span>
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Production
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {strategy.production.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-slate-700"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: strategy.accent }}
                          aria-hidden
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Delivery & rights
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {strategy.delivery.concat(strategy.rights).map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-slate-700"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: strategy.accent }}
                          aria-hidden
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function PackIncludesSection() {
  const { openModal } = useContactModal()
  const handleRequestPack = (variant: PackModalVariant) => openModal(variant)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-[1610px] px-4 md:px-6"
    >
      <div className="mb-12 text-center md:mb-16">
        <p
          className="mb-4 inline-block rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wider text-amber-700"
          style={{ backgroundColor: 'rgba(251, 191, 36, 0.22)' }}
        >
          Packs you can buy
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
          Choose the pack that fits your goals.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-slate-700 md:text-xl">
          From AI-generated content to creator-led UGC. Each pack has a clear scope, deliverables, and timeline—pick the one that matches what you need.
        </p>
      </div>

      <div className="space-y-10 md:space-y-12">
        {STRATEGIES.map((strategy, i) => (
          <StrategyBlock
            key={strategy.id}
            strategy={strategy}
            index={i}
            onRequestPack={handleRequestPack}
          />
        ))}
      </div>
    </motion.section>
  )
}
