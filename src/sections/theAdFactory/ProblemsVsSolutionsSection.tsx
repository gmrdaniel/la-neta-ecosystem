import { motion } from 'motion/react'
import { FloatingCard } from '../../components/FloatingCard'
import { HiXCircle, HiCheckCircle, HiArrowRight } from 'react-icons/hi'
import { useContactModal } from '../../contexts/ContactModalContext'
import { BiSolidTimer } from 'react-icons/bi'
import { RiAdvertisementFill } from 'react-icons/ri'
import { FaUsersLine } from "react-icons/fa6";
import { TbTools } from 'react-icons/tb'
import { GoGoal } from "react-icons/go";
import { MdOutlineCategory } from 'react-icons/md'
import type { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'

const ROW_ICONS: IconType[] = [
  RiAdvertisementFill,
  BiSolidTimer,
  FaUsersLine,
  TbTools,
  MdOutlineCategory,
  GoGoal,
]

export function ProblemsVsSolutionsSection() {
  const { openModal } = useContactModal()
  const { t } = useTranslation('adFactory')
  const items = t('problems.items', { returnObjects: true }) as { problem: string; solution: string; tagline: string }[]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-7xl px-4 md:px-6"
    >
      <FloatingCard variant="light" className="overflow-hidden">
        <div className="mb-10 text-center md:mb-12">
          <p
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
            style={{ color: 'var(--laneta-purple)', backgroundColor: 'rgba(102, 65, 237, 0.15)' }}
          >
            {t('problems.frictionBadge')}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl lg:text-4xl">
            {t('problems.sectionTitle')}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 md:text-lg">
            {t('problems.subtitle')}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {t('problems.subtitleDetail')}
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="divide-y divide-slate-200">
            {items.map((row, i) => {
              const Icon = ROW_ICONS[i]
              return (
              <div
                key={i}
                className="group grid items-start gap-4 py-6 md:grid-cols-[1fr_auto_1fr_auto] md:gap-x-[8%] md:gap-y-0 md:py-8"
              >
                {/* Problem */}
                <div className="flex items-start gap-3 text-slate-500">
                  <HiXCircle
                    className="mt-0.5 size-5 shrink-0 opacity-60"
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed md:text-base">
                    {row.problem}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden items-center justify-center md:flex">
                  <span
                    className="text-2xl text-slate-400 transition-all duration-300 group-hover:text-[var(--laneta-purple)]"
                    aria-hidden
                  >
                    →
                  </span>
                </div>

                {/* Solution */}
                <div className="flex items-start gap-3 transition-transform duration-300 group-hover:translate-x-1 md:rounded-lg md:py-2 md:pr-2 md:transition-colors group-hover:md:bg-[var(--laneta-purple)]/10">
                  <HiCheckCircle
                    className="mt-0.5 size-5 shrink-0"
                    style={{ color: 'var(--laneta-purple)' }}
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-semibold leading-relaxed text-slate-800 md:text-base">
                      {row.solution}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 md:text-sm">
                      {row.tagline}
                    </p>
                  </div>
                </div>

                {/* Decorative icon */}
                <div className="hidden items-center justify-end md:flex">
                  <Icon
                    className="size-20 shrink-0 text-[var(--laneta-purple)]/15 md:size-24"
                    aria-hidden
                  />
                </div>
              </div>
            )
            })}
          </div>

          {/* Closing hook */}
          <div className="mt-10 border-t border-slate-200 pt-10 text-center md:mt-12 md:pt-12">
            <p className="text-lg font-semibold text-slate-800 md:text-xl">
              {t('problems.closingTitle')}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {t('problems.closingBody')}
            </p>
            <button
              type="button"
              onClick={() => openModal('hookHunter')}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--laneta-purple)] to-[var(--laneta-pink)] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[var(--laneta-purple)]/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[var(--laneta-purple)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--laneta-purple)] focus:ring-offset-2 focus:ring-offset-white cursor-pointer"
            >
              {t('problems.closingCta')}
              <HiArrowRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </FloatingCard>
    </motion.section>
  )
}
