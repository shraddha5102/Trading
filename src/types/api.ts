import type { Token, TokenStats } from './token'

export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}

export interface TokensResponse extends ApiResponse<Token[]> {
  stats: TokenStats
}

export interface TokenResponse extends ApiResponse<Token> {}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  type?: string
}

export interface TokenFilters {
  search?: string
  type?: string
  minPrice?: number
  maxPrice?: number
  minMarketCap?: number
  maxMarketCap?: number
  minLiquidity?: number
  maxLiquidity?: number
  minHolders?: number
  maxHolders?: number
}