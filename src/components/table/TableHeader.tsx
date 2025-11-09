'use client'

import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/Button'
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/Tooltip'
import { sortTokens, selectSortConfig } from '@/store/slices/tokensSlice'
import type { SortConfig } from '@/types/token'

const headers = [
  { id: 'name', label: 'Token', tooltip: 'Token name and symbol' },
  { id: 'price', label: 'Price', tooltip: 'Current token price in USD' },
  { id: 'priceChange24h', label: '24h %', tooltip: 'Price change in the last 24 hours' },
  { id: 'volume24h', label: 'Volume', tooltip: '24-hour trading volume' },
  { id: 'marketCap', label: 'Market Cap', tooltip: 'Total market capitalization' },
  { id: 'liquidity', label: 'Liquidity', tooltip: 'Available trading liquidity' },
  { id: 'holders', label: 'Holders', tooltip: 'Number of unique token holders' },
] as const

export const TableHeader = memo(function TableHeader() {
  const dispatch = useDispatch()
  const sortConfig = useSelector(selectSortConfig)

  const handleSort = (columnId: SortConfig['column']) => {
    dispatch(sortTokens({ column: columnId }))
  }

  return (
    <thead className="border-b">
      <tr>
        {headers.map(({ id, label, tooltip }) => (
          <th key={id} className="token-cell text-left text-sm font-medium text-zinc-400">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-medium hover:text-white"
                  onClick={() => handleSort(id)}
                >
                  {label}
                  {sortConfig.column === id && (
                    <span className="ml-1 text-zinc-600">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-zinc-800 text-white">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          </th>
        ))}
      </tr>
    </thead>
  )
})