import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import type { Token, TokenStats, SortConfig, TokenFilters } from '@/types/token'

interface TokensState {
  list: Token[]
  stats: TokenStats
  sortConfig: SortConfig
  filters: TokenFilters
  isLoading: boolean
  error: string | null
}

const initialState: TokensState = {
  list: [],
  stats: {
    totalVolume24h: 0,
    totalMarketCap: 0,
    totalTokens: 0,
    newPairs24h: 0,
  },
  sortConfig: {
    column: 'marketCap',
    direction: 'desc',
  },
  filters: {},
  isLoading: false,
  error: null,
}

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.list = action.payload
    },
    setStats: (state, action: PayloadAction<TokenStats>) => {
      state.stats = action.payload
    },
    sortTokens: (state, action: PayloadAction<{ column: SortConfig['column'] }>) => {
      const { column } = action.payload
      state.sortConfig = {
        column,
        direction:
          state.sortConfig.column === column && state.sortConfig.direction === 'asc'
            ? 'desc'
            : 'asc',
      }

      state.list = [...state.list].sort((a, b) => {
        const aValue = a[column]
        const bValue = b[column]
        const modifier = state.sortConfig.direction === 'asc' ? 1 : -1

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue) * modifier
        }

        return ((aValue as number) - (bValue as number)) * modifier
      })
    },
    setTokenFilters: (state, action: PayloadAction<TokenFilters>) => {
      state.filters = action.payload
    },
    updateTokenPrice: (
      state,
      action: PayloadAction<{ id: string; price: number; priceChange24h: number }>
    ) => {
      const token = state.list.find((t) => t.id === action.payload.id)
      if (token) {
        const oldPrice = token.price
        token.price = action.payload.price
        token.priceChange24h = action.payload.priceChange24h
        
        // Update market cap based on new price
        if (oldPrice > 0) {
          const priceChange = action.payload.price / oldPrice
          token.marketCap *= priceChange
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setTokens,
  setStats,
  sortTokens,
  setTokenFilters,
  updateTokenPrice,
  setLoading,
  setError,
} = tokensSlice.actions

export const selectTokens = (state: RootState) => state.tokens.list
export const selectStats = (state: RootState): TokenStats => ({
  ...state.tokens.stats,
  totalVolume24h: state.tokens.stats?.totalVolume24h ?? 0,
  totalMarketCap: state.tokens.stats?.totalMarketCap ?? 0,
  totalTokens: state.tokens.stats?.totalTokens ?? 0,
  newPairs24h: state.tokens.stats?.newPairs24h ?? 0,
})
export const selectSortConfig = (state: RootState) => state.tokens.sortConfig
export const selectFilters = (state: RootState) => state.tokens.filters
export const selectIsLoading = (state: RootState) => state.tokens.isLoading
export const selectError = (state: RootState) => state.tokens.error

export const tokensReducer = tokensSlice.reducer