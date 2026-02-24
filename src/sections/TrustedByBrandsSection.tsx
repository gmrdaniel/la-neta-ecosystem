/**
 * Brands that trust us — logos only. For use on Services page below the overview.
 * Styling aligned with Execution cards: grid texture, gradient glow, accent bar.
 */
import { motion } from 'motion/react'
import { SiSony, SiAudi } from 'react-icons/si'
import type { IconType } from 'react-icons'

const S3 = 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com'

type TrustedBrand =
  | { name: string; logo: string; width: number }
  | { name: string; icon: IconType; width: number }

/** Marcas que confían en nosotros (solo logos o iconos, sin link a modales de partners). */
const TRUSTED_BRANDS: TrustedBrand[] = [
  { name: "L'Oréal", logo: `${S3}/LOreal-Logo.png`, width: 100 },
  { name: 'Nestlé', logo: `${S3}/nestle-logo.png`, width: 100 },
  { name: 'Sony', icon: SiSony, width: 100 },
  { name: 'Nivea', logo: `${S3}/Nivea-Logo.png`, width: 100 },
  { name: 'Garnier', logo: `${S3}/Garnier-Logo.png`, width: 100 },
  { name: 'Dove', logo: `${S3}/dove-logo.png`, width: 100 },
  { name: 'Audi', icon: SiAudi, width: 100 },
]

export function TrustedByBrandsSection() {
  return (
    <motion.section
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
    >
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/95 px-6 py-8 shadow-lg ring-1 ring-slate-200/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:ring-[var(--laneta-purple)]/20 md:px-10 md:py-10">
        {/* Grid texture — sutil como en Execution cards */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(148 163 184 / 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(148 163 184 / 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Directional light — purple/pink */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(500px circle at 80% 30%, rgba(102,65,237,0.06), transparent 55%), radial-gradient(400px circle at 20% 70%, rgba(255,71,172,0.05), transparent 50%)',
          }}
        />
        {/* Blob — purple */}
        <div
          aria-hidden
          className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[var(--laneta-purple)]/20 blur-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-50"
        />
        {/* Blob — pink */}
        <div
          aria-hidden
          className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-[var(--laneta-pink)]/15 blur-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-50"
        />
        {/* Top edge — La Neta gradient bar */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--laneta-purple)]/50 via-50% to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--laneta-purple)] via-[var(--laneta-pink)] to-[var(--laneta-purple)] opacity-60"
        />
        {/* Left edge accent */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--laneta-purple)]/15 to-transparent"
        />

        <div className="relative">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 md:text-sm">
            Brands that trust us
          </p>
          <h3 className="mt-2 text-center text-lg font-bold text-slate-800 md:text-xl">
            Trusted by leading names
          </h3>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-14">
            {TRUSTED_BRANDS.map((brand) => {
              if ('icon' in brand) {
                const Icon = brand.icon
                return (
                  <div
                    key={brand.name}
                    className="flex items-center justify-center transition-transform duration-200 hover:scale-105"
                    style={{ maxWidth: brand.width }}
                  >
                    <Icon
                      className="h-10 w-10 text-slate-700 md:h-11 md:w-11"
                      aria-label={brand.name}
                    />
                  </div>
                )
              }
              return (
                <div
                  key={brand.name}
                  className="flex items-center justify-center transition-transform duration-200 hover:scale-105"
                  style={{ maxWidth: brand.width }}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 w-auto max-h-12 object-contain object-center md:h-11 md:max-h-14"
                    loading="lazy"
                  />
                </div>
              )
            })}
          </div>

          {/* CTA: Discover Our Packages — scroll to packs */}
          <div className="relative mt-10 border-t border-slate-200/80 pt-8 md:mt-12 md:pt-10">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-6">
              <div className="text-center sm:text-left">
                <h2 id="discover-packages-heading" className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                  Discover Our Packages
                </h2>
                <p className="mt-1 text-sm text-slate-600 md:text-base">
                  From AI scale to UGC dominance — find the pack that fits your goals.
                </p>
              </div>
              <button
                type="button"
                onClick={() => document.getElementById('the-hook-hunter')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-gradient-to-r from-[var(--laneta-purple)] to-[var(--laneta-pink)] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[var(--laneta-purple)]/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[var(--laneta-purple)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)] focus:ring-offset-2 focus:ring-offset-white cursor-pointer"
              >
                Discover Our Packages
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden>↓</span>
              </button>
            </div>
            <p className="relative mt-3 text-center text-xs text-slate-500 sm:text-left">
              The Glitch · Hook Hunter · Amplifier · Empire Mode
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
