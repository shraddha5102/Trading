'use client'

import { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectStats, selectIsLoading, selectError } from '@/store/slices/tokensSlice'
import { formatNumber } from '@/lib/utils'
import { Skeleton } from '../ui/Skeleton'

export const StatsFooter = memo(function StatsFooter() {
  const stats = useSelector(selectStats)
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectError)
  const currentYear = new Date().getFullYear()

  const renderStat = (label: string, value: number | undefined, prefix = '$') => (
    <div>
      <div className="text-sm text-zinc-400">{label}</div>
      <div className="mt-1 font-medium">
        {isLoading ? (
          <Skeleton className="h-6 w-24" />
        ) : error ? (
          <div className="flex flex-col gap-2">
            <span className="text-red-500">Failed to load</span>
            <button
              onClick={() => window.location.reload()}
              className="w-fit rounded bg-zinc-800 px-2 py-1 text-xs font-medium text-white hover:bg-zinc-700"
            >
              Retry
            </button>
          </div>
        ) : value !== undefined ? (
          `${prefix}${formatNumber(value)}`
        ) : (
          prefix === '$' ? `${prefix}0.00` : '0'
        )}
      </div>
    </div>
  )

  return (
    <footer className="mt-8 border-t">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {renderStat('24h Volume', stats?.totalVolume24h)}
          {renderStat('Total Market Cap', stats?.totalMarketCap)}
          {renderStat('Total Tokens', stats?.totalTokens, '')}
          {renderStat('New Pairs (24h)', stats?.newPairs24h, '')}
        </div>

        <div className="mt-4 text-center text-sm text-zinc-400">
          © {currentYear} Token Trading Table. All rights reserved.
        </div>
      </div>
    </footer>
  )
})