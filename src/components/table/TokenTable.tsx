'use client'

import { memo, useState, useEffect } from 'react'
import { TableFilters } from './TableFilters'
import { TableHeader } from './TableHeader'
import { TokenRow } from './TokenRow'
import { TokenRowSkeleton } from './TokenRowSkeleton'
import { useTokenData } from '@/hooks/useTokenData'
import { useWebSocket } from '@/hooks/useWebSocket'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { ErrorBoundary } from '../ui/ErrorBoundary'
import type { Token } from '@/types/token'

const ITEMS_PER_PAGE = 20

export const TokenTable = memo(function TokenTable() {
  const { tokens, isLoading, error } = useTokenData()
  const { isConnected } = useWebSocket() // Add WebSocket connection status
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  })

  useEffect(() => {
    if (isIntersecting && displayCount < tokens.length) {
      setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, tokens.length))
    }
  }, [isIntersecting, displayCount, tokens.length])

  // Memoize visible tokens
  const visibleTokens = tokens.slice(0, displayCount)

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="text-red-500 mb-4">Failed to fetch token data</div>
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Retry
          </button>
        </div>
      )
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <TableHeader />
          <tbody className="divide-y divide-zinc-800">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TokenRowSkeleton key={index} />
              ))
            ) : (
              <>
                {visibleTokens.map((token: Token) => (
                  <TokenRow key={token.id} token={token} />
                ))}
                {displayCount < tokens.length && (
                  <tr ref={targetRef}>
                    <td colSpan={7} className="token-cell text-center">
                      <TokenRowSkeleton />
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="w-full overflow-hidden rounded-lg border bg-zinc-900/50 shadow">
        <TableFilters />
        {renderContent()}
      </div>
    </ErrorBoundary>
  )
})