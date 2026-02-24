/**
 * Services CTA — The Ad Factory hero. Light theme, high-impact layout with gradient accents.
 */
import { motion } from 'motion/react'

const SECTION_ID = 'the-ad-factory'
const AD_FACTORY_SLOGAN = 'You bring the vision. We deliver the execution that scales it globally.'

type ServiceCTA = {
  pageUrl: string
  title: string
  tagline: string
  description: string
  ctaLabel: string
  imageSrc: string
  imagePosition?: string
  badge?: string
}

const AD_FACTORY_PLATFORM: ServiceCTA = {
  pageUrl: '/the-ad-factory',
  title: 'The Ad Factory',
  tagline: 'From brief to feed.',
  badge: 'Core System',
  description:
    "At The Ad Factory, we don't just edit videos — we engineer the bridge between user attention and your buy button. We combine the authenticity of UGC, the precision of AI to generate winning creative variations, and high-performance execution.",
  ctaLabel: 'Explore The Ad Factory',
  imageSrc: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/Ad-Factory.jpg',
}

export function ServicesCTA() {
  const platform = AD_FACTORY_PLATFORM

  return (
    <section
      id={SECTION_ID}
      className="relative -mt-px overflow-hidden bg-gradient-to-b from-white to-slate-50 py-24 md:py-32 lg:py-40"
    >
      {/* Background: grid + gradient orbs */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(148 163 184 / 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(148 163 184 / 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
      <div
        aria-hidden
        className="absolute -left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-[var(--laneta-purple)]/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[var(--laneta-pink)]/12 blur-[100px]"
      />

      <div className="relative mx-auto max-w-[1680px] px-6 md:px-8">
        {/* Eyebrow */}
        <motion.p
          className="mb-6 text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-500 md:text-sm"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Your content operating system
        </motion.p>

        {/* Hero card */}
        <motion.div
          className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/80"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Gradient border glow on hover */}
          <div
            aria-hidden
            className="absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                'linear-gradient(135deg, var(--laneta-purple), var(--laneta-pink), var(--laneta-purple))',
              backgroundSize: '200% 200%',
              filter: 'blur(12px)',
              zIndex: -1,
            }}
          />
          <div
            aria-hidden
            className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[var(--laneta-purple)]/20 via-transparent to-[var(--laneta-pink)]/15 opacity-80"
          />

          {/* Image: aspectos responsivos para ver más imagen; objeto centrado */}
          <div className="relative aspect-[4/3] min-h-[220px] overflow-hidden sm:aspect-[21/10] sm:min-h-[280px] md:aspect-[21/9] md:min-h-[320px] lg:min-h-[380px]">
            <motion.img
              src={platform.imageSrc}
              alt=""
              className="h-full w-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              loading="lazy"
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30"
            />
          </div>

          {/* Todo el contenido en zona blanca: badge, tagline, título, descripción, slogan, CTA */}
          <div className="relative px-5 pb-10 pt-6 sm:px-8 sm:pt-8 md:px-12 md:pb-12 md:pt-10 lg:px-16 lg:pb-16 lg:pt-12">
            <div className="flex flex-col items-center text-center">
              {/* Badge + tagline: contraste alto */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
                {platform.badge && (
                  <span className="inline-flex rounded-full bg-[var(--laneta-purple)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-md sm:text-sm">
                    {platform.badge}
                  </span>
                )}
                <span className="inline-flex rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold tracking-wide text-slate-700 sm:text-base">
                  {platform.tagline}
                </span>
              </div>

              {/* Título: siempre legible sobre blanco */}
              <motion.h2
                className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {platform.title}
              </motion.h2>

              <motion.p
                className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:mt-5 sm:text-lg md:max-w-3xl md:text-xl md:leading-snug"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {platform.description}
              </motion.p>

              <motion.p
                className="mx-auto mt-5 max-w-xl text-center text-sm font-medium italic tracking-wide text-[var(--laneta-pink)] sm:mt-6 sm:text-base md:mt-7 md:text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {AD_FACTORY_SLOGAN}
              </motion.p>

              <motion.div
                className="mt-8 sm:mt-10"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <a
                  href={platform.pageUrl}
                  className="group/btn inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[var(--laneta-purple)] to-[var(--laneta-pink)] px-8 py-4 text-base font-bold text-white shadow-[0_8px_32px_rgba(102,65,237,0.35),0_0_0_1px_rgba(255,255,255,0.2)_inset] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_48px_rgba(255,71,172,0.35)] focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)] focus:ring-offset-2 focus:ring-offset-white sm:px-10 sm:py-5"
                >
                  {platform.ctaLabel}
                  <span
                    className="text-xl leading-none transition-transform duration-300 group-hover/btn:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Supporting pills */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-6 rounded-2xl border border-slate-200 bg-white/80 px-6 py-8 text-center shadow-lg shadow-slate-200/30 backdrop-blur-sm md:mt-12 md:flex-row md:gap-12 md:px-10 md:py-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-sm font-medium text-slate-600 md:text-base">
            <span className="font-bold text-slate-800">One system.</span> Strategy, talent, production,
            and distribution in a single workflow.
          </p>
          <span className="hidden h-8 w-px bg-slate-200 md:block" aria-hidden />
          <p className="text-sm font-medium text-slate-600 md:text-base">
            <span className="font-bold text-slate-800">Clear outcomes.</span> From brief to live
            creative, with ownership and results that scale.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
