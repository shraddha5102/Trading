'use client'

import { memo, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/Button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'
import { selectFilters, setTokenFilters } from '@/store/slices/tokensSlice'
import type { TokenFilters, TokenType } from '@/types/token'

const filterTypes = ['All', 'New', 'Trending', 'Gainers', 'Losers'] as const

type FilterType = typeof filterTypes[number]
type TokenFilterValue = Omit<TokenFilters, 'type'> & { type?: TokenType }

export const TableFilters = memo(function TableFilters() {
  const dispatch = useDispatch()
  const currentFilters = useSelector(selectFilters)
  const [filters, setFilters] = useState<TokenFilterValue>(currentFilters)

  const handleFilterChange = useCallback((type: FilterType) => {
    const newFilters: TokenFilterValue = type === 'All' ? {} : { 
      type: type.toLowerCase() as TokenType 
    }
    setFilters(newFilters)
    dispatch(setTokenFilters(newFilters))
  }, [dispatch])

  const handleSearch = useCallback((search: string) => {
    const newFilters = { ...filters, search: search || undefined }
    setFilters(newFilters)
    dispatch(setTokenFilters(newFilters))
  }, [dispatch, filters])

  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex flex-wrap gap-2">
        {filterTypes.map((type) => (
          <Button
            key={type}
            variant={filters.type === type.toLowerCase() ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleFilterChange(type)}
            className={filters.type === type.toLowerCase() ? '' : 'text-zinc-400 hover:text-white'}
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tokens..."
            className="h-9 rounded-md border border-zinc-800 bg-zinc-900/50 px-3 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
            value={filters.search || ''}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <span>Advanced Filters</span>
              {Object.keys(filters).length > 1 && (
                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs">
                  {Object.keys(filters).length - 1}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Market Cap Range</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="h-9 rounded-md border border-zinc-800 bg-zinc-900/50 px-3 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                    value={filters.marketCapMin || ''}
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : undefined
                      setFilters({ ...filters, marketCapMin: value })
                      dispatch(setTokenFilters({ ...filters, marketCapMin: value }))
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="h-9 rounded-md border border-zinc-800 bg-zinc-900/50 px-3 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                    value={filters.marketCapMax || ''}
                    onChange={(e) => {
                      const value = e.target.value ? Number(e.target.value) : undefined
                      setFilters({ ...filters, marketCapMax: value })
                      dispatch(setTokenFilters({ ...filters, marketCapMax: value }))
                    }}
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <input
          type="text"
          placeholder="Search tokens..."
          className="rounded bg-zinc-900 px-4 py-2 text-sm text-white placeholder-zinc-400 
            border border-zinc-800 focus:border-zinc-700 focus:outline-none"
          value={filters.search || ''}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Advanced Filters</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Market Cap Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="rounded bg-zinc-900 px-3 py-1.5 text-sm text-white placeholder-zinc-400 
                             border border-zinc-800 focus:border-zinc-700 focus:outline-none"
                    value={filters.marketCapMin || ''}
                    onChange={(e) => {
                      const newFilters: TokenFilterValue = {
                        ...filters,
                        marketCapMin: e.target.value ? Number(e.target.value) : undefined,
                      }
                      setFilters(newFilters)
                      dispatch(setTokenFilters(newFilters))
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="rounded bg-zinc-900 px-3 py-1.5 text-sm text-white placeholder-zinc-400 
                             border border-zinc-800 focus:border-zinc-700 focus:outline-none"
                    value={filters.marketCapMax || ''}
                    onChange={(e) => {
                      const newFilters: TokenFilterValue = {
                        ...filters,
                        marketCapMax: e.target.value ? Number(e.target.value) : undefined,
                      }
                      setFilters(newFilters)
                      dispatch(setTokenFilters(newFilters))
                    }}
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newFilters: TokenFilterValue = {}
                  setFilters(newFilters)
                  dispatch(setTokenFilters(newFilters))
                }}
                className="mt-2 w-full text-zinc-400 hover:text-white"
              >
                Reset All Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
})