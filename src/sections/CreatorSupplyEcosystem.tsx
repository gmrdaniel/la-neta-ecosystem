import { motion } from 'motion/react'
import {
  SiMeta,
  SiPinterest,
  SiAmd,
  SiAudi,
  SiInstagram,
  SiTiktok,
  SiYoutube,
  SiFacebook,
} from 'react-icons/si'
import { HiSpeakerphone, HiSwitchVertical, HiThumbUp, HiUserGroup } from 'react-icons/hi'
import { FaPhotoVideo } from 'react-icons/fa'
import { TbHandClick } from 'react-icons/tb'
import type { IconType } from 'react-icons'
import Rating from '@mui/material/Rating'
import { HiCheckCircle } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

const SECTION_ID = 'elevn'

type CreatorProfile = {
  id: string
  name: string
  slogan: string
  niche: string
  rating: number
  imageSrc: string
  brands: ({ type: 'icon'; icon: IconType; iconSize?: number; brandColor?: string } | { type: 'image'; src: string })[]
  stats: { ads: number; videos: number; engagement: string; likes: string; followers: string; ctr: string }
  socials: { platform: string; icon: IconType }[]
}

const CREATOR_PROFILES: CreatorProfile[] = [
  {
    id: 'carolyn',
    name: 'Carolyn',
    slogan: 'Authentic fashion voice that turns browsers into buyers.',
    niche: 'Fashion & Style',
    rating: 4.9,
    imageSrc: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/fashion_influencer.jpg',
    brands: [
      { type: 'icon', icon: SiMeta, brandColor: '#1877F2' },
      { type: 'icon', icon: SiPinterest, brandColor: '#E60023' },
    ],
    stats: { ads: 42, videos: 128, engagement: '2.4x', likes: '1.2M', followers: '285K', ctr: '4.8%' },
    socials: [
      { platform: 'Instagram', icon: SiInstagram },
      { platform: 'TikTok', icon: SiTiktok },
    ],
  },
  {
    id: 'david',
    name: 'David',
    slogan: 'Content that makes people hungry—and click.',
    niche: 'Food & Beverage',
    rating: 4.8,
    imageSrc: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/influencer_food_male.jpg',
    brands: [
      { type: 'icon', icon: SiPinterest, brandColor: '#E60023' },
      { type: 'icon', icon: SiMeta, brandColor: '#1877F2' },
    ],
    stats: { ads: 38, videos: 94, engagement: '3.2x', likes: '890K', followers: '192K', ctr: '5.1%' },
    socials: [
      { platform: 'Instagram', icon: SiInstagram },
      { platform: 'TikTok', icon: SiTiktok },
      { platform: 'YouTube', icon: SiYoutube },
    ],
  },
  {
    id: 'stiven',
    name: 'Stiven',
    slogan: 'Speaks the language of tech and gaming audiences.',
    niche: 'Tech & Gaming',
    rating: 4.7,
    imageSrc: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/influencer_geek.jpg',
    brands: [
      { type: 'icon', icon: SiAmd, iconSize: 32, brandColor: '#ED1C24' },
      { type: 'icon', icon: SiMeta, brandColor: '#1877F2' },
    ],
    stats: { ads: 31, videos: 76, engagement: '1.8x', likes: '540K', followers: '420K', ctr: '3.9%' },
    socials: [
      { platform: 'Instagram', icon: SiInstagram },
      { platform: 'YouTube', icon: SiYoutube },
    ],
  },
  {
    id: 'luis-julia',
    name: 'Luis & Julia',
    slogan: 'Travel that inspires—and converts. Discovery content that drives action.',
    niche: 'Travel & Discovery',
    rating: 4.8,
    imageSrc: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/Luis_Julia_influencers_travel.jpg',
    brands: [
      { type: 'icon', icon: SiPinterest, brandColor: '#E60023' },
      { type: 'icon', icon: SiMeta, brandColor: '#1877F2' },
    ],
    stats: { ads: 29, videos: 82, engagement: '2.5x', likes: '720K', followers: '318K', ctr: '4.2%' },
    socials: [
      { platform: 'Instagram', icon: SiInstagram },
      { platform: 'Facebook', icon: SiFacebook },
      { platform: 'YouTube', icon: SiYoutube },
    ],
  },
  {
    id: 'matt',
    name: 'Matt',
    slogan: 'Sports and fitness energy that connects with your audience.',
    niche: 'Sports',
    rating: 4.6,
    imageSrc: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/Matt_influencer_sport.jpg',
    brands: [
      { type: 'icon', icon: SiPinterest, brandColor: '#E60023' },
      { type: 'icon', icon: SiAudi, brandColor: '#BB0A30' },
    ],
    stats: { ads: 24, videos: 61, engagement: '2.9x', likes: '380K', followers: '156K', ctr: '4.5%' },
    socials: [
      { platform: 'Instagram', icon: SiInstagram },
      { platform: 'TikTok', icon: SiTiktok },
      { platform: 'YouTube', icon: SiYoutube },
    ],
  },
  {
    id: 'samantha',
    name: 'Samantha',
    slogan: 'Raw energy and authenticity that converts.',
    niche: 'Art & Music',
    rating: 4.5,
    imageSrc: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/samantha.jpg',
    brands: [
      { type: 'icon', icon: SiMeta, brandColor: '#1877F2' },
      { type: 'icon', icon: SiPinterest, brandColor: '#E60023' },
    ],
    stats: { ads: 18, videos: 45, engagement: '2.1x', likes: '290K', followers: '98K', ctr: '3.6%' },
    socials: [
      { platform: 'Instagram', icon: SiInstagram },
      { platform: 'TikTok', icon: SiTiktok },
    ],
  },
]

const ELEVN_LOGO = 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/elevn.png'
const JOIN_LANDING_URL = 'https://www.elevn.me/'

const INSIGHT_KEYS = ['connection', 'campaign', 'payments', 'traceability', 'performance', 'curated'] as const

function CreatorProfileCard({ creator, index }: { creator: CreatorProfile; index: number }) {
  const { t } = useTranslation('elevn')

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg ring-1 ring-slate-200/50 transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-slate-100">
        <img
          src={creator.imageSrc}
          alt={`${creator.name} — ${creator.niche}`}
          className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <span className="inline-block rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--laneta-purple)] backdrop-blur-sm">
            {creator.niche}
          </span>
          <h3 className="mt-1.5 text-base font-bold text-white">{creator.name}</h3>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-3">
        <p className="line-clamp-2 text-base font-semibold leading-snug text-slate-700">
          {creator.slogan}
        </p>

        <div className="mt-2 flex items-center gap-1.5">
          <Rating
            name="read-only"
            value={creator.rating}
            precision={0.1}
            readOnly
            size="small"
            sx={{
              '& .MuiRating-icon': { fontSize: 20 },
              '& .MuiRating-iconFilled': { color: '#f59e0b' },
              '& .MuiRating-iconEmpty': { color: '#e5e7eb' },
            }}
          />
          <span className="text-base font-bold text-slate-600">{creator.rating}</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-medium text-[var(--laneta-blue)]">{t('stats.brands')}</span>
          {creator.brands.map((b, i) =>
            b.type === 'icon' ? (
              <div
                key={i}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-slate-200 bg-slate-50"
                title="Brand partner"
              >
                <b.icon
                  className="shrink-0"
                  style={{
                    width: b.iconSize ?? 20,
                    height: b.iconSize ?? 20,
                    minWidth: b.iconSize ?? 20,
                    minHeight: b.iconSize ?? 20,
                    color: b.brandColor ?? undefined,
                  }}
                  aria-hidden
                />
              </div>
            ) : (
              <img
                key={i}
                src={b.src}
                alt=""
                className="h-9 w-9 shrink-0 object-contain"
                aria-hidden
              />
            ),
          )}
        </div>

        <div className="mt-2 grid grid-cols-2 gap-1.5 text-base">
          <div className="flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1.5">
            <HiSpeakerphone className="size-4 shrink-0 text-slate-500" aria-hidden />
            <span><span className="font-bold text-slate-800">{creator.stats.ads}</span><span className="ml-0.5 text-slate-500">{t('stats.ads')}</span></span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1.5">
            <FaPhotoVideo className="size-4 shrink-0 text-slate-500" aria-hidden />
            <span><span className="font-bold text-slate-800">{creator.stats.videos}</span><span className="ml-0.5 text-slate-500">{t('stats.videos')}</span></span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1.5">
            <HiSwitchVertical className="size-4 shrink-0 text-slate-500" aria-hidden />
            <span><span className="font-bold text-slate-800">{creator.stats.engagement}</span><span className="ml-0.5 text-slate-500">{t('stats.engagement')}</span></span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1.5">
            <HiThumbUp className="size-4 shrink-0 text-slate-500" aria-hidden />
            <span><span className="font-bold text-slate-800">{creator.stats.likes}</span><span className="ml-0.5 text-slate-500">{t('stats.likes')}</span></span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1.5">
            <HiUserGroup className="size-4 shrink-0 text-slate-500" aria-hidden />
            <span><span className="font-bold text-slate-800">{creator.stats.followers}</span><span className="ml-0.5 text-slate-500">{t('stats.followers')}</span></span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1.5">
            <TbHandClick className="size-4 shrink-0 text-slate-500" aria-hidden />
            <span><span className="font-bold text-slate-800">{creator.stats.ctr}</span><span className="ml-0.5 text-slate-500">{t('stats.ctr')}</span></span>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-2">
          <span className="text-sm font-medium text-slate-500">{t('stats.presentOn')}</span>
          {creator.socials.map((s) => {
            const Icon = s.icon
            return (
              <span
                key={s.platform}
                className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-sm text-slate-600"
                title={s.platform}
              >
                <Icon className="size-5" aria-hidden />
                <span>{s.platform}</span>
              </span>
            )
          })}
        </div>
      </div>
    </motion.article>
  )
}

export function CreatorSupplyEcosystem() {
  const { t } = useTranslation('elevn')

  return (
    <section
      id={SECTION_ID}
      className="relative -mt-px overflow-hidden bg-slate-50 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1680px] px-6 md:px-8">
        {/* Hero block */}
        <motion.div
          className="relative mb-3 md:mb-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center justify-center px-4 py-10 text-center md:py-14">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--laneta-blue)] md:text-sm">
              {t('influencerCampaign')}
            </p>
            <div className="mb-6 flex justify-center drop-shadow-sm">
              <img
                src={ELEVN_LOGO}
                alt="Elevn"
                className="h-20 w-auto object-contain md:h-28"
                width={200}
                height={100}
              />
            </div>
            <h2 className="sr-only">Elevn</h2>
            <p className="mx-auto mt-3 max-w-lg text-base text-slate-600">
              {t('tagline')}
            </p>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[var(--laneta-purple)] md:mt-8">
              {t('comingSoon')}
            </p>
            <a
              href={JOIN_LANDING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-[var(--laneta-purple)] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[var(--laneta-purple)]/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)] focus:ring-offset-2 md:mt-5"
            >
              {t('joinCta')}
            </a>
          </div>
        </motion.div>

        {/* What is Elevn + Why Elevn */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg ring-1 ring-slate-200/50">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--laneta-purple)] via-[var(--laneta-pink)] to-[var(--laneta-blue)]"
            />
            <div
              aria-hidden
              className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[var(--laneta-purple)]/5 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[var(--laneta-pink)]/5 blur-3xl"
            />

            <div className="relative px-6 pt-8 pb-6 md:px-12 md:pt-10 md:pb-8">
              <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-slate-600 md:text-lg">
                Elevn is <span className="font-semibold text-[var(--laneta-purple)]">a curated space</span> where our creators find opportunities across fashion, food, tech, lifestyle, travel, and more. Every creator is here because they believe in the work—quality and brand fit come first. Brands get direct access to talent they can trust; long-term relationships, clear briefs, rights, and performance insights—all in <span className="font-medium text-[var(--laneta-blue)]">one place</span>.
              </p>

              <p className="mt-10 mb-6 text-center text-sm font-semibold uppercase tracking-wider text-[var(--laneta-purple)] md:mt-12 md:mb-8">
                {t('whyElevn')}
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {INSIGHT_KEYS.map((key) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/80 px-5 py-4 shadow-sm"
                  >
                    <HiCheckCircle className="mt-0.5 size-6 shrink-0 text-[var(--laneta-purple)]" aria-hidden />
                    <div>
                      <p className="font-semibold text-slate-800">{t(`insights.${key}.label`)}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{t(`insights.${key}.short`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Creator Supply Infrastructure */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-medium tracking-[0.2em] uppercase text-[var(--laneta-purple)]">
              {t('creatorSupply')}
            </p>
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-800 md:text-3xl lg:text-4xl">
              <span className="text-[var(--laneta-pink)]">4,000+</span> vetted creators <span className="text-[var(--laneta-blue)]">curated for your campaigns</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CREATOR_PROFILES.map((creator, index) => (
              <CreatorProfileCard key={creator.id} creator={creator} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
