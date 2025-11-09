import { generateMockPriceUpdate, mockTokens } from './mockData'

let mockWsConnection: WebSocket | null = null
const connectedClients = new Set<WebSocket>()

export function createMockWebSocketServer() {
  class MockWebSocket extends EventTarget {
    static CONNECTING = 0
    static OPEN = 1
    static CLOSING = 2
    static CLOSED = 3

    readyState: number
    url: string
    onopen: ((event: Event) => void) | null = null
    onclose: ((event: Event) => void) | null = null
    onmessage: ((event: MessageEvent) => void) | null = null
    onerror: ((event: Event) => void) | null = null

    constructor(url: string) {
      super()
      this.readyState = MockWebSocket.CONNECTING
      this.url = url

      // Simulate connection delay
      setTimeout(() => {
        this.readyState = MockWebSocket.OPEN
        if (this.onopen) {
          this.onopen(new Event('open'))
        }
        connectedClients.add(this as unknown as WebSocket)
        startPriceUpdates()
      }, 100)
    }

    close() {
      this.readyState = MockWebSocket.CLOSING
      connectedClients.delete(this as unknown as WebSocket)
      if (this.onclose) {
        this.onclose(new Event('close'))
      }
      this.readyState = MockWebSocket.CLOSED
      if (connectedClients.size === 0) {
        stopPriceUpdates()
      }
    }

    send(data: string) {
      // Mock server response if needed
    }
  }

  // Replace the global WebSocket with our mock
  if (typeof window !== 'undefined') {
    (window as any).WebSocket = MockWebSocket
  }

  return MockWebSocket
}

let updateInterval: NodeJS.Timeout | null = null

function startPriceUpdates() {
  if (updateInterval) return

  updateInterval = setInterval(() => {
    // Randomly select a token to update
    const randomToken = mockTokens[Math.floor(Math.random() * mockTokens.length)]
    const update = generateMockPriceUpdate(randomToken)
    
    const message = new MessageEvent('message', {
      data: JSON.stringify(update)
    })

    connectedClients.forEach(client => {
      if (client.onmessage) {
        client.onmessage(message)
      }
    })
  }, 2000) // Send updates every 2 seconds
}

function stopPriceUpdates() {
  if (updateInterval) {
    clearInterval(updateInterval)
    updateInterval = null
  }
}