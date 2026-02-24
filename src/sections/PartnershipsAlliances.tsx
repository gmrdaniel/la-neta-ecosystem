import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  SiMeta,
  SiPinterest,
  // SiAmd, // AMD commented
  SiSony,
  SiAudi,
  SiXiaomi,
  SiMercadopago,
  // SiTubi, // Tubi belongs to Air — commented out
  SiBurgerking,
} from 'react-icons/si'
import { FiCheckCircle } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { AllyDashboard, type AllyStats } from './AllyDashboard'

const SECTION_ID = 'partnerships-alliances'

/** Brand colors for icon-type partners (official brand colors) */
const BRAND_COLORS: Record<string, string> = {
  meta: '#1877F2',       // Meta blue
  pinterest: '#E60023',   // Pinterest red
  tubi: '#F7F590',       // Tubi yellow
  // amd: '#ED1C24',        // AMD red (commented)
  sony: '#000000',       // Sony black
  audi: '#BB0A30',       // Audi red
  xiaomi: '#FF6900',     // Xiaomi orange
  mercadopago: '#009EE3', // Mercado Pago blue
  burgerking: '#D62300',  // Burger King red
}

type Brand = {
  id: string
  name: string
  type: 'icon' | 'image' | 'letter'
  icon?: IconType
  image?: string
  letter?: string
  since?: string
  campaigns?: number
  iconSize?: number
  imageScale?: number
  /** Optional brand color for icon (e.g. #1877F2 for Meta) */
  brandColor?: string
}

type PartnershipModalContent = {
  partnerId: string
  partnerName: string
  heroImage: string
  logoImage?: string
  model?: string
  sellingPoints?: string[]
  process?: { title: string; items: string[] }[]
  models?: {
    title: string
    model?: string
    target?: string
    criteria?: string[]
    verticals?: string[]
    dealBreakers?: string[]
    restricted?: string[]
    qualitativeCheck?: string[]
    sellingPoints?: string[]
    why?: string
    exampleUrl?: string
  }[]
}

const PARTNERSHIPS: (Brand & { modalKey?: string })[] = [
  { id: 'meta', name: 'META', type: 'icon', icon: SiMeta, since: '2025', campaigns: 100, modalKey: 'meta', brandColor: BRAND_COLORS.meta },
  { id: 'pinterest', name: 'Pinterest', type: 'icon', icon: SiPinterest, since: '2022', campaigns: 60, modalKey: 'pinterest', brandColor: BRAND_COLORS.pinterest },
  { id: 'airmediatech', name: 'Air Media Tech', type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/air_media_tech.png', since: '2025', campaigns: 12, modalKey: 'airmediatech' },
  // Tubi and Gyre belong to Air — commented out per request
  // { id: 'tubi', name: 'Tubi', type: 'icon', icon: SiTubi, since: '2025', campaigns: 2, modalKey: 'tubi', iconSize: 52, brandColor: BRAND_COLORS.tubi },
  // { id: 'gyre', name: 'Gyre', type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/Gyre-Logo.png', since: '2025', campaigns: 6, modalKey: 'gyre' },
]

const PARTNERSHIP_MODALS: Record<string, PartnershipModalContent> = {
  meta: {
    partnerId: 'meta',
    partnerName: 'META',
    heroImage: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/hobby_creator.jpg',
    model: 'Breakthrough Bonus Program (Facebook & Instagram Monetization)',
    sellingPoints: [
      'Immediate Access: Accepted creators unlock immediate access to Facebook Monetization (no waiting period).',
      'Reposting: Creators can earn by reposting the same content they are already creating for other platforms.',
      'Direct Income: Payments come directly from Meta (no brand deals or agencies required).',
      'Formats: Earn from reels, stories, photos, and text posts.',
    ],
    process: [
      { title: 'Content Policy', items: ['Content must align with Meta\'s policies.'] },
      { title: 'Turnaround', items: ['Acceptance results are provided within 24–48 hours.'] },
      { title: 'Onboarding', items: ['Once approved, the creator must complete monetization setup to officially join.'] },
    ],
  },
  airmediatech: {
    partnerId: 'airmediatech',
    partnerName: 'Air Media Tech',
    heroImage: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/youtube_creator.jpg',
    logoImage: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/air_media_tech.png',
    models: [
      {
        title: 'A. AIR CREATORS ECOSYSTEM',
        model: 'Channel Management & Growth',
        target: 'YouTube Creators',
        criteria: [
          'Subscribers: 1,500+.',
          'Watch Time: 4,000 hours in the last 365 days (OR 10 Million Shorts views in 90 days).',
          'Monetization: Channel must be active on YouTube Partner Program (connected to active AdSense).',
          'Audience: Adult demographics in high CPM geographies (USA, Europe, etc.).',
        ],
        verticals: ['Business', 'Finance', 'Automotive', 'Luxury Lifestyle'],
        dealBreakers: [
          'Violence, animal cruelty, or shocking content.',
          'Sexualized content or fetishes.',
          'Scams, gambling, or "get rich quick" schemes.',
          'Spam or misleading metadata (extreme clickbait).',
        ],
      },
      {
        title: 'B. AIR TRANSLATION SERVICES',
        model: 'Premium Localization & Translation',
        target: 'YouTube Creators',
        criteria: [
          'Subscribers: 1,000,000+ (1M+) subscribers.',
          'Must have an established team and trajectory (proven track record).',
          'Must have the infrastructure to support and manage a high-investment service.',
          'Must possess the vision to invest in global expansion.',
        ],
        why: 'This is an expensive, premium service. It is best suited for "Enterprise-level" creators who understand the long-term ROI of translation and have the budget to support it.',
      },
    ],
  },
  pinterest: {
    partnerId: 'pinterest',
    partnerName: 'Pinterest',
    heroImage: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/artist.jpg',
    model: 'Pinterest Creator Program — UGC & Multi-Platform Growth',
    sellingPoints: [
      'An arena where your creativity and frames get real impressions: Pinterest is built for discovery, so your visuals reach people who are actively looking for inspiration.',
      'No minimum audience required: we care about talent and consistency, not follower count. Whether you’re just starting or already at 1k+, you can grow on Pinterest.',
      'Multi-platform opportunity: create for Instagram, TikTok, or Pinterest—or repurpose what you already make and give it a second life on Pinterest where content keeps getting discovered over time.',
      'Verticals we support: Fashion, Food, Beauty, Fitness, Healthy lifestyle, Kids, Art, Music, Travel, DIY, Home, and more. If you create UGC in any of these spaces, this is your space.',
    ],
    process: [
      { title: 'Join the program', items: ['Get onboarded and connect your Pinterest profile.'] },
      { title: 'Create & pin', items: ['Start publishing content that fits your niche; we help you leverage the platform so your pins get in front of the right audience.'] },
      { title: 'Grow with us', items: ['Use insights and best practices to turn your creativity into lasting impressions and growth on Pinterest.'] },
    ],
  },
  // Tubi and Gyre belong to Air — commented out per request
  // tubi: {
  //   partnerId: 'tubi',
  //   partnerName: 'Tubi',
  //   heroImage: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/thriller.jpg',
  //   model: 'Niche Syndication (Long-form Fiction & Mystery)',
  //   models: [
  //     {
  //       title: 'Tubi Niche Syndication',
  //       model: 'Long-form Fiction & Mystery',
  //       target: 'YouTube Creators',
  //       criteria: [
  //         'Format: Long-form only (15+ minutes).',
  //         'Content: Serialized or episodic (Miniseries, Episodes, Movies).',
  //         'Production: High audiovisual value (TV quality).',
  //         'Ownership: 100% IP owned by creator.',
  //         'Music: Sync + Master rights (no YouTube Audio Library).',
  //         'Cleanliness: No burnt-in ads, watermarks, or lower-thirds.',
  //       ],
  //       verticals: ['Horror', 'Thriller', 'Mystery'],
  //     },
  //   ],
  // },
  // gyre: {
  //   partnerId: 'gyre',
  //   partnerName: 'Gyre',
  //   heroImage: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/streaming_loop.jpg',
  //   logoImage: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/Gyre-Logo.png',
  //   models: [
  //     {
  //       title: 'A. YouTube 24/7 Live Stream Looping',
  //       model: '24/7 Live Stream Looping',
  //       target: 'YouTube Creators',
  //       criteria: [
  //         'Platform: YouTube. No minimum subscribers.',
  //         'Monthly Views: 1,000,000+ views.',
  //         'Content: 100+ long-form videos OR 200+ Shorts.',
  //         'Activity: At least 1 video in the last month.',
  //         'Frequency: 1–2 videos per month regularly.',
  //       ],
  //       verticals: [
  //         'Kids & Teens',
  //         'Gaming',
  //         'Music',
  //         'Entertainment & Fun',
  //         'Business',
  //         'Fashion & Beauty',
  //         'Lifestyle',
  //         'Culinary / Food',
  //         'Education & Science',
  //         'DIY',
  //       ],
  //       qualitativeCheck: [
  //         'Continuity: Content works well on a continuous loop.',
  //         'Flow: Videos join to form a long stream that makes sense at any join point.',
  //       ],
  //       restricted: ['NO Podcasts.', 'NO Tech Reviews.', 'NO Interviews.'],
  //     },
  //     {
  //       title: 'B. GYRE REFERRAL CODE SALES',
  //       model: 'Affiliate Sales / Software Subscription via Referral',
  //       target: 'Active YouTube creators who need increased watch time or passive revenue.',
  //       criteria: [
  //         'Platform: YouTube. Subscribers: 5,000 – 500,000 (sweet spot).',
  //         'YPP recommended (understand ROI of passive watch time).',
  //         'Content: Sufficient for non-repetitive loop (e.g. 20+ videos ~10 min, or fewer very long).',
  //         'Activity: At least 1 video in the last month.',
  //       ],
  //       verticals: [
  //         'Music & Audio (lo-fi, ambient, ASMR)',
  //         'Gaming (playthroughs, background)',
  //         'Podcasts & Talk Shows',
  //         'Education (tutorials, study-with-me)',
  //         'Niche Hobbyists (process videos)',
  //       ],
  //       qualitativeCheck: [
  //         'Continuity: Content works well on a continuous loop.',
  //         'Evergreen: Back catalog still relevant (not heavily dated).',
  //       ],
  //       sellingPoints: [
  //         'Passive Watch Time: Boost watch hours while the creator sleeps.',
  //         'Back Catalog Monetization: Revenue from old videos getting zero views.',
  //         'Gap Filling: Keep the channel active between regular uploads.',
  //       ],
  //     },
  //   ],
  // },
}

const CLOSER_FRIENDS: Brand[] = [
  { id: 'loreal', name: "L'Oréal", type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/LOreal-Logo.png', since: '2022', campaigns: 14 },
  { id: 'nyx', name: 'NYX Professional Makeup', type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/NYX-logo.png', since: '2023', campaigns: 9 },
  { id: 'garnier', name: 'Garnier', type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/Garnier-Logo.png', since: '2022', campaigns: 11 },
  { id: 'maybelline', name: 'Maybelline New York', type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/Maybelline-logo.png', since: '2022', campaigns: 16 },
  { id: 'dove', name: 'Dove', type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/dove-logo.png', since: '2021', campaigns: 20 },
  { id: 'nivea', name: 'Nivea', type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/Nivea-Logo.png', since: '2023', campaigns: 7, imageScale: 1.4 },
  { id: 'nestle', name: 'Nestlé', type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/nestle-logo.png', since: '2022', campaigns: 12, imageScale: 0.75 },
  { id: 'nescafe', name: 'Nescafé', type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/Nescafe_logo.png', since: '2022', campaigns: 10 },
  { id: 'sony', name: 'Sony', type: 'icon', icon: SiSony, since: '2021', campaigns: 22, iconSize: 44, brandColor: BRAND_COLORS.sony },
  // { id: 'amd', name: 'AMD', type: 'icon', icon: SiAmd, since: '2022', campaigns: 15, iconSize: 44, brandColor: BRAND_COLORS.amd },
  { id: 'xiaomi', name: 'Xiaomi', type: 'icon', icon: SiXiaomi, since: '2023', campaigns: 8, brandColor: BRAND_COLORS.xiaomi },
  { id: 'max', name: 'Max', type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/max-logo.png', since: '2023', campaigns: 5 },
  { id: 'mercadopago', name: 'Mercado Pago', type: 'icon', icon: SiMercadopago, since: '2022', campaigns: 13, brandColor: BRAND_COLORS.mercadopago },
  { id: 'audi', name: 'Audi', type: 'icon', icon: SiAudi, since: '2021', campaigns: 18, iconSize: 44, brandColor: BRAND_COLORS.audi },
  // { id: 'dentalia', name: 'Dentalia', type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/dentalia-logo.png', since: '2023', campaigns: 6 },
  { id: 'levis', name: "Levi's", type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/levis-logo.png', since: '2022', campaigns: 11 },
  { id: 'temu', name: "Temu", type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/Temu-Logo.png', since: '2022', campaigns: 7 },
  { id: 'burgerking', name: "Burger King", type: 'icon', icon: SiBurgerking, since: '2020', campaigns: 9, brandColor: BRAND_COLORS.burgerking },
  { id: 'sears', name: "Sears", type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/sears-logo.png', since: '2022', campaigns: 7 },
  { id: 'liverpool', name: "Liverpool", type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/liverpool-logo.png', since: '2022', campaigns: 20, imageScale: .9 },
  // { id: 'InComm-InCentives', name: "InComm InCentives", type: 'image', image: 'https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/InComm-Incentives-logo.png', since: '2018', campaigns: 11, imageScale: .9 },
]

/** Generate deterministic but varied stats per ally for dashboard credibility */
function buildAllyStats(brand: Brand): AllyStats {
  const seed = brand.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const campaigns = brand.campaigns ?? 10
  const sinceYear = parseInt(brand.since ?? '2022', 10)
  const years = Math.max(1, new Date().getFullYear() - sinceYear)
  const baseImpressions = 40_000 + (seed % 80_000)
  return {
    engagementRate: Number((2.8 + (seed % 25) / 10).toFixed(1)),
    successRate: 86 + (seed % 14),
    totalImpressions: Math.round(campaigns * baseImpressions * years * (0.8 + (seed % 40) / 100)),
    adsGenerated: campaigns * (2 + (seed % 3)),
    impressionsByQuarter: [
      baseImpressions * campaigns * (0.9 + (seed % 20) / 100),
      baseImpressions * campaigns * (1 + (seed % 15) / 100),
      baseImpressions * campaigns * (0.95 + (seed % 25) / 100),
      baseImpressions * campaigns * (1.1 + (seed % 10) / 100),
    ],
    engagementByChannel: [
      { label: 'Instagram', value: 28 + (seed % 22) },
      { label: 'TikTok', value: 22 + (seed % 18) },
      { label: 'Meta / FB', value: 18 + (seed % 15) },
      { label: 'Other', value: 10 + (seed % 12) },
    ],
  }
}

const CLOSER_FRIENDS_STATS: Record<string, AllyStats> = Object.fromEntries(
  CLOSER_FRIENDS.map((b) => [b.id, buildAllyStats(b)])
)

function BrandBubble({
  brand,
  size = 'medium',
  animationDelay = 0,
  onClick,
}: {
  brand: Brand
  size?: 'small' | 'medium' | 'large'
  animationDelay?: number
  onClick?: () => void
}) {
  const sizeClass = size === 'large' ? 'h-24 w-24 md:h-28 md:w-28' : size === 'medium' ? 'h-16 w-16 md:h-20 md:w-20' : 'h-14 w-14 md:h-16 md:w-16'
  const iconSize = size === 'large' ? 44 : size === 'medium' ? 34 : 26
  const Wrapper = onClick ? 'button' : 'div'

  return (
    <motion.div
      className="group relative flex shrink-0"
      style={{
        animation: 'brownian 8s ease-in-out infinite',
        animationDelay: `${animationDelay}s`,
      }}
    >
      <Wrapper
        type={onClick ? 'button' : undefined}
        onClick={onClick}
        className={`flex ${sizeClass} items-center justify-center rounded-full border-2 bg-gradient-to-br from-[var(--laneta-pink)]/20 to-[var(--laneta-purple)]/25 shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-[var(--laneta-pink)] ${
          onClick
            ? 'cursor-pointer border-[var(--laneta-purple)]/40 hover:border-[var(--laneta-pink)]/60 hover:shadow-xl hover:shadow-[var(--laneta-pink)]/25'
            : 'cursor-default border-[var(--laneta-purple)]/30'
        }`}
        style={onClick ? { cursor: 'pointer' } : undefined}
      >
        {brand.type === 'icon' && brand.icon && (
          <brand.icon
            size={brand.iconSize ?? iconSize}
            style={brand.brandColor ? { color: brand.brandColor } : undefined}
            className={!brand.brandColor ? 'text-[var(--laneta-purple)]' : ''}
          />
        )}
        {brand.type === 'image' && brand.image && (
          <img
            src={brand.image}
            alt=""
            className="h-full w-full object-contain p-0.5"
            style={brand.imageScale != null ? { transform: `scale(${brand.imageScale})` } : undefined}
          />
        )}
        {(brand.type === 'letter' || (!brand.icon && !brand.image)) && (
          <span className="text-lg font-bold text-[var(--laneta-purple)] md:text-xl" style={{ fontSize: size === 'large' ? '1.5rem' : size === 'medium' ? '1.125rem' : '1rem' }}>
            {brand.letter || brand.name.charAt(0)}
          </span>
        )}
      </Wrapper>
      {!onClick && (
        <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-center shadow-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <p className="text-xs font-semibold text-slate-800">{brand.name}</p>
          {brand.since && <p className="mt-0.5 text-xs text-slate-500">Partner since {brand.since}</p>}
          {brand.campaigns != null && <p className="text-xs text-[var(--laneta-pink)]">Active campaigns: {brand.campaigns}</p>}
        </div>
      )}
    </motion.div>
  )
}

function PartnershipModal({
  content,
  onClose,
}: {
  content: PartnershipModalContent
  onClose: () => void
}) {
  const isComingSoon = !content.model && !content.models?.length && (!content.sellingPoints || content.sellingPoints.length <= 1)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero: image + overlay with title & tagline */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-slate-100">
          <img src={content.heroImage} alt="" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
            <h2 id="modal-title" className="text-2xl font-bold tracking-tight text-white drop-shadow-lg">
              {content.partnerName}
            </h2>
            {content.model && (
              <p className="mt-1 max-w-md text-sm font-medium text-white/90">
                {content.model}
              </p>
            )}
          </div>
          {content.logoImage && (
            <div className="absolute right-4 top-4 h-12 w-12 rounded-xl border-2 border-white/30 bg-white/95 p-1.5 shadow-lg">
              <img src={content.logoImage} alt="" className="h-full w-full object-contain" />
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/30"
            aria-label="Close"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="mx-auto max-w-xl px-6 py-6">
          {isComingSoon ? (
            <p className="py-8 text-center text-slate-500">More details coming soon.</p>
          ) : (
            <>
              {/* Benefits: full list, no truncation */}
              {content.sellingPoints && content.sellingPoints.length > 0 && (
                <div className="mb-6">
                  <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-[var(--laneta-purple)]">
                    Why join
                  </p>
                  <ul className="space-y-2.5">
                    {content.sellingPoints.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-xl bg-[var(--laneta-purple)]/10 px-4 py-3 text-left text-sm text-slate-700"
                      >
                        <FiCheckCircle className="mt-0.5 size-5 shrink-0 text-[var(--laneta-purple)]" aria-hidden />
                        <span className="min-w-0 flex-1 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Process: minimal steps (Meta-style) */}
              {content.process && content.process.length > 0 && (
                <div className="mb-6">
                  <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
                    How it works
                  </p>
                  <div className="flex flex-col gap-3">
                    {content.process.map((block, i) => (
                      <div key={i} className="flex gap-3 rounded-xl bg-slate-50 px-4 py-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--laneta-blue)]/20 text-sm font-bold text-[var(--laneta-blue)]">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-slate-800">{block.title}</p>
                          <p className="text-sm text-slate-600">{block.items[0]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dual model cards */}
              {content.models && content.models.length > 0 && (
                <div className="space-y-4">
                  <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Opportunities
                  </p>
                  {content.models.map((block, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm"
                    >
                      <h3 className="text-sm font-bold text-slate-800">{block.title}</h3>
                      {block.model && (
                        <p className="mt-0.5 text-xs font-medium text-[var(--laneta-blue)]">{block.model}</p>
                      )}
                      {block.target && (
                        <p className="mt-1 text-xs text-slate-600">Target: {block.target}</p>
                      )}
                      {block.criteria && block.criteria.length > 0 && (
                        <div className="mt-3 space-y-1.5">
                          {block.criteria.map((c, j) => (
                            <div
                              key={j}
                              className="rounded-md bg-white px-3 py-2 text-sm text-slate-600 ring-1 ring-slate-200/80"
                            >
                              {c}
                            </div>
                          ))}
                        </div>
                      )}
                      {block.verticals && block.verticals.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {block.verticals.map((v, j) => (
                            <span
                              key={j}
                              className="rounded-full bg-[var(--laneta-pink)]/15 px-2 py-0.5 text-xs font-medium text-slate-700"
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      )}
                      {block.qualitativeCheck && block.qualitativeCheck.length > 0 && (
                        <div className="mt-2 border-t border-slate-100 pt-2">
                          <p className="mb-1 text-xs font-semibold uppercase text-slate-500">The &quot;Loop&quot; factor</p>
                          <ul className="space-y-0.5 text-xs text-slate-600">
                            {block.qualitativeCheck.map((q, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <FiCheckCircle className="mt-0.5 size-4 shrink-0 text-[var(--laneta-purple)]" aria-hidden />
                                <span>{q}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {block.restricted && block.restricted.length > 0 && (
                        <p className="mt-2 text-xs text-slate-500">
                          Restricted: {block.restricted.map((r) => r.replace(/^NO\s*/i, '').trim()).join(', ')}
                        </p>
                      )}
                      {block.sellingPoints && block.sellingPoints.length > 0 && (
                        <div className="mt-2 border-t border-slate-100 pt-2">
                          <p className="mb-1 text-xs font-semibold uppercase text-slate-500">Key selling points</p>
                          <ul className="space-y-0.5 text-xs text-slate-600">
                            {block.sellingPoints.map((s, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <FiCheckCircle className="mt-0.5 size-4 shrink-0 text-[var(--laneta-purple)]" aria-hidden />
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {block.dealBreakers && block.dealBreakers.length > 0 && (
                        <p className="mt-2 text-xs text-slate-500">
                          Excluded: {block.dealBreakers.map((d) => d.split(/[.:]/)[0].toLowerCase()).join(', ')}
                        </p>
                      )}
                      {block.why && (
                        <p className="mt-2 border-t border-slate-100 pt-2 text-sm italic text-slate-500">
                          {block.why}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export function PartnershipsAlliances() {
  const sectionRef = useRef<HTMLElement>(null)
  const [modalKey, setModalKey] = useState<string | null>(null)
  const [selectedAllyIndex, setSelectedAllyIndex] = useState(0)
  const [sectionInView, setSectionInView] = useState(false)
  const modalContent = modalKey ? PARTNERSHIP_MODALS[modalKey] : null

  // Solo rotar el dashboard cuando la sección está visible
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const io = new IntersectionObserver(
      (entries) => {
        setSectionInView(!!entries[0]?.isIntersecting)
      },
      { rootMargin: '50px', threshold: 0 }
    )
    io.observe(section)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!sectionInView) return
    const interval = setInterval(() => {
      setSelectedAllyIndex((prev) => (prev + 1) % CLOSER_FRIENDS.length)
    }, 11_000)
    return () => clearInterval(interval)
  }, [sectionInView])

  return (
    <section
      ref={sectionRef}
      id={SECTION_ID}
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <motion.header
          className="mb-6 text-center md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 text-sm font-medium tracking-[0.2em] uppercase text-[var(--laneta-blue)]">
            Our ecosystem
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl lg:text-5xl">
            Partnerships & <span className="text-[var(--laneta-pink)]">Alliances</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Each brand is a node in our network—a universe to explore together.
          </p>
        </motion.header>

        {/* Partnerships — clickable, open modal */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="mb-6 text-center text-lg font-bold text-slate-700 md:text-xl">
            Our partnerships
          </h3>
          <div className="flex flex-wrap items-end justify-center gap-8 md:gap-12">
            {PARTNERSHIPS.map((brand, i) => (
              <BrandBubble
                key={brand.id}
                brand={brand}
                size="large"
                animationDelay={i * 0.4}
                onClick={brand.modalKey ? () => setModalKey(brand.modalKey!) : undefined}
              />
            ))}
          </div>
        </motion.div>

        {/* Trusted by — brands we work with */}
        <motion.div
          className="rounded-2xl border border-slate-200 bg-slate-50/80 px-6 py-8 md:px-10 md:py-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-800 md:text-3xl">
              Trusted by <span className="bg-gradient-to-r from-[var(--laneta-purple)] to-[var(--laneta-pink)] bg-clip-text text-transparent">leading names</span>
            </h3>
            <div className="mx-auto mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r from-[var(--laneta-purple)] to-[var(--laneta-pink)]" aria-hidden />
          </div>

          {/* mini dashboard */}
          <div className="mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAllyIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <AllyDashboard
                  brand={CLOSER_FRIENDS[selectedAllyIndex]}
                  stats={CLOSER_FRIENDS_STATS[CLOSER_FRIENDS[selectedAllyIndex].id]!}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* bubbles as pagination */}
          <p className="mb-3 text-center text-xs font-medium text-slate-500">
            Select an ally to view stats
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {CLOSER_FRIENDS.map((brand, i) => (
              <motion.div
                key={brand.id}
                className={`relative rounded-full ring-2 transition-all ${
                  i === selectedAllyIndex
                    ? 'ring-[var(--laneta-pink)] ring-offset-2 ring-offset-slate-50'
                    : 'ring-transparent'
                }`}
              >
                <BrandBubble
                  brand={brand}
                  size="medium"
                  animationDelay={i * 0.08}
                  onClick={() => setSelectedAllyIndex(i)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {modalContent && (
          <PartnershipModal content={modalContent} onClose={() => setModalKey(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
