/**
 * FAQ section for Services page. Same visual language as RoadmapSection and TrustedByBrandsSection.
 * La Neta purple/pink, gradient bars, grid texture, motion.
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { HiChevronDown } from 'react-icons/hi'
import { FloatingCard } from '../components/FloatingCard'

const FAQ_ITEMS = [
  {
    id: 'delivery-time',
    question: 'How long does it take to receive the final ad videos?',
    answer:
      'Most of our packages are delivered within 21 business days. We also offer a Rush Fee add-on if you need your content delivered within 15 days.',
  },
  {
    id: 'formats',
    question: 'What video formats will I receive to run my campaigns?',
    answer:
      'We know you need variety for different platforms. That is why all content is delivered in three formats: vertical (9:16), square (1:1), and horizontal (16:9). This ensures that we edit content to adapt it to all networks.',
  },
  {
    id: 'usage-rights',
    question: "How long do I have the rights to use the creator's image?",
    answer:
      "All of our subscription packages include 1 year of image use for your advertising campaigns. If you find a winning ad and want to keep running it, you can purchase a Rights Extension add-on to use the content for an additional year.",
  },
  {
    id: 'ugc-or-ai',
    question: 'Do you use real human creators (UGC) or Artificial Intelligence?',
    answer:
      'We merge human talent (UGC) with the speed of AI. Depending on your needs, you can choose packages that feature real UGC talents, such as Hook Hunter or Empire Mode, or leverage our AI avatars with The Taster or The Glitch packages to quickly test which message sells best. We also offer AI-enhanced versions as an add-on.',
  },
  {
    id: 'brand-work',
    question: 'How much work does my brand need to do during the process?',
    answer:
      'You provide the vision, and we provide the creative execution. Once we start our 21-day route, we handle everything: from the kickoff, briefing, and talent selection to scripting, review & feedback, and final production. We deliver sales assets ready to be advertised so you don\'t have to spend your time producing them.',
  },
  {
    id: 'revisions',
    question: 'How many revisions are included in my package?',
    answer:
      'To guarantee our fast turnaround times, every package includes one consolidated round of revisions after the initial delivery. We highly recommend gathering all feedback from your internal team at once to keep the process efficient and hit our deadlines. Of course, if your brand requires further tweaks, additional revision rounds can always be requested.',
  },
] as const

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const isPurple = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg ring-1 ring-slate-200/80 transition-all duration-300 hover:shadow-xl hover:ring-[var(--laneta-purple)]/20"
      style={{
        borderLeftWidth: '4px',
        borderLeftColor: isPurple ? 'var(--laneta-purple)' : 'var(--laneta-pink)',
      }}
    >
      {/* Barra superior degradado */}
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
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(148 163 184 / 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(148 163 184 / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
      {/* Glow esquina */}
      <div
        aria-hidden
        className="absolute -right-12 -top-12 h-24 w-24 rounded-full opacity-20 pointer-events-none"
        style={{
          background: isPurple
            ? 'radial-gradient(circle, rgba(102,65,237,0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,71,172,0.3) 0%, transparent 70%)',
        }}
      />

      <div className="relative">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-7 md:py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--laneta-purple)] focus-visible:ring-offset-2 rounded-2xl cursor-pointer"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${item.id}`}
          id={`faq-question-${item.id}`}
        >
          <span className="text-base font-bold text-slate-900 md:text-lg pr-2">
            {item.question}
          </span>
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
              isOpen
                ? 'rotate-180 bg-[var(--laneta-purple)] text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
            aria-hidden
          >
            <HiChevronDown className="size-5" />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`faq-answer-${item.id}`}
              role="region"
              aria-labelledby={`faq-question-${item.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div
                className="border-t border-slate-200/80 px-5 pb-4 pt-1 md:px-7 md:pb-5 md:pt-2"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: 'transparent',
                }}
              >
                <p className="text-base leading-relaxed text-slate-800 font-medium md:text-[1.0625rem]">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function ServicesFAQSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id)

  return (
    <motion.section
      id="faq"
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      <FloatingCard className="overflow-hidden bg-transparent shadow-none ring-0 backdrop-blur-none">
        <div className="pb-16 pt-8 md:pb-20 md:pt-10">
          {/* Header */}
          <div className="mb-10 text-center md:mb-12">
            <p
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--laneta-purple)]"
              style={{ backgroundColor: 'rgba(102, 65, 237, 0.12)' }}
            >
              FAQ
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl lg:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600 md:text-lg">
              Quick answers to what brands and teams ask most.
            </p>
          </div>

          {/* FAQ list */}
          <div className="space-y-4 md:space-y-5">
            {FAQ_ITEMS.map((item, index) => (
              <FAQItem
                key={item.id}
                item={item}
                index={index}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        </div>
      </FloatingCard>
    </motion.section>
  )
}
