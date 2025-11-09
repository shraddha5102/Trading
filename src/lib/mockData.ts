import type { Token } from '@/types/token'

export const mockTokens: Token[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 35000,
    priceChange24h: 2.5,
    volume24h: 25000000000,
    marketCap: 680000000000,
    liquidity: 1200000000,
    holders: 1000000,
    type: 'new',
    isNew: true,
    createdAt: new Date().toISOString(),
    logoUrl: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2000,
    priceChange24h: -1.2,
    volume24h: 15000000000,
    marketCap: 240000000000,
    liquidity: 800000000,
    holders: 750000,
    type: 'trending',
    isNew: false,
    createdAt: new Date().toISOString(),
    logoUrl: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  },
  {
    id: '3',
    name: 'Solana',
    symbol: 'SOL',
    price: 45,
    priceChange24h: 5.8,
    volume24h: 2000000000,
    marketCap: 18000000000,
    liquidity: 500000000,
    holders: 250000,
    type: 'gainers',
    isNew: false,
    createdAt: new Date().toISOString(),
    logoUrl: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
  },
  {
    id: '4',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.35,
    priceChange24h: -2.1,
    volume24h: 800000000,
    marketCap: 12000000000,
    liquidity: 300000000,
    holders: 400000,
    type: 'new',
    isNew: true,
    createdAt: new Date().toISOString(),
    logoUrl: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
  },
  {
    id: '5',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 5.2,
    priceChange24h: 1.5,
    volume24h: 500000000,
    marketCap: 6000000000,
    liquidity: 200000000,
    holders: 150000,
    type: 'losers',
    isNew: false,
    createdAt: new Date().toISOString(),
    logoUrl: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',
  }
]

export function generateMockPriceUpdate(token: Token) {
  const priceChange = token.price * (Math.random() * 0.02 - 0.01) // ±1%
  const newPrice = token.price + priceChange
  const newPriceChange24h = token.priceChange24h + (Math.random() * 0.4 - 0.2) // ±0.2%

  return {
    id: token.id,
    price: newPrice,
    priceChange24h: newPriceChange24h,
    timestamp: new Date().toISOString(),
  }
}