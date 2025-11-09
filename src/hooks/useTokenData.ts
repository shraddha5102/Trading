import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTokens } from '@/lib/api'
import {
  selectFilters,
  selectSortConfig,
  setTokens,
  setStats,
  setLoading,
  setError,
} from '@/store/slices/tokensSlice'
import type { TokensResponse } from '@/types/api'

export function useTokenData() {
  const dispatch = useDispatch()
  const sortConfig = useSelector(selectSortConfig)
  const filters = useSelector(selectFilters)

  const { data, isLoading, error, refetch } = useQuery<TokensResponse, Error>({
    queryKey: ['tokens', sortConfig, filters],
    queryFn: async () => {
      try {
        dispatch(setLoading(true))
        dispatch(setError(null))

        const response = await fetchTokens(
          {
            page: 1,
            limit: 50,
            sortBy: sortConfig.column,
            sortOrder: sortConfig.direction,
          },
          filters
        )
        
        if (!response.success) {
          throw new Error('Failed to fetch token data')
        }

        // Validate response data
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid token data format')
        }
        
        // Update Redux store after successful fetch
        dispatch(setTokens(response.data))
        dispatch(setStats(response.stats))
        return response
      } catch (err) {
        const error = err as Error
        const errorMessage = error.message || 'Failed to fetch token data'
        dispatch(setError(errorMessage))
        throw error
      } finally {
        dispatch(setLoading(false))
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 30, // 30 seconds
    retry: 3, // Retry failed requests up to 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  })
  dispatch(setLoading(isLoading))

  const defaultStats = {
    totalVolume24h: 0,
    totalMarketCap: 0,
    totalTokens: 0,
    newPairs24h: 0,
  }

  return {
    tokens: data?.data ?? [],
    stats: data?.stats ?? defaultStats,
    isLoading,
    error,
  }
}