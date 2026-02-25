/**
 * Unified services page (page 2).
 * All services in one: The Ad Factory, The Glitch, The Hook Hunter.
 * Single Header (global), single Footer, one general RoadmapSection.
 * Visual style: Hook Hunter (Liquid Glass amber/emerald/orange).
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LiquidGlassBackground } from '../components/LiquidGlassBackground'
import { Footer } from '../components/Footer'
//import { ServicePresentationSection as AdFactoryPresentation } from '../sections/theAdFactory/ServicePresentationSection'
import { ProblemsVsSolutionsSection } from '../sections/theAdFactory/ProblemsVsSolutionsSection'
import { ModusOperandiSection } from '../sections/theAdFactory/ModusOperandiSection'
//import { ServicePresentationSection as GlitchPresentation } from '../sections/theGlitch/ServicePresentationSection'
//import { ProductValueSection as GlitchProductValue } from '../sections/theGlitch/ProductValueSection'
//import { AIAgentVideosSection } from '../sections/theGlitch/AIAgentVideosSection'
//import { PackIncludesSection as GlitchPackIncludes } from '../sections/theGlitch/PackIncludesSection'
//import { ServicePresentationSection as HookHunterPresentation } from '../sections/theHookHunter/ServicePresentationSection'
//import { ProductValueSection as HookHunterProductValue } from '../sections/theHookHunter/ProductValueSection'
//import { UGCTalentsSection } from '../sections/theHookHunter/UGCTalentsSection'
import { PackIncludesSection as HookHunterPackIncludes } from '../sections/theHookHunter/PackIncludesSection'
import { RoadmapSection } from '../sections/theAdFactory/RoadmapSection'
import { LetsWorkTogetherSection } from '../sections/theAdFactory/LetsWorkTogetherSection'
import { ServicesOverviewSection } from '../sections/ServicesOverviewSection'
import { TrustedByBrandsSection } from '../sections/TrustedByBrandsSection'
import { ServicesFAQSection } from '../sections/ServicesFAQSection'

export function ServicesPage() {
  const { hash } = useLocation()

  // Default view: top of page (The Ad Factory overview). When no hash, scroll to start so Ad Factory is the first thing seen.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = hash.slice(1)
    const scrollToEl = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(scrollToEl)
    })
    const fallback = setTimeout(scrollToEl, 150)
    return () => {
      cancelAnimationFrame(t)
      clearTimeout(fallback)
    }
  }, [hash])

  return (
    <>
      <LiquidGlassBackground variant="servicesLight" />

      <div className="relative z-10">
        <main className="min-h-screen">
          <div
            id="services-home"
            className="mx-auto max-w-6xl space-y-16 px-6 py-24 md:px-8 xl:max-w-7xl"
          >

            {/* Decision layer: system overview (1 platform + 4 execution modes) before detail */}
            <div id="the-ad-factory" className="scroll-mt-24">
              <ServicesOverviewSection />
            </div>
            
            <div id="problems-vs-solutions" className="scroll-mt-24">
              <ProblemsVsSolutionsSection /> 
            </div>

            {/* Brands that trust us — 5–6 logos + Discover Our Packages CTA */}
            <TrustedByBrandsSection />

            {/* The Ad Factory — detail */}
            {/*<div id="service-presentation" className="scroll-mt-24">
              <AdFactoryPresentation />
            </div>*/}

            {/* Bridge: execution modes — intro to The Glitch (light theme) */}
            {/*<motion.section
              id="execution-modes"
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/95 shadow-lg ring-1 ring-slate-200/80 backdrop-blur-sm">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--laneta-purple)] via-[var(--laneta-pink)] to-[var(--laneta-blue)]"
                />
                <div className="relative flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-12 md:px-12 md:py-12">
                  <div className="max-w-xl">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--laneta-purple)] md:text-sm">
                      Execution layers
                    </p>
                    <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-slate-800 md:text-3xl">
                      Two layers. One pipeline.
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                      For brands and marketing teams: strategy is only as good as execution. We run on two layers—<span className="font-semibold text-slate-800">AI-generated talent</span> for scale and testing, then <span className="font-semibold text-slate-800">creator-led UGC</span> for hooks that convert. First: the layer built for speed and volume.
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-2 md:items-end">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Up next
                    </span>
                    <span className="text-lg font-bold text-[var(--laneta-purple)] md:text-xl">
                      The Glitch
                    </span>
                    <span className="text-sm text-slate-500">
                      AI execution layer · Scale without headcount
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>
            */}
            {/* The Glitch */}
            {/*<div id="the-glitch" className="scroll-mt-24 space-y-16">
              <GlitchPresentation />
              <GlitchProductValue />
              <AIAgentVideosSection />
              <GlitchPackIncludes />
            </div>
            */}
            {/* Bridge: intro to The Hook Hunter + variants (light theme) */}
            {/*<motion.section
              id="execution-modes-creator"
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/95 shadow-lg ring-1 ring-slate-200/80 backdrop-blur-sm">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--laneta-purple)] via-[var(--laneta-pink)] to-[var(--laneta-blue)]"
                />
                <div className="relative flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:gap-12 md:px-12 md:py-12">
                  <div className="max-w-xl">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--laneta-pink)] md:text-sm">
                      Creator execution layer
                    </p>
                    <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-slate-800 md:text-3xl">
                      Creator-led execution. Hooks built to convert.
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                      For growth and brand teams: the second layer is <span className="font-semibold text-slate-800">vetted UGC talent</span> and content built around performance hooks. Three strategies—<span className="font-semibold text-[var(--laneta-purple)]">The Hook Hunter</span>, <span className="font-semibold text-[var(--laneta-pink)]">The Amplifier</span>, <span className="font-semibold text-[var(--laneta-purple)]">Empire Mode</span>—each with a defined B2B role: validate, dominate, or own the feed.
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Up next
                    </span>
                    <span className="text-lg font-bold text-[var(--laneta-purple)] md:text-xl">
                      The Hook Hunter
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-[var(--laneta-purple)]/15 px-3 py-1 text-xs font-semibold text-[var(--laneta-purple)]">
                        Hunter
                      </span>
                      <span className="rounded-full bg-[var(--laneta-pink)]/15 px-3 py-1 text-xs font-semibold text-[var(--laneta-pink)]">
                        Amplifier
                      </span>
                      <span className="rounded-full bg-[var(--laneta-purple)]/15 px-3 py-1 text-xs font-semibold text-[var(--laneta-purple)]">
                        Empire Mode
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
            */}
            <div id="modus-operandi" className="scroll-mt-24">
              <ModusOperandiSection />
            </div>
            
            {/* The Hook Hunter */}
            <div id="the-hook-hunter" className="scroll-mt-24 space-y-16">
              {/*<HookHunterPresentation variant="1" />*/}
              {/*<HookHunterProductValue />*/}
              {/*<UGCTalentsSection />*/}
              <HookHunterPackIncludes />
            </div>


            {/* One general roadmap for all services */}
            <div id="roadmap" className="scroll-mt-24">
              <RoadmapSection />
            </div>

            {/* FAQ */}
            <div id="faqs" className="scroll-mt-24">
              <ServicesFAQSection />
            </div>

            <div id="lets-work-together" className="scroll-mt-24">
              <LetsWorkTogetherSection variant="hookHunter" />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
