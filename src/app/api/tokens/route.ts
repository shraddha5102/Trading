import { mockTokens } from '@/lib/mockData'
import type { TokensResponse } from '@/types/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const type = searchParams.get('type')
  const search = searchParams.get('search')?.toLowerCase()
  const sortBy = searchParams.get('sortBy') || 'marketCap'
  const sortOrder = searchParams.get('sortOrder') || 'desc'
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 50

  // Clone and filter tokens
  let filteredTokens = [...mockTokens]

  if (type && type !== 'All') {
    filteredTokens = filteredTokens.filter((token) => token.type === type)
  }

  if (search) {
    filteredTokens = filteredTokens.filter(
      (token) =>
        token.name.toLowerCase().includes(search) ||
        token.symbol.toLowerCase().includes(search)
    )
  }

  // Sort tokens
  filteredTokens.sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]
    const modifier = sortOrder === 'asc' ? 1 : -1

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * modifier
    }

    return ((aValue as number) - (bValue as number)) * modifier
  })

  // Calculate pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedTokens = filteredTokens.slice(startIndex, endIndex)

  // Calculate stats from all filtered tokens (not just paginated ones)
  const response: TokensResponse = {
    success: true,
    data: paginatedTokens,
    stats: {
      totalVolume24h: filteredTokens.reduce((sum, token) => sum + token.volume24h, 0),
      totalMarketCap: filteredTokens.reduce((sum, token) => sum + token.marketCap, 0),
      totalTokens: filteredTokens.length,
      newPairs24h: filteredTokens.filter((token) => token.isNew).length,
    },
  }

  // Add artificial delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(response)
}