import type { TokensResponse, PaginationParams, TokenFilters } from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function fetchTokens(
  params?: PaginationParams,
  filters?: TokenFilters
): Promise<TokensResponse> {
  try {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value))
        }
      })
    }

    const response = await fetch(
      `${API_BASE_URL}/tokens?${searchParams.toString()}`
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch tokens: ${response.statusText}`)
    }

    const data = await response.json()
    if (!data || !data.data || !data.stats) {
      throw new Error('Invalid response format')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch tokens')
  }
}

export async function getTokenById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tokens/${id}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.statusText}`)
    }

    const data = await response.json()
    if (!data) {
      throw new Error('Invalid response format')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch token')
  }
}