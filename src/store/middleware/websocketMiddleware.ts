import { Middleware } from '@reduxjs/toolkit'
import { setWebsocketConnected } from '../slices/uiSlice'
import { updateTokenPrice } from '../slices/tokensSlice'
import type { TokenPriceUpdate } from '@/types/token'

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001/ws'

export const websocketMiddleware: Middleware = (store) => {
  let ws: WebSocket | null = null

  return (next) => (action: any) => {
    if (action.type === '@@INIT') {
      ws = new WebSocket(WEBSOCKET_URL)

      ws.onopen = () => {
        store.dispatch(setWebsocketConnected(true))
      }

      ws.onclose = () => {
        store.dispatch(setWebsocketConnected(false))
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        store.dispatch(setWebsocketConnected(false))
      }

      ws.onmessage = (event) => {
        try {
          const update: TokenPriceUpdate = JSON.parse(event.data)
          store.dispatch(updateTokenPrice({
            id: update.id,
            price: update.price,
            priceChange24h: update.priceChange24h,
          }))
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }
    }

    return next(action)
  }
}

export function useWebSocket() {
  return null // TODO: Implement hook for sending messages if needed
}