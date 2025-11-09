'use client'

import { memo } from 'react'
import { useSelector } from 'react-redux'
import { useWebSocket } from '@/hooks/useWebSocket'
import { selectStats, selectIsLoading, selectError } from '@/store/slices/tokensSlice'
import { formatNumber } from '@/lib/utils'
import { Skeleton } from '../ui/Skeleton'

export const Header = memo(function Header() {
  const stats = useSelector(selectStats)
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectError)
  const { isConnected } = useWebSocket()

  return (
    <header className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Token Discovery</h1>
          <div className="mt-1 text-zinc-400">
            Find and track the latest token pairs
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border bg-zinc-900/50 px-4 py-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isConnected ? 'bg-success animate-pulse' : 'bg-error'
              }`}
            />
            <span className="text-sm">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border bg-zinc-900/50 p-4">
          <div className="text-sm text-zinc-400">Total Volume (24h)</div>
          <div className="mt-1 text-xl font-medium">
            {isLoading ? (
              <Skeleton className="h-7 w-32" />
            ) : error ? (
              <span className="text-error">Failed to load</span>
            ) : stats?.totalVolume24h !== undefined ? (
              `$${formatNumber(stats.totalVolume24h)}`
            ) : (
              '$0.00'
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-zinc-900/50 p-4">
          <div className="text-sm text-zinc-400">Total Market Cap</div>
          <div className="mt-1 text-xl font-medium">
            {isLoading ? (
              <Skeleton className="h-7 w-32" />
            ) : error ? (
              <span className="text-error">Failed to load</span>
            ) : stats?.totalMarketCap !== undefined ? (
              `$${formatNumber(stats.totalMarketCap)}`
            ) : (
              '$0.00'
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-zinc-900/50 p-4">
          <div className="text-sm text-zinc-400">Total Tokens</div>
          <div className="mt-1 text-xl font-medium">
            {isLoading ? (
              <Skeleton className="h-7 w-24" />
            ) : error ? (
              <span className="text-error">Failed to load</span>
            ) : stats?.totalTokens !== undefined ? (
              formatNumber(stats.totalTokens)
            ) : (
              '0'
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-zinc-900/50 p-4">
          <div className="text-sm text-zinc-400">New Pairs (24h)</div>
          <div className="mt-1 text-xl font-medium">
            {isLoading ? (
              <Skeleton className="h-7 w-24" />
            ) : error ? (
              <span className="text-error">Failed to load</span>
            ) : stats?.newPairs24h !== undefined ? (
              formatNumber(stats.newPairs24h)
            ) : (
              '0'
            )}
          </div>
        </div>
      </div>
    </header>
  )
})