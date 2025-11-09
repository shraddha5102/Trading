'use client'

import { memo } from 'react'
import { Skeleton } from '../ui/Skeleton'

export const TokenRowSkeleton = memo(function TokenRowSkeleton() {
  return (
    <tr className="token-row border-b border-zinc-800">
      <td className="token-cell">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </td>
      <td className="token-cell">
        <Skeleton className="h-5 w-20" />
      </td>
      <td className="token-cell">
        <Skeleton className="h-5 w-16" />
      </td>
      <td className="token-cell">
        <Skeleton className="h-5 w-28" />
      </td>
      <td className="token-cell">
        <Skeleton className="h-5 w-32" />
      </td>
      <td className="token-cell">
        <Skeleton className="h-5 w-24" />
      </td>
      <td className="token-cell">
        <Skeleton className="h-5 w-20" />
      </td>
    </tr>
  )
})