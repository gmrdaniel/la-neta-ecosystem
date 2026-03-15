import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { HiMenu, HiX, HiArrowRight } from 'react-icons/hi'
import { HiGlobeAlt } from 'react-icons/hi2'
import { useTranslation } from 'react-i18next'

function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault()
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToSectionById(href: string) {
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: 'smooth' })
}

/** Offset from top of viewport (px) to consider a section "active". */
const getActiveSectionOffset = () => Math.min(280, typeof window !== 'undefined' ? window.innerHeight * 0.35 : 280)

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const isSpanish = i18n.language?.startsWith('es')
  const nextLang = isSpanish ? 'en' : 'es'
  const label = isSpanish ? 'EN' : 'ES'

  const toggle = () => {
    i18n.changeLanguage(nextLang)
    document.documentElement.lang = nextLang
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-[var(--laneta-purple)]/60 hover:bg-white"
      aria-label={`Switch to ${isSpanish ? 'English' : 'Español'}`}
    >
      <HiGlobeAlt className="text-sm text-[var(--laneta-purple)]" />
      <span>{label}</span>
    </button>
  )
}

export function Header() {
  const { t } = useTranslation('common')
  const { pathname } = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSectionHref, setActiveSectionHref] = useState<string | null>(null)
  const isServicesPage =
    pathname === '/the-ad-factory' ||
    pathname === '/the-glitch' ||
    pathname === '/the-hook-hunter'

  const SERVICES_PAGE_SECTION_LINKS = [
    { href: '#the-ad-factory', label: t('nav.theAdFactory') },
    { href: '#problems-vs-solutions', label: t('nav.solutions') },
    { href: '#modus-operandi', label: t('nav.howWeOperate') },
    { href: '#the-hook-hunter', label: t('nav.packages') },
    { href: '#roadmap', label: t('nav.roadmap') },
    { href: '#faqs', label: t('nav.faqs') },
  ]

  const HOME_PAGE_SECTION_LINKS = [
    { href: '#who-is-la-neta', label: t('nav.aboutUs') },
    { href: '#the-ad-factory', label: t('nav.theAdFactory') },
    { href: '#elevn', label: t('nav.elevnHub') },
  ]

  const NAV_LINKS = [
    { href: '#who-is-la-neta', label: t('nav.aboutUs') },
    { href: '#the-ad-factory', label: t('nav.theAdFactory') },
    { href: '#elevn', label: t('nav.elevnHub') },
  ]

  const pageSectionLinks = isServicesPage ? SERVICES_PAGE_SECTION_LINKS : null
  const isLightPageTop = isServicesPage && !isScrolled
  const headerMaxWidthClass = isServicesPage ? 'max-w-[1440px]' : 'max-w-6xl'

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionLinks =
      pathname === '/' ? HOME_PAGE_SECTION_LINKS : isServicesPage ? SERVICES_PAGE_SECTION_LINKS : null
    if (!sectionLinks?.length) {
      setActiveSectionHref(null)
      return
    }

    const updateActiveSection = () => {
      const offset = getActiveSectionOffset()
      const candidates: { href: string; top: number }[] = []
      for (const link of sectionLinks) {
        const el = document.getElementById(link.href.slice(1))
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= offset) candidates.push({ href: link.href, top })
      }
      if (candidates.length === 0) {
        setActiveSectionHref(sectionLinks[0].href)
        return
      }
      const current = candidates.sort((a, b) => b.top - a.top)[0]
      setActiveSectionHref(current.href)
    }

    updateActiveSection()
    const onScroll = () => updateActiveSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isServicesPage, t])

  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 shadow-lg backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div
          className={`mx-auto flex ${headerMaxWidthClass} items-center justify-between gap-4 px-6 py-4 md:px-8 md:pr-8 ${
            pathname === '/' ? 'pr-10' : 'pr-20'
          }`}
        >
        {/* Logo + name */}
        {pathname === '/' ? (
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="flex min-w-0 shrink items-center gap-2 transition-opacity hover:opacity-90"
            aria-label="La Neta — Home"
          >
          <img
            src="https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/logo.png"
            alt=""
            className="h-8 w-auto object-contain md:h-9"
            aria-hidden
          />
          <span
            className={`text-xl font-bold tracking-tight md:text-2xl ${
              isLightPageTop
                ? 'text-[var(--laneta-purple)]'
                : isScrolled
                  ? 'text-[var(--laneta-purple)]'
                  : 'text-white drop-shadow-md'
            }`}
          >
            La Neta
          </span>
        </a>
        ) : (
          <Link
            to="/"
            className="flex min-w-0 shrink items-center gap-2 transition-opacity hover:opacity-90"
            aria-label="La Neta — Home"
          >
          <img
            src="https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/logo.png"
            alt=""
            className="h-8 w-auto object-contain md:h-9"
            aria-hidden
          />
          <span
            className={`text-xl font-bold tracking-tight md:text-2xl ${
              isLightPageTop
                ? 'text-[var(--laneta-purple)]'
                : isScrolled
                  ? 'text-[var(--laneta-purple)]'
                  : 'text-white drop-shadow-md'
            }`}
          >
            La Neta
          </span>
        </Link>
        )}

        {/* Desktop nav: visible from 950px up */}
        <nav className="hidden items-center gap-8 min-[950px]:flex" aria-label="Main">
          {pageSectionLinks ? (
            <>
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isLightPageTop || isScrolled
                    ? 'text-slate-700 hover:text-[var(--laneta-pink)]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {t('nav.home')}
              </Link>
              {pageSectionLinks.map((link) => {
                const isActive = activeSectionHref === link.href
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? 'font-semibold text-[var(--laneta-pink)] border-b-2 border-[var(--laneta-pink)] pb-1'
                        : isLightPageTop || isScrolled
                          ? 'text-slate-700 hover:text-[var(--laneta-pink)]'
                          : 'text-white/90 hover:text-white'
                    }`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {link.label}
                  </a>
                )
              })}
              <a
                href="#lets-work-together"
                onClick={(e) => scrollToSection(e, '#lets-work-together')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--laneta-purple)] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-[var(--laneta-purple)]/90 hover:shadow-lg"
              >
                {t('nav.letsWorkTogether')}
                <HiArrowRight className="size-4" />
              </a>
            </>
          ) : (
          <>
            {NAV_LINKS.map((link) => {
              const isActive = activeSectionHref === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'font-semibold text-[var(--laneta-pink)]'
                      : isScrolled
                        ? 'text-slate-700 hover:text-[var(--laneta-pink)]'
                        : 'text-white/90 hover:text-white'
                  }`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href="#lets-work-together"
              onClick={(e) => scrollToSection(e, '#lets-work-together')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--laneta-purple)] px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-[var(--laneta-purple)]/90 hover:shadow-lg"
            >
              {t('nav.letsWorkTogether')}
              <HiArrowRight className="size-4" />
            </a>
          </>
          )}

          {/* Language switcher — desktop */}
          <LanguageSwitcher />
        </nav>

        {/* Mobile: language + menu button */}
        <div className="flex items-center gap-2 min-[950px]:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              isLightPageTop || isScrolled ? 'text-slate-700' : 'text-white'
            }`}
            aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <HiX className="size-6" /> : <HiMenu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-200 bg-white/98 backdrop-blur-md min-[950px]:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Main">
              {pageSectionLinks ? (
                <>
                  <Link
                    to="/"
                    onClick={closeMobile}
                    className="rounded-lg px-4 py-3 text-left font-medium text-slate-800 hover:bg-[var(--laneta-purple)]/10 hover:text-[var(--laneta-purple)]"
                  >
                    {t('nav.home')}
                  </Link>
                  {pageSectionLinks.map((link) => {
                    const isActive = activeSectionHref === link.href
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault()
                          closeMobile()
                          setTimeout(() => scrollToSectionById(link.href), 300)
                        }}
                        className={`rounded-lg px-4 py-3 text-left font-medium hover:bg-[var(--laneta-pink)]/10 hover:text-[var(--laneta-pink)] ${
                          isActive
                            ? 'bg-[var(--laneta-pink)]/10 font-semibold text-[var(--laneta-pink)]'
                            : 'text-slate-800'
                        }`}
                        aria-current={isActive ? 'location' : undefined}
                      >
                        {link.label}
                      </a>
                    )
                  })}
                </>
              ) : NAV_LINKS.map((link) => {
                const isActive = activeSectionHref === link.href
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      closeMobile()
                      setTimeout(() => scrollToSectionById(link.href), 300)
                    }}
                    className={`rounded-lg px-4 py-3 text-left font-medium hover:bg-[var(--laneta-purple)]/10 hover:text-[var(--laneta-purple)] ${
                      isActive
                        ? 'bg-[var(--laneta-purple)]/10 font-semibold text-[var(--laneta-purple)]'
                        : 'text-slate-800'
                    }`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {link.label}
                  </a>
                )
              })}
              <a
                href="#lets-work-together"
                onClick={(e) => {
                  e.preventDefault()
                  closeMobile()
                  setTimeout(() => scrollToSectionById('#lets-work-together'), 300)
                }}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[var(--laneta-purple)] px-4 py-3 font-semibold text-white shadow-md"
              >
                {t('nav.letsWorkTogether')}
                <HiArrowRight className="size-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
