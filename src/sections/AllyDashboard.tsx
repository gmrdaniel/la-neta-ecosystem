import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ArcElement,
  DoughnutController,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import type { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'

export type AllyBrand = {
  id: string
  name: string
  type: 'icon' | 'image' | 'letter'
  icon?: IconType
  image?: string
  letter?: string
  since?: string
  imageScale?: number
  /** Brand color for icon/letter and dashboard accent (e.g. #1877F2) */
  brandColor?: string
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  ArcElement,
  DoughnutController,
  Tooltip,
  Legend
)

export type AllyStats = {
  engagementRate: number
  successRate: number
  totalImpressions: number
  adsGenerated: number
  impressionsByQuarter: number[]
  engagementByChannel: { label: string; value: number }[]
}

const formatImpressions = (n: number) => {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return String(n)
}

/** Convert hex to rgba for Chart.js */
function hexToRgba(hex: string, alpha: number): string {
  const match = hex.replace(/^#/, '').match(/(.{2})(.{2})(.{2})/)
  if (!match) return `rgba(102, 65, 237, ${alpha})`
  const r = parseInt(match[1], 16)
  const g = parseInt(match[2], 16)
  const b = parseInt(match[3], 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function BrandLogo({ brand }: { brand: AllyBrand }) {
  const iconSize = 28
  const colorStyle = brand.brandColor ? { color: brand.brandColor } : undefined
  const colorClass = !brand.brandColor ? 'text-[var(--laneta-purple)]' : ''
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1">
      {brand.type === 'icon' && brand.icon && (
        <brand.icon className={colorClass} style={colorStyle} size={iconSize} />
      )}
      {brand.type === 'image' && brand.image && (
        <img
          src={brand.image}
          alt=""
          className="h-full w-full object-contain"
          style={brand.imageScale != null ? { transform: `scale(${brand.imageScale})` } : undefined}
        />
      )}
      {(brand.type === 'letter' || (!brand.icon && !brand.image)) && (
        <span className="text-lg font-bold" style={colorStyle}>
          {brand.letter || brand.name.charAt(0)}
        </span>
      )}
    </div>
  )
}

export function AllyDashboard({ brand, stats }: { brand: AllyBrand; stats: AllyStats }) {
  const { t } = useTranslation('partnerships')
  const primaryRgba = brand.brandColor ? hexToRgba(brand.brandColor, 0.7) : 'rgba(102, 65, 237, 0.7)'
  const primaryRgb = brand.brandColor || 'rgb(102, 65, 237)'

  const barData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: t('dashboard.impressionsK'),
        data: stats.impressionsByQuarter.map((v) => Math.round(v / 1000)),
        backgroundColor: primaryRgba,
        borderColor: primaryRgb,
        borderWidth: 1,
      },
    ],
  }

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${formatImpressions((ctx.raw as number) * 1000)} impressions`,
        },
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { maxTicksLimit: 5 } },
    },
  }

  const doughnutPalette = brand.brandColor
    ? [
        'rgba(255, 71, 172, 0.8)',
        hexToRgba(brand.brandColor, 0.8),
        'rgba(121, 188, 247, 0.8)',
        'rgba(248, 124, 99, 0.8)',
      ]
    : [
        'rgba(255, 71, 172, 0.8)',
        'rgba(102, 65, 237, 0.8)',
        'rgba(121, 188, 247, 0.8)',
        'rgba(248, 124, 99, 0.8)',
      ]
  const doughnutBorders = brand.brandColor
    ? ['#ff47ac', brand.brandColor, '#79bcf7', '#f87c63']
    : ['#ff47ac', '#6641ed', '#79bcf7', '#f87c63']

  const doughnutData = {
    labels: stats.engagementByChannel.map((c) => c.label),
    datasets: [
      {
        data: stats.engagementByChannel.map((c) => c.value),
        backgroundColor: doughnutPalette,
        borderColor: doughnutBorders,
        borderWidth: 1,
      },
    ],
  }

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      {/* Header: logo + name */}
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <BrandLogo brand={brand} />
        <div>
          <h4 className="text-lg font-bold text-slate-800">{brand.name}</h4>
          {brand.since && (
            <p className="text-xs text-slate-500">{t('partnerSince', { year: brand.since })}</p>
          )}
        </div>
      </div>

      {/* KPI cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div
          className={`rounded-xl px-4 py-3 text-center ${!brand.brandColor ? 'bg-[var(--laneta-purple)]/10' : ''}`}
          style={brand.brandColor ? { backgroundColor: hexToRgba(brand.brandColor, 0.12) } : undefined}
        >
          <p
            className={`text-2xl font-bold ${!brand.brandColor ? 'text-[var(--laneta-purple)]' : ''}`}
            style={brand.brandColor ? { color: brand.brandColor } : undefined}
          >
            {stats.engagementRate}%
          </p>
          <p className="text-xs font-medium text-slate-600">{t('dashboard.avgEngagement')}</p>
        </div>
        <div className="rounded-xl bg-[var(--laneta-pink)]/10 px-4 py-3 text-center">
          <p className="text-2xl font-bold text-[var(--laneta-pink)]">{stats.successRate}%</p>
          <p className="text-xs font-medium text-slate-600">{t('dashboard.successRate')}</p>
        </div>
        <div className="rounded-xl bg-[var(--laneta-blue)]/10 px-4 py-3 text-center">
          <p className="text-2xl font-bold text-[var(--laneta-blue)]">
            {formatImpressions(stats.totalImpressions)}
          </p>
          <p className="text-xs font-medium text-slate-600">{t('dashboard.totalImpressions')}</p>
        </div>
        <div className="rounded-xl bg-slate-100 px-4 py-3 text-center">
          <p className="text-2xl font-bold text-slate-700">{stats.adsGenerated}</p>
          <p className="text-xs font-medium text-slate-600">{t('dashboard.adsGenerated')}</p>
        </div>
      </div>

      {/* Charts row: min-w-0 evita que el gráfico de barras se salga; doughnut centrado */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="min-w-0 overflow-hidden">
          <p className="mb-2 text-sm font-semibold text-slate-700">{t('dashboard.impressionsByQuarter')}</p>
          <div className="h-48 w-full min-w-0">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
        <div className="flex min-w-0 flex-col items-center">
          <p className="mb-2 w-full text-sm font-semibold text-slate-700">{t('dashboard.engagementByChannel')}</p>
          <div className="h-48 w-full max-w-[260px] md:max-w-[280px]">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}
