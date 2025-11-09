import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  selectWebsocketConnected,
  setWebsocketConnected 
} from '@/store/slices/uiSlice'
import { updateTokenPrice } from '@/store/slices/tokensSlice'
import type { TokenPriceUpdate } from '@/types/token'

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000/ws'
const RECONNECT_DELAY = 2000

export function useWebSocket() {
  const dispatch = useDispatch()
  const isConnected = useSelector(selectWebsocketConnected)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const connect = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return

    const ws = new WebSocket(WS_URL)

    ws.onopen = () => {
      console.log('WebSocket connected')
      dispatch(setWebsocketConnected(true))
    }

    ws.onclose = () => {
      console.log('WebSocket disconnected')
      dispatch(setWebsocketConnected(false))
      
      // Attempt to reconnect
      reconnectTimeoutRef.current = setTimeout(connect, RECONNECT_DELAY)
    }

    ws.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data) as TokenPriceUpdate
        dispatch(updateTokenPrice(update))
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
      }
    }

    wsRef.current = ws
  }

  useEffect(() => {
    connect()

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [])

  return {
    isConnected,
  }
}