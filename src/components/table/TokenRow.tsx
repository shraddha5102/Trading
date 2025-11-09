'use client'

import { memo, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/Tooltip'
import { formatNumber, formatPercentage, formatPrice } from '@/lib/utils'
import type { Token } from '@/types/token'

interface TokenRowProps {
  token: Token
}

export const TokenRow = memo(function TokenRow({ token }: TokenRowProps) {
  const [prevPrice, setPrevPrice] = useState(token.price)
  const [prevMarketCap, setPrevMarketCap] = useState(token.marketCap)
  const [priceFlash, setPriceFlash] = useState<'up' | 'down' | null>(null)
  const [marketCapFlash, setMarketCapFlash] = useState<'up' | 'down' | null>(null)
  const flashTimeoutRef = useRef<{ price?: NodeJS.Timeout; marketCap?: NodeJS.Timeout }>({})

  useEffect(() => {
    // Handle price updates
    if (token.price !== prevPrice) {
      setPriceFlash(token.price > prevPrice ? 'up' : 'down')
      setPrevPrice(token.price)

      if (flashTimeoutRef.current.price) {
        clearTimeout(flashTimeoutRef.current.price)
      }

      flashTimeoutRef.current.price = setTimeout(() => {
        setPriceFlash(null)
      }, 1000)
    }

    // Handle market cap updates
    if (token.marketCap !== prevMarketCap) {
      setMarketCapFlash(token.marketCap > prevMarketCap ? 'up' : 'down')
      setPrevMarketCap(token.marketCap)

      if (flashTimeoutRef.current.marketCap) {
        clearTimeout(flashTimeoutRef.current.marketCap)
      }

      flashTimeoutRef.current.marketCap = setTimeout(() => {
        setMarketCapFlash(null)
      }, 1000)
    }

    return () => {
      if (flashTimeoutRef.current.price) {
        clearTimeout(flashTimeoutRef.current.price)
      }
      if (flashTimeoutRef.current.marketCap) {
        clearTimeout(flashTimeoutRef.current.marketCap)
      }
    }
  }, [token.price, prevPrice, token.marketCap, prevMarketCap])

  const priceChangeClass = token.priceChange24h > 0 ? 'text-success' : 'text-error'
  const priceFlashClass = priceFlash
    ? priceFlash === 'up'
      ? 'animate-price-flash-green'
      : 'animate-price-flash-red'
    : ''

  return (
    <tr className="token-row group border-b border-zinc-800 transition-colors hover:bg-zinc-800/50">
      <td className="token-cell">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            {token.logoUrl ? (
              <Image
                src={token.logoUrl}
                alt={token.name}
                width={32}
                height={32}
                className="rounded-full"
                loading="lazy"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-zinc-800" />
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{token.name}</span>
              {token.isNew && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="rounded bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-500">
                      NEW
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right">New pair listed in the last 24h</TooltipContent>
                </Tooltip>
              )}
            </div>
            <span className="text-sm text-zinc-400">{token.symbol}</span>
          </div>
        </div>
      </td>
      <td className={`token-cell font-medium transition-colors ${priceFlashClass}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help text-left">
              {formatPrice(token.price)}
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">Current price in USD</TooltipContent>
        </Tooltip>
      </td>
      <td className={`token-cell font-medium ${priceChangeClass}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help text-left">
              {formatPercentage(token.priceChange24h)}
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">24h price change</TooltipContent>
        </Tooltip>
      </td>
      <td className="token-cell text-zinc-400">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help text-left">
              ${formatNumber(token.volume24h)}
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">24h trading volume</TooltipContent>
        </Tooltip>
      </td>
      <td className={`token-cell text-zinc-400 transition-colors ${marketCapFlash ? marketCapFlash === 'up' ? 'animate-price-flash-green' : 'animate-price-flash-red' : ''}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help text-left">
              ${formatNumber(token.marketCap)}
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">Total market capitalization</TooltipContent>
        </Tooltip>
      </td>
      <td className="token-cell text-zinc-400">
        <Tooltip>
          <TooltipTrigger className="text-left">
            ${formatNumber(token.liquidity)}
          </TooltipTrigger>
          <TooltipContent side="top">Available trading liquidity</TooltipContent>
        </Tooltip>
      </td>
      <td className="token-cell text-zinc-400">
        <Tooltip>
          <TooltipTrigger className="text-left">
            {formatNumber(token.holders)}
          </TooltipTrigger>
          <TooltipContent side="top">Total number of holders</TooltipContent>
        </Tooltip>
      </td>
    </tr>
  )
})