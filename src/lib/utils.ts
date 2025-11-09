import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

export function formatPercentage(num: number): string {
  return `${num > 0 ? '+' : ''}${formatNumber(num)}%`
}

export function formatPrice(price: number): string {
  if (price < 0.01) {
    return `$${price.toFixed(8)}`
  }
  if (price < 1) {
    return `$${price.toFixed(4)}`
  }
  if (price < 1000) {
    return `$${price.toFixed(2)}`
  }
  return `$${formatNumber(price, 2)}`
}