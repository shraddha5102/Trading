'use client'

import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { TooltipProvider } from '@/components/ui/Tooltip'
import { store } from '@/store'
import { createMockWebSocketServer } from './mockWebSocket'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  )

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      createMockWebSocketServer()
    }
  }, [])

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  )
}