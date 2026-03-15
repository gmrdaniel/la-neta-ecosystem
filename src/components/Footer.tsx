import { SiFacebook, SiInstagram, SiLinkedin } from 'react-icons/si'
import { useTranslation } from 'react-i18next'

const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com/LaNetaSiempre', icon: SiFacebook, label: 'Facebook' },
  { href: 'https://www.instagram.com/lanetasiempre/', icon: SiInstagram, label: 'Instagram' },
  { href: 'https://www.linkedin.com/showcase/lanetasiempre', icon: SiLinkedin, label: 'LinkedIn' },
] as const

const PRESENCE_CITIES = [
  'New York',
  'Mexico City',
  'Bogotá',
  'Caracas',
  'Buenos Aires',
] as const

export function Footer() {
  const { t } = useTranslation('common')

  const COMPANY_LINKS = [
    { href: '/#who-is-la-neta', label: t('footer.aboutUs') },
    { href: '/#what-we-achieved', label: t('footer.whatWeAchieved') },
    { href: '/#our-creative-process', label: t('footer.ourCreativeProcess') },
    { href: '/#partnerships-alliances', label: t('footer.ourEcosystem') },
  ]

  const PLATFORM_LINKS = [
    { href: '/the-ad-factory', label: 'The Ad Factory' },
    { href: '/#elevn', label: 'Elevn Hub' },
  ]

  const LEGAL_LINKS = [
    { href: 'https://www.laneta.com/terms-conditions-creator-program', label: t('footer.termsConditions') },
    { href: 'https://www.laneta.com/policess', label: t('footer.privacyPolicy') },
  ]

  return (
    <footer className="border-t border-slate-700 bg-[var(--laneta-darker)] text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-12 lg:gap-y-0">
          {/* Col 1: Logo + nombre + entidad + presencia */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img
                src="https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/logo.png"
                alt="La Neta Logo"
                className="h-7 w-auto shrink-0 object-contain"
                width={28}
                height={28}
                aria-hidden
              />
              <span className="text-sm font-bold text-white">La Neta</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-300">Global Media Review Inc.</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {t('footer.presence')}
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Office locations">
                {PRESENCE_CITIES.map((city) => (
                  <li key={city}>
                    <span className="inline-block rounded-md border border-slate-600/60 bg-slate-800/50 px-2 py-1 text-xs text-slate-400 backdrop-blur-sm">
                      {city}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 2: Company */}
          <div className="flex flex-col">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.company')}
            </h4>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-[var(--laneta-pink)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Platforms */}
          <div className="flex flex-col">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.ourPlatforms')}
            </h4>
            <ul className="space-y-2">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-[var(--laneta-pink)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div className="flex flex-col">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 transition-colors hover:text-[var(--laneta-pink)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Connect */}
          <div className="flex flex-col">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.connect')}
            </h4>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-[var(--laneta-purple)]/30 p-2.5 text-white transition-colors hover:bg-[var(--laneta-purple)]"
                  aria-label={label}
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-700 pt-6">
          <p className="text-center text-xs italic text-slate-500">
            {t('slogan')}
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4">
            <p className="text-sm text-slate-500">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
