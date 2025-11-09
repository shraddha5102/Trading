export interface Token {
  id: string
  name: string
  symbol: string
  price: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  liquidity: number
  holders: number
  type?: TokenType
  isNew?: boolean
  createdAt?: string
  logoUrl?: string
}

export type TokenType = 'new' | 'trending' | 'gainers' | 'losers'

export interface TokenFilters {
  type?: TokenType
  search?: string
  marketCapMin?: number
  marketCapMax?: number
  volumeMin?: number
  volumeMax?: number
}

export interface TokenPriceUpdate {
  id: string
  price: number
  priceChange24h: number
  timestamp: string
}

export interface TokenStats {
  totalVolume24h: number
  totalMarketCap: number
  totalTokens: number
  newPairs24h: number
}

export interface SortConfig {
  column: 'name' | 'price' | 'priceChange24h' | 'volume24h' | 'marketCap' | 'liquidity' | 'holders'
  direction: 'asc' | 'desc'
}